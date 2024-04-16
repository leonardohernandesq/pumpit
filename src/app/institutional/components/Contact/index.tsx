import {Input, TextInput } from '@/components/Input'
import {Button} from '@/components/Button'
import Image from "next/image"

export function Contact() {
    
return (
    <section id="contact" className='flex items-center justify-center py-20 flex-col w-full'>
    <h1 className='font-racing text-5xl text-center mb-10   '>Fale Conosco</h1>

    <section className='flex lg:flex-row flex-col max-w-7xl w-11/12 shadow-lg rounded-[32px] bg-yellow-400 mx-8'>
        <div className='flex justify-center'>
            <Image alt='Homem levantando uma barra W ' src={'/contact-img.png'} width={600} height={400} className='rounded-[32px] m-10 lg:m-0'/>
        </div>
        <div className='flex-1 flex flex-col py-10 px-20 justify-center'>
            <Input placeholder='Nome'/>
            <Input placeholder='Email'/>
            <Input placeholder='Telefone'/>
            <TextInput rows={6} placeholder='Digite sua mensagem...' />

            <Button bg='bg-black' color='text-yellow-400'>Enviar</Button>
        </div>
    </section>
</section>
)
}
