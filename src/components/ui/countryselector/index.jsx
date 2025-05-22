//componente javascript .jsx

import React, { useEffect, useState, useRef, useCallback } from "react";

export default function CountrySelect({ countries, selectedIso2, onChange }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCountries, setFilteredCountries] = useState(countries);

  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  // Debounce da busca para evitar muitas filtragens rápidas
  useEffect(() => {
    const handler = setTimeout(() => {
      const term = searchTerm.trim().toLowerCase();
      if (!term) {
        setFilteredCountries(countries);
        setHighlightedIndex(-1);
        return;
      }

      const filtered = countries.filter(
        (country) =>
          typeof country.name === "string" &&
          country.name.toLowerCase().includes(term)
      );

      setFilteredCountries(filtered);
      setHighlightedIndex(filtered.length > 0 ? 0 : -1);
    }, 200);

    return () => clearTimeout(handler);
  }, [searchTerm, countries]);

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !inputRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
        setSearchTerm("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const iso2Value =
    typeof selectedIso2 === "object" && selectedIso2 !== null
      ? selectedIso2.iso2
      : selectedIso2;

  const selectedCountry = countries.find(
    (country) => country.iso2 === iso2Value
  );

  // Manipulação do teclado
  const handleKeyDown = useCallback(
    (e) => {
      if (!showDropdown) {
        if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setShowDropdown(true);
          setHighlightedIndex(0);
        }
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredCountries.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredCountries.length - 1
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (
          highlightedIndex >= 0 &&
          highlightedIndex < filteredCountries.length
        ) {
          onChange?.(filteredCountries[highlightedIndex].iso2);
          setShowDropdown(false);
          setSearchTerm("");
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        setShowDropdown(false);
        setSearchTerm("");
      }
    },
    [filteredCountries, highlightedIndex, onChange, showDropdown]
  );

  const handleSelectCountry = (iso2) => {
    onChange?.(iso2);
    setShowDropdown(false);
    setSearchTerm("");
  };

  console.log("selectedIso2:", selectedIso2);
  console.log("selectedCountry:", selectedCountry);

  return (
    <div
      className="relative w-full"
      aria-haspopup="listbox"
      aria-expanded={showDropdown}
    >
      <button
        type="button"
        onClick={() => setShowDropdown((v) => !v)}
        onKeyDown={handleKeyDown}
        aria-label={`Selecionar país, atualmente ${
          selectedCountry?.name || "Nenhum"
        }`}
        className="flex items-center gap-2 w-full text-left aria-disabled:cursor-not-allowed outline-none focus:outline-none text-neutral-900 placeholder:text-neutral-600/60 bg-transparent ring-transparent border border-neutral-300 transition-all duration-300 ease-in disabled:opacity-50 disabled:pointer-events-none data-[error=true]:border-red-500 data-[success=true]:border-green-500 data-[shape=pill]:rounded-full text-base rounded-lg py-3 px-3 ring-4 data-[icon-placement=start]:ps-11 data-[icon-placement=end]:pe-11 hover:border-neutral-800 hover:ring-neutral-800/10 focus:border-neutral-800 focus:ring-neutral-800/10 peer"
        ref={inputRef}
      >
        {selectedCountry && selectedCountry.iso2 ? (
          <>
            <img
              src={
                selectedCountry?.iso2
                  ? `https://flagcdn.com/w20/${selectedCountry.iso2}.png`
                  : ""
              }
              alt={`Bandeira de ${selectedCountry.name}`}
              loading="lazy"
              width={20}
              height={15}
            />
            <span className="truncate">{selectedCountry.name}</span>
          </>
        ) : (
          <span>Selecione o país</span>
        )}
        <svg
          className={`ml-auto h-4 w-4 transition-transform ${
            showDropdown ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {showDropdown && (
        <div
          ref={dropdownRef}
          role="listbox"
          tabIndex={-1}
          aria-activedescendant={
            highlightedIndex >= 0 && filteredCountries[highlightedIndex]
              ? `country-option-${filteredCountries[highlightedIndex].iso2}`
              : undefined
          }
          className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-gray-300 bg-white"
          onKeyDown={handleKeyDown}
        >
          <input
            type="search"
            placeholder="Buscar país"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border-b border-gray-300 px-3 py-2 outline-none"
            aria-label="Buscar país"
            // remove autoFocus para evitar foco automático
            autoComplete="off"
          />
          {filteredCountries.length === 0 ? (
            <div className="p-3 text-center text-gray-500">
              Nenhum país encontrado
            </div>
          ) : (
            filteredCountries
              .filter((c) => c?.iso2) // garantir que iso2 existe
              .map((country, index) => (
                <button
                  key={`${country.iso2 || "unknown"}-${index}`}
                  id={`country-option-${country.iso2}`}
                  role="option"
                  aria-selected={selectedIso2 === country.iso2}
                  className={`flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-left
                  ${
                    highlightedIndex === index
                      ? "bg-orange-500 text-white"
                      : selectedIso2 === country.iso2
                      ? "font-semibold"
                      : "text-gray-800"
                  }
                `}
                  onClick={() => handleSelectCountry(country.iso2)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  type="button"
                >
                  <img
                    src={`https://flagcdn.com/w20/${country.iso2}.png`}
                    alt={`Bandeira de ${country.name}`}
                    loading="lazy"
                    width={20}
                    height={15}
                  />
                  {country.name}
                </button>
              ))
          )}
        </div>
      )}
    </div>
  );
}
