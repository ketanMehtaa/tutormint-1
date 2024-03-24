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
      {/* <Card>
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
          <Button size="small">Learn More</Button>
          <Button size="small" onClick={() => deleteCourse()}>
            Delete
          </Button>
        </CardActions>
      </Card> */}
      <div className="flex flex-col  border-2 border-rose-800 justify-center items-center w-[500px]	">
        <div className=" flex basis-1/2 border-2 border-green-200">
          <img src={imageLink} className=" h-[400px] w-[400px] " alt="" />
        </div>
        <div className="flex flex-col basis-1/2 border-2 border-black-500">
          <div>{description}</div>
          <div>{price}</div>
          {/* <div className=" flex border border-solid border-black  	">ketan mehta</div> */}

          {/* <div>{description}</div> */}
          {/* <div>{description}</div> */}
        </div>
      </div>
    </div>
  );
}
export default Course;
