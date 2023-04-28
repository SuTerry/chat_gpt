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
      main: '#fafbfc',
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