import React, { useState } from "react";

interface ManaCheckBoxProps {
  handleFunctionChance: (query: string) => void;
}

export default function ManaCheckBox({
  handleFunctionChance,
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
    const query = `${updatedColors.join("")}`;
    handleFunctionChance(query);
  };

  const colorStyles: { [key: string]: string } = {
    red: "border-red-400 hover:border-red-500",
    blue: "border-blue-400 hover:border-blue-500",
    green: "border-green-400 hover:border-green-500",
    white: "border-yellow-100 hover:border-yellow-200",
    black: "border-purple-900 hover:border-purple-800",
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
      {Object.entries(colorsMap).map(([colorName, colorCode]) => {
        const isChecked = selectedColors.includes(colorCode);
        return (
          <label key={colorName} className="cursor-pointer">
            <input
              type="checkbox"
              className="opacity-0 overflow-hidden absolute whitespace-nowrap peer"
              onChange={(event) => handleCheckboxChange(event, colorCode)}
            />
            <span
              className={`flex flex-col items-center justify-center w-10 min-h-[2rem] rounded-lg shadow-lg 
              transition-all duration-200 cursor-pointer relative border-2 ${isChecked ? colorStyles[colorName] : "border-gray-700"}
              bg-gray-800 hover:${colorStyles[colorName]}`}
            >
              <span className="transition-all duration-100">
                <p className="text-center">{colorIcons[colorName]}</p>
              </span>
            </span>
          </label>
        );
      })}
    </div>
  );
}
