
export function Banner() {
    return (
        <div id="top" className="h-screen w-screen flex justify-center bg-[url('/banner.jpg')] bg-no-repeat bg-cover bg-center -mt-36 lg:-mt-20">
            <section className="flex flex-row justify-between items-center py-2 max-w-7xl w-11/12 ">
                <h1 className="text-6xl font-bold w-96 font-racing">
                    Desafie seus limites com a 
                    <span> Pump IT</span>
                </h1>
            </section>
        </div>
    )
}