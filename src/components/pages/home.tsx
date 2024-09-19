import { Box, Grid, Typography } from '@mui/material';
import MainSideBar from './homeSideBar.tsx/maninSidebar';
import AllTemplates from './template/templatesMain';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const location = useLocation();

  const isTemplate = location.pathname.startsWith("/templates");
  return (
    <Grid  sx={{ position:'relative' }}>
     <Grid xs={12} sx={{position:'absolute',top:'0',left:'0',width:'120px'}}  >
      <MainSideBar></MainSideBar>
     </Grid>
      {/* <Typography variant="h4">Welcome to the Home Page!</Typography> */}
   <Grid container sx={{marginLeft:'120px'}} >
    hello
   {isTemplate && <AllTemplates />}
   </Grid>
    </Grid>
  );
};

export default Home;
