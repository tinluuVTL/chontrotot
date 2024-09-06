/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      base: ["Noto Sans JP", "sans-serif;"],
    },
    extend: {
      backgroundColor: {
        "overlay-10": "rgba(0,0,0,0.1)",
        "overlay-20": "rgba(0,0,0,0.2)",
        "overlay-30": "rgba(0,0,0,0.3)",
        "overlay-40": "rgba(0,0,0,0.4)",
        "overlay-50": "rgba(0,0,0,0.5)",
        "overlay-60": "rgba(0,0,0,0.6)",
        "overlay-70": "rgba(0,0,0,0.7)",
        "overlay-80": "rgba(0,0,0,0.8)",
        "overlay-90": "rgba(0,0,0,0.9)",
      },
      width: {
        main: "1100px",
      },
      maxWidth: {
        main: "1100px",
      },
      keyframes: {
        "slide-left": {
          "0%": {
            "-webkit-transform": "translateX(-100px);",
            transform: "translateX(-100px);",
          },
          "100%": {
            "-webkit-transform": "translateX(0);",
            transform: "translateX(0);",
          },
        },
        "slide-right": {
          "0%": {
            "-webkit-transform": "translateX(500px);",
            transform: "translateX(500px);",
          },
          "100%": {
            "-webkit-transform": "translateX(0);",
            transform: "translateX(0);",
          },
        },
      },
      animation: {
        "slide-left":
          "slide-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
        "slide-right":
          "slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
