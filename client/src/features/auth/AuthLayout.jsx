import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuthLayoutStore } from '../../store/authLayoutStore';

export const AuthLayout = ({ children }) => {
  const location = useLocation();
  const { setMetaData, title, description } = useAuthLayoutStore();

  useEffect(() => {
    setMetaData(location.pathname);
  }, []);

  return (
    <>
      <div className="grid w-full h-full min-[800px]:grid-cols-2 min-[800px]:h-screen">
        <section className="dark-bg p-4 pt-16">
          <h1 className="poppins text-white font-bold text-xl min-[1000px]:text-3xl">
            {title}
          </h1>
          <p className="inter muted-txt text-sm font-medium min-[1000px]:text-md">
            {description}
          </p>
        </section>

        <section className="px-4 flex flex-col justify-center pt-2 min-[800px]:p-8 min-[1000px]:p-16">
          {children}
        </section>
      </div>
    </>
  );
};
