/** @format */

import React from 'react';
import SymbolCard from './container/SymbolCard';

const BestFiveOrdersPage = () => {
  const symbols = [
    'BTCUSD-PERP',
    'ETHUSD-PERP',
    'XRPUSD-PERP',
    'SOLUSD-PERP',
    'DOGEUSD-PERP',
    'ADAUSD-PERP',
  ];
  return (
    <ul className='flex flex-1 flex-wrap gap-3 p-10'>
      {symbols.map((symbol) => (
        <SymbolCard key={symbol} symbol={symbol} />
      ))}
    </ul>
  );
};

export default BestFiveOrdersPage;
