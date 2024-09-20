

import { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';

import { makeStyles } from '@mui/styles';
import {bgColors} from '../../utils/colorTheme';
import { toast } from 'react-toastify';
const useStyles = makeStyles({
  container: {
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
    borderRadius: "15px",
    paddingBlock: "3%",
    marginBlock: "4%",
    boxSizing: "border-box",
    backgroundColor: "#ffffff",
  },
  button: {
    backgroundColor: `${bgColors.green}!important`,
    width: "100% !important",
    fontSize: "14px !important",
    fontWeight: "Semi Bold !important",
    borderRadius: "8px !important",
  },
  link: {
    fontSize: "16px!important",
    color: bgColors.green,
    cursor: "pointer",
  },
  promptText: {
    marginBottom: "4% !important",
    fontWeight: "bold !important",
    textAlign: "left",
  },
  blackColor: {
    color: "#303030 !important",
    fontWeight: "600 !important",
    fontSize: "14px !important",
  },
  // boldLabel: {
  //   fontWeight: "500",
  //   color:"#646E7B"
  // },
  boldLabel: {
    // fontSize:"18px",
    fontWeight: "500",
    fontFamily: "inter",
    // color:"#646E7B"
    color: "rgba(100, 110, 123, 0.9)",
    // rgba(100, 110, 123, 1)
  },
});
const Login = ({ setIsAuthenticated }: any) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [passwordError, setPasswordError] = useState(credentials.password);
  const [EmailError, setEmailError] = useState(credentials.email);
  const [erorr, setError] = useState("");
const classes = useStyles();

  const navigate = useNavigate();
  const validationLogin = localStorage.getItem('loginData');

  const handleDataLogin = validationLogin ? JSON.parse(validationLogin) : [];
  // console.log(validationLogin,'validations details');

  //handle validation for email

  const validateEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === ""  ) {
      setEmailError("Email Cannot Be Empty");
      return false;
    }
   else if (!emailPattern.test(email.toLowerCase()) && email !== "" ) {
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
    if (password === ""  ) {
      setPasswordError("Password Cannot Be Empty");
      return false;
    }
    else if(!passwordPattern.test(password)){
      setPasswordError("Please Enter a Valid Password");
      return false;
    }

    setPasswordError("");
    return true;
  };

    //handle login submit
    const handleLogin = () => {
      const isEmailValid = validateEmail(credentials.email);
      const isPasswordValid = validatePassword(credentials.password);
      if (isEmailValid && isPasswordValid) {
        let isValidUser = false;

        try {
          for (let index = 0; index < handleDataLogin.length; index++) {
            const element = handleDataLogin[index];
            // Dummy login validation
            if (credentials.email !== '' && credentials.password !== '') {

              if (credentials.email === element.email && credentials.password === element.password) {
                setIsAuthenticated(true);
                localStorage.setItem('isAuthenticated', 'true');
                toast.success('Login successful!');
                console.log(element.email, 'validated mail info');

                navigate('/');
                isValidUser = true; // Set user as valid since a match is found
                break; // No need to continue checking, exit the loop
              }
              // else if (credentials.email != element.email && credentials.password != element.password) {
              //   toast.error('Invalid email or password!');
              // }
            }
        
      
          }
          if (!isValidUser) {
            toast.error('Invalid email or password!');
          }
        } catch (error) {
          console.error('Error during login:', error);
          toast.error('An error occurred. Please try again.');
        }
    
      } else {
        // Show error if email or password is invalid format
        toast.error('Invalid email or password!');
      }
      
      

    };

  return (
    <Box className={classes.container} sx={{ width: '500px', margin: 'auto', textAlign: 'center' }}>
    <Box   sx={{ width: '300px', margin: 'auto', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>LogIn</Typography>
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
      <Button variant="contained" fullWidth onClick={handleLogin} sx={{ mt: 2 }} >
        Login
      </Button>
      <Typography sx={{ m: 2 }} >Don't Have any account ? <a href='/signup' >  SignUp </a>  </Typography>
    </Box>
    </Box>

  );
};

export default Login;
