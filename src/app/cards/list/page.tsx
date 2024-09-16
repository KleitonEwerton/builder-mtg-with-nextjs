"use client"; // Adicione esta linha para tornar o componente um Client Component
import { useEffect, useState } from "react";
import * as Scry from "scryfall-sdk";

// Import CSS
import styles from "@styles/cards/list/Cards.module.css";

export default function CardsList() {
  const [cardsData, setCardData] = useState<Scry.Card[] | null>(null);

  useEffect(() => {
    async function fetchCardData() {
      try {
        // Busca cartas com o query "o:draw"
        const emitter = Scry.Cards.search("type:planeswalker o:draw")
          .on("data", (card) => {})
          .on("end", () => {});
        const result = await emitter.waitForAll();

        // Acessa a propriedade `not_found` e `data` se disponíveis
        const cards = result as Scry.Card[]; // Ajuste se necessário com base na estrutura dos dados

        // Atualiza o estado com os cards
        setCardData(cards);
      } catch (error) {
        console.error("Error fetching card data:", error);
      }
    }

    fetchCardData();
  }, []);

  return (
    <div>
      <h1>Card List</h1>

      <div className={styles.cardList}>
        {cardsData?.map((card) => (
          <div key={card.id} className={styles.card}>
            <div className={styles.card_info}>
              <p className={styles.title}>
                {card.name}
                <img
                  src={
                    card.image_uris?.large ||
                    card.image_uris?.normal ||
                    card.image_uris?.small
                  }
                  alt={card.name}
                />
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
