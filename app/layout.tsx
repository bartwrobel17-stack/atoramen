import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { metadataBase:new URL("https://atoramen.vercel.app"), title:"ATO Ramen Wrocław | Ramen & Japanese comfort food", description:"ATO Ramen przy Odrzańskiej 4/5 we Wrocławiu. Ramen, comfort food i autorskie napoje w miejskim, swobodnym klimacie.", alternates:{canonical:"/"}, openGraph:{title:"ATO Ramen Wrocław",description:"Ramen, który zostaje w pamięci.",type:"website"} };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="pl"><body>{children}</body></html>}