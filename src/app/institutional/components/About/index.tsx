import { Image } from '../../../../imports/imports'

export function About() {
    return (
        <section id="about" className='py-20 flex flex-col items-center justify-center'>
            <h1 className='font-racing text-5xl text-center mb-14'>A Pump IT</h1>
            <section className='flex max-w-7xl w-11/12 flex-col items-center xl:flex-row'>
                <section className=' relative w-full xl:w-2/4'>
                    <div className='
                        w-[500px]
                        h-[500px]
                        flex
                        xl:after:block
                        xl:after:absolute
                        xl:after:bg-yellow-400
                        xl:after:ml-8
                        xl:after:z-20
                        xl:after:right-10
                        xl:after:top-16
                        xl:after:w-24
                        xl:after:h-10
                        xl:after:shadow-md
                        xl:after:mix-blend-hard-light
                        md:before:border-yellow-400
                        md:before:border-4
                        md:before:h-[480px]
                        md:before:w-[480px]
                        md:before:absolute
                        md:before:top-[-20px]
                    '>
                        <Image src={'/about.jpg'} alt='Academy Image' width={500} height={500} className='relative pl-5 pb-5'/>
                    </div>
                </section>
                <section className='w-full xl:w-2/4 flex flex-col justify-center'>
                    <p className="mb-4">Na Pump IT, acreditamos que todos podem alcançar seus objetivos de fitness com a orientação certa. Nossa empresa foi fundada com a missão de ajudar as pessoas a elevar seus treinos de musculação, oferecendo uma plataforma inovadora e fácil de usar para a gestão de treinos.</p>
                    <p className="mb-4">Combinamos nosso conhecimento em tecnologia e fitness para criar uma ferramenta que permite que nossos clientes definam e alcancem seus objetivos de forma eficiente. Nossa plataforma oferece recursos como rastreamento de progresso, planos de treino personalizados, gerenciamento de nutrição e muito mais.</p>
                    <p className="mb-4">Estamos comprometidos em fornecer a melhor experiência possível para nossos usuários. Por isso, trabalhamos constantemente para aprimorar nossos recursos e garantir que a Pump IT esteja sempre atualizada com as últimas tendências do mercado.</p>
                    <p className="mb-4">Se você deseja transformar seu corpo e elevar seu treino, junte-se à Pump IT e descubra como podemos ajudá-lo a alcançar seus objetivos.</p>
                </section>
            </section>
        </section>
    )
}
