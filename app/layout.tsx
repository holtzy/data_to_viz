import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, Montserrat } from "next/font/google";
import { GA_MEASUREMENT_ID, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const montserrat = Montserrat({ variable: "--font-montserrat", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "From data to Viz | Find the graphic you need",
  description:
    "From Data to Viz leads you to the most appropriate graph for your data. It links to the code to build it and lists common caveats you should avoid.",
  authors: [{ name: "Yan Holtz", url: "https://www.yan-holtz.com" }, { name: "Conor Healy" }],
  icons: { icon: "/img/logo/data-to-viz.ico" },
  openGraph: { siteName: SITE_NAME, type: "website", locale: "en_US" },
  twitter: { site: "@R_Graph_Gallery", creator: "@R_Graph_Gallery" },
};

export const viewport: Viewport = { themeColor: "#69b3a2" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        {children}
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
        <Script id="ga" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}');`}
        </Script>
      </body>
    </html>
  );
}
