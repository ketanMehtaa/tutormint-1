'use client';
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';

import TextField from '@mui/material/TextField';
// import SendIcon from '@mui/icons-material/Send';
import { useEffect, useState } from 'react';
import { BASE_URL, BASE_URL_ADMIN_PRISMA } from '../../config';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../loading';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Course from '../course';

import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { useSession } from 'next-auth/react';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Courses() {
  const [load, isLoadingSet] = useState(false);
  const { data: session } = useSession();
  // const [err, setError] = useState('');
  // const userChange
  const [allCourses, setAllCourses] = useState([]); // Initialize allCourses as an empty array

  //   let allCourses ;
  //   useEffect(() => {
  //     // admin verify
  //     const getAllCourses = async () => {
  //       isLoadingSet(true);
  //       try {
  //         const res = await axios.get(
  //           `${BASE_URL}/admin/courses`,
  //           {},
  //           {
  //             headers: {
  //               'Content-type': 'application/json',
  //               Authorization: 'Bearer ' + localStorage.getItem('token'),
  //             },
  //           }
  //         );
  //         console.log('getAllCourse data', res);
  //         this.allCourses = res;
  //         setIsSignIn(true);
  //       } catch (error) {
  //         console.error('Error verifying', error);
  //       }
  //     };
  //     getAllCourses();
  //   }, []);
  useEffect(() => {
    // admin verify
    const getAllCourses = async () => {
      isLoadingSet(true);
      try {
        const res = await axios.get(`${BASE_URL_ADMIN_PRISMA}/api/allCourses`, {
          headers: {
            'Content-type': 'application/json',
          },
          params: {
            // todo pass username
            username: 'ketan',
          },
        });

        // Assign the response data to this.allCourses
        // this.allCourses = res.data.courses; // Assuming res.data contains the course data
        console.log('all courses admin ', res.data);
        setAllCourses(res.data.data);
        isLoadingSet(false);
      } catch (error) {
        console.error('getAllCourses data', error);
      }
    };
    getAllCourses();
  }, []);

  if (load == true) {
    return (
      <>
        <Loader></Loader>
      </>
    );
  }
  const randomKey = Math.random().toString(36).substring(7);

  return (
    <div>
      <Grid container spacing={2} className="allCourses-grid-outer">
        {allCourses.map((course: any) => (
          <Grid item xs={6} md={4} lg={3} key={randomKey} className="allCourses-grid-inner">
            <Item>
              <Course
                key={course._id}
                title={course.title}
                description={course.description}
                price={course.price}
                imageLink={course.imageLink}
              />
            </Item>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
export default Courses;
