
import './globals.css'
import AuthProvider from "@/contexts/auth";

export const metadata = {
  title: 'PumpIT - Eleve seu treino para o próximo nível!',
  description: 'Site para efetuar a gestão do seu treino e dieta de forma eficiente',
}

export default function RootLayout({
  
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
    <AuthProvider>
      <html lang="pt-BR" className='scroll-smooth'>
          <body className='overflow-x-hidden flex items-center flex-col bg-gray-100'>{children}</body>
      </html>
    </AuthProvider>
  )
}