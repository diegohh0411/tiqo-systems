import type { Config } from "tailwindcss";

export default <Config>{
  content: [
    "./**/*.vue",
  ],
  config: {
    theme: {
      fontFamily: {
        mono: ["JetBrains Mono", "monospace"],
        sans: ["Bricolage Grotesque", "sans-serif"],
      },
    },
  }
}