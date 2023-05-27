import { Image, Link } from "../../../../imports/imports"

export function HeaderHome() {
    return (
        <header className="max-w-7xl w-11/12 z-10">
            <section className="flex flex-row justify-between items-center py-2">
                <Link href={"/"}>
                    <Image alt='Logo da Pump IT - Eleve seu treino' src={"/logo-black.png"} width={183} height={60}/>
                </Link>

                <nav>
                    <ul className="flex flex-row">
                        <li className="ml-4"><Link className="transition-all duration-1000 hover:text-gray-600 uppercase" href={"/"}>Home</Link></li>
                        <li className="ml-4"><Link className="transition-all duration-1000 hover:text-gray-600 uppercase" href={"#about"}>A PumpIT</Link></li>
                        <li className="ml-4"><Link className="transition-all duration-1000 hover:text-gray-600 uppercase" href={"#contact"}>Contato</Link></li>
                        <li className="ml-4"><Link className="transition-all duration-1000 hover:text-gray-600 uppercase" href={"/signin"}>Acessar</Link></li>
                        <li className="ml-4">
                            <Link className="bg-black text-yellow-500 px-4 py-2 transition-all duration-1000 hover:text-black hover:bg-yellow-500 uppercase" href={"/signup"}>
                                Cadastrar
                            </Link>
                        </li>
                    </ul>
                </nav>
            </section>
        </header>
    )
}