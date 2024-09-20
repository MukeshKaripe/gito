import { bgColors } from "../../../utils/colorTheme";
import { makeStyles } from "@mui/styles";
import {
  Box,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import TemplatesFilterPopover from "../../../components/pages/template/templatesFilterPopup";
import React, { useCallback, useEffect, useRef, useState } from "react";
import TemplateComponent from "./templatesFilterPopup";
import EditIconSvg from "../../../assets/svgs/EditIconSvg";
import DeleteIconSvg from "../../../assets/svgs/DeleteIconSvg";
import SearchIconSvg2 from "../../../assets/svgs/SearchIconSvg2";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { TbTemplate } from "react-icons/tb";
import { SiMarketo } from "react-icons/si";
import { SiTicktick } from "react-icons/si";
import { MdDelete } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";
import { VscIssueDraft } from "react-icons/vsc";
import { MdChecklist } from "react-icons/md";
import { BiSolidCategory } from "react-icons/bi";
import { GiSandsOfTime } from "react-icons/gi";
import ArrowDownSvg from "../../../assets/svgs/ArrowDownSvg";
import DeletePopUp from "../../common/DeletePopUp";


const theme = createTheme({
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          // Adjust the default padding for all TableCell components
          padding: "0px", // Set your desired padding value here
        },
      },
    },
  },
});

const useStyles = makeStyles({
  mainContainer: {
    backgroundColor: bgColors.white1,
    padding: "14px",
    height: "100vh",
    width: "100%",
    overFlow: "hidden !important",
  },
  bgContainer: {
    backgroundColor: bgColors.white,
    borderRadius: "25px",
    height: "100%",
    width: "100%",
    overFlow: "hidden !important",
    display: "flex",
    flexDirection: "column",
  },
  searchField: {
    width: "100%",
    borderRadius: "12px",
    // height: "38px",
    // backgroundColor: bgColors.white2,
    backgroundColor: "white",
    "& input::placeholder": {
      textAlign: "left",
      fontSize: "14px",
      fontFamily: "inter",
      color: "#000000 !important",
    },
  },
  manageContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  blackColor: {
    color: `${bgColors.black1} !important`,
    // fontWeight: "600 !important",
  },
  grayColor: {
    color: `${bgColors.black1} !important`,
    opacity: "60% !important",
  },
  messageCountContainer: {
    // border: `2px solid ${bgColors.gray5}`,
    // borderRadius: "5px",
    // padding: "3px",
    // paddingRight: "5px",
  },
  messageInnerContainer: {
    border: "2px solid #F2F2F2",
    borderRadius: "6px",
    paddingInline: "4px",
    display: "flex",
    flexDirection: "row",
  },
  iconStyles: {
    cursor: "pointer",
    paddingLeft: "5px",
  },
  rotatedIcon: {
    cursor: "pointer",
    paddingRight: "5px",
    transform: "rotate(180deg)",
  },
  popoverContent: {
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    textAlign: "left",
  },
  table: {
    borderCollapse: "separate",
    borderSpacing: "0",
    textAlign: "center",
    borderColor: "lightgray",
    "& th, & td": {
      // borderTop: '1px solid gray',
      borderBottom: "1px solid #f0f0f0",
      height: "35.8px",
    },
    "& th:first-child, & td:first-child": {
      borderLeft: "none",
    },
    "& th:last-child, & td:last-child": {
      borderRight: "none",
    },
  },
  SaveChangesButton: {
    color: bgColors.green,
    border: `1px solid ${bgColors.green}`,
    // backgroundColor: bgColors.green,
    // color: bgColors.white,
    borderRadius: "8px",
    width: "120px",
    height: "32px",
    cursor: "pointer",
  },
  statusApproved: {
    backgroundColor: bgColors.green,
    color: bgColors.white,
    borderRadius: "20px",
    width: "100px",
    height: "25px",
    textAlign: "center",
    padding: "3px",
    fontSize: "12px",
  },
  statusPending: {
    backgroundColor: bgColors.yellow,
    color: bgColors.white,
    borderRadius: "20px",
    width: "100px",
    height: "25px",
    textAlign: "center",
    padding: "3px",
    fontSize: "12px",
  },
  statusRejected: {
    backgroundColor: bgColors.red,
    color: bgColors.white,
    borderRadius: "20px",
    width: "100px",
    height: "25px",
    textAlign: "center",
    padding: "3px",
    fontSize: "12px",
  },
  statusDrafted: {
    backgroundColor: bgColors.blue,
    color: bgColors.white,
    borderRadius: "20px",
    width: "100px",
    height: "25px",
    textAlign: "center",
    padding: "3px",
    fontSize: "12px",
  },
  statusDeleted: {
    backgroundColor: bgColors.black,
    color: bgColors.white,
    borderRadius: "20px",
    width: "100px",
    height: "25px",
    textAlign: "center",
    padding: "3px",
    fontSize: "12px",
  },
  teamProfileContainer: {
    display: "flex",
    alignItems: "center",
  },
});

