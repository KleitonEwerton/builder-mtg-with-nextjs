"use client"; // Adicione esta linha para tornar o componente um Client Component
import { useEffect, useState } from "react";
import * as Scry from "scryfall-sdk";
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
  CardActions,
  Collapse,
  Theme,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { styled as muiStyled } from "@mui/material/styles";
import FormattedText from "../../../../utils/formated";
import { Container } from "@mui/material";
import BasicSearch from "../basic-search";
import { useRouter } from "next/navigation";
interface ExpandMoreProps {
  expand?: boolean;
  onClick?: () => void;
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.5)",
  ...theme.typography.body2,
  padding: theme.spacing(0),
  textAlign: "justify",
  color: theme.palette.text.secondary,
  width: "100%",
}));

const ExpandMore = muiStyled(
  (props: ExpandMoreProps & { children: React.ReactNode }) => {
    const { children, ...other } = props;
    return <IconButton {...other}>{children}</IconButton>;
  }
)(({ theme, expand }: { theme: Theme; expand?: boolean }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CardsList() {
  const [cardsData, setCardData] = useState<Scry.Card[] | null>(null);
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
  const [search, setSearch] = useState<string | null>(null);
  const router = useRouter();
  const [page, setPage] = useState<number>(1); // Estado da página
  const [isLastPage, setIsLastPage] = useState<boolean>(false); // Controla se é a última página

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const searchQuery = query.get("search");

    setSearch(searchQuery);
  }, [router]);

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
          const emitter = Scry.Cards.search(search as string, page)
            .cancelAfterPage()
            .on("error", () => {})
            .on("not_found", () => {})
            .waitForAll();
          const cards = (await emitter) as Scry.Card[];

          setCardData(cards);

          setIsLastPage(cards.length < 175);
        } catch (error) {
          console.error("Erro ao buscar cartas:", error);
        }
      }
    }

    fetchCardData();
  }, [search, page]); // Buscar dados com base na página

  const handleNextPage = () => {
    if (!isLastPage) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  return (
    <div className="w-100">
      <BasicSearch />
      <Container maxWidth="xl">
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
                      backgroundColor: "rgba(255, 255, 255, 0)",
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
                        height: "auto",
                        width: "100%",
                        objectFit: "contain",
                        maxHeight: "300px",
                      }}
                      alt={card.name}
                      src={
                        card.image_uris?.large ||
                        card.image_uris?.normal ||
                        card.image_uris?.small ||
                        card.image_uris?.png ||
                        card.image_uris?.art_crop ||
                        card.image_uris?.border_crop ||
                        "/img/default.jpg"
                      }
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
                    <Collapse
                      in={expanded[card.id]}
                      timeout="auto"
                      unmountOnExit
                    >
                      <CardContent>
                        <FormattedText
                          text={card.oracle_text || ""}
                        ></FormattedText>
                      </CardContent>
                    </Collapse>
                  </Card>
                </Item>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Paginação com Tailwind */}
        <div className="flex justify-center space-x-1 mt-4">
          {/* Botão Anterior */}
          <button
            onClick={handlePreviousPage}
            disabled={page === 1}
            className="text-white rounded-full border border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
          >
            Prev
          </button>

          {/* Botão Página Atual */}
          <button className="text-white min-w-9 rounded-full bg-slate-800 py-2 px-3.5 border border-transparent text-center text-sm transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2">
            {page}
          </button>

          {/* Botão Próxima */}
          <button
            onClick={handleNextPage}
            disabled={isLastPage}
            className="text-white rounded-full border border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
          >
            Next
          </button>
        </div>
      </Container>
    </div>
  );
}
