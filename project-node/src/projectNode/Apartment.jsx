import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Divider } from "@mui/material";
import { deleteApartment, order2, tempe } from "./api";
import swal from "sweetalert";
import Swal from "sweetalert2";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import Chip from "@mui/material/Chip";
import EditIcon from "@mui/icons-material/Edit";
import WbSunnyIcon from "@mui/icons-material/WbSunny";

export default function Apartment(props) {
  const {
    _id,
    name,
    codeAdvertiser,
    codeCategory,
    codeCity,
    address,
    addition,
    price,
    numberBed,
    image,
  } = props;
  const c = localStorage.getItem("currentUser");
  const currentUser = JSON.parse(c);

  const cus = localStorage.getItem("currentCustomer");
  const customer = JSON.parse(cus);

  const token = localStorage.getItem("token");

  // const tokenCustomer = localStorage.getItem('tokenCustomer')
  // מחיקת דירה
  const deleteA = (id) => {
    debugger;
    Swal.fire({
      title: "האם אתה בטוח שברצונך למחוק?",
      showCancelButton: true,
      confirmButtonText: "כן, מחק!",
      cancelButtonText: "ביטול",
    }).then((result) => {
      if (result.isConfirmed) {
        // ביצוע מחיקה
        deleteApartment(currentUser._id, props._id)
          .then((x) => {
            Swal.fire("נמחק!", "הרשומה נמחקה בהצלחה.", "success");
          })
          .catch((err) => {
            Swal.fire("Error", `${err.response.data.message}`, "error");
            console.log(err);
          });
      }
    });
  };
  // עדכון דירה
  const updateA = () => {
    Swal.fire({
      title: "Add Apartment",
      html: `
          <form id="ApartmentForm">
          <label for="name">Name:</label>
          <input type="text" id="name" name="name" value=${props.name} ><br><br>
        
          <label for="decreption">Description:</label>
          <input type="text" id="decreption" name="decreption" value=${props.decreption} ><br><br>
        
          <label for="image">Image:</label>
          <input type="file" id="image" name="image" value=${props.image} ><br><br>
        
          <label for="address">Address:</label>
          <input type="text" id="address" name="address" required value=${props.address} ><br><br>
        
          <label for="numberBed">Number of Beds:</label>
          <input type="number" id="numberBed" name="numberBed" value=${props.numberBed} ><br><br>
        
          <label for="addition">Additions:</label>
          <input type="text" id="addition" name="addition" value=${props.addition} ><br><br>
        
          <label for="price">Cost:</label>
          <input type="number" id="price" name="price" value=${props.price} ><br><br>
        
          <button id="submitBtn" type="submit">Submit</button>

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
    // const formData = new FormData();
    // formData.append('image', event.target[2].files[0]);
    // formData.append('name', event.target[0].value);
    // formData.append('decreption', event.target[1].value);
    // formData.append('addition', event.target[7].value);
    // formData.append('numberBed', event.target[6].value);
    // formData.append('price', event.target[8].value);
    // formData.append('address', event.target[5].value);

    const z = {
      name: event.target[0].value,
      decreption: event.target[1].value,
      addition: event.target[5].value,
      numberBed: event.target[4].value,
      price: event.target[6].value,
      address: event.target[3].value,
    };

    axios
      .patch(
        `http://localhost:3001/apartment/update/${currentUser._id}/${props._id}`,
        z,
        { headers: { Authorization: token } }
      )
      .then((x) => {
        Swal.fire({
          icon: "success",
          title: "Update Apartment",
          text: `Apartment ${x.data.name} update successfully!`,
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err.response.data.message,
        });
      });
  };

  const order = () => {
    order2(customer.email, props);
    swal(
      "Success",
      `Dear customer, your order has been successfully received and the order details have been sent to your email address `,
      "success"
    );
  };
  const temp = () => {
    debugger;
    tempe(props.codeCity._id)
      .then((x) => {
        console.log(x.data);
        if(x.data.data.cod==404){
            Swal.fire("מזג אוויר בסביבה", `${x.data.data.message}<br/> Have a good day`, "warning");
        }
        else if(x.data.data.cod==200){
            Swal.fire("מזג אוויר בסביבה", `Temp:${x.data.data.main.temp} ,Description:${x.data.data.weather[0].description}<br/> Have a good day`, "success");
        }
        else{
            Swal.fire("מזג אוויר בסביבה", `Temp: cant get temp because it's <strong color='red'> lock </strong> , Link: <a href="${x.data.data.blockUrl}">${x.data.data.blockUrl}</a><br/> Sorry and success`, "warning");
        }
      })
      .catch((err) => {
        Swal.fire("Error", 'אין חיבור לאינטרנט <br/> כדי לקבל את הטמפ אנא התחבר לרשת', "error");
        console.log(err);
      });
  };

  return (
    <Card
      sx={{ maxWidth: 345, width: 345 }}
      style={{ float: "left", margin: "3%" }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={`http://localhost:3001/${image}`}
          alt="Loading..."
          src={`http://localhost:3001/${image}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Divider></Divider>
          <Typography variant="body2" color="text.secondary">
            עיר:{codeCity.name} , כתובת:{address}
            <br></br>
            סוג דירה:{codeCategory.name} , מספר מיטות:{numberBed}
            <br></br>
            תוספות:{addition} , מחיר:{price}
          </Typography>
          <Divider></Divider>
          <Typography>
            <p>{codeAdvertiser && codeAdvertiser.email}</p>
            {codeAdvertiser.phone}
          </Typography>
          <Divider></Divider>
          <CardActions disableSpacing>
            {
              currentUser && currentUser.email !== "" && (
                // <DeleteIcon onClick={() => deleteA(_id)}/>
                <Chip
                  icon={<DeleteIcon></DeleteIcon>}
                  label="Delete"
                  onClick={() => deleteA(props)}
                  style={{
                    marginRight: "6%",
                    marginLeft: "2%",
                    marginTop: "4%",
                  }}
                />
              )
              // <Button variant="outlined" onClick={() => deleteA(_id)} style={{ width: '50%' }}>delete</Button>
            }
            {
              currentUser && currentUser.email !== "" && (
                // <BrowserUpdatedIcon onClick={() => updateA(props)}></BrowserUpdatedIcon>
                <Chip
                  icon={<EditIcon></EditIcon>}
                  label="Update"
                  onClick={() => updateA(props)}
                  style={{ marginTop: "4%", marginRight: "6%" }}
                />
              )

              // <Button variant="outlined" onClick={() => updateA(props)} style={{ width: '50%' }}>update</Button>
            }

            {customer && customer.email !== "" && (
              <Button
                variant="outlined"
                onClick={() => order(props)}
                style={{ width: "80%", marginRight: "4%", marginTop: "2%" }}
              >
                order
              </Button>
            )}
            <Chip
              icon={<WbSunnyIcon></WbSunnyIcon>}
              label="Temp"
              onClick={() => temp(props)}
              style={{ marginTop: "4%" }}
            />
          </CardActions>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
