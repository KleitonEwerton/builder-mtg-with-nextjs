import React, { useState } from "react";

interface ManaCheckBoxProps {
  queryLetter: string;
  handleFunctionChance: (query: string) => void;
}

export default function ManaCheckBox({
  handleFunctionChance,
  queryLetter = "c",
}: ManaCheckBoxProps) {
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const colorsMap: { [key: string]: string } = {
    red: "R",
    blue: "U",
    green: "G",
    white: "W",
    black: "B",
  };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    color: string
  ) => {
    const isChecked = event.target.checked;

    const updatedColors = isChecked
      ? [...selectedColors, color]
      : selectedColors.filter((c) => c !== color);

    setSelectedColors(updatedColors);
    const query = `${queryLetter}:${updatedColors.join("")}`;
    handleFunctionChance(query);
  };

  const colorStyles: { [key: string]: string } = {
    red: "red-400",
    blue: "blue-400",
    green: "green-400",
    white: "yellow-100", // Alterado para yellow-100
    black: "purple-900", // Alterado para purple-900
  };

  // Substitua esses ícones pelo método real de carregar os ícones MTG (via SVG ou fonte)
  const colorIcons: { [key: string]: string } = {
    red: "🟥", // Placeholder
    blue: "🟦", // Placeholder
    green: "🟩", // Placeholder
    white: "⬜", // Placeholder
    black: "⬛", // Placeholder
  };

  return (
    <div className="relative flex flex-wrap justify-center items-center w-auto mx-auto select-none gap-10 p-8 rounded-xl">
      {Object.entries(colorsMap).map(([colorName, colorCode]) => (
        <label key={colorName} className="cursor-pointer">
          <input
            type="checkbox"
            className="opacity-0 overflow-hidden absolute whitespace-nowrap peer"
            onChange={(event) => handleCheckboxChange(event, colorCode)}
          />
          <span
            className={`peer-checked:border-${colorStyles[colorName]} peer-checked:shadow-${colorStyles[colorName]}/10 
            peer-checked:text-${colorStyles[colorName]} peer-checked:before:border-${colorStyles[colorName]} 
            peer-checked:before:bg-${colorStyles[colorName]} peer-checked:before:opacity-100 peer-checked:before:scale-100 
            flex flex-col items-center justify-center w-10 min-h-[2rem] rounded-lg shadow-lg 
            transition-all duration-200 cursor-pointer relative border-gray-700 border-[3px] bg-gray-800 
            hover:border-${colorStyles[colorName]} hover:before:scale-100 hover:before:opacity-100`}
          >
            <span className="transition-all duration-100">
              <p className="text-center">{colorIcons[colorName]}</p>
            </span>
          </span>
        </label>
      ))}
    </div>
  );
}
