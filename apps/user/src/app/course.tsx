import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
// import SendIcon from '@mui/icons-material/Send';
import { useEffect, useState } from 'react';
import { BASE_URL, BASE_URL_ADMIN_PRISMA } from '../config';
// import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';
import Loader from './loading';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useRecoilState } from 'recoil';
import { courses } from '@/store';
import { purchasedCourses } from '../store';
function Course({ title, description, price, imageLink, id, purchased }: any) {
  const [load, isLoadingSet] = useState(false);
  // const [allCourses, setAllCourses] = useRecoilState(courses); // Initialize allCourses as an empty array

  // const [err, setError] = useState('');
  // const userChange

  useEffect(() => {}, []);

  const buyCourse = async () => {
    console.log('id of this coursedddd', id);
    const response = await axios.post(`${BASE_URL_ADMIN_PRISMA}/api/allCourses/${id}`, {
      headers: {
        'Content-type': 'application/json',
      },
    });
    console.log('response call', response);
  };

  if (load == true) {
    return (
      <>
        <Loader></Loader>
      </>
    );
  }

  return (
    <div>
      <Card>
        <CardMedia sx={{ height: 200 }} image={imageLink} title="green iguana" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <Typography variant="h6">{price}</Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
          {/* <Link to="/AddCourses">
            <Button size="small">Buy Now</Button>
          </Link> */}
          <Button size="small" onClick={purchased ? undefined : () => buyCourse()}>
            {purchased ? 'view course' : 'Buy'}
          </Button>
          {/* <Button size="small" onClick={() => deleteCourse()}>
            Delete
          </Button> */}
        </CardActions>
      </Card>
    </div>
  );
}
export default Course;
