import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type ReturnType = {
   counter: number;
   setCounter: Dispatch<SetStateAction<number>>;
};

export const useCounter = (initial = 60): ReturnType => {
   const [counter, setCounter] = useState(initial);

   useEffect(() => {
      const timer =
         counter > 0 ? setInterval(() => setCounter(counter - 1), 1000) : 0;
      return () => clearInterval(timer);
   }, [counter]);

   return { counter, setCounter };
};
