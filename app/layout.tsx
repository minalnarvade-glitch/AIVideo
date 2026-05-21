
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import ConvexClientProvider from './ConvexClientProvider'
import Provider from "./provider";

export const metadata: Metadata = {
  title: "sVideo:AI Video Generator and Scheduler App",
  description: "sVideo is a video generation and scheduler",
};

const outfit=Outfit({subsets:['latin']})

export default function RootLayout({children}:{children:React.ReactNode}) {

  return (
    <html
      lang="en"
      suppressHydrationWarning={true}
    >
      <body className={outfit.className}>
        <ConvexClientProvider>
          <Provider>
            {children}
          </Provider>
        
        </ConvexClientProvider>
      </body>
    </html>
  );
}
