"use client"; // Adicione esta linha para tornar o componente um Client Component
import { useEffect, useState } from "react";
import * as Scry from "scryfall-sdk";

// Import CSS
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));
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
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {cardsData?.map((card) => (
          <Grid size={{ xs: 2, sm: 4, md: 4 }}>
            <Item>
              {card.name}
              {/* <img
                  src={
                    card.image_uris?.large ||
                    card.image_uris?.normal ||
                    card.image_uris?.small
                  }
                  alt={card.name}
                /> */}
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
