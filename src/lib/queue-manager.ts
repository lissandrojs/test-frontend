/* eslint-disable @typescript-eslint/no-explicit-any */
import { Queue } from "@/types";

export class QueueManager {
  private queues: Queue[] = [];

  constructor(initialQueues?: Queue[]) {
    if (initialQueues) {
      this.queues = initialQueues;
    }
  }

  addQueues(newQueues: Queue[]): void {
    this.queues.push(...newQueues);
  }

  getAllQueues(): Queue[] {
    return this.queues;
  }

  getActiveQueues(): Queue[] {
    return this.queues.filter(queue => queue.status === true);
  }

  getInactiveQueues(): Queue[] {
    return this.queues.filter(queue => queue.status === false);
  }

  prepareDataForExport(): any[][] {
    const headers = [
      'ID',
      'Nome da Fila',
      'Instância',
      'Status',
      'Data de Verificação',
      'Data de Conexão',
      'Chats Aguardando'
    ];

    const data = this.queues.map(queue => [
      queue.id,
      queue.queue_name,
      queue.instance,
      queue.status ? 'Ativa' : 'Inativa',
      queue.verification_date?.toLocaleString('pt-BR') || '',
      queue.connection_date?.toLocaleString('pt-BR') || '',
      queue.waiting_chats || 0
    ]);

    return [headers, ...data];
  }

  generateCSV(): string {
    const data = this.prepareDataForExport();
    
    const csvContent = data.map(row => 
      row.map(cell => {
        const cellStr = String(cell);
        if (cellStr.includes(',') || cellStr.includes('"') || cellStr.includes('\n')) {
          return `"${cellStr.replace(/"/g, '""')}"`;
        }
        return cellStr;
      }).join(',')
    ).join('\n');

    return '\uFEFF' + csvContent;
  }

  getStats() {
    const total = this.queues.length;
    const active = this.getActiveQueues().length;
    const inactive = this.getInactiveQueues().length;
    const totalWaitingChats = this.queues.reduce((sum, queue) => sum + (queue.waiting_chats || 0), 0);
    const avgWaitingChats = active > 0 ? totalWaitingChats / active : 0;

    return {
      total,
      active,
      inactive,
      totalWaitingChats,
      avgWaitingChats: Math.round(avgWaitingChats * 10) / 10,
      activePercentage: total > 0 ? Math.round((active / total) * 100 * 10) / 10 : 0,
      inactivePercentage: total > 0 ? Math.round((inactive / total) * 100 * 10) / 10 : 0
    };
  }
}