/** @format */
'use client';

import React from 'react';
import {useBookContext} from '../contexts/book';

const SymbolCard = () => {
  const {book} = useBookContext();
  const bookData = book?.data[0];

  if (!bookData) return;
  return (
    <section className='w-1/3 p-4 rounded-xl border border-white bg-neutral-700'>
      <h3 className=''>{book.instrument_name}</h3>
      <ul>
        {bookData.bids.map(
          ([price, size, orders]: [string, string, string]) => {
            return (
              <li key={price} className='text-green-600 flex gap-3 '>
                <span>{price}</span>
                <span>{size}</span>
              </li>
            );
          }
        )}
      </ul>
      <hr />
      <ul>
        {bookData.asks.map(
          ([price, size, orders]: [string, string, string]) => {
            return (
              <li key={price} className='text-red-600 flex gap-3'>
                <span>{price}</span>
                <span>{size}</span>
              </li>
            );
          }
        )}
      </ul>
    </section>
  );
};

export default SymbolCard;
