import { Image } from '../../../../imports/imports'

export function About() {
    return (
        <section id="about" className='py-20 flex flex-col items-center justify-center'>
            <h1 className='font-racing text-5xl text-center mb-14'>A Pump IT</h1>
            <section className='flex flex-row max-w-7xl w-11/12'>
                <section className='w-2/4 relative'>
                    <div className='
                    w-[500px]
                    h-[500px]
                    flex
                    items-center
                    after:block
                    after:absolute
                    after:bg-yellow-400
                    after:ml-8
                    after:z-20
                    after:right-10
                    after:top-16
                    after:w-24
                    after:h-10
                    after:shadow-md
                    after:mix-blend-hard-light
                    before:border-yellow-400
                    before:border-4
                    before:h-[480px]
                    before:w-[480px]
                    before:absolute
                    before:top-[-20px]
                    '>
                        <Image src={'/about.jpg'} alt='Academy Image' width={500} height={500} className='relative pl-5 pb-5'/>
                    </div>
                </section>
                <section className='w-2/4 flex flex-col justify-center'>
                    <p className="mb-4">Na Pump IT, acreditamos que todos podem alcançar seus objetivos de fitness com a orientação certa. Nossa empresa foi fundada com a missão de ajudar as pessoas a elevar seus treinos de musculação, oferecendo uma plataforma inovadora e fácil de usar para a gestão de treinos.</p>
                    <p className="mb-4">Combinamos nosso conhecimento em tecnologia e fitness para criar uma ferramenta que permite que nossos clientes definam e alcancem seus objetivos de forma eficiente. Nossa plataforma oferece recursos como rastreamento de progresso, planos de treino personalizados, gerenciamento de nutrição e muito mais.</p>
                    <p className="mb-4">Estamos comprometidos em fornecer a melhor experiência possível para nossos usuários. Por isso, trabalhamos constantemente para aprimorar nossos recursos e garantir que a Pump IT esteja sempre atualizada com as últimas tendências do mercado.</p>
                    <p className="mb-4">Se você deseja transformar seu corpo e elevar seu treino, junte-se à Pump IT e descubra como podemos ajudá-lo a alcançar seus objetivos.</p>
                </section>
            </section>
        </section>
    )
}
