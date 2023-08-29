import Chabuilder from '@/components/chabuilder';
import { redirect } from 'next/navigation';

export default function Home() {
  return (
    <main>
      <h1>냠냠굿</h1>
      <Chabuilder />
    </main>
  );
}
