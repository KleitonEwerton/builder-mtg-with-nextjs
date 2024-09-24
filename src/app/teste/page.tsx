// Import css

import ManaCheckBox from "./ManaCheckBox";

export default function Teste() {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="w-full bg-black py-4">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Parcial card name"
                className="w-full p-3 pl-10 text-black rounded-full border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
            <div className="relative flex flex-wrap justify-center items-center w-11/12 mx-auto select-none gap-2 max-w-[500px] bg-puple-900 p-4 rounded-xl">
              <ManaCheckBox text="Vermelho" color="red" />
              <ManaCheckBox text="Azul" color="blue" />
              <ManaCheckBox text="Verde" color="green" />
              <ManaCheckBox text="Branco" color="white" />
              <ManaCheckBox color="black" text="Black" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
