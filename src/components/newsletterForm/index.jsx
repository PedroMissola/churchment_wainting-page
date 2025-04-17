'use client';

import { useState } from 'react';

export default function NewsletterForm() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage("Enviando...");

        const response = await fetch("/api/subscribe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (response.ok) {
            setMessage("Inscrição realizada com sucesso!");
            setTimeout(() => {
                setMessage(""); // Apaga depois de 5 segundos
            }, 5000);
        } else {
            setMessage(data.message || "Erro ao enviar inscrição.");
            setTimeout(() => {
                setMessage(""); // Apaga depois de 5 segundos
            }, 5000);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center text-center gap-4 px-4">
            <h3 className="text-base sm:text-2xl font-medium text-neutral-50">
                Receba as novidades em primeira mão
            </h3>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row w-full sm:w-auto gap-4">
                <input
                    className="text-shadow-sm text-sm sm:text-lg py-2 px-3 w-full sm:w-[385px] border-2 border-neutral-400 rounded-md text-neutral-50 bg-transparent"
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="text-sm sm:text-base text-neutral-50 bg-gradient-to-r from-[#F4511E] to-[#FF7043] rounded-md py-2 px-4 sm:py-1 sm:px-2"
                >
                    Quero Receber
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}
