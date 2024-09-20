import React, { useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import * as Scry from "scryfall-sdk";
import { useRouter } from "next/navigation";
import { Button, List, ListItem, ListItemText } from "@mui/material";

const Search = styled("div")(({ theme }) => ({
  display: "flex",
  color: "white",
  flexDirection: "row",
  justifyContent: "center",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 1),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0),
  },
  marginLeft: 0,
  width: "100%",
}));

const Input = styled(InputBase)(({ theme }) => ({
  color: "white",
  width: "100%",
  backgroundColor: alpha(theme.palette.common.black, 1),
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
  },
}));

const Botao = styled(Button)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.common.black, 1),
  color: "white",
}));

const Tool = styled(Toolbar)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.common.black, 1),
  color: "white",
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
    setQuery(suggestion); // Atualiza o campo com o nome selecionado
    setSuggestions([]); // Esconde as sugestões após a seleção
  };

  const handleSearch = () => {
    if (query.length > 0) {
      router.push(`/cards/list?search=name:${query}`); // Redireciona para a página com query string
      window.location.href = `/cards/list?search=name:${query}`;
    }
  };

  const advanced = () => {
    router.push(`/cards/advanced-search`); // Redireciona para a página de busca avançada
    window.location.href = `/cards/advanced-search`;
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Tool>
          <Search>
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
            <Botao onClick={handleSearch}>
              <SearchIcon />
            </Botao>
            <Botao onClick={advanced}>Busca Avançada</Botao>
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
            {suggestions.map((suggestion) => (
              <ListItem
                key={suggestion}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <ListItemText primary={suggestion} />
              </ListItem>
            ))}
          </List>
        )}
      </AppBar>
    </Box>
  );
}