const options = [
  {
    id: 1,
    option: "View All",
  },
  {
    id: 2,
    option: "Category",
  },
  // {
  //   id: 3,
  //   option: "SubCategory",
  // },
  {
    id: 3,
    option: "Status",
  },
];

const subOptions = {
  Category: [{ id: 1, option: "Marketing" }],
  // SubCategory: subCategoriesList,
  Status: [
    { id: 1, option: "Pending" },
    { id: 2, option: "Approved" },
    { id: 3, option: "Rejected" },
    { id: 4, option: "Draft" },
    { id: 5, option: "Deleted" },
  ],
};

const AllTemplates = () => {
  const classes = useStyles();

 

  const [isDeleteTemplateLoading, setIsDeleteTemplateLoading] = useState(false);
  const [
    newTemplatePermissionTooltipOpen,
    setNewTemplatePermissionTooltipOpen,
  ] = useState(false);
  const [
    editTemplatePermissionTooltipOpen,
    setEditTemplatePermissionTooltipOpen,
  ] = useState("");
  const [
    deleteTemplatePermissionTooltipOpen,
    setDeleteTemplatePermissionTooltipOpen,
  ] = useState("");
  const [selectedFilter, setSelectedFilter] = React.useState({
    column: "",
    value: "",
  });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [editObjectData, setEditObjectData] = React.useState({
    canEdit: false,
    templateId: "",
  });
  const [isHovered, setIsHovered] = React.useState(false);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [search, setSearch] = React.useState(null);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [deleteToBeId, setDeleteToBeId] = useState("");
  const [hoveredRow, setHoveredRow] = useState(null);

  const hasAccess = (permission: any) => {
 
    return false;
  };

  const handleDeletePopup = (id: any) => {
    const hasPermissionToDeleteTemplate = hasAccess("deleteTemplate");
    if (hasPermissionToDeleteTemplate) {
      setOpenDeletePopup(true);
      setDeleteToBeId(id);
    } else {
      setDeleteTemplatePermissionTooltipOpen(id);
      setTimeout(() => {
        setDeleteTemplatePermissionTooltipOpen("");
      }, 2000);
    }
  };

  const handleDeletePopupClose = () => {
    setOpenDeletePopup(false);
    setDeleteToBeId("");
  };

  const handleTemplateFilter = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseFilterPopover = () => {
    setAnchorEl(null);
  };
  const handleOptionClick = (option: string, subOption: string) => {
    // console.log("option", option, subOption);
    // setPageData([]);
    setPageNumber(1);
    setSelectedFilter({
      column: option,
      value: subOption,
    });
    handleCloseFilterPopover();
  };
  const handleOpenDialog = (action: string, templateId: string) => {
    const hasPermissionToAddTemplate = hasAccess("newTemplate");
    const hasPermissionToEditTemplate = hasAccess("editTemplate");
    if (action === "add" && hasPermissionToAddTemplate) {
      setOpenDialog(true);
      setEditObjectData({ canEdit: false, templateId: "" });
    } else if (action === "add" && !hasPermissionToEditTemplate) {
      setNewTemplatePermissionTooltipOpen(true);
      setTimeout(() => {
        setNewTemplatePermissionTooltipOpen(false);
      }, 2000);
    } else if (action === "edit" && hasPermissionToEditTemplate) {
      setOpenDialog(true);
      setEditObjectData({ canEdit: true, templateId: templateId });
    } else {
      setEditTemplatePermissionTooltipOpen(templateId);
      setTimeout(() => {
        setEditTemplatePermissionTooltipOpen("");
      }, 2000);
    }
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleDeleteTemplate = async (templateId: string) => {
    setIsDeleteTemplateLoading(true);
   
 
    setIsDeleteTemplateLoading(false);
  };


  const handleRowHover = (rowId: any) => {
    setHoveredRow(rowId);
  };

  const formatDate = (datetime: any) => {
    const date = new Date(datetime);
    // Convert UTC to IST by adding 5 hours and 30 minutes
    date.setHours(date.getHours() + 5);
    date.setMinutes(date.getMinutes() + 30);

    const year = date.getFullYear();
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[date.getMonth()];
    const day = ("0" + date.getDate()).slice(-2);
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const seconds = ("0" + date.getSeconds()).slice(-2);
    return `${day} ${month} ${year} ${hours}:${minutes}:${seconds}`;
  };
  const getStatusButton = (status: any) => {
    switch (status) {
      case 1:
        return { label: "Pending", color: "#ff9800" }; // Warning (Orange)
      case 2:
        return { label: "Approved", color: "#4caf50" }; // Success (Green)
      case 3:
        return { label: "Rejected", color: "#c6131b" }; // Secondary (Purple)
      case 4:
        return { label: "Draft", color: "#1976d2" }; // Primary (Blue)
      case 5:
        return { label: "Deleted", color: "#000" }; // Success (Green)
      default:
        return { label: "", color: "" }; // Default (Gray)
    }
  };
  // console.log("templatesSliceall", templatesSlice);
  // console.log("search", Boolean(search));
  const [isLoadingMore, setIsLoadingMore] = useState(false);
//   const [pageData, setPageData] = useState(allTemplatesData || []);
  // const [page, setPage] = useState(1);
  const tableContainerRef = useRef(null);
  const handleScroll = () => {
    if (tableContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        tableContainerRef.current;
    
    }
  };

  const getIconComponent = (option: any) => {
    // console.log('Option.....',option);
    switch (option) {
      case "Marketing":
        return (
          <span style={{ display: "flex", alignItems: "center" }}>
            <span style={{ paddingTop: "3px" }}>
              <SiMarketo />
            </span>
            &nbsp; Marketing
          </span>
        );
      // Add more cases as needed
      case "1":
        return (
          <span style={{ display: "flex", alignItems: "center" }}>
            <span style={{ paddingTop: "3px" }}>
              <GiSandsOfTime />
            </span>
            &nbsp; Pending
          </span>
        );
      case "2":
        return (
          <span style={{ display: "flex", alignItems: "center" }}>
            <span style={{ paddingTop: "3px" }}>
              <SiTicktick />
            </span>
            &nbsp; Approved
          </span>
        );
      case "3":
        return (
          <span style={{ display: "flex", alignItems: "center" }}>
            <span style={{ paddingTop: "3px" }}>
              <IoIosCloseCircle />
            </span>
            &nbsp; Rejected
          </span>
        );
      case "4":
        return (
          <span style={{ display: "flex", alignItems: "center" }}>
            <span style={{ paddingTop: "3px" }}>
              <VscIssueDraft />
            </span>
            &nbsp; Draft
          </span>
        );
      case "5":
        return (
          <span style={{ display: "flex", alignItems: "center" }}>
            <span style={{ paddingTop: "3px" }}>
              <MdDelete />
            </span>
            &nbsp; Deleted
          </span>
        );
      case "":
        return (
          <span style={{ display: "flex", alignItems: "center" }}>
            <span style={{ paddingTop: "3px" }}>
              <MdChecklist />
            </span>
            &nbsp; View All
          </span>
        );
      case "Category":
        return (
          <span style={{ display: "flex", alignItems: "center" }}>
            <span style={{ paddingTop: "3px" }}>
              <BiSolidCategory />
            </span>
            &nbsp; Category
          </span>
        );
      case "Status":
        return (
          <span style={{ display: "flex", alignItems: "center" }}>
            <span style={{ paddingTop: "3px" }}></span>&nbsp; Status
          </span>
        );
      default:
        return ""; // Default icon or content
    }
  };

  return (
    <>
       
        <Grid className={classes.mainContainer} overflow={"hidden"}>
          <Box className={classes.bgContainer}>
            <Box style={{ height: "120px" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    display: { xs: "block", md: "flex" },
                    width: "100%",
                    alignItems: "center",
                  }}
                  m={{ xs: 1, md: 0 }}
                >
                  <Typography
                    variant="h6"
                    // ml={{ xs: 1, md: 4 }}
                    ml={3}
                    className={classes.blackColor}
                    sx={{ display: "flex", marginLeft: "15px" }}
                  >
                    <span style={{ marginTop: "2px" }}>
                      <TbTemplate />
                    </span>{" "}
                    &nbsp;All&nbsp;Templates
                  </Typography>
                  <TextField
                    className={classes.searchField}
                    variant="standard"
                    size="small"
                    fullWidth
                    value={search}
                    onChange={(event: any) => {
                      setPageNumber(1);
                      setSearch(event?.target.value);
                    }}
                    InputProps={{
                      disableUnderline: true,
                      style: {
                        fontSize: "12px",
                        padding: "7px",
                        height: "38px",
                      },
                      startAdornment: (
                        <IconButton
                          sx={{ p: 0, color: "inherit" }}
                          aria-label="search"
                        >
                          {/* <SearchIconSvg /> */}
                          <SearchIconSvg2 />
                        </IconButton>
                      ),
                    }}
                    inputProps={{
                      style: {
                        // Additional style for placeholder
                        fontWeight: "600 !important",
                        paddingTop: "3px", // Apply font weight here
                      },
                    }}
                    sx={{ mx: 4 }}
                    placeholder="Search all templates"
                  />
                </Box>
                <Box style={{ marginLeft: "auto" }} m={3}>
                  <Tooltip
                    title="Access Denied"
                    placement="top"
                    open={newTemplatePermissionTooltipOpen}
                    onClose={() => setNewTemplatePermissionTooltipOpen(false)}
                  >
                    <button
                      className={classes.SaveChangesButton}
                      onClick={() => handleOpenDialog("add", "")}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      style={{
                        backgroundColor: isHovered
                          ? "rgba(68, 71, 70, 0.08)"
                          : "#fff",
                        cursor: isHovered ? "pointer" : "default",
                      }}
                    >
                      + Add Template
                    </button>
                  </Tooltip>
                  {/* <TemplateComponent
                    editObjectData={editObjectData}
                    open={openDialog}
                    handleClose={handleCloseDialog}
                  /> */}
                </Box>
              </Box>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
                ml={2}
              >
                <Box style={{ display: "flex", flexDirection: "row" }}>
                  <Box className={classes.messageCountContainer} mx={0}>
                    <Box className={classes.messageInnerContainer}>
                      <Typography
                        // variant="body2"
                        className={classes.grayColor}
                        style={{
                          fontSize: 12,
                          padding: "3px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {getIconComponent(selectedFilter?.value)}
                        &nbsp; &nbsp;|
                      </Typography>
                      <Box
                        className={
                          anchorEl ? classes.rotatedIcon : classes.iconStyles
                        }
                        onClick={handleTemplateFilter}
                      >
                        <ArrowDownSvg />
                      </Box>
                      <TemplatesFilterPopover
                        anchorEl={anchorEl}
                        handleClose={handleCloseFilterPopover}
                        options={options}
                        subOptions={subOptions}
                        handleOptionClick={handleOptionClick}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box style={{ flex: "1", overflow: "hidden" }}>
              <ThemeProvider theme={theme}>
                <TableContainer
                  component={Box}
                  mt={2}
                  sx={{
                    height: "100%",
                    scrollBehavior: "smooth",
                    // overflowY:
                    //   pageData?.length !== 0 && pageData !== null
                    //     ? "scroll"
                    //     : "hidden",
                    // scrollbarWidth:
                    //   pageData?.length !== 0 && pageData !== null ? "thin" : "none",
                  }}
                  onScroll={handleScroll}
                  ref={tableContainerRef}
                  // px={1}
                >
                  <Table className={classes.table} sx={{ fontSize: "14px" }}>
                    <TableHead>
                      <TableRow className={classes.grayColor}>
                        <TableCell
                          sx={{ paddingLeft: "20px", maxWidth: "30%" }}
                        >
                          Template Name
                        </TableCell>
                        <TableCell>Created by</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>SubCategory</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                 
                      <TableBody>
                       
                          <TableRow
                            sx={{
                              position: "relative",
                              height: "70vh",
                            }}
                          >
                            <TableCell
                              colSpan={12}
                              sx={{
                                width: "100%",
                                fontSize: "16px",
                                textAlign: "center",
                                top: "20px",
                                border: "none !important",
                              }}
                            >
                              No Data Found
                            </TableCell>
                          </TableRow>
                       
                      </TableBody>
                    
                  </Table>
               
                </TableContainer>
              </ThemeProvider>
            </Box>
          </Box>
          <br />
          {/* <PaginationComponent
        total={templatesSlice?.data?.total}
        setPage={setPageNumber}
      /> */}
          <DeletePopUp
            title="Template"
            open={openDeletePopup}
            handleClose={handleDeletePopupClose}
            handleDelete={() => {
              handleDeleteTemplate(deleteToBeId);
            }}
            handleLoad={isDeleteTemplateLoading}
          />
        </Grid>
      
    </>
  );
};

export default AllTemplates;
