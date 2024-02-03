'use client';
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';

import TextField from '@mui/material/TextField';
// import SendIcon from '@mui/icons-material/Send';
import { useEffect, useState } from 'react';
import { BASE_URL, BASE_URL_ADMIN_PRISMA } from '../../config.js';
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
import { useRecoilState } from 'recoil';
import { purchasedCourses } from '@/store';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function myLearnings() {
  const [load, isLoadingSet] = useState(false);
  const { data: session } = useSession();

  const [purchasedCoursess, setPurchasedCourses] = useRecoilState(purchasedCourses); // Initialize allCourses as an empty array

  useEffect(() => {
    // admin verify
    const getAllCourses = async () => {
      isLoadingSet(true);
      try {
        const res = await axios.get(`${BASE_URL_ADMIN_PRISMA}/api/myLearnings`, {
          headers: {
            'Content-type': 'application/json',
          },
        });

        // Assign the response data to this.allCourses
        // this.allCourses = res.data.courses; // Assuming res.data contains the course data
        console.log('all courses enrolled by user', res.data);
        setPurchasedCourses(res.data.data);
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
  if (purchasedCoursess.length == 0) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <img
          className="max-h-[50vh]"
          src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-2506.jpg?w=1380&t=st=1706976892~exp=1706977492~hmac=e98fdebd9531fa672fae71e66f391fc73bd62cac63037198eefb1157cc0b2e52"
          alt="NO DATA"
        />
      </div>
    );
  }

  return (
    <div>
      <Grid container spacing={2} className="allCourses-grid-outer">
        {purchasedCoursess &&
          purchasedCoursess.map((course: any) => (
            <Grid item xs={6} md={4} lg={3} key={course.id} className="allCourses-grid-inner">
              <Item>
                <Course
                  key={course.id}
                  title={course.title}
                  description={course.description}
                  price={course.price}
                  imageLink={course.imageLink}
                  id={course.id}
                  purchased={true}
                />
              </Item>
            </Grid>
          ))}
      </Grid>
    </div>
  );
}
export default myLearnings;
