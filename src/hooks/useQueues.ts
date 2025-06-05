import { useState, useEffect, useMemo } from 'react';
import { QueueManager } from '../lib/queue-manager';
import { Queue } from '@/types';
import { connectQueueRequest, getQueue, removeQueueRequest } from '@/services/api';

export const useQueues = () => {
  const [queues, setQueues] = useState<Queue[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedData = sessionStorage.getItem('queueResults');
        const parsed = storedData ? JSON.parse(storedData) : [];
        setQueues(parsed);
      } catch (error) {
        console.error('Erro ao fazer parse do sessionStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('queueResults', JSON.stringify(queues));
    }
  }, [queues]);

  const manager = useMemo(() => new QueueManager(queues), [queues]);

  const filteredQueues = useMemo(() => {
    switch (filter) {
      case 'active':
        return manager.getActiveQueues();
      case 'inactive':
        return manager.getInactiveQueues();
      default:
        return manager.getAllQueues();
    }
  }, [manager, filter]);

  const stats = manager.getStats();

  const addQueues = (newQueues: Queue[]) => {
    setQueues(prev => [...prev, ...newQueues]);
  };

  const updateQueue = async (id: number, updates: Partial<Queue>) => {
    setQueues(prev =>
      prev.map(queue =>
        queue.id === id ? { ...queue, ...updates } : queue
      )
    );
    await connectQueueRequest(id,updates)
    await getQueue()
  };

  const removeQueue = async (id: number) => {
    setQueues(prev => prev.filter(queue => queue.id !== id));
    await removeQueueRequest(id);
    await getQueue()
  };

  return {
    queues: filteredQueues,
    allQueues: queues,
    filter,
    setFilter,
    stats,
    addQueues,
    updateQueue,
    removeQueue,
    manager
  };
};
