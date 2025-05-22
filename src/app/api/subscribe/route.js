import { db, admin } from "@/lib/firebaseAdmin";

function isValidName(name) {
  return typeof name === "string" && name.trim().length >= 2;
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function isValidArea(area) {
  const validAreas = ["dev", "mkt", "design"];
  return validAreas.includes(area);
}

// Função para formatar telefone em E.164 (exemplo simplificado)
function formatPhoneToE164(phone) {
  // Remove tudo que não for número ou +
  const cleaned = phone.replace(/[^\d+]/g, "");

  // Verifica se começa com + e contém de 10 a 15 dígitos (padrão E.164)
  const e164Pattern = /^\+\d{10,15}$/;
  if (e164Pattern.test(cleaned)) {
    return cleaned;
  }

  // Caso não comece com +, tenta adicionar código do Brasil +55 automaticamente (pode adaptar conforme necessidade)
  if (/^\d{10,15}$/.test(cleaned)) {
    return "+55" + cleaned;
  }

  return null; // formato inválido
}

export async function POST(request) {
  try {
    const { firstName, lastName, email, phone, area } = await request.json();

    // Validação aprimorada
    if (!isValidName(firstName)) {
      return new Response(JSON.stringify({ message: "Primeiro nome inválido." }), { status: 400 });
    }

    if (!isValidName(lastName)) {
      return new Response(JSON.stringify({ message: "Sobrenome inválido." }), { status: 400 });
    }

    if (!isValidEmail(email)) {
      return new Response(JSON.stringify({ message: "Email inválido." }), { status: 400 });
    }

    if (!isValidArea(area)) {
      return new Response(JSON.stringify({ message: "Área de atuação inválida." }), { status: 400 });
    }

    let formattedPhone = "";
    if (phone && phone.trim() !== "") {
      formattedPhone = formatPhoneToE164(phone);
      if (!formattedPhone) {
        return new Response(JSON.stringify({ message: "Telefone inválido." }), { status: 400 });
      }
    }

    // Verifica duplicidade de e-mail
    const existing = await db.collection("registrations").where("email", "==", email).limit(1).get();
    if (!existing.empty) {
      return new Response(JSON.stringify({ message: "E-mail já cadastrado." }), { status: 400 });
    }

    // Salva no Firestore
    await db.collection("registrations").add({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      phone: formattedPhone,
      area,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return new Response(JSON.stringify({ message: "Inscrição feita com sucesso." }), { status: 200 });
  } catch (error) {
    console.error("Erro no cadastro:", error);
    return new Response(JSON.stringify({ message: "Erro interno do servidor." }), { status: 500 });
  }
}