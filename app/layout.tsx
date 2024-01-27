import type { Metadata } from 'next';
import { Poltawski_Nowy, M_PLUS_Rounded_1c } from 'next/font/google';
import './globals.css';
import classNames from 'classnames';
import { FechDogFacts } from '@/utils/dog-facts';

const poltawski = Poltawski_Nowy({
  subsets: ['latin'],
  variable: '--var-mplus',
  display: 'swap',
});

const mplus = M_PLUS_Rounded_1c({
  weight: ['100', '300', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--var-poltawski',
});

export const metadata: Metadata = {
  title: 'Simon Rothert',
  description: 'My website',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const quotes = await FechDogFacts();
  return (
    <html lang="en">
      <body className={classNames(poltawski.variable, mplus.variable)}>
        <div className="border-b-2 fixed top-0 w-full" />
        <div className="flex flex-row whitespace-nowrap type-body-1 will-change-transform group w-screen overflow-hidden">
          {new Array(2).fill(null).map((_, i) => (
            <div
              key={i}
              className={classNames(
                {
                  'animate-news-ticker': i === 0,
                  'animate-news-ticker-2': i === 1,
                },
                'flex flex-row relative',
              )}
            >
              {quotes.map((quote, quoteI) => (
                <span
                  key={quote}
                  className={classNames(
                    'mx-2 transition-all relative z-[1] leading-7',
                    [
                      'group-hover:pt-16 group-hover:pb-0 bg-red-500 text-yellow-300',
                      'group-hover:pt-3 group-hover:pb-13 bg-yellow-500 text-black',
                      'italic group-hover:-mt-2 group-hover:pb-[4.5rem] bg-rose-500 text-green-300',
                      'group-hover:pt-10 group-hover:pb-6 bg-purple-300 text-orange-700',
                      'group-hover:pt-2 group-hover:pb-14 bg-pink-500 text-orange-200',
                    ][quoteI % 5],
                  )}
                >{`"${quote}"`}</span>
              ))}
            </div>
          ))}
        </div>
        <div className="flex flex-row w-screen overflow-hidden relative">
          <main className="flex flex-col">{children}</main>
          <div className="relative">
            <div className="w-16 h-16 flex flex-col justify-between cursor-pointer sticky top-0">
              <div className="flex w-full border-b" />
              <div className="flex w-full border-b-8" />
              <div className="flex w-full border-b-2" />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
