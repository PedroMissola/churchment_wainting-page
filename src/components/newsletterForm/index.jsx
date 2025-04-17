export default function NewsletterForm() {
    return (
        <div className="flex flex-col justify-center items-center text-center gap-4 px-4">
            <h3 className="text-base sm:text-2xl font-medium text-neutral-50">
                Receba as novidades em primeira mão
            </h3>
            <form method="post" autocomplete="on" className="flex flex-col sm:flex-row w-full sm:w-auto gap-4">
                <input
                    className="text-shadow-sm text-sm sm:text-lg py-2 px-3 w-full sm:w-[385px] border-2 border-neutral-400 rounded-md text-neutral-50 bg-transparent"
                    type="text"
                    placeholder="E-mail"
                />
                <button
                    type="submit"
                    className="text-sm sm:text-base text-neutral-50 bg-gradient-to-r from-[#F4511E] to-[#FF7043] rounded-md py-2 px-4 sm:py-1 sm:px-2"
                >
                    Quero Receber
                </button>
            </form>
        </div>
    );
}
