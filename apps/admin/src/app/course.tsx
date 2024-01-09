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
function Course({ title, description, price, imageLink, id }: any) {
  const [load, isLoadingSet] = useState(false);
  const [allCourses, setAllCourses] = useRecoilState(courses); // Initialize allCourses as an empty array

  // const [err, setError] = useState('');
  // const userChange

  useEffect(() => {}, []);
  const deleteCourse = async () => {
    console.log('id of this coursedddd', id);
    const response = await axios.delete(`${BASE_URL_ADMIN_PRISMA}/api/addCourse/${id}`, {
      headers: {
        'Content-type': 'application/json',
      },
    });
    console.log('response call', response);
    const newAllCourses = allCourses.filter((obj: any) => obj.id !== response.data.deletedCourse.id);
    setAllCourses(newAllCourses);
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
        <CardMedia
          sx={{ height: 200 }}
          image={`https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60`}
          title="green iguana"
        />
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
          <Button size="small">Learn More</Button>
          <Button size="small" onClick={() => deleteCourse()}>
            Delete
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
export default Course;
