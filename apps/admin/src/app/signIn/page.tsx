'use client'; // This is a client component
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../../config.js';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { logIn, loading } from '../../store';
import Loader from '../loading';
function Signin() {
  const router = useRouter();
  const [logInn, setLogIn] = useRecoilState(logIn);
  const [userName, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [load, setLoad] = useRecoilState(loading);

  useEffect(() => {
    const adminData = localStorage.getItem('admin');
    const admin = adminData ? JSON.parse(adminData) : null;

    if (admin) {
      setLoad(false);
      setLogIn(true);
      // router.push('/allCourses');
    } else {
      setLoad(false);
      setLogIn(false);
      // router.push('/Signin');
    }
  }, []);

  const handleSignIn = async () => {
    setLoad(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/admin/login`,
        {},
        {
          headers: {
            'Content-type': 'application/json',
            username: userName,
            password: password,
          },
        }
      );

      // Check if the response contains a token
      const token = response?.data?.token;
      const admin = response.data.admin;
      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('admin', JSON.stringify(admin));
        setLogIn(true);
        router.push('/addCourse');
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
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '85vh',
          gap: '10px',
        }}
      >
        <h1>Sign IN</h1>
        <TextField
          id="11"
          label="User Name"
          variant="outlined"
          onChange={(e) => {
            setUser(e.target.value);
          }}
        />
        <TextField
          id="1"
          label="Password"
          type="password"
          variant="outlined"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button variant="contained" onClick={handleSignIn} size="large">
          Submit
        </Button>
      </div>
    </>
  );
}
export default Signin;
