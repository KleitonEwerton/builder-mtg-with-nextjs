"use client"; // Adicione esta linha para tornar o componente um Client Component
import { useEffect, useState } from "react";
import * as Scry from "scryfall-sdk";

// Import CSS
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import {
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
  CardActions,
  Collapse,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { styled as muiStyled } from "@mui/material/styles";
import FormattedText from "../../../../utils/formated";
import { Container } from "@mui/material";
import AdvancedSearch from "../basicSearch";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "justify",
  color: theme.palette.text.secondary,
  width: "100%",
}));

const ExpandMore = muiStyled((props: any) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }: { theme: any; expand: boolean }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CardsList() {
  const [cardsData, setCardData] = useState<Scry.Card[] | null>(null);
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
  const searchParams = new URLSearchParams(window.location.search); // Alternativa para capturar o search query
  const search = searchParams.get("search");

  const handleExpandClick = (id: string) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [id]: !prevExpanded[id],
    }));
  };

  useEffect(() => {
    async function fetchCardData() {
      if (search) {
        try {
          const emitter = Scry.Cards.search(search as string)
            .on("data", (card) => {})
            .on("end", () => {});
          const result = await emitter.waitForAll();
          const cards = result as Scry.Card[];
          setCardData(cards);
        } catch (error) {}
      }
    }

    fetchCardData();
  }, [search]);

  return (
    <Container maxWidth="lg">
      <AdvancedSearch />
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Grid
          container
          spacing={{ xs: 2, sm: 3, md: 4, lg: 5 }}
          columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
        >
          {cardsData?.map((card) => (
            <Grid key={card.id} size={{ xs: 1, sm: 1, md: 1, lg: 1 }}>
              <Item>
                <Card
                  sx={{
                    width: "100%",
                    minHeight: 300,
                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                    backdropFilter: "blur(5px)",
                  }}
                >
                  <CardHeader
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={card.name}
                    subheader={card.colors?.join(", ")}
                  />
                  <CardMedia
                    component="img"
                    sx={{
                      height: "auto", // Ajusta a altura automaticamente
                      width: "100%", // Preenche a largura do card
                      objectFit: "contain", // Garante que a imagem não seja cortada
                      maxHeight: "300px", // Limita a altura máxima da imagem
                    }}
                    // image={
                    //   card.image_uris?.large ||
                    //   card.image_uris?.normal ||
                    //   card.image_uris?.small
                    // }
                    alt={card.name}
                  />
                  <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                      <ShareIcon />
                    </IconButton>
                    <ExpandMore
                      expand={expanded[card.id] || false}
                      onClick={() => handleExpandClick(card.id)}
                      aria-expanded={expanded[card.id] || false}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </ExpandMore>
                  </CardActions>
                  <Collapse in={expanded[card.id]} timeout="auto" unmountOnExit>
                    <CardContent>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        <FormattedText
                          text={card.oracle_text || ""}
                        ></FormattedText>
                      </Typography>
                    </CardContent>
                  </Collapse>
                </Card>
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
