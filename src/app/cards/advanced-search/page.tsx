"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import ManaCheckBox from "./ManaCheckBox";

export default function AdvancedSearch() {
  const [query, setQuery] = useState(""); // Estado para armazenar o valor da pesquisa
  const [name, setName] = useState(""); // Estado para armazenar o nome da carta
  const [oracle, setOracle] = useState(""); // Estado para armazenar o texto do oracle
  const [type, setType] = useState(""); // Estado para armazenar o tipo da carta
  const [colors, setColors] = useState(""); // Estado para armazenar as cores da carta
  const [identit, setIdentit] = useState(""); // Estado para armazenar a identidade do comandante

  const router = useRouter();



  // Construir a query com base nos campos preenchidos
  useEffect(() => {
    const buildQuery = () => {
      const parts = [];
      if (name) parts.push(`name:${name}`);
      if (oracle) parts.push(`(oracle:${oracle.split(" ").join(" oracle:")})`);
      if (type) parts.push(`type:${type}`);
      if (colors) parts.push(`${colors}`);
      if (identit) parts.push(`${identit}`);

      return parts.join(" ");
    };

    setQuery(buildQuery());
  }, [name, oracle, type, colors, identit]);

  const handleSearch = () => {
    console.log("handleSearch", query);
    if (query.length > 0) {
      router.push(`/cards/list?search=${query}`);
    }
  };

  // Função para atualizar o estado de cores a partir do ManaCheckBox
  const handleColorsChange = (newColors: string) => {
    setColors(newColors); // Atualiza o estado das cores selecionadas
    console.log("setColors", newColors);
  };

  const handleIdentitChange = (newColors: string) => {
    setIdentit(newColors); // Atualiza o estado das cores selecionadas
    console.log("setIdentit", newColors);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 bg-gray-900">
      <div className="w-full bg-black py-4 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-center text-2xl font-bold mb-6">
            Advanced Card Search
          </h1>
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Parcial card name"
                className="w-full p-3 pl-10 text-black rounded-full border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                onChange={(e) => setName(e.target.value)}
              />
              <span className="absolute left-3 top-4 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.9 14.32a8 8 0 111.42-1.42l4.6 4.59a1 1 0 01-1.41 1.41l-4.59-4.6zM8 14A6 6 0 108 2a6 6 0 000 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Card Type"
                className="w-full p-3 pl-10 text-black rounded-full border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                onChange={(e) => setType(e.target.value)}
              />
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Card Text (ex: draw damage)"
                className="w-full p-3 pl-10 text-black rounded-full border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                onChange={(e) => setOracle(e.target.value)}
              />
            </div>

            <input
              type="text"
              placeholder="Cores"
              className="w-full p-3 pl-10 text-white rounded-full border border-gray-700 bg-gray-900 cursor-not-allowed pointer-events-none"
              disabled
              tabIndex={-1}
            />

            <ManaCheckBox
              handleFunctionChance={handleColorsChange}
              queryLetter="c"
            />
            <input
              type="text"
              placeholder="Commandante"
              className="w-full p-3 pl-10 text-white rounded-full border border-gray-700 bg-gray-900 cursor-not-allowed pointer-events-none"
              disabled
              tabIndex={-1}
            />

            <ManaCheckBox
              handleFunctionChance={handleIdentitChange}
              queryLetter="commander"
            />
          </div>

          <div className="mt-6 text-center">
            <button
              className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-all duration-300"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
