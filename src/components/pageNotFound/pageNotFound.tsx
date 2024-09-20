import { Box, Button } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { useNavigate } from "react-router-dom";
import { bgColors } from '../../utils/colorTheme';
import pageNotFound from '../../assets/images/notfound.webp';
import { url } from "inspector/promises";
const useStyles = makeStyles({
  container: {
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
    borderRadius: "15px",
  
    // background: `url('../../assets/images/notfound.webp') no-repeat center center/cover`
    backgroundImage: `url("/images.jpg")`,
    //   backgroundImage:'url(../../assets/images/notfound.webp)'
  },
  flex: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingBlock: "3%",
    marginBlock: "4%",
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
const PageNotFound = () => {
  const classes = useStyles();

  const navigate = useNavigate()
  return (
    <Box  className={classes.flex}  sx={{ width: '500px', margin: 'auto', textAlign: 'center' }}>
      <img style={{width:'100%',height:'50%',marginBottom:'20px'}}  src={pageNotFound} alt="" />


      <Button onClick={() => { navigate('/login') }} >Back to Login</Button>
    </Box>
  );
};

export default PageNotFound;
