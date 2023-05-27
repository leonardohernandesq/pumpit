import {Input, TextInput } from '@/components/Input'
import {Button} from '@/components/Button'
import { Image } from '../../../../imports/imports'

export function Contact() {
    
return (
    <section id="contact" className='w-full flex items-center justify-center py-20 flex-col'>
    <h1 className='font-racing text-5xl text-center mb-10   '>Fale Conosco</h1>

    <section className='flex flex-row max-w-7xl w-full shadow-lg rounded-[32px] bg-yellow-400'>
        <div className=''>
            <Image alt='Homem levantando uma barra W ' src={'/contact-img.png'} width={600} height={400}/>
        </div>
        <div className='flex-1 flex flex-col py-10 px-20 justify-center'>
            <Input placeholder='Nome'/>
            <Input placeholder='Email'/>
            <Input placeholder='Telefone'/>
            <TextInput rows={6} placeholder='Digite sua mensagem...' />

            <Button textButton='Enviar' bg='bg-black' color='text-yellow-400' />
        </div>
    </section>
</section>
)
}
