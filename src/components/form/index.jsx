"use client";

import React, { useState } from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import PhoneInput from "@/components/ui/phoneinput";
import { defaultCountries } from "react-international-phone";

export default function Form() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    area: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Validações manuais
  function validate(data) {
    const newErrors = {};

    if (!data.firstName.trim()) {
      newErrors.firstName = "Primeiro nome é obrigatório";
    }

    if (!data.lastName.trim()) {
      newErrors.lastName = "Sobrenome é obrigatório";
    }

    if (!data.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = "Email inválido";
    }

    if (!data.area) {
      newErrors.area = "Área de atuação é obrigatória";
    }

    if (!data.phone.trim()) {
      newErrors.phone = "Telefone é obrigatório";
    } else {
      // Validação simples para telefone (digits entre 10 e 15)
      const digits = data.phone.replace(/\D/g, "");
      if (digits.length < 10 || digits.length > 15) {
        newErrors.phone = "Telefone inválido";
      }
    }

    return newErrors;
  }

  function onChangeField(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setSubmitError("");
    const validationErrors = validate(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccessMessage("");
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Prepare dados para envio
    const payload = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      area: formData.area,
      phone: formData.phone.trim(), // assumindo já no formato internacional
    };

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Erro ao enviar dados: ${response.statusText}`);
      }

      setSuccessMessage("Formulário enviado com sucesso!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        area: "",
        phone: "",
      });

      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setSubmitError(error.message || "Erro ao enviar o formulário");
      setSuccessMessage("");
    } finally {
      setIsSubmitting(false);
    }
  }

  // Função para definir data-error e data-success para inputs
  function getInputValidationAttributes(field) {
    return {
      "data-error": !!errors[field] || undefined,
      "data-success": !errors[field] && formData[field] ? true : undefined,
    };
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-4 min-w-full items-center"
    >
      <div className="flex gap-2 w-full">
        <div className="w-72 space-y-1">
          <Label htmlFor="firstname">Primeiro Nome</Label>
          <Input
            id="firstname"
            placeholder="Joseph"
            type="text"
            aria-invalid={!!errors.firstName}
            value={formData.firstName}
            onChange={(e) => onChangeField("firstName", e.target.value)}
            {...getInputValidationAttributes("firstName")}
          />
          {errors.firstName && (
            <span className="text-red-500 text-sm">{errors.firstName}</span>
          )}
        </div>

        <div className="w-72 space-y-1">
          <Label htmlFor="lastname">Sobrenome</Label>
          <Input
            id="lastname"
            placeholder="Sandras da Silva"
            type="text"
            aria-invalid={!!errors.lastName}
            value={formData.lastName}
            onChange={(e) => onChangeField("lastName", e.target.value)}
            {...getInputValidationAttributes("lastName")}
          />
          {errors.lastName && (
            <span className="text-red-500 text-sm">{errors.lastName}</span>
          )}
        </div>
      </div>

      <div className="w-full space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          placeholder="usuario@gmail.com"
          type="email"
          aria-invalid={!!errors.email}
          value={formData.email}
          onChange={(e) => onChangeField("email", e.target.value)}
          {...getInputValidationAttributes("email")}
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email}</span>
        )}
      </div>

      <div className="w-full space-y-1">
        <Label htmlFor="phone">Telefone</Label>
        <PhoneInput
          value={formData.phone}
          onChange={(value) => onChangeField("phone", value)}
          countriesData={defaultCountries}
          aria-invalid={!!errors.phone}
        />
        {errors.phone && (
          <span className="text-red-500 text-sm">{errors.phone}</span>
        )}
      </div>

      <div className="w-full">
        <label
          htmlFor="area"
          className="text-sm font-medium text-neutral-900 mb-1 block"
        >
          Área de atuação
        </label>
        <select
          id="area"
          aria-invalid={!!errors.area}
          value={formData.area}
          onChange={(e) => onChangeField("area", e.target.value)}
          className="flex items-center gap-4 justify-between h-max w-full outline-none focus:outline-none text-neutral-900 bg-transparent ring-transparent border border-neutral-300 transition-all duration-300 ease-in disabled:opacity-50 disabled:pointer-events-none data-[error=true]:border-error data-[success=true]:border-success select-none text-start data-[shape=pill]:rounded-full [&_data-slot=placeholder]:text-foreground/60 text-base rounded-lg py-2.5 px-3 ring-4 hover:border-neutral-800 hover:ring-neutral-800/10 focus:border-neutral-800 focus:ring-neutral-800/10 data-[open=true]:border-primary data-[open=true]:ring-primary/10"
        >
          <option value="" disabled>
            Escolha uma área de interesse
          </option>
          <option value="dev">Desenvolvimento</option>
          <option value="cib">Cibersegurança</option>
          <option value="ia">Inteligencia artificial</option>
          <option value="esc">Escritor</option>
          <option value="mkt">Marketing</option>
          <option value="des">Design</option>
        </select>
        {errors.area && (
          <span className="text-red-500 text-sm">{errors.area}</span>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full border font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:cursor-not-allowed data-[shape=pill]:rounded-full data-[width=full]:w-full text-md rounded-md py-3 px-4 bg-neutral-900 border-neutral-800 text-neutral-50 hover:bg-neutral-700 hover:border-neutral-700"
      >
        {isSubmitting ? "Enviando..." : "Cadastrar"}
      </button>

      {submitError && (
        <div className="text-red-600 text-sm font-medium mt-2">{submitError}</div>
      )}

      {successMessage && (
        <div className="text-green-600 text-sm font-medium mt-2">
          {successMessage}
        </div>
      )}
    </form>
  );
}