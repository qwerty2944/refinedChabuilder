import Header from '@/components/Header';
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '냠냠굿',
  description: '그런거없다',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko'>
      {/* body에 직접 폰트 스타일 적용 */}
      <Header/>
      <body className='font-neodunggeunmo lg:ml-60'>{children}</body>
    </html>
  );
}
