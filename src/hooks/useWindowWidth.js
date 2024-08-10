import { useEffect, useState } from 'react';

export const useWindowWidth = () => {
  const [windowWith, setWindowWith] = useState(0);

  useEffect(() => {
    const getWindowWidth = () => setWindowWith(window?.innerWidth ?? 0);

    getWindowWidth();

    if (window) window.addEventListener('resize', getWindowWidth);

    return () => {
      window.removeEventListener('resize', getWindowWidth);
    };
  }, [window]);

  return windowWith;
};
