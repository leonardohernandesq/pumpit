import { MdKeyboardDoubleArrowDown } from 'react-icons/md'
import { Image } from '../../../../imports/imports'

export function BecauseUse() {
    return (
        <section className='bg-yellow-400 w-full flex items-center justify-center py-20 flex-col'>
            <h1 className='font-racing text-5xl text-center'>Por que acessar?</h1>
            <MdKeyboardDoubleArrowDown size={30} color='#000' className='animate-bounce my-4'/>

            <section className='flex flex-row max-w-7xl w-11/12 gap-10 justify-between'>
                <div className='w-2/3 flex items-center justify-center flex-col pr-14'>
                    <h2 className='text-3xl font-bold opacity-1 mb-12'>1º Acompanhe seu progresso: a Pump IT oferece ferramentas de acompanhamento de progresso para ajudá-lo a manter o controle do seu progresso e visualizar suas conquistas.</h2>
                    <h2 className='text-3xl font-bold opacity-20 mb-12'>2º Gerencie sua nutrição: além de treinos, a Pump IT também oferece recursos para ajudá-lo a gerenciar sua nutrição e maximizar seus resultados.</h2>
                    <h2 className='text-3xl font-bold opacity-20 mb-12'>3º Experimente gratuitamente: a Pump IT oferece uma avaliação gratuita para que você possa experimentar a plataforma e descobrir como ela pode ajudá-lo a elevar seu treino de musculação.</h2>
                    <h2 className='text-3xl font-bold opacity-20 mb-12'>4º Personalização e flexibilidade: A Pump IT permite que você personalize seus treinos de acordo com suas preferências, nível de condicionamento físico e objetivos específicos. companhamento de progresso para ajudá-lo a manter o controle do seu progresso e visualizar suas conquistas.</h2>            
                </div>
                <div className='w-1/3 flex flex-col items-center'>
                    <Image alt='Amostra do site no Desktop' src={"/mockup1.png"} width={400} height={400}/>
                    <Image alt='Amostra do site no Mobile' src={"/mockup2.png"} width={250} height={200} className='mt-24 opacity-20'/>
                </div>
            </section>
        </section>
    )
}
