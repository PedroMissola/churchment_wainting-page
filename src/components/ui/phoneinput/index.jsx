"use client";

import { useEffect, useState, useRef } from "react";
import CountrySelect from "@/components/ui/countryselector";
import { Input } from "@/components/ui/input";
import { PhoneNumberUtil, PhoneNumberFormat } from "google-libphonenumber";

const phoneUtil = PhoneNumberUtil.getInstance();

export default function PhoneInputCustom({ value = "", onChange }) {
  const [countriesData, setCountriesData] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [selectedCountryIso2, setSelectedCountryIso2] = useState("br");

  const [ddi, setDdi] = useState("+55");
  const [localNumberDigits, setLocalNumberDigits] = useState("");
  const [localNumberFormatted, setLocalNumberFormatted] = useState("");
  const [rawInput, setRawInput] = useState("");

  const [isValid, setIsValid] = useState(false); // <- estado de validade
  const [touched, setTouched] = useState(false);

  const inputRef = useRef(null);
  

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch("https://restcountries.com/v3.1/all");
        const data = await res.json();

        const formatted = data
          .filter(
            (c) =>
              c.cca2 &&
              c.name?.common &&
              c.idd?.root &&
              c.idd?.suffixes?.length > 0
          )
          .map((c) => ({
            name: c.name.common,
            iso2: c.cca2.toLowerCase(),
            callingCode: c.idd.root + c.idd.suffixes[0],
          }))
          .sort((a, b) => a.name.localeCompare(b.name));

        setCountriesData(formatted);
        setLoadingCountries(false);
      } catch (err) {
        console.error("Erro ao buscar países:", err);
        setLoadingCountries(false);
      }
    };

    fetchCountries();
  }, []);

  const formatLocalNumber = (digits) => {
    if (!digits) return "";

    const ddd = digits.slice(0, 2);
    const rest = digits.slice(2);

    if (rest.length <= 4) return `(${ddd}) ${rest}`;
    if (rest.length <= 8)
      return `(${ddd}) ${rest.slice(0, 4)}-${rest.slice(4)}`;
    if (rest.length === 9)
      return `(${ddd}) ${rest.slice(0, 5)}-${rest.slice(5)}`;

    return `(${ddd}) ${rest}`;
  };

  useEffect(() => {
    if (!value) {
      setDdi("+55");
      setSelectedCountryIso2("br");
      setLocalNumberDigits("");
      setLocalNumberFormatted("");
      setRawInput("+55 ");
      setIsValid(false); // Limpa o status de validação
      return;
    }

    const matchingCountry = countriesData.find((c) =>
      value.startsWith(c.callingCode)
    );

    if (matchingCountry) {
      const extractedDdi = matchingCountry.callingCode;
      const extractedLocal = value.replace(extractedDdi, "").trim();

      setDdi(extractedDdi);
      const digitsOnly = extractedLocal.replace(/\D/g, "");
      setLocalNumberDigits(digitsOnly);

      const iso2 = matchingCountry.iso2 || "br";
      setSelectedCountryIso2(iso2);

      const formatted = formatLocalNumber(digitsOnly);
      setLocalNumberFormatted(formatted);
      setRawInput(`${extractedDdi} ${formatted}`);

      emitChange(extractedDdi, digitsOnly, iso2);
    }
  }, [value, countriesData]);

  const handleCountryChange = (iso2) => {
    setSelectedCountryIso2(iso2);

    const country = countriesData.find((c) => c.iso2 === iso2);
    if (country) {
      const newDdi = country.callingCode.startsWith("+")
        ? country.callingCode
        : "+" + country.callingCode;

      setDdi(newDdi);
      const formatted = formatLocalNumber(localNumberDigits);
      setRawInput(`${newDdi} ${formatted}`);
      emitChange(newDdi, localNumberDigits, iso2);
    }
  };

  const emitChange = (
    ddiEmit,
    digitsEmit,
    countryIso = selectedCountryIso2
  ) => {
    const rawNumber = ddiEmit + digitsEmit;

    try {
      const phoneNumber = phoneUtil.parse(rawNumber, countryIso.toUpperCase());
      const valid = phoneUtil.isValidNumber(phoneNumber);
      setIsValid(valid); // <- aqui atualiza o estado de validação

      if (valid) {
        const formattedNational = phoneUtil.format(
          phoneNumber,
          PhoneNumberFormat.NATIONAL
        );
        const formattedE164 = phoneUtil.format(
          phoneNumber,
          PhoneNumberFormat.E164
        );

        setLocalNumberFormatted(formattedNational);
        onChange?.(formattedE164);
      } else {
        const formatted = formatLocalNumber(digitsEmit);
        setLocalNumberFormatted(formatted);
        setRawInput(`${ddiEmit} ${formatted}`);
        onChange?.(`${ddiEmit} ${digitsEmit}`);
      }
    } catch {
      setIsValid(false);
      const formatted = formatLocalNumber(digitsEmit);
      setLocalNumberFormatted(formatted);
      setRawInput(`${ddiEmit} ${formatted}`);
      onChange?.(`${ddiEmit} ${digitsEmit}`);
    }
  };

  const handleInputChange = (e) => {
    if (!touched) setTouched(true);  // marca como tocado na primeira mudança

    const val = e.target.value;
    const cleanedVal = val.replace(/[^\d+]/g, "");

    const matchingCountry = countriesData.find((c) =>
      cleanedVal.startsWith(c.callingCode)
    );

    if (matchingCountry) {
      const newDdi = matchingCountry.callingCode;
      const digitsOnly = cleanedVal.replace(newDdi, "");

      setDdi(newDdi);
      setSelectedCountryIso2(matchingCountry.iso2);
      setLocalNumberDigits(digitsOnly);

      const formatted = formatLocalNumber(digitsOnly);
      setRawInput(`${newDdi} ${formatted}`);
      emitChange(newDdi, digitsOnly, matchingCountry.iso2);
    } else {
      setRawInput(val);
      setIsValid(false);
    }
  };

  const handleFocus = () => {
    if (!touched) setTouched(true);
  };

  const handleKeyDown = (e) => {
    const cursorPos = e.target.selectionStart;

    if (
      (e.key === "Backspace" && cursorPos <= ddi.length) ||
      (e.key === "Delete" && cursorPos < ddi.length)
    ) {
      e.preventDefault();
    }
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex gap-2">
        <div className="w-2/5">
          {loadingCountries ? (
            <div className="text-sm text-gray-500">Carregando países...</div>
          ) : (
            <CountrySelect
              countries={countriesData}
              selectedIso2={selectedCountryIso2}
              onChange={handleCountryChange}
            />
          )}
        </div>

        <div className="flex-1 relative">
          <Input
            ref={inputRef}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="Número de telefone"
            value={rawInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus} // adiciona handleFocus
            className="w-full"
            data-error={touched && !isValid}   // só mostra erro se já tocado e inválido
            data-success={touched && isValid}  // só sucesso se tocado e válido
          />
        </div>
      </div>
    </div>
  );
}