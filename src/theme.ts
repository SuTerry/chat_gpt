import { createTheme } from "@mui/material/styles"


declare module '@mui/material/styles' {
  interface Palette {
    appBar: Palette['primary']
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    appBar?: PaletteOptions['primary']
  }
}

declare module '@mui/material/AppBar' {
  interface AppBarPropsColorOverrides {
    appBar: true
  }
}

export default createTheme({
  palette: {
    primary: {
      main: '#6d82d0'
    },
    appBar: {
      main: '#3f414e',
      contrastText: '#fff',
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#000020'
        }
      }
    },
  }
})