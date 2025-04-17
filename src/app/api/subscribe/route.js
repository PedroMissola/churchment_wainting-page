import { db, admin } from "@/lib/firebaseAdmin";

export async function POST(request) {
    try {
        const { email } = await request.json();

        if (!email) {
            return new Response(JSON.stringify({ message: "E-mail é obrigatório." }), { status: 400 });
        }

        // 1. Salva o e-mail no Firestore
        await db.collection("subscribers").add({
            email,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        // 2. Prepara o conteúdo do e-mail
        const htmlContent = `
      <h2>Você está na lista!</h2>
      <p>Olá!</p>
      <p>Obrigado por se inscrever na newsletter da Churchment.</p>
      <p>Em breve, você receberá novidades e recursos incríveis!</p>
    `;

        // 3. Envia o e-mail pela API do Brevo
        await fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
                "api-key": process.env.BREVO_API_KEY,
            },
            body: JSON.stringify({
                sender: { name: "Churchment", email: "no-reply@churchment.com" },
                to: [{ email }],
                subject: "Bem-vindo à newsletter da Churchment",
                htmlContent,
            }),
        });

        //MI_MARTINS2003@HOTMAIL.COM

        return new Response(JSON.stringify({ message: "Inscrição realizada e e-mail enviado!" }), { status: 200 });

    } catch (error) {
        console.error("Erro ao salvar ou enviar e-mail:", error);
        return new Response(JSON.stringify({ message: "Erro ao salvar inscrição ou enviar e-mail." }), { status: 500 });
    }
}
