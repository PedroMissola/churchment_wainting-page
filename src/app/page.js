import Timing from "@/components/timer";
import Hero from "@/components/hero";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from "@vercel/analytics/react";
import NewsletterForm from "@/components/newsletterForm";


export default function Home() {
    return (
        <div className="bg-center bg-[url(../../public/Background.png)] w-full bg-no-repeat bg-cover">
            <Timing targetDate={"2025-06-30T00:00:00"} />

            <main className="flex flex-col w-full min-h-screen justify-center items-center py-32 sm:py-48 gap-14 px-8">
                <Hero
                    title="Uma nova forma de servir com excelência está chegando."
                    description="Mais do que tecnologia, a Churchment é uma ferramenta criada para servir. Organize eventos, escale equipes e mantenha sua igreja conectada com eficiência e propósito."
                />

                <NewsletterForm />
            </main>
            <SpeedInsights />
            <Analytics />
        </div>
)
}