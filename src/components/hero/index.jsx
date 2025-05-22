export default function Hero({ title, description }) {
    return (
        <div className="flex flex-col gap-4 text-center w-[90%] sm:w-[75%] h-fit mx-auto px-0 sm:px-4">
            <h1 className="font-sans text-3xl font-bold antialiased md:text-4xl lg:text-5xl text-neutral-50">
                {title}
            </h1>
            <p className="font-sans text-base antialiased md:text-lg lg:text-xl text-neutral-300 w-full">
                {description}
            </p>
        </div>
    );
}
