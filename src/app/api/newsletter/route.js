import { db, admin } from "@/lib/firebaseAdmin";

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return new Response(
        JSON.stringify({ message: "E-mail é obrigatório." }),
        { status: 400 }
      );
    }

    // 🔍 Verifica se o e-mail já está cadastrado
    const existing = await db
      .collection("subscribers")
      .where("email", "==", email)
      .limit(1)
      .get();

    if (!existing.empty) {
      return new Response(
        JSON.stringify({ message: "Este e-mail já está inscrito." }),
        { status: 400 }
      );
    }

    await db.collection("subscribers").add({
      email,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return new Response(
      JSON.stringify({ message: "Inscrição realizada com sucesso!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("🔥 ERRO AO SALVAR:", error);
    return new Response(
      JSON.stringify({ message: "Erro ao salvar inscrição." }),
      { status: 500 }
    );
  }
}
