"use client";

import React, { useState } from "react";

interface IManaCheckBox {
  color: string;
  text: string;
}

const colorsMap: { [key: string]: string } = {
  red: "red-400",
  blue: "blue-400",
  green: "green-400",
  white: "white",
  black: "gray-900",
  yellow: "yellow-400",
  gray: "gray-400",
};

export default function ManaCheckBox({ color, text }: IManaCheckBox) {
  const selectedColor = colorsMap[color]; // Mapeia a cor

  return (
    <label className="cursor-pointer">
      <input
        type="checkbox"
        className="h-[1px] opacity-0 overflow-hidden absolute whitespace-nowrap w-[1px] peer"
      />
      <span
        className={`peer-checked:border-${selectedColor}-400 peer-checked:shadow-${selectedColor}-400/10 
          peer-checked:text-${selectedColor}-400 peer-checked:before:border-${selectedColor}-400 
          peer-checked:before:bg-${selectedColor}-400 peer-checked:before:opacity-100 peer-checked:before:scale-100 
          flex flex-col items-center justify-center w-28 min-h-[7rem] rounded-lg shadow-lg 
          transition-all duration-200 cursor-pointer relative border-gray-700 border-[3px] bg-gray-800 
          hover:border-${selectedColor}-400 hover:before:scale-100 hover:before:opacity-100`}
      >
        <span className="transition-all duration-100">
          <p className="w-12 h-12 text-center">icon</p>
        </span>
        <span className="transition-all duration-300 text-center">{text}</span>
      </span>
    </label>
  );
}
