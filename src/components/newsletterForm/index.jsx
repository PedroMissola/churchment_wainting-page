"use client";

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validação do e-mail
    if (!validateEmail(email)) {
      inputRef.current.dataset.error = "true";
      inputRef.current.dataset.success = "false";
      setMessage("Por favor, insira um e-mail válido.");
      setTimeout(() => {
        inputRef.current.dataset.error = "false";
        setMessage("");
      }, 5000);
      return;
    }

    setMessage("Enviando...");

    const response = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (response.ok) {
      inputRef.current.dataset.success = "true";
      inputRef.current.dataset.error = "false";
      setMessage("Inscrição realizada com sucesso!");
      setEmail(""); // limpa o campo
    } else {
      inputRef.current.dataset.success = "false";
      inputRef.current.dataset.error = "true";
      setMessage(data.message || "Erro ao enviar inscrição.");
    }

    // Remover feedback visual após 5 segundos
    setTimeout(() => {
      inputRef.current.dataset.error = "false";
      inputRef.current.dataset.success = "false";
      setMessage("");
    }, 2000);
  };

  return (
    <div className="flex flex-col justify-center items-center text-center gap-4 px-4">
      <h3 className="text-neutral-50 text-lg font-medium md:text-xl lg:text-2xl">
        Receba as novidades em primeira mão
      </h3>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row min-w-full sm:w-auto gap-4"
      >
        <div className="relative w-full">
          <input
            className="w-full aria-disabled:cursor-not-allowed outline-none focus:outline-none text-neutral-100 placeholder:text-neutral-200/60 bg-transparent ring-transparent border border-neutral-400 transition-all duration-300 ease-in disabled:opacity-50 disabled:pointer-events-none data-[error=true]:border-red-500 data-[success=true]:border-green-500 data-[shape=pill]:rounded-full text-base rounded-lg py-3 px-3 ring-4 data-[icon-placement=start]:ps-11 data-[icon-placement=end]:pe-11 hover:border-neutral-700 hover:ring-neutral-700/10 focus:border-neutral-700 focus:ring-neutral-700/10 peer"
            placeholder="E-mail"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-gradient-to-tr from-[#F4511E] to-[#FF7043] text-neutral-50 rounded-md py-2 px-8 text-sm hover:brightness-105"
        >
          Participar
        </button>
      </form>
      {message && <p className="text-white">{message}</p>}
    </div>
  );
}
