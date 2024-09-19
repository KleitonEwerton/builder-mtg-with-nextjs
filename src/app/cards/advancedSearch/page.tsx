"use client";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";

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
  const [name, setName] = useState(""); // Estado para armazenar o nome da carta
  const [oracle, setOracle] = useState(""); // Estado para armazenar o texto do oracle
  const [type, setType] = useState(""); // Estado para armazenar o tipo da carta

  const router = useRouter();

  useEffect(() => {
    const buildQuery = () => {
      const parts = [];
      if (name) parts.push(`name:${name}`);
      if (oracle) parts.push(`(oracle:${oracle.split(" ").join(" oracle:")})`);
      if (type) parts.push(`type:${type}`);

      return parts.join(" ");
    };

    setQuery(buildQuery());
  }, [name, oracle, type]);

  const handleSearch = () => {
    console.log("1 - Pesquisar por:", query);
    if (query.length > 0) {
      router.push(`/cards/list?search=${query}`); // Redireciona para a página com query string
      console.log("2 - Pesquisar por:", query);
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
              placeholder="Name"
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => setName(e.target.value)}
              sx={{ width: "100%" }}
            />
            <Input
              placeholder="Type"
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => setType(e.target.value)}
              sx={{ width: "100%" }}
            />
            <Input
              placeholder="Text"
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => setOracle(e.target.value)}
              sx={{ width: "100%" }}
            />
          </Search>
        </Tool>
      </AppBar>
      <Button onClick={handleSearch}>Pesquisar</Button>
    </Box>
  );
}
