/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        primaryColor: "#0067FF",
        yellowColor: "#FEB60D",
        purpleColor: "#9771FF",
        irisBlueColor:"#01B55C5",
        headingColor:"#181A1E",
        textColor: "#4E545F"
      },
      boxShadow:{
        panelShadow: "rgba(17,12,46,0.15) 0px 48px  100px  0px"
      }
    },
  },
  plugins: [],
}

