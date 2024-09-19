import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';

const MyComponent: React.FC = () => {
    const notify = () => toast("Data saved successfully!") 
    
    ;
  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Welcome to My MUI App
      </Typography> 
      <Button variant="contained" color="primary" onClick={notify} >
        Click Me
      </Button>
      <ToastContainer/>         
    </Box>
  );
};

export default MyComponent;
