import localFont from 'next/font/local'

// Creato Display font family
export const creatoDisplay = localFont({
  src: [
    {
      path: '../fonts/creato_display/CreatoDisplay-Thin.otf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../fonts/creato_display/CreatoDisplay-ThinItalic.otf',
      weight: '100',
      style: 'italic',
    },
    {
      path: '../fonts/creato_display/CreatoDisplay-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/creato_display/CreatoDisplay-LightItalic.otf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../fonts/creato_display/CreatoDisplay-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/creato_display/CreatoDisplay-RegularItalic.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../fonts/creato_display/CreatoDisplay-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/creato_display/CreatoDisplay-MediumItalic.otf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../fonts/creato_display/CreatoDisplay-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/creato_display/CreatoDisplay-BoldItalic.otf',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../fonts/creato_display/CreatoDisplay-ExtraBold.otf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../fonts/creato_display/CreatoDisplay-ExtraBoldItalic.otf',
      weight: '800',
      style: 'italic',
    },
    {
      path: '../fonts/creato_display/CreatoDisplay-Black.otf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../fonts/creato_display/CreatoDisplay-BlackItalic.otf',
      weight: '900',
      style: 'italic',
    },
  ],
  variable: '--font-creato-display',
  display: 'swap',
})

// Romanica font
export const romanica = localFont({
  src: '../fonts/romanica/Romanica.ttf',
  variable: '--font-romanica',
  display: 'swap',
}) 