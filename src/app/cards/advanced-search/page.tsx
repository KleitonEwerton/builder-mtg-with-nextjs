"use client";

import { useRouter } from "next/navigation";
import ManaCheckBox from "./ManaCheckBox";
import TypeSelect from "./TypeSelect";
import { useEffect, useState } from "react";
export default function AdvancedSearch() {
  const [query, setQuery] = useState("");
  const [name, setName] = useState("");
  const [oracle, setOracle] = useState("");
  const [types, setTypes] = useState<string[]>([]); // Modificado para armazenar múltiplos tipos
  const [colors, setColors] = useState("");
  const [identit, setIdentit] = useState("");

  const router = useRouter();

  useEffect(() => {
    const buildQuery = () => {
      const parts = [];
      if (name) parts.push(`name:${name}`);
      if (oracle) parts.push(`(oracle:${oracle.split(" ").join(" oracle:")})`);
      if (types.length > 0) parts.push(`type:${types.join(" type:")}`); // Agora lida com múltiplos tipos
      if (colors) parts.push(`c:${colors}`);
      if (identit) parts.push(`commander:${identit}`);

      console.log("parts:", parts);

      return parts.join(" ");
    };

    setQuery(buildQuery());
  }, [name, oracle, types, colors, identit]);

  const handleSearch = () => {
    if (query.length > 0) {
      router.push(`/cards/list?search=${query}`);
    }
  };

  const handleColorsChange = (newColors: string) => {
    setColors(newColors);
    console.log("new colors: " + newColors);
  };

  const handleIdentitChange = (newColors: string) => {
    setIdentit(newColors);
    console.log("new identit: " + newColors);
  };

  const handleTypeChange = (selectedTypes: string[]) => {
    setTypes(selectedTypes); // Atualiza a lista de tipos selecionados
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 bg-gray-900">
      <div className="w-full bg-black py-4 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-center text-2xl font-bold mb-6">
            <p>Advanced Card Search</p>
          </h1>
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Parcial card name"
                className="w-full p-3 pl-10 text-black rounded-full border border-gray-700"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Card Text"
                className="w-full p-3 pl-10 text-black rounded-full border border-gray-700"
                onChange={(e) => setOracle(e.target.value)}
              />
            </div>
            <TypeSelect handleTypeChange={handleTypeChange} />{" "}
            <input
              type="text"
              placeholder="Cores"
              className="w-full p-3 pl-10 text-white rounded-full border border-gray-700 bg-gray-900 cursor-not-allowed pointer-events-none"
              disabled
              tabIndex={-1}
            />
            <ManaCheckBox handleFunctionChance={handleColorsChange} />
            <input
              type="text"
              placeholder="Commandante"
              className="w-full p-3 pl-10 text-white rounded-full border border-gray-700 bg-gray-900 cursor-not-allowed pointer-events-none"
              disabled
              tabIndex={-1}
            />
            <ManaCheckBox handleFunctionChance={handleIdentitChange} />
          </div>

          <div className="mt-6 text-center">
            <button
              className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-full"
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
