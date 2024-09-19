import React, { useState } from "react";
import {
  Popover,
  List,
  ListItem,
  ListItemText,
  Typography,
  ListItemButton,
  
  ListItemIcon,
} from "@mui/material";
import { bgColors } from "../../../utils/colorTheme";
import { SiMarketo } from "react-icons/si";
import { SiTicktick } from "react-icons/si";
import { GoDotFill } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";
import { GiSandsOfTime } from "react-icons/gi";
import { VscIssueDraft } from "react-icons/vsc";
import { MdChecklist } from "react-icons/md";
import { BiSolidCategory } from "react-icons/bi";
import { GrStatusUnknownSmall } from "react-icons/gr";

const TemplatesFilterPopover = ({
  anchorEl,
  handleClose,
  options,
  subOptions,
  handleOptionClick,
}: {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  options: { id: number; option: string }[];
  subOptions: { Category: []; SubCategory: []; Status: [] } | any;
  handleOptionClick: (option: string, subOption: string) => void;
}) => {
  const [nestedAnchorEl, setNestedAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleNestedPopoverOpen = (
    option: string,
    event: React.MouseEvent<HTMLElement>
  ) => {
    // option !== "View All"
    //   ? (setSelectedOption(option), setNestedAnchorEl(event.currentTarget))
    //   : handleOptionClick("", "");
  };

  const handleNestedPopoverClose = () => {
    setNestedAnchorEl(null);
  };

  const handleSubOptionClick = (option: string, subOption: string) => {
    handleOptionClick(option, subOption);
    handleNestedPopoverClose();
  };

  const getIconComponent = (option: any) => {
    switch (option) {
      case "Marketing":
        return <SiMarketo />;
      // Add more cases as needed
      case "Pending":
       return <GiSandsOfTime />;
      case "Approved":
       return <SiTicktick />;
       case "Rejected":
       return <IoIosCloseCircle  />;
       case "Draft":
       return <VscIssueDraft />;
       case "Deleted":
       return <MdDelete />;
       case "View All":
       return <MdChecklist />;
       case "Category":
       return <BiSolidCategory />;
       case "Status":
       return <GrStatusUnknownSmall />;
      default:
        return <GoDotFill />; // Default icon or content
    }
  };

  return (
    <>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <List>
          {options?.map((option) => (
            <ListItem
              key={option.id}
              onClick={(e) => handleNestedPopoverOpen(option?.option, e)}
              sx={{
                cursor: "pointer",
                padding: "0",
                margin: "0",
                height: "30px",
                fontSize: "14px",
                paddingRight: "5px"
              }}
            >
              <ListItem
                  key={option.option}
                  sx={{
                    cursor: "pointer",
                    padding: "0",
                    margin: "0",
                    height: "30px",
                    fontSize: "14px",
                  }}
                >
                  <ListItemButton
                    sx={{
                      cursor: "pointer",
                      padding: "0",
                      margin: "0",
                      height: "30px",
                      fontSize: "14px",
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        cursor: "pointer",
                        padding: "0",
                        margin: "0",
                        width: "20px",
                        height: "20px",
                        transform: "scale(0.8)",
                        marginLeft: "5px",
                        paddingTop: "2px",
                      }}
                    >
                      {getIconComponent(option?.option)}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography sx={{ cursor: "pointer", fontSize: '14px', display: "flex", alignItems: "center" }}>
                          {option?.option}
                        </Typography>
                      }
                      sx={{
                        cursor: "pointer",
                        padding: "0",
                        margin: "0",
                        height: "30px",
                        transform: "scale(0.9)",
                        marginLeft: "-30px",
                        paddingTop: "3px",
                        minWidth: 0, // Ensure text doesn't create extra space
                      }}
                    />
                  </ListItemButton>
                </ListItem>
            </ListItem>
          ))}
        </List>
      </Popover>
      {selectedOption !== "View All" && (
        <Popover
          open={Boolean(nestedAnchorEl)}
          anchorEl={nestedAnchorEl}
          onClose={handleNestedPopoverClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <List>
            {(subOptions[selectedOption] || [])?.map((subOption: any) => (
              <ListItem
                key={subOption?.id}
                onClick={() =>
                  handleSubOptionClick(
                    selectedOption,
                    selectedOption === "Status"
                      ? String(subOption?.id)
                      : subOption?.option
                  )
                }
                sx={{
                  cursor: "pointer",
                  padding: "0",
                  margin: "0",
                  height: "30px",
                  fontSize: "14px",
                  paddingRight: "5px"
                }}
              >
                <ListItem
                  key={subOption?.option}
                  sx={{
                    cursor: "pointer",
                    padding: "0",
                    margin: "0",
                    height: "30px",
                    fontSize: "14px",
                  }}
                >
                  <ListItemButton
                    sx={{
                      cursor: "pointer",
                      padding: "0",
                      margin: "0",
                      height: "30px",
                      fontSize: "14px",
                      display: "flex",
                      alignItems: "center"
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        cursor: "pointer",
                        padding: "0",
                        margin: "0",
                        width: "20px",
                        height: "20px",
                        transform: "scale(0.9)",
                        marginLeft: "5px",
                        paddingTop: "2px",
                      }}
                    >
                      {getIconComponent(subOption?.option)}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography sx={{ cursor: "pointer", fontSize: '14px', display: "flex", alignItems: "center" }}>
                          {subOption?.option}
                        </Typography>
                      }
                      sx={{
                        cursor: "pointer",
                        padding: "0",
                        margin: "0",
                        height: "30px",
                        transform: "scale(0.9)",
                        marginLeft: "-30px",
                        paddingTop: "3px",
                        minWidth: 0, // Ensure text doesn't create extra space
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </ListItem>
            ))}
          </List>
        </Popover>
      )}
    </>
  );
};

export default TemplatesFilterPopover;
