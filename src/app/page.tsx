import HeaderComponent from '@/components/Headers';
import FormSearchQueueComponent from '@/components/FormSearchQueues';
 
const Home = () => {
  return (
      <main className="min-h-screen flex flex-col">
        <HeaderComponent />      
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md px-4 py-8">
            <FormSearchQueueComponent />
          </div>
        </div>
      </main>
  );
}
export default Home; 