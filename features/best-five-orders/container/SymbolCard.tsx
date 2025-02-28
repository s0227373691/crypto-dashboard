/** @format */

'use client';
import {useCryptoComSocket} from '@/hooks/useSocket';
import React, {FC} from 'react';
import {BookProvider} from '../contexts/book';
import SymbolCard from '../ui/SymbolCard';

interface SymbolCardContainerProps {
  symbol: string;
}

const SymbolCardContainer: FC<SymbolCardContainerProps> = ({symbol}) => {
  const socket = useCryptoComSocket();

  return (
    <BookProvider value={{socket, symbol}}>
      <SymbolCard />
    </BookProvider>
  );
};

export default SymbolCardContainer;
