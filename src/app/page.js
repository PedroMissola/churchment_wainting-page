import { SpeedInsights } from "@vercel/speed-insights/next";

import Hero from "@/components/hero";
import Timing from "@/components/timer";
import NewsletterForm from "@/components/newsletterForm";
import Form from "@/components/form";

export default function Home() {
  return (
    <>
      <div className="relative w-full min-h-screen bg-[url('/Background.png')] bg-cover bg-center bg-no-repeat">
        <Timing targetDate={"2025-06-30T00:00:00"} />

        <main className="flex flex-col items-center justify-center w-full min-h-screen py-32 sm:py-48 gap-14 px-8">
          <Hero
            title="Uma nova forma de servir com excelência está chegando."
            description="Mais do que tecnologia, a Churchment é uma ferramenta criada para servir. Organize eventos, escale equipes e mantenha sua igreja conectada com eficiência e propósito."
          />
          <NewsletterForm />
        </main>

        <section
          aria-labelledby="sobre-churchment"
          className="px-8 py-16 bg-white flex flex-col md:flex-row gap-16"
        >
          <div className="w-full md:w-1/2 mx-auto space-y-3">
            <h2
              id="sobre-churchment"
              className="text-neutral-900 font-sans text-xl font-bold antialiased md:text-2xl lg:text-3xl"
            >
              O que é a Churchment?
            </h2>
            <p className="font-sans text-base antialiased md:text-lg text-neutral-600">
              O Churchment é uma plataforma digital criada para ajudar igrejas a
              se organizarem com mais eficiência. Nosso objetivo é oferecer uma
              solução simples e moderna para facilitar o dia a dia dos líderes,
              voluntários e ministérios.
            </p>
            <dl className="space-y-6">
              <div>
                <dt className="font-sans text-base antialiased md:text-lg font-semibold text-neutral-600">
                  Organização de eventos e escalas
                </dt>
                <dd className="font-sans text-base antialiased md:text-lg text-neutral-600">
                  Agende cultos, reuniões e programações especiais com
                  facilidade. Monte escalas de equipes e acompanhe tudo em um só
                  lugar, com notificações automáticas para não deixar nada
                  passar.
                </dd>
              </div>
              <div>
                <dt className="font-sans text-base antialiased md:text-lg font-semibold text-neutral-600">
                  Acompanhamento com propósito
                </dt>
                <dd className="font-sans text-base antialiased md:text-lg text-neutral-600">
                  Tenha acesso a relatórios de presença, participação e
                  envolvimento dos membros. Com isso, fica mais fácil cuidar das
                  pessoas e planejar com sabedoria.
                </dd>
              </div>
              <div>
                <dt className="font-sans text-base antialiased md:text-lg font-semibold text-neutral-600">
                  Comunicação mais eficiente
                </dt>
                <dd className="font-sans text-base antialiased md:text-lg text-neutral-600">
                  Centralize avisos, recados e informações importantes entre
                  líderes e voluntários. Evite ruídos e melhore a conexão entre
                  os ministérios.
                </dd>
              </div>
            </dl>
          </div>
          <div className="w-full md:w-1/2 mx-auto space-y-3">
            <h2
              id="sobre-churchment"
              className="text-neutral-900 text-center font-sans text-xl font-bold antialiased md:text-2xl lg:text-3xl"
            >
              Faça parte do projeto
            </h2>
            <p className="text-center font-sans text-base antialiased md:text-lg text-neutral-600">
              Tem interesse em contribuir? Preencha o formulário e vamos
              conversar.
            </p>
            <Form />
          </div>
        </section>
        <SpeedInsights />
      </div>
    </>
  );
}
