'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  // router.push('/home');
  useEffect(() => {
    router.push('/home');
  }, []);
  return <h1 style={{ display: 'flex', justifyContent: 'center' }}>ADMIN LOADED</h1>;
}
