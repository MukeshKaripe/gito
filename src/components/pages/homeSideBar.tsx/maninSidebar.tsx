import { Badge, Box, Grid, Typography } from "@mui/material";
import { bgColors } from '../../../utils/colorTheme';
import { makeStyles } from '@mui/styles';
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const useStyles = makeStyles({
    formatContainer: {
      backgroundColor: bgColors.white2,
      textAlign: "center",
      display: "flex",
      overflowY: "auto",                
      // scrollbarWidth: "thin",
    },
    lineStyles: {
      border: "none",
      borderTop: "3px solid #4B5A5A",
      width: "80%",
      margin: "0 auto",
      opacity: "20%",
    },
    cursorClass: {
      cursor: "pointer",
      opacity: "60%",
    },
    selected: {
      opacity: "100%",
    },
  });
const MainSideBar = (props: any) => {
    const classes = useStyles();
  const location = useLocation();

    const navigate = useNavigate();
   const handleInboxClick = () =>{
    // navigate('/template')
   }
   const handleNavigation = (path: string) => {
    navigate(path);
  };
  const handleTemplateClick = () => {
    handleNavigation("/templates/library") 
  };
    return (
      <Grid
        sx={{
          flexDirection: { xs: "row", md: "column" },
          height: { xs: "67px", md: "100vh !important" },
          paddingLeft: { xs: "10px", md: "0px" },
          overflowX: "hidden",
        }}
        className={classes.formatContainer}
      >
        {/* py={{ xs: 1, md: 2.5 }} */}
        <Box pt={{ xs: 1, md: 2 }} pb={1}>
            Logo
          {/* <EngagetoSmallLogoSvg /> */}
        </Box>
        <hr className={classes.lineStyles} />
  
            <Box>
          
              <Box
                mt={{ xs: 3, md: 2 }}
                mb={{ xs: 0, md: 2.5 }}
                mx={{ xs: 1.5, md: 0 }}
                className={`${classes.cursorClass} ${
                    location.pathname.includes("/templates/library") &&
                    !location.pathname.includes("/inbox-settings") &&
                    classes.selected
                  }`}
                onClick={handleTemplateClick}
              >
                <Badge
                  badgeContent={props?.totalUnreads}
                  color="success"
                  sx={{
                    "& .MuiBadge-badge": {
                      fontSize: "10px", // Adjust the font size here
                      height: "16px",
                      minWidth: "16px",
                    },
                  }}
                >
                  {/* <InboxSvg /> */}
                </Badge>
                <Typography
                  sx={{
                    fontSize: "12px",
                    display: { xs: "none", md: "flex" },
                    justifyContent: "center",
                  }}
                  color="#4B5A5A"
                >
                 Template
                </Typography>
              </Box>
              <Box
                mt={{ xs: 3, md: 2 }}
                mb={{ xs: 0, md: 2.5 }}
                mx={{ xs: 1.5, md: 0 }}
                className={`${classes.cursorClass} ${
                  location.pathname.includes("/inbox") &&
                  !location.pathname.includes("/inbox-settings") &&
                  classes.selected
                }`}
                onClick={handleInboxClick}
              >
                <Badge
                  badgeContent={props?.totalUnreads}
                  color="success"
                  sx={{
                    "& .MuiBadge-badge": {
                      fontSize: "10px", // Adjust the font size here
                      height: "16px",
                      minWidth: "16px",
                    },
                  }}
                >
                  {/* <InboxSvg /> */}
                </Badge>
                <Typography
                  sx={{
                    fontSize: "12px",
                    display: { xs: "none", md: "flex" },
                    justifyContent: "center",
                  }}
                  color="#4B5A5A"
                >
                Themes
                </Typography>
              </Box>
              </Box>

      </Grid>
    );
  };
  export default MainSideBar;