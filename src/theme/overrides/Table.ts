// ----------------------------------------------------------------------

import { Theme } from "@mui/material";

export default function Table(theme: Theme) {
  return {
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: theme.palette.text.secondary,
          backgroundColor: theme.palette.background.default,
        },
      },
    },
  };
}
