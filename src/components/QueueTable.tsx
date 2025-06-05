'use client';

import { Queue } from '@/types';
import { Trash } from 'lucide-react';
import React from 'react';
interface QueueTableProps {
  queues: Queue[];
  onUpdateQueue?: (id: number, updates: Partial<Queue>) => void;
  onRemoveQueue?:(id: number) => void;
}

export const QueueTable: React.FC<QueueTableProps> = ({ queues, onUpdateQueue,onRemoveQueue }) => {
const formatDate = (date?: string | Date): string => {
  if (!date) return '';

  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) return 'Data inválida';

  return dateObj.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

  const toggleStatus = async (queue: Queue) => {
    if (onUpdateQueue) {
      await onUpdateQueue(queue.id, { 
        status: !queue.status,
        verification_date: new Date()
      });
    }
  };

  const toggleRemove = async (id:number) =>{
    if(onRemoveQueue){
      await onRemoveQueue(id)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nome da Fila
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Instância
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Verificação
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Conexão
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Chats
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {queues.map((queue) => (
              <tr key={queue.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {queue.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {queue.queue_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                    {queue.instance}
                  </code>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    queue.status 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                      queue.status ? 'bg-green-400' : 'bg-red-400'
                    }`}></div>
                    {queue.status ? true : false}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(queue.verification_date)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(queue.connection_date)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-medium ${
                    (queue.waiting_chats || 0) > 10 
                      ? 'bg-red-100 text-red-800'
                      : (queue.waiting_chats || 0) > 5
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {queue.waiting_chats || 0}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex justify-around">
                  <button
                    onClick={() => toggleStatus(queue)}
                    disabled={queue.status} 
                    className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                      queue.status
                        ? 'bg-red-100 text-red-700' 
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    } ${queue.status ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {queue.status ? 'Desativar' : 'Ativar'}
                  </button>

                  <button onClick={() => toggleRemove(queue.id)}>
                    <Trash size={18}/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {queues.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p>Nenhuma fila encontrada com os filtros aplicados</p>
        </div>
      )}
    </div>
  );
};
