"use client";
import React from "react";
import { Button, styled } from "@mui/material";

const ActionButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.button.add,
  borderRadius: 5,
  width: 50,
  height: 35,
  color: theme.palette.common.white,
  fontWeight: 600,
  cursor: "pointer",
  alignSelf: "flex-end",
}));

export default ActionButton;
