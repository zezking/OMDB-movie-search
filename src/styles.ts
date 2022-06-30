import { colors, createTheme } from "@mui/material";

const black = colors.grey[900];
const white = colors.grey[50];
const yellow = colors.yellow[600];

const theme = createTheme({
  palette: {
    primary: {
      main: colors.yellow[600],
    },
    secondary: {
      main: colors.grey[900],
    },
  },

  components: {
    MuiButtonBase: {
      styleOverrides: {
        root: {
          color: colors.grey[900],
          ":hover": {
            color: colors.grey[900],
          },
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: colors.grey[900],
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: colors.yellow[600],
          },
        },
        notchedOutline: {
          borderColor: colors.grey[900],
          ":hover": {
            color: colors.yellow[600],
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        outlined: {
          color: colors.grey[900],
        },
      },
    },
  },
});

export { black, white, yellow, theme };
