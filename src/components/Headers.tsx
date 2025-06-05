'use client'

import { LogOut } from "lucide-react";
import Image from "next/image"
import { useRouter , usePathname} from 'next/navigation';

const HeaderComponent = () =>{
    const router = useRouter()
    const pathname = usePathname()

    const exitSession = async () => {
        router.push('/')
    }

    return (
        <header className="bg-navy text-white p-4 shadow-md flex items-center">
            <div className="container mx-auto">
                <Image
                    className="white:invert"
                    src="/vercel.svg"
                    alt="Next.js logo"
                    width={180}
                    height={38}
                    priority
                    />
                <h1 className="text-2xl-black font-bold">
                    Sistema de Monitoramento de Filas
                </h1>
            </div>
            {pathname === '/queue' && 
            <div>
                <button
                    onClick={exitSession}
                    title="Iniciar nova consulta"
                    className="flex items-center gap-2 px-2 py-2 border border-white text-white rounded"
                >
                    Nova consulta
                    <LogOut size={20} />
                </button>
            </div>
            }
        </header>
    )
}

export default HeaderComponent