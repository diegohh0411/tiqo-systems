import type { Config } from "tailwindcss";

export default <Config>{
  content: [
    "./**/*.vue",
  ],
  config: {
    theme: {
      extend: {
        fontFamily: {
          mono: ["JetBrains Mono", "monospace"],
        },
      },
    },
  }
}