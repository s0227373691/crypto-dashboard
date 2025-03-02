/** @format */
"use client";

import React from "react";
import { useBookContext } from "../contexts/book";

const SymbolCard = () => {
  const { book } = useBookContext();
  const bookData = book?.data[0];

  if (!bookData) return;

  const bookMaxBid = bookData.bids[0];

  console.log("book", book);
  return (
    <div className="p-1 w-1/3">
      <section className="w-full p-4 bg-white dark:bg-black">
        <h3 className="text-black dark:text-white font-semibold text-sm mb-3">
          Order book ({book.instrument_name})
        </h3>
        <div className="flex text-[#8E8E92] mb-2">
          <span className="w-[68px]">Price</span>
          <span className="flex-1 text-right">Size</span>
          <span className="flex-1 text-right">Total(USD)</span>
        </div>
        <ul className="mb-2">
          {bookData.asks.map(([price, size]: [number, number]) => {
            return (
              <li key={price} className="flex">
                <span className="text-red-600 w-[68px]">{price}</span>
                <span className="flex-1 text-right font-semibold text-black dark:text-white">
                  {size}
                </span>
                <span className="flex-1 text-right font-semibold text-black dark:text-white">
                  {Math.floor(price * size)}
                </span>
              </li>
            );
          })}
        </ul>
        <ul>
          {bookData.bids.map(([price, size]: [number, number]) => {
            return (
              <li key={price} className="flex">
                <span className="text-green-600 w-[68px]">{price}</span>
                <span className="flex-1 text-right font-semibold text-black dark:text-white">
                  {size}
                </span>
                <span className="flex-1 text-right font-semibold text-black dark:text-white">
                  {Math.floor(price * size)}
                </span>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
};

export default SymbolCard;
