"use client";

import BasicSearch from "./cards/basic-search";
import { Container } from "@mui/material";

export default function Home() {
  return (
    <Container>
      <BasicSearch />
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-6 row-start-2 items-center sm:items-start">
          <h1 className="text-3xl font-bold text-white-900 dark:text-white-100">
            Deck Builder Mtg with Next.js
          </h1>
          <p className="text-lg text-white-600 dark:text-white-400">
            Uma ferramenta para criação de decks de cartas Magic: The Gathering
          </p>
          <p className="mt-6 text-sm text-white-600 dark:text-white-400">
            Desenvolvido com Next.js, React, Tailwind CSS e Material-UI
          </p>
        </main>
      </div>
    </Container>
  );
}
