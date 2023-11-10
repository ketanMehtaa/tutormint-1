"use client"; // This is a client component 
import axios from 'axios';
import { BASE_URL } from '../../config.js';
import {
  Box,
  Button,
  Container,
  TextField,
  CircularProgress,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from 'ui';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { logIn } from '../../store';

function AddCourses() {
  const [isLoading, setIsLoading] = useState(false);
  const [isCourseCreated, setIsCourseCreated] = useState('');
  const [error, setError] = useState('');
  const [value, setValue] = useState(false);

  const [logInn, setLogIn] = useRecoilState(logIn);
  console.log('loginn addCourse',logInn);
  const handleChangePublish = (event:any) => {
    setValue(event.target.value);
    setFormData({
        ...formData,
        published: event.target.value,
      });
  };

  const initialFormData = {
    title: '',
    description: '',
    price: '',
    imageLink: '',
    published: '',
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (event:any) => {
    const { id, value } = event.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/admin/courses`, formData, {
        headers: {
          'Content-type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
      console.log('addcourse handleSubmit response',response);
      setIsCourseCreated(response.data.message);
      setIsLoading(false);
      setError('');
      setFormData(initialFormData);
    } catch (error:any) {
      setIsLoading(false);
      setError('Error creating course: ' + error?.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          border: 1,
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
          margin: 2,
        }}
      >
        <TextField
          fullWidth
          id="title"
          label="Title"
          variant="outlined"
          value={formData.title}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          id="description"
          label="Description"
          variant="outlined"
          value={formData.description}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          id="price"
          label="Price"
          variant="outlined"
          value={formData.price}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          id="imageLink"
          label="Image Link"
          variant="outlined"
          value={formData.imageLink}
          onChange={handleChange}
        />

        {/* <TextField
          fullWidth
          id="published"
          label="Published"
          variant="outlined"
          value={formData.published}
          onChange={handleChange}
        /> */}
        <FormControl sx={{alignItems:"center",display:'flex' ,flexDirection:'row',gap:'10px'}}>
          <FormLabel id="demo-controlled-radio-buttons-group" >publish</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={formData.published}
            onChange={handleChangePublish}

          >
            <FormControlLabel value="true" control={<Radio />} label="True" />
            <FormControlLabel value="false" control={<Radio />} label="False" />
          </RadioGroup>
        </FormControl>

        <Button type="submit" variant="contained" color="primary" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? <CircularProgress size={24} /> : 'Submit'}
        </Button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {isCourseCreated && <p style={{ color: 'green' }}>{isCourseCreated}</p>}
      </Box>
    </Container>
  );
}

export default AddCourses;
