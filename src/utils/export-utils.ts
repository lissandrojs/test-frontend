/* eslint-disable @typescript-eslint/no-explicit-any */
export const downloadCSV = (csvContent: string, filename: string = 'filas_export.csv') => {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const downloadXLSX = async (data: any[][], filename: string = 'filas_export.xlsx') => {
  
  try {
    const XLSX = await import('xlsx');
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Filas');
    
    ws['!cols'] = [
      { wch: 8 },   // ID
      { wch: 25 },  // Nome da Fila
      { wch: 15 },  // Instância
      { wch: 10 },  // Status
      { wch: 20 },  // Data de Verificação
      { wch: 20 },  // Data de Conexão
      { wch: 15 }   // Chats Aguardando
    ];
    
    XLSX.writeFile(wb, filename);
  } catch (error) {
    console.error('Erro ao exportar XLSX:', error);
  }
};
