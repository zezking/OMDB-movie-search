import { colors, createTheme } from "@mui/material";

const black = colors.grey[900];
const white = colors.grey[50];
const yellow = colors.yellow[600];

const theme = createTheme({
  palette: {
    primary: {
      main: yellow,
    },
    secondary: {
      main: black,
    },
  },

  components: {
    MuiButtonBase: {
      styleOverrides: {
        root: {
          color: black,
          ":hover": {
            color: black,
          },
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: black,
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: yellow,
          },
        },
        notchedOutline: {
          borderColor: black,
          ":hover": {
            color: black,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        outlined: {
          color: black,
        },
      },
    },
  },
});

export { black, white, yellow, theme };
