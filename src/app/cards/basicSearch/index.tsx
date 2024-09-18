import React, { useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import * as Scry from "scryfall-sdk";
import { useRouter } from "next/navigation";
import { List, ListItem, ListItemText } from "@mui/material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 1),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  backgroundColor: alpha(theme.palette.common.black, 1),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const Input = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  backgroundColor: alpha(theme.palette.common.black, 1),
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
  },
}));

const Tool = styled(Toolbar)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.common.black, 1),
}));

export default function AdvancedSearch() {
  const [query, setQuery] = useState(""); // Estado para armazenar o valor da pesquisa
  const [suggestions, setSuggestions] = useState<string[]>([]); // Estado para armazenar sugestões
  const router = useRouter();

  // Função para buscar os nomes sugeridos
  async function fetchAutoCompleteNames(query: string) {
    if (query.length > 1) {
      try {
        const result = await Scry.Cards.autoCompleteName(query);
        setSuggestions(result);
      } catch (error) {
        console.error("Erro ao buscar sugestões", error);
      }
    } else {
      setSuggestions([]); // Limpa sugestões se o campo for muito curto
    }
  }

  // Chama a função de busca sempre que o usuário digita algo
  useEffect(() => {
    fetchAutoCompleteNames(query);
  }, [query]);

  // Atualiza o valor da pesquisa quando o usuário digita
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  // Função que é chamada quando o usuário clica em uma sugestão
  const handleSuggestionClick = (suggestion: string) => {
    setQuery("name:" + suggestion); // Atualiza o campo com o nome selecionado
    setSuggestions([]); // Esconde as sugestões após a seleção
  };

  const handleSearch = () => {
    if (query.length > 0) {
      router.push(`/cards/list?search=${query}`); // Redireciona para a página com query string
      console.log("Pesquisar por:", query);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Tool>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <Input
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value), handleInputChange;
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSearch(); // Redireciona ao apertar Enter
                }
              }}
              sx={{ width: "100%" }}
            />
          </Search>
        </Tool>
        {/* Lista de sugestões */}
        {suggestions.length > 0 && (
          <List
            sx={{
              backgroundColor: alpha("#000", 0.8),
              position: "absolute",
              top: "50px",
              width: "100%",
              zIndex: 10,
              maxHeight: "200px",
              overflowY: "auto",
            }}
          >
            {suggestions.map((suggestion, index) => (
              <ListItem onClick={() => handleSuggestionClick(suggestion)}>
                <ListItemText primary={suggestion} />
              </ListItem>
            ))}
          </List>
        )}
      </AppBar>
    </Box>
  );
}
