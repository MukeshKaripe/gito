import { useEffect, useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { makeStyles } from '@mui/styles';

import { Navigate, useNavigate } from 'react-router-dom';
import {bgColors} from '../../utils/colorTheme';
const defaultSignin = [{
  id: '1',
  email: 'mukesh@gmail.com',
  password: 'Aa2000@@'
},
{
  id: '2',
  email: 'anil@gmail.com',
  password: 'Aa2000@@'
},
];
const useStyles = makeStyles({
  container: {
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
    borderRadius: "15px",
    paddingBlock: "3%",
    marginBlock: "4%",
    boxSizing: "border-box",
    backgroundColor: "#ffffff",
  }});
const Signup = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '', confirmPassword: '' });
  const [combineSignin, setCombinedsignin] = useState([...defaultSignin]);
  const [passwordError, setPasswordError] = useState(credentials.password);
  const [confirmPasswordError, setconfirmPasswordError] = useState(credentials.confirmPassword);

  const [EmailError, setEmailError] = useState(credentials.email);
  const navigate = useNavigate();

const classes = useStyles();

  //handle validation for email

  const validateEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
      setEmailError("Email Cannot Be Empty");
      return false;
    }
   else if (!emailPattern.test(email.toLowerCase())) {
      setEmailError("Invalid Email Address");
      return false;
    }

    setEmailError("");
    return true;
  };
  //handle validation for password

  const validatePassword = (password: string) => {
    const passwordPattern =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
;
    if (password === "") {
      setPasswordError("Password Cannot Be Empty");
      return false;
    }
    else if(!passwordPattern.test(password) && password !== "" ){
      setPasswordError("Password must be at least 8 characters long and one lowercase letter,uppercase letter, number, and special character.");
      return false;
    }
    
    
    setPasswordError("");
    return true;
  };

  //handle confirm password
const valideConfirmPassword = (confirmPassword:string) =>{

  if (confirmPassword === "") {
    setconfirmPasswordError("Confirm Password Cannot Be Empty");
    return false;
  }
  else if (confirmPassword !== "" && credentials.password !== credentials.confirmPassword   ){
    setconfirmPasswordError('Password is not matched ');
    return false;
   }
   setconfirmPasswordError("");
   return true;
}

  //handle signup
  const handleSignup = () => {
    const isEmailValid = validateEmail(credentials.email);
    const isPasswordValid = validatePassword(credentials.password);
    const isConfirmPasswordValid = valideConfirmPassword(credentials.confirmPassword);
    // toast.success('Account Created ');
    // navigate('/login');
    if (isEmailValid && isPasswordValid && isConfirmPasswordValid ) {
      toast.success('Account Created ');
        navigate('/login');
      // if (credentials.password === credentials.confirmPassword) {
      //   toast.success('Account Created ');
      //   navigate('/login');
      //   isValidUser=true;
      // }
      // else if (!isValidUser) {
      //   toast.error('Form is Invalid ');
      // }
    }
    
  


    console.log(credentials);
  };
  useEffect(() => {
    const updatedSignin = [...defaultSignin, { ...credentials, id: Date.now().toString() }];
    setCombinedsignin(updatedSignin);
    localStorage.setItem('loginData', JSON.stringify(updatedSignin))

  }, [credentials])

  return (
    <Box className={classes.container} sx={{ width: '500px', margin: 'auto', textAlign: 'center' }}>
    
    <Box sx={{ width: '300px', margin: 'auto', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>SignUp</Typography>
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        error={!!EmailError}
        helperText={EmailError}
        value={credentials.email}
        onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        error={!!passwordError}
        helperText={passwordError}
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
      />
      <TextField
        label="Confirm Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        error={!!confirmPasswordError}
        helperText={confirmPasswordError}
        value={credentials.confirmPassword}
        onChange={(e) => setCredentials({ ...credentials, confirmPassword: e.target.value })}
      />
      <Button sx={{ mt: 2 }} variant="contained" fullWidth onClick={handleSignup} >
        Signup
      </Button>
      <Typography sx={{ m: 2 }} >Have an account !  <a href='/login' >  LogIn </a>  </Typography>
    </Box>
    </Box>
  );
};

export default Signup;
