
import { useState, useEffect } from 'react';

export const useTime = (locale: string = 'pt-BR') => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return {
    time: time.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' }),
    date: time.toLocaleDateString(locale, { day: '2-digit', month: '2-digit', year: 'numeric' }),
  };
};
