export default function Navbar({ hideButtons = false }) {
    return (
        <nav className="flex flex-col sm:flex-row justify-between mx-4 sm:mx-[72px] items-center py-4 gap-4 sm:gap-0">
            <h2 className="text-neutral-50 text-xl font-semibold">Churchment</h2>

            <div className="links flex gap-4 flex-wrap justify-center">
                <a className="text-neutral-50" href="#">Início</a>
                <a className="text-neutral-50" href="#">Colabore</a>
                <a className="text-neutral-50" href="#">Contato</a>
            </div>

            {!hideButtons && (
                <div className="button flex gap-2 flex-wrap justify-center">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded">Login</button>
                    <button className="px-4 py-2 bg-gray-200 text-black rounded">Register</button>
                </div>
            )}
        </nav>
    );
}
