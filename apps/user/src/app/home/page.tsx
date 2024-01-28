'use client'; // This is a client component
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { BASE_URL, BASE_URL_ADMIN_PRISMA } from '../../config.js';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { logIn, loading } from '../../store';
import Loader from '../loading';
import { signIn, useSession } from 'next-auth/react';

function Signin() {
  const router = useRouter();
  const [logInn, setLogIn] = useRecoilState(logIn);
  const [userName, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [load, setLoad] = useRecoilState(loading);
  const { data: session } = useSession();

  useEffect(() => {
    const handleSession = async () => {
      if (typeof session !== 'undefined') {
        // If session is defined, handle the session logic
        if (session) {
          console.log('user session', session);
          setLoad(false);
          setLogIn(true);
          // router.push('/addCourse');

          // router.push('/allCourses');
        } else {
          setLoad(false);
          setLogIn(false);
          // signIn();
          // router.push('/Signin');
        }
      } else {
        // Handle the loading state until session data is available
        setLoad(true);
      }
    };

    handleSession();
  }, [session, setLoad, setLogIn, router]);

  const handleSignIn = async () => {
    setLoad(true);
    try {
      if (session) {
        setLogIn(true);
        router.push('/myLearnings');
        setLoad(false);
      } else {
        setLoad(false);
      }
    } catch (error: any) {
      if (error.response.data.message == 'Invalid username or password') {
        console.log('invalid user name and password');

        setLoad(false);
      } else {
        console.error('Error signing up:', error);
      }
    }
  };
  if (load == true) {
    return (
      <>
        <Loader></Loader>
      </>
    );
  }
  return <>{session ? <div>Home</div> : <div>please sign in.</div>}</>;
}
export default Signin;
