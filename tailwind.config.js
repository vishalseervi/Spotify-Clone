/** @type {import('tailwindcss').Config} */
export default {
  content: ["./*{html,js}"],
  theme: {
    extend: {
      colors: {
        'spotifygray': '#121212',
        'textgray': '#AEAEAE',
        'bggray': '#2A2A2A',
        'gcolor1': '#4507F4',
        'gcolor2': '#ACCAD2',
        'hcolor': '#222222',
        'mainbgcolor': '#20115B',
        'btncolor': '#34295D',
        'wcolor': '#71698E',
        'lcolor': '#5E5678',
        'knobclr': '#1ED760',
        'scrollclr': '#B3B3B3',
        'blackishcolor': '#111111',
      },
      fontSize: {
        vs: '0.34rem'
      },
      height: {
        '99h': '99%',
        'b2': '86%',
        'ph': '250%'
      },
      width: {
        '80percent': '100%'

      },
      backgroundImage: {
        'pauseimg': "url('/pause.svg')",
        'playimg': "url('/play.svg')",
      }
    },
    fontWeight: {
      thin: '100',
      hairline: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '450',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      'extra-bold': '800',
      black: '900',
    }
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}