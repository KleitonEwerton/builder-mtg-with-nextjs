import React from "react";

interface IManaCheckBox {
  color: string;
  text: string;
}

// Mapeamento para cores válidas
const colorsMap: { [key: string]: string } = {
  red: "red-400",
  blue: "blue-400",
  green: "green-400",
  white: "white",
  black: "gray-900", // Usando gray-900 no lugar de black
  yellow: "yellow-400",
  gray: "gray-400", // Cor padrão para fallback
};

export default function ManaCheckBox({ color, text }: IManaCheckBox) {
  // Garante que a cor seja válida ou usa 'gray' como padrão
  const selectedColor = colorsMap[color] || colorsMap["gray"];

  // Ajusta a sombra para todas as cores
  const shadowClass =
    selectedColor === "gray-900" ? "shadow-gray-900" : `shadow-${selectedColor}/10`;

  return (
    <label className="text-gray-500 cursor-pointer">
      <input
        type="checkbox"
        className="h-[1px] opacity-0 overflow-hidden absolute whitespace-nowrap w-[1px] peer"
      />
      <span
        className={`flex peer-checked:border-${selectedColor} peer-checked:text-${selectedColor} ${shadowClass} flex-col items-center justify-center w-20 min-h-[2rem] rounded-lg shadow-lg 
                transition-all duration-200 cursor-pointer relative border-gray-700 
                border-[3px] bg-gray-800 hover:border-${selectedColor}`}
      >
        <span className="transition-all duration-100">
          <p className="w-12 h-12 text-center">icon</p>
        </span>
        <span className="transition-all duration-300 text-center">{text}</span>
      </span>
    </label>
  );
}
