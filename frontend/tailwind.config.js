/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: ({ colors }) => ({
        primary: {
          primary: '#CF184E',
          pink: colors.pink,
          gray: {
            default: '#F8F9FB',
            light: '#F9F9FA',
            dark: '#CED4D9'
          }
        },
        going: {
          header_color : '#016170',
          text_light : '#c5ced6',
          primary: '#009393',
          secondary: '#e7f9fb',
          bg: '#f2f2f2',
          
        },
      }),
      fontFamily:{
        headingFont : ['Tiro Devanagari Hindi', 'serif'],
        merriweather:[ 'Merriweather', 'serif'],
        noto: ['Noto Sans', 'sans-serif'],
      },
      textColor:{
        loan: {
          primary: '#68696f',
          secondary: '#1a1a1a',
          outline: '#4284f3',
          button: '#0052cc',
          bg: '#f2f2f2',
          
        }
      },
      
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

