export default function Hero({ title, description }) {
    return (
        <div className="flex flex-col gap-4 text-center w-[90%] sm:w-[75%] h-fit mx-auto px-0 sm:px-4">
            <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-50">
                {title}
            </h1>
            <p className="text-base xs:text-lg sm:text-xl text-neutral-300 w-full">
                {description}
            </p>
        </div>
    );
}
