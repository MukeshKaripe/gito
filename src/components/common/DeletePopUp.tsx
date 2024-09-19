import {
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
  } from "@mui/material";
  import { makeStyles } from "@mui/styles";
  import React from "react";
  import { bgColors } from "../../utils/colorTheme";
  import RedDeleteIconSvg from "../../assets/svgs/RedDeleteIconSvg";
  
  const useStyles = makeStyles({
    signOutButtonStyles: {
      backgroundColor: "#3C3C3C",
      color: "#ffffff",
      height: "40px",
      borderRadius: "8px",
      width: "190%",
      padding: "8px",
      fontWeight: "600",
      cursor: "pointer",
    },
    cancelButtonStyles: {
      backgroundColor: "#ffffff",
      color: "#000000",
      height: "40px",
      borderRadius: "8px",
      border: `1px solid ${bgColors.gray3}`,
      width: "180%",
      padding: "8px",
      fontWeight: "600",
      cursor: "pointer",
    },
    grayColor: {
      color: `${bgColors.black1} !important`,
      opacity: "60% !important",
      fontWeight: "600 !important",
    },
  });
  
  const DeletePopUp = ({
    open,
    handleDelete,
    handleClose,
    title,
    handleLoad,
  }: any) => {
    const classes = useStyles();
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: { minWidth: "18%", borderRadius: "20px", padding: "0px 40px" },
        }}
      >
        <Box
          mt={3}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <RedDeleteIconSvg />
        </Box>
        <DialogTitle>
          <Box>
            <Typography textAlign="center" variant="h6">
              Are you sure
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box>
            <Box textAlign="center">
              <Typography variant="body2" className={classes.grayColor}>
                Do you really want to delete {title.toLowerCase()}?
              </Typography>
            </Box>
          </Box>
        </DialogContent>
  
        <Box
          mb={3}
          display="flex"
          flexDirection="row"
          gap={2}
          justifyContent={"center"}
        >
         
            <>
              <button
                className={classes.cancelButtonStyles}
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                className={classes.signOutButtonStyles}
                onClick={handleDelete}
              >
                Delete
              </button>
            </>
          
        </Box>
      </Dialog>
    );
  };
  
  export default DeletePopUp;
  