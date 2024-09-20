import { Box, Grid, Typography } from '@mui/material';
import MainSideBar from './homeSideBar.tsx/maninSidebar';
import AllTemplates from './template/templatesMain';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const location = useLocation();

  const isTemplate = location.pathname.startsWith("/templates");
  return (
    <Grid container  sx={{ position:'relative', width:'100%' }}>
     <Grid xs={12} sx={{position:'absolute',top:'0',left:'0',width:'120px'}}  >
      <MainSideBar></MainSideBar>
     </Grid>
      {/* <Typography variant="h4">Welcome to the Home Page!</Typography> */}
   <Grid  sx={{marginLeft:'120px' , width:'100%' }} >
    hello
   {isTemplate && <AllTemplates />}
   </Grid>
    </Grid>
  );
};

export default Home;
