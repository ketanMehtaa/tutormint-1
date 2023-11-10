'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  router.push('/signIn');
  return <h1 style={{ display: 'flex', justifyContent: 'center' }}>ADMIN LOADED</h1>;
}
