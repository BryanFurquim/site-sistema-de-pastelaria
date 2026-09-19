import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { DM_Sans, Fraunces, Source_Sans_3, IBM_Plex_Sans, Roboto, Poppins, Playfair_Display, Raleway, PT_Sans, Space_Grotesk, EB_Garamond, Karla, Rubik, Crimson_Text } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' })
const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces' })
const sourceSans3 = Source_Sans_3({ subsets: ['latin'], variable: '--font-source-sans-3' })
const ibmPlexSans = IBM_Plex_Sans({ weight: ['400', '600', '700'], subsets: ['latin'], variable: '--font-ibm-plex-sans' })
const roboto = Roboto({ weight: ['400', '500', '700'], subsets: ['latin'], variable: '--font-roboto' })
const poppins = Poppins({ weight: ['400', '600', '700'], subsets: ['latin'], variable: '--font-poppins' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })
const raleway = Raleway({ subsets: ['latin'], variable: '--font-raleway' })
const ptSans = PT_Sans({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-pt-sans' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' })
const ebGaramond = EB_Garamond({ subsets: ['latin'], variable: '--font-eb-garamond' })
const karla = Karla({ subsets: ['latin'], variable: '--font-karla' })
const rubik = Rubik({ subsets: ['latin'], variable: '--font-rubik' })
const crimsonText = Crimson_Text({ weight: ['400', '600'], subsets: ['latin'], variable: '--font-crimson-text' })

export const metadata: Metadata = {
  title: 'Pastelaria Boer | pastelariaboer.vercel.app',
  description: 'Pastéis crocantes, recheio generoso e sabor de tradição. Peça online ou visite o Pastel Boer em Americana - SP.',
  generator: 'v0.app',
}

export const viewport: Viewport = { colorScheme: 'light', themeColor: '#FFF4C2' }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR" className="bg-[#FFF4C2]"><body className={`${dmSans.variable} ${fraunces.variable} ${sourceSans3.variable} ${ibmPlexSans.variable} ${roboto.variable} ${poppins.variable} ${playfair.variable} ${raleway.variable} ${ptSans.variable} ${spaceGrotesk.variable} ${ebGaramond.variable} ${karla.variable} ${rubik.variable} ${crimsonText.variable} font-sans antialiased`}>{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
