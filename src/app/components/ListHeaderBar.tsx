"use client";
import React, { useState } from "react";
import {
  Box,
  TextField,
  styled,
  Button,
  IconButton,
  SelectChangeEvent,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useProductContext } from "../context/ProductsContext";

const AddButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.button.add,
  borderRadius: 5,
  width: 50,
  height: 35,
  color: theme.palette.common.white,
  fontWeight: 600,
  cursor: "pointer",
}));

const ListHeaderBar: React.FC = () => {
  const { setOpenProductForm, filterProducts, sortProducts, sort } =
    useProductContext();
  const [input, setInput] = useState<string>("");

  const handleAddProduct = () => {
    setOpenProductForm(true);
  };
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    console.log("search for: ", query);
    setInput(query);
    filterProducts(query);
  };

  const handleSortChange = (event: SelectChangeEvent) => {
    const sortType = event.target.value as string;
    sortProducts(sortType);
  };

  return (
    <Box
      className="App"
      sx={{
        width: "100%",
        height: 50,
        paddingLeft: 2,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <AddButton sx={{ boxShadow: 3 }} onClick={handleAddProduct}>
        Add
      </AddButton>

      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "row",
          "& .MuiTextField-root": { width: "25ch" },
          alignItems: "center",
        }}
      >
        <TextField
          id="products-search-bar"
          className="text"
          onChange={handleInput}
          value={input}
          variant="outlined"
          placeholder="Search by name"
          margin="normal"
          size="small"
          sx={{
            width: 350,
            margin: "10px auto",
          }}
        />
        <IconButton type="submit" aria-label="search">
          <SearchIcon style={{ fill: "blue" }} />
        </IconButton>
      </Box>

      <FormControl sx={{ m: 1, width: 120, height: 30 }} size="small">
        <InputLabel id="demo-simple-select-label">sort</InputLabel>
        <Select
          labelId="sort-products-list"
          id="sort-list"
          value={sort}
          label="Sort"
          onChange={handleSortChange}
        >
          <MenuItem value={"Name"}>Name</MenuItem>
          <MenuItem value={"Date"}>Recently added</MenuItem>
          <MenuItem value={"Price"}>Price</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default ListHeaderBar;
