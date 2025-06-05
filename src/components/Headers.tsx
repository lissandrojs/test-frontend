'use client'

import { LogOut } from "lucide-react";
import Image from "next/image"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

const HeaderComponent = () =>{
    const router = useRouter()
    const [storedData, setStoredData] = useState<string | null>('');

    useEffect(() => {
        const data = sessionStorage.getItem('queueResults');
        console.log(data?.length)
        setStoredData(data);
    }, []);

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
            {storedData && storedData.length > 2 && 
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