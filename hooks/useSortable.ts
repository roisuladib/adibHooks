import { useCallback, useMemo, useState } from 'react';

export type Direction = 'ascending' | 'descending';

type Config = {
   key: string;
   direction: Direction;
};
type ReturnType<T> = {
   items: T[];
   requestSort: (key: string) => void;
   classNameFor: (key: string) => Direction | '';
};

export const useSortable = <T>(
   items: T[],
   config: Config | null = null
): ReturnType<T> => {
   const [sortConfig, setSortConfig] = useState<Config>(config!);

   const sortedItems = useMemo(() => {
      let sortableItems = [...items];
      if (sortConfig !== null) {
         sortableItems.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
               return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
               return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
         });
      }
      return sortableItems;
   }, [items, sortConfig]);

   const requestSort = useCallback(
      (key: string) => {
         let direction: Direction = 'ascending';
         if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === 'ascending'
         ) {
            direction = 'descending';
         }
         setSortConfig({ key, direction });
      },
      [sortConfig]
   );

   const classNameFor = useCallback(
      (key: string) => {
         if (!sortConfig) {
            return '';
         }
         return sortConfig.key === key ? sortConfig.direction : '';
      },
      [sortConfig]
   );

   return { items: sortedItems, requestSort, classNameFor };
};
