'use client'

import { searchQueues } from "@/services/api";
import React, { useState } from "react"
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Globe, Key } from "lucide-react";

const FormSearchQueueComponent = () => {
  const [url, setUrl] = useState<string>('');
  const [apiKey, setApiKey] = useState<string>('');
  const [isLoading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      toast.success('📊 Consultando...', {
        position: "top-right",
        autoClose: 3000,
      });

      const queueData = await searchQueues({ url, apiKey });

      if (queueData && (Array.isArray(queueData) ? queueData.length > 0 : Object.keys(queueData).length > 0)) {
        sessionStorage.setItem('queueResults', JSON.stringify(queueData));
        router.push(`/queue`);
      } else {
        toast.info('ℹ️ Nenhuma fila encontrada', {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.error('Erro na consulta:', error);
      toast.error('❌ Erro na consulta', {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="flex items-center gap-2 text-2xl font-bold text-navy mb-4">
        Consultar Filas
      </h2>
      <form onSubmit={handleSubmit}>
        {/* URL Input */}
        <div className="mb-4">
          <label htmlFor="url" className="block text-gray-700 font-medium mb-2">
            URL da API
          </label>
          <div className="relative">
            <Globe className="absolute left-3 top-2.5 text-gray-400" size={20} />
            <input
              type="text"
              id="url"
              className="w-full pl-10 pr-3 py-2 border text-gray-500 border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://api.exemplo.com/filas"
              value={url}
              onChange={(e) => {
                const inputUrl = e.target.value.replace(/\/+$/, '');
                setUrl(inputUrl);
              }}
              required
            />
          </div>
        </div>

        {/* API Key Input */}
        <div className="mb-4">
          <label htmlFor="apiKey" className="block text-gray-700 font-medium mb-2">
            API Key
          </label>
          <div className="relative">
            <Key className="absolute left-3 top-2.5 text-gray-400" size={20} />
            <input
              type="text"
              id="apiKey"
              className="w-full pl-10 pr-3 py-2 border text-gray-500 border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Sua chave de API"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-navy text-white p-4 shadow-md-600 py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? 'Consultando...' : 'Consultar Filas'}
        </button>
      </form>
    </div>
  );
}

export default FormSearchQueueComponent;