import HeaderComponent from '@/components/Headers';
import QueueList from '@/components/QueueList';
 
const Queue = () => {
  return (
      <main className="min-h-screen flex flex-col">
        <HeaderComponent />      
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full --container-7xl px-4 py-8">
            <QueueList />
          </div>
        </div>
      </main>
  );
}
export default Queue; 