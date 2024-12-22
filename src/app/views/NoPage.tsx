"use client";
import * as React from "react";
import Box from "@mui/material/Box";

import { Typography, useTheme } from "@mui/material";

const NoPage: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: theme.palette.background.default,
        width: "100%",
      }}
    >
      <Typography>No page found</Typography>
    </Box>
  );
};

export default NoPage;
