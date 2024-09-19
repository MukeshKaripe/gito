import React, { useEffect, useState } from 'react';
import MyComponent from './components/mycomponent';
import { Box, CircularProgress } from '@mui/material';
import AppRoutes from './routes/route';

const App: React.FC = () => {
  const [loader,setLoader] = useState(true);
  useEffect(()=> { const timerCount = setTimeout(() => {
      setLoader(false);
  }, 100); 
return ()=> {
  clearTimeout(timerCount);
  console.log(timerCount);
  
};
},[]  );
  return (
    <div>
      {loader ? (  <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress />
        </Box>): (<AppRoutes />) }
    </div>
  );
};

export default App;
