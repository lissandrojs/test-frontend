/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect, useState } from 'react';
import { Download, FileText, Table, Filter } from 'lucide-react';
import { downloadCSV, downloadXLSX } from '@/utils/export-utils';
import { useQueues } from '@/hooks/useQueues';
import { QueueTable } from './QueueTable';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';


const QueueList = () => {
  const [isExporting, setIsExporting] = useState(false);
  const router = useRouter();

 
  useEffect(() => {
    try {
      const storedData = sessionStorage.getItem('queueResults');
      if (!storedData) {
        router.push('/');
        return;
      }
    } catch (error) {
      console.error('Erro ao acessar sessionStorage:', error);
      router.push('/');
    } 
  }, []);
 
  const {
    queues,
    filter,
    setFilter,
    stats,
    updateQueue,
    manager,
    removeQueue
  } = useQueues();


  const handleExportCSV = async () => {
    setIsExporting(true);
    
    try {
      const csvContent = manager.generateCSV();
      const timestamp = new Date().toISOString().slice(0, 10);
      downloadCSV(csvContent, `filas_${timestamp}.csv`);
      
      toast.success('📊 CSV exportado com sucesso!', {
        position: "top-right",
        autoClose: 3000,
      });
      
    } catch (error) {
      console.error('Erro ao exportar CSV:', error);
      toast.error('❌ Erro ao exportar CSV', {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportXLSX = async () => {
    setIsExporting(true);
    
    try {
      const data = manager.prepareDataForExport();
      const timestamp = new Date().toISOString().slice(0, 10);
      await downloadXLSX(data, `filas_${timestamp}.xlsx`);
      
      toast.success('📈 XLSX exportado com sucesso!', {
        position: "top-right",
        autoClose: 3000,
      });
      
    } catch (error) {
      console.error('Erro ao exportar XLSX:', error);

      toast.error('❌ Erro ao exportar XLSX', {
        position: "top-right",
        autoClose: 7000,
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Table className="w-6 h-6 text-blue-600" />
              Sistema de Gestão de Filas
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleExportCSV}
              disabled={isExporting}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              {isExporting ? 'Exportando...' : 'Exportar Arquivo CSV'}
            </button>
            
            <button
              onClick={handleExportXLSX}
              disabled={isExporting}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              <FileText className="w-4 h-4" />
              {isExporting ? 'Exportando...' : 'Exportar Arquivo Excel'}
            </button>
          </div>
        </div>
      </div>
      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex items-center gap-4">
          <Filter className="w-5 h-5 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filtros:</span>
          
          <div className="flex gap-2">
            {[
              { key: 'all', label: 'Todas', count: stats.total },
              { key: 'active', label: 'Ativas', count: stats.active },
              { key: 'inactive', label: 'Inativas', count: stats.inactive }
            ].map(({ key, label, count }) => (
              <button
                key={key}
                onClick={() => setFilter(key as any)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  filter === key
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {label} ({count})
              </button>
            ))}
          </div>
        </div>
      </div>
      <QueueTable queues={queues} onUpdateQueue={updateQueue} onRemoveQueue={removeQueue}/>
    </div>
  );
}
export default QueueList;