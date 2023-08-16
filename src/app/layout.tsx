import './globals.css';
import { Inter } from 'next/font/google';
import Sidebar from '@/components/Sidebar';
import WalletConfig from '@/components/WalletConfig';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Forgenie Studio',
  description: 'Create smart contracts with no code',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletConfig>
          <div className="flex">
            <Sidebar />
            <main className="flex-grow bg-midnight p-4 pt-20 ">
              <div className="absolute top-0 right-0 mt-4 mr-4">
                <ConnectButton />
              </div>
              {children}
            </main>
          </div>
        </WalletConfig>
      </body>
    </html>
  );
}
