import './globals.css'; // O seu antigo src/index.css
import SideBar from '../src/Components/sideBar'
export const metadata = {
  title: 'Rifa Swarm79',
  description: 'Sorteio da equipe Swarm79',
  verification: {
    google: '5QTWFXJrEBDN7hf9bVEd8aJa_owdB1eAhbS2TQCCGmk', 
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <head>
        <link rel="icon" href="/logo_navegador.png" />
      </head>
      <body>
        <SideBar/>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
