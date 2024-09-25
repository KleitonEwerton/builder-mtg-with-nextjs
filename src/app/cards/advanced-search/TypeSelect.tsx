import React, { useState, useEffect } from "react";
import * as Scry from "scryfall-sdk";

export default function TypeSelect({ handleTypeChange }: { handleTypeChange: (types: string[]) => void }) {
    const [artifactTypes, setArtifactTypes] = useState<string[]>([]);
    const [creatureTypes, setCreatureTypes] = useState<string[]>([]);
    const [enchantmentTypes, setEnchantmentTypes] = useState<string[]>([]);
    const [planeswalkerTypes, setPlaneswalkerTypes] = useState<string[]>([]);
    const [spellTypes, setSpellTypes] = useState<string[]>([]);
    const [superTypes, setSuperTypes] = useState<string[]>([]);

    useEffect(() => {
        const fetchTypes = async () => {
            const artifactTypes = await Scry.Catalog.artifactTypes();
            const creatureTypes = await Scry.Catalog.creatureTypes();
            const enchantmentTypes = await Scry.Catalog.enchantmentTypes();
            const planeswalkerTypes = await Scry.Catalog.planeswalkerTypes();
            const spellTypes = await Scry.Catalog.spellTypes();
            const superTypes = await Scry.Catalog.supertypes();

            setArtifactTypes(artifactTypes);
            setCreatureTypes(creatureTypes);
            setEnchantmentTypes(enchantmentTypes);
            setPlaneswalkerTypes(planeswalkerTypes);
            setSpellTypes(spellTypes);
            setSuperTypes(superTypes);
        };

        fetchTypes();
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
        handleTypeChange(selectedOptions); // Passa os tipos selecionados para o componente pai
    };

    return (
        <div className="relative">
            <select 
                multiple
                onChange={handleChange}
                className="w-full p-3 pl-10 text-black rounded-full border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                tabIndex={-1}
                aria-label="Select Type(s)"
            >
                <option value="" disabled>Select Type(s)</option>
                <optgroup label="Artifact Types">
                    {artifactTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </optgroup>
                <optgroup label="Creature Types">
                    {creatureTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </optgroup>
                <optgroup label="Enchantment Types">
                    {enchantmentTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </optgroup>
                <optgroup label="Planeswalker Types">
                    {planeswalkerTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </optgroup>
                <optgroup label="Spell Types">
                    {spellTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </optgroup>
                <optgroup label="Super Types">
                    {superTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </optgroup>
            </select>
        </div>
    );
}
