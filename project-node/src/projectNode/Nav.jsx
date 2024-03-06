import "./styleHome.css";
import { NavLink } from "react-router-dom";
import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from "@mui/icons-material/Mail";
import ShareIcon from "@mui/icons-material/Share";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PinDropIcon from "@mui/icons-material/PinDrop";
import HomeIcon from "@mui/icons-material/Home";
import BorderAllIcon from "@mui/icons-material/BorderAll";
import Logout from "@mui/icons-material/Logout";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import React, { useState } from "react";

import swal from "sweetalert";
import AddCardIcon from "@mui/icons-material/AddCard";
import Swal from "sweetalert2";
import { addCategory, addCity } from "./api";
import axios from "axios";
import { useEffect } from "react";

import { createSvgIcon } from "@mui/material/utils";
import { Chip } from "@mui/material";

export const Nav = () => {
  const PlusIcon = createSvgIcon(
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>,
    "Plus"
  );

  const c = localStorage.getItem("currentUser");
  const currentUser = JSON.parse(c);
  const token = localStorage.getItem("token");
  // const[currentUser,setC]=useState(JSON.parse(localStorage.getItem("currentUser")))

  const [myCategory, setCategory] = useState();
  const [myCity, setCity] = useState();

  useEffect(() => {
    debugger;
    axios
      .get(`http://localhost:3001/category/getAll`)
      .then((y) => {
        console.log(y.data);
        setCategory(y.data);
        axios.get(`http://localhost:3001/city/getAll`).then((z) => {
          console.log(z.data);
          setCity(z.data);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // הוספת דירה
  const handleAddApartment = () => {
    Swal.fire({
      title: "Add Apartment",
      html: `
          <form id="ApartmentForm">
          <label for="name">Name:</label><br>
          <input type="text" id="name" name="name"><br><br>
        
          <label for="decreption">Description:</label><br>
          <input type="text" id="decreption" name="decreption"><br><br>
        
          <label for="image">Image:</label><br>
          <input type="file" id="image" name="image"><br><br>

          <label for="codeCategory">Category Code:</label><br>

          <select id="idCategory" name="idCategory">
          ${myCategory
            .map(
              (category) =>
                `<option value="${category._id}">${category.name}</option>`
            )
            .join("")}
          </select><br><br>

          <label for="codeCity">City Code:</label><br>
        
          <select id="cityId" name="cityId">
           ${myCity
             .map((city) => `<option value="${city._id}">${city.name}</option>`)
             .join("")}
          </select><br><br>
        
          <label for="address">Address:</label><br>
          <input type="text" id="address" name="address" required><br><br>
        
          <label for="numberBed">Number of Beds:</label><br>
          <input type="number" id="numberBed" name="numberBed"><br><br>
        
          <label for="addition">Additions:</label><br>
          <input type="text" id="addition" name="addition"><br><br>
        
          <label for="price">Cost:</label><br>
          <input type="number" id="price" name="price"><br><br>
        
          <button id="submitBtn" type="submit" style={{width:'100%',backgroundColor:'black',color:'white'}}>Submit</button>
        </form>
          `,
      showCancelButton: true,
      showConfirmButton: false,
      cancelButtonText: "Close",
    });
    document
      .getElementById("ApartmentForm")
      .addEventListener("submit", handleApartmentFormSubmit);
  };

  const handleApartmentFormSubmit = async (event) => {
    event.preventDefault();
    debugger;
    const formData = new FormData();
    formData.append("codeAdvertiser", currentUser._id);
    formData.append("codeCategory", event.target[3].value);
    formData.append("codeCity", event.target[4].value);
    formData.append("image", event.target[2].files[0]);
    formData.append("name", event.target[0].value);
    formData.append("decreption", event.target[1].value);
    formData.append("addition", event.target[7].value);
    formData.append("numberBed", event.target[6].value);
    formData.append("price", event.target[8].value);
    formData.append("address", event.target[5].value);

    axios
      .post(
        `http://localhost:3001/apartment/add/${currentUser._id}`,
        formData,
        { headers: { Authorization: token } }
      )
      .then((x) => {
        Swal.fire({
          icon: "success",
          title: "Add Apartment",
          text: "Apartment added successfully!",
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to add apartment.<br></br> Authentication1 failed!  Please connect again.",
        });
      });
  };

  // הוספת קטגוריה
  const addCategoryl = () => {
    Swal.fire({
      title: "הוספת קטגוריה",
      html: '<input id="swal-input1" class="swal2-input" placeholder="שם">',
      focusConfirm: false,
      preConfirm: () => {
        return [document.getElementById("swal-input1").value];
      },
    }).then((result) => {
      const [name] = result.value;
      const category = {
        name: name,
      };
      addCategory(currentUser._id, category)
        .then((x) => {
          swal(
            "Success",
            `your category ${x.data.message} add in successfully`,
            "success"
          );
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };
  // הוספת עיר
  const addCityl = () => {
    Swal.fire({
      title: "הוספת עיר",
      html: '<input id="swal-input1" class="swal2-input" placeholder="שם">',
      focusConfirm: false,
      preConfirm: () => {
        return [document.getElementById("swal-input1").value];
      },
    }).then((result) => {
      const [name] = result.value;
      const city = {
        name: name,
      };
      addCity(currentUser._id, city)
        .then((x) => {
          swal(
            "Success",
            `your city ${x.data.message} add in successfully`,
            "success"
          );
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };
  // התנתקות
  const disConnect = () => {
    const c = localStorage.getItem("currentUser");
    const currentUser = JSON.parse(c);
    localStorage.setItem("currentUser", null);
    localStorage.setItem("token", null);
    localStorage.setItem("tokenCustomer", null);
    localStorage.setItem("currentCustomer", null);
    swal(
      "Hello!",
      `disconnect ${currentUser.email} in successfully!`,
      "success"
    );
  };

  return (
    <>
      <div className={"nav"}>
        <div className="link">
          {currentUser && currentUser.email != "" && (
            <React.Fragment>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Tooltip title="Personal Area">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <Avatar
                      sx={{
                        fontSize: "small",
                        width: 32,
                        height: 32,
                        color: "white",
                        backgroundColor: "black",
                      }}
                    >
                      {
                        <AccountCircleIcon
                          fontSize="large"
                          style={{ width: 32, height: 32 }}
                        ></AccountCircleIcon>
                      }
                    </Avatar>
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&::before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={handleAddApartment}>
                  <ListItemIcon>
                    <PlusIcon />
                  </ListItemIcon>
                  Add Apartment
                </MenuItem>
                <MenuItem onClick={addCategoryl}>
                  <ListItemIcon>
                    <AddCardIcon fontSize="small" />
                  </ListItemIcon>
                  Add Category
                </MenuItem>
                <MenuItem onClick={addCityl}>
                  <ListItemIcon>
                    <AddCardIcon fontSize="small" />
                  </ListItemIcon>
                  Add City
                </MenuItem>
                <MenuItem onClick={disConnect}>
                  <ListItemIcon>
                    <Logout fontSize="small"></Logout>
                  </ListItemIcon>
                  DisConnect
                </MenuItem>
              </Menu>
            </React.Fragment>
          )}
        </div>
        <NavLink to="Home" className={"link"}>
          <HomeIcon fontSize="large"></HomeIcon>
        </NavLink>
        <NavLink to="AllApartments" className={"link"}>
          <BorderAllIcon fontSize="large"></BorderAllIcon>
        </NavLink>
        <a href="http://localhost:3000/Home#map" className={"link"}>
          {<PinDropIcon></PinDropIcon>}
        </a>
        <a href="http://localhost:3000/Home#contact" className={"link"}>
          {<PhoneIcon></PhoneIcon>}
        </a>
        <a href="http://localhost:3000/Home#contact" className={"link"}>
          {<MailIcon></MailIcon>}
        </a>
        <a href="http://localhost:3000/Home#about" className={"link"}>
          {<ShareIcon></ShareIcon>}
        </a>
        {/* <NavLink to='Login' className={'link'}>Login</NavLink> */}
        {/* <NavLink to='Register' className={'link'}>Register</NavLink> */}
      </div>
    </>
  );
};
