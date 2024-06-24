import { createSystem } from "frog/ui";

export const { Box, Image, Text, vars } = createSystem({
  colors: {
    blue: "rgb(55,166,249)",
    white: "white",
    black: "rgb(0,2,18)",
    fcPurple: "rgb(71,42,145)",
    purple: 'rgb(117,89,236)',
  },
  fonts: {
    default: [
      {
        name: "Pixelify Sans",
        source: "google",
      },
    ],
  },
});