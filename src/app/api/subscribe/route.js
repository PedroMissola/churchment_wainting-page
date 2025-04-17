// app/api/subscribe/route.js

import { db, FieldValue } from "@/lib/firebaseAdmin";

export async function POST(request) {
    try {
        const { email } = await request.json();

        if (!email) {
            return new Response(JSON.stringify({ message: "E-mail é obrigatório." }), { status: 400 });
        }

        await db.collection("subscribers").add({
            email,
            createdAt: FieldValue.serverTimestamp()
        });

        return new Response(JSON.stringify({ message: "Inscrição realizada com sucesso!" }), { status: 200 });
    } catch (error) {
        console.error("Erro ao salvar no Firestore:", error);
        return new Response(JSON.stringify({ message: "Erro ao salvar inscrição." }), { status: 500 });
    }
}
