import "./styleHome.css";
// import "./styleTry.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Divider, Drawer, TextField } from "@mui/material";
import Slider from "@mui/material/Slider";
import FormControl from "@mui/material/FormControl";
import {
  GetMyApartments,
  getByBed,
  getByCategory,
  getByCity,
  getByPrice,
} from "./api";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Swal from "sweetalert2";
import Apartment from "./Apartment";

export const AllApartments = () => {
  const [categorys, setCategorys] = useState("");
  const [citys, setCitys] = useState("");

  // שליפת כל הדירות
  const [list, setList] = useState();
  const [listReplace, setListReaplace] = useState();
  const [listCategory, setListCategory] = useState();
  const [listCity, setListCity] = useState();
  const [listCategoryR, setListCategoryR] = useState();
  const [listCityR, setListCityR] = useState();

  const c = localStorage.getItem("currentUser");
  const currentUser = JSON.parse(c);

  const cus = localStorage.getItem("currentCustomer");
  const currentCustomer = JSON.parse(cus);

  useEffect(() => {
    debugger;
    axios
      .get(`http://localhost:3001/apartment/getAll`)
      .then((x) => {
        debugger;
        console.log(x.data);
        setList(x.data);
        setListReaplace(x.data);
        axios.get(`http://localhost:3001/category/getAll`).then((y) => {
          console.log(y.data);
          // console.log(y.data[0].apartments);
          setListCategory(y.data);
          setListCategoryR(y.data);
          axios.get(`http://localhost:3001/city/getAll`).then((z) => {
            console.log(z.data);
            setListCity(z.data);
            setListCityR(z.data);
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //==================================
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const city = (id) => {
    debugger;
    setCitys(id.target.value);
    if (id.target.value == "All") {
      setList(listReplace);
      return;
    } else {
      debugger;
      getByCity(id.target.value)
        .then((x) => {
          setList(x.data.apartments);
        })
        .catch((err) => {
          Swal.fire(
            "Authentication",
            `Authentication Failed<br/>You need to connect again `,
            "error"
          );
          console.log(err);
        });
    }
  };

  const category = (id) => {
    setCategorys(id.target.value);
    if (id.target.value == "All") {
      setList(listReplace);
      return;
    } else {
      getByCategory(id.target.value)
        .then((x) => {
          setList(x.data);
        })
        .catch((err) => {
          Swal.fire(
            "Authentication",
            `Authentication Failed<br/>You need to connect again `,
            "error"
          );
          console.log(err);
        });
    }
  };

  const advertiser = () => {
    GetMyApartments(currentUser._id)
      .then((x) => {
        console.log(x.data);
        setList(x.data);
      })
      .catch((err) => {
        Swal.fire(
          "Authentication",
          `Authentication Failed<br/>You need to connect again `,
          "error"
        );
        console.log(err);
      });
  };

  const list2 = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 300,
        margin: "-2%",
        marginTop: "30%",
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div>
        <strong>סינון לפי קטגוריה</strong>
      </div>
      <FormControl
        sx={{ m: 1, minWidth: 200, maxWidth: 250, marginRight: 10 }}
        size="large"
      >
        <InputLabel id="demo-select-small-label">Category</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={categorys}
          label="Category"
          onChange={category}
        >
          <MenuItem value="All">
            <em>All</em>
          </MenuItem>
          {listCategory &&
            listCategory.map((item, index) => (
              <MenuItem value={item._id}>{item.name}</MenuItem>
            ))}
        </Select>
      </FormControl>
      <br />
      <br />
      <Divider style={{ width: 280, maxWidth: 260, marginLeft: 30 }}></Divider>
      <br />
      <div>
        <strong>סינון לפי עיר</strong>
      </div>
      <FormControl
        sx={{ m: 1, minWidth: 200, maxWidth: 250, marginRight: 10 }}
        size="large"
      >
        <InputLabel id="demo-select-small-label">City</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={citys}
          label="Category"
          onChange={city}
        >
          <MenuItem value="All">
            <em>All</em>
          </MenuItem>
          {listCity &&
            listCity.map((item, index) => (
              <MenuItem value={item._id}>{item.name}</MenuItem>
            ))}
        </Select>
      </FormControl>
      <br />
      <br />
      <Divider style={{ width: 280, maxWidth: 260, marginLeft: 30 }}></Divider>
      <br />
      <Box sx={{ width: 280, margin: "2%", marginLeft: "4%" }}>
        <div>
          <strong>סינון לפי מחיר</strong>
        </div>
        <Slider
          defaultValue={1000}
          aria-label="Default"
          valueLabelDisplay="auto"
          max={1000}
          min={0}
          style={{ color: "black" }}
          // value={price}
          // getAriaValueText={priceChange}
          // onChange={priceChange()}
          onChange={priceChange}
        />
      </Box>
      <br />
      <Divider style={{ width: 280, maxWidth: 260, marginLeft: 30 }}></Divider>
      <br />
      <Box sx={{ width: 300, alignItems: "center" }}>
        <div>
          <strong>סינון לפי מיטות</strong>
        </div>
        <TextField
          label="מספר מיטות"
          type="number"
          variant="outlined"
          onChange={(e) => bedChange(e.target.value)}
          margin="normal"
          style={{
            minWidth: 180,
            maxWidth: 250,
            marginRight: 57,
            marginLeft: 10,
          }}
        />
      </Box>
      <br />
      <Divider style={{ width: 280, maxWidth: 260, marginLeft: 30 }}></Divider>
      <br />
      <br />
      {currentUser && currentUser.email !== "" && (
        <Button
          variant="outlined"
          onClick={() => advertiser()}
          style={{
            width: "80%",
            marginRight: "8%",
            marginTop: "2%",
            color: "black",
            borderColor: "black",
          }}
        >
          My Apartments
        </Button>
      )}
    </Box>
  );

  const priceChange = (value) => {
    const x = Number(value.target.value);
    getByPrice(x)
      .then((x) => {
        setList(x.data);
      })
      .catch((err) => {
        Swal.fire(
          "Authentication",
          `Authentication Failed<br/>You need to connect again `,
          "error"
        );
        console.log(err);
      });
  };

  const bedChange = (value) => {
    debugger;
    const x = Number(value.target.value);
    getByBed(x)
      .then((x) => {
        setList(x.data);
      })
      .catch((err) => {
        Swal.fire(
          "Authentication",
          `Authentication Failed<br/>You need to connect again `,
          "error"
        );
        console.log(err);
      });
  };
  
  return (
    <>
      {/* בשביל הnav */}
      <div
        style={{
          width: "100%",
          backgroundColor: "white",
          height: "5%",
          color: "white",
        }}
      >
        <p>jjjjj</p>
        <p>hhhhhhh</p>
        <p>kkkkk</p>
      </div>
      {/* רשימת הטיולים */}
      {list &&
        list.map((item, index) => (
          <div
            style={{
              width: "100%",
              marginTop: "-1%",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: "5%",
            }}
          >
            {" "}
            <Apartment
              _id={item._id}
              codeAdvertiser={item.codeAdvertiser}
              codeCategory={item.codeCategory}
              name={item.name}
              addition={item.addition}
              address={item.address}
              numberBed={item.numberBed}
              price={item.price}
              codeCity={item.codeCity}
              image={item.image}
            ></Apartment>
          </div>
        ))}
      {/* כפתור הסינון */}
      {((currentUser && currentUser.email != "") ||
        (currentCustomer && currentCustomer.email != "")) && (
        <div className="filter">
          <React.Fragment key={"right"}>
            {/* <Button onClick={toggleDrawer('right', true)} variant="contained">סינון</Button> */}
            {/* <FilterAltIcon
                fontSize="large"
                onClick={toggleDrawer("right", true)}
                style={{ width: 60, height: 60, marginTop: "3%" }}
              ></FilterAltIcon> */}
            <Button
              variant="outlined"
              onClick={toggleDrawer("right", true)}
              style={{ width: 60, height: 60, marginTop: "3%" }}
            >
              סינונים
            </Button>
            <Drawer
              anchor={"right"}
              open={state["right"]}
              onClose={toggleDrawer("right", false)}
              style={{
                width: "30%",
                alignItems: "start",
                textAlign: "right",
                minWidth: "20%",
              }}
            >
              {list2("right")}
            </Drawer>
          </React.Fragment>
        </div>
      )}
      {/* <canvas class="webgl"></canvas>

      <div class="message">
        <h1 class="messageTitle"></h1>
        <p class="messageDescription"></p>
      </div>

      <div id="loader">
        <h1>Loading</h1>
      </div>

      <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r124/three.min.js"></script>
      <script src="https://unpkg.com/three@0.126.0/examples/js/loaders/GLTFLoader.js"></script>
      <script src="https://unpkg.com/three@0.126.0/examples/js/controls/OrbitControls.js"></script>
      <script src="./try.js"></script> */}

    </>
  );
};
