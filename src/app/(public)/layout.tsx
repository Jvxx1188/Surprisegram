import {Toaster} from '@/components/ui/sonner'
export const metadata = {
  title: 'Authenticação | Surprisegram',
  description: 'Authenticação | Surprisegram',
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex justify-center items-center h-dvh bg-gradient-to-tr  from-cyan-900 to-blue-900">
        <main className="w-[700px] bg-white p-6 rounded-xl text-black">
          <p className="absolute left-[50%] translate-x-[-50%] top-[0.5%] font-bold text-white text-3xl font-italic">Surprisegram</p>
        {children}
        </main>
        <Toaster theme='light' className="bg-slate-600"/>
        </body>
    </html>
  )
}
