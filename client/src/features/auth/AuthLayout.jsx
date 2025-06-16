import { ChevronLeft, X } from 'lucide-react';
import { useAuthLayoutStore } from '../../store/useAuthLayoutStore';

export const AuthLayout = ({ children }) => {
    const {title,subtitle} = useAuthLayoutStore()
    
  return (
    <>
      <div className="poppins grid w-full h-full min-[800px]:grid-cols-2 min-[800px]:h-screen">
        
        <section className="dark-bg light-txt p-4 grid gap-3 ">
          <div className="flex  justify-between">
            <ChevronLeft size={28} />
            <X size={28} />
          </div>

          <div className=''>
            <h1 className="font-semibold text-2xl lg:text-4xl">{title}</h1>
            <p className="muted-txt font-medium text-sm min-[800px]:text-md lg:text-lg">{subtitle}</p>
          </div>
        </section>
        <section className="p-4 flex flex-col min-[800px]:justify-center lg:p-10 xl:p-25">{children}</section>
      </div>
    </>
  );
};
