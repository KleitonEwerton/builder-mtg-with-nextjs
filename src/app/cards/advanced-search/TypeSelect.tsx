import React, { useState, useEffect } from "react";
import Select, { MultiValue } from "react-select";
import * as Scry from "scryfall-sdk";

// Definindo o tipo para as opções
type OptionType = {
  value: string;
  label: string;
  group: string; // Para agrupar as opções, se necessário
};

export default function TypeSelect({
  handleTypeChange,
}: {
  handleTypeChange: (types: string[]) => void;
}) {
  const [options, setOptions] = useState<OptionType[]>([]); // Usando o tipo definido

  useEffect(() => {
    const fetchTypes = async () => {
      const artifactTypes = await Scry.Catalog.artifactTypes();
      const creatureTypes = await Scry.Catalog.creatureTypes();
      const enchantmentTypes = await Scry.Catalog.enchantmentTypes();
      const planeswalkerTypes = await Scry.Catalog.planeswalkerTypes();
      const spellTypes = await Scry.Catalog.spellTypes();
      const superTypes = await Scry.Catalog.supertypes();

      // Montando as opções em um formato compatível com o React Select
      const combinedOptions: OptionType[] = [
        ...artifactTypes.map((type: string) => ({
          value: type,
          label: type,
          group: "Artifact Types",
        })),
        ...creatureTypes.map((type: string) => ({
          value: type,
          label: type,
          group: "Creature Types",
        })),
        ...enchantmentTypes.map((type: string) => ({
          value: type,
          label: type,
          group: "Enchantment Types",
        })),
        ...planeswalkerTypes.map((type: string) => ({
          value: type,
          label: type,
          group: "Planeswalker Types",
        })),
        ...spellTypes.map((type: string) => ({
          value: type,
          label: type,
          group: "Spell Types",
        })),
        ...superTypes.map((type: string) => ({
          value: type,
          label: type,
          group: "Super Types",
        })),
      ];

      setOptions(combinedOptions);
    };

    fetchTypes();
  }, []);

  const handleChange = (
    selectedOptions: MultiValue<OptionType> // Usando o tipo definido
  ) => {
    const selectedValues = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    handleTypeChange(selectedValues); // Passa os tipos selecionados para o componente pai
  };

  return (
    <Select
      isMulti
      options={options}
      onChange={handleChange}
      classNamePrefix="select"
      placeholder="Select Type(s)"
      className="basic-multi-select w-full text-black rounded-full border border-gray-700"
    />
  );
}
