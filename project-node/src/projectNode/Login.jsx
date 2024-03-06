import { useNavigate } from "react-router-dom";
import * as React from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useState } from "react";
import { IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import Button from "@mui/material/Button";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CardContent from "@mui/material/CardContent";
import EmailIcon from "@mui/icons-material/Email";
import { Divider } from "@mui/material";
import Card from "@mui/material/Card";

import { allAdvertiser, password2, token } from "./api";
import Swal from "sweetalert2";
import swal from "sweetalert";

import crypto from "crypto";

export const Login = () => {
  debugger;

  const generateRandomPassword = () => {
    const length = 10; // אורך סיסמה האקראית
    return crypto
      .randomBytes(Math.ceil(length / 2))
      .toString("hex")
      .slice(0, length);
  };

  // משתני מחלקה
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [randomPassword, setRandomPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const nav = useNavigate();

  const send = (event) => {
    debugger;
    event.preventDefault();
    const user = {
      email: event.target[0].value,
      password: event.target[2].value,
    };
    axios
      .get(
        `http://localhost:3001/advertiser/login/${user.email}/${user.password}`
      )
      .then((x) => {
        debugger;
        localStorage.setItem("currentCustomer", null);
        localStorage.setItem("token", x.data.token);
        localStorage.setItem(
          "currentUser",
          JSON.stringify(x.data.advertisers[0])
        );
        console.log(x.data);
        swal("Hello!", "You connect in successfully , enjoy!!!", "success");
        nav(`/Home/`);
      })
      .catch((err) => {
        swal("Error!", "Email or Password are not matches!!", "error");
        console.log(err);
      });
  };

  const customer = (event) => {
    debugger;
    const user = {
      email: email,
      password: password,
    };
    axios
      .get(
        `http://localhost:3001/Customer/login/${user.email}/${user.password}`
      )
      .then((x) => {
        debugger;
        localStorage.setItem("token", x.data.token);
        localStorage.setItem("currentUser", null);
        localStorage.setItem(
          "currentCustomer",
          JSON.stringify(x.data.customer[0])
        );
        console.log(x.data);
        swal(
          "Hello!",
          `Dear customer ${user.email} login successfully!`,
          "success"
        );
        nav(`/Home/`);
      })
      .catch((err) => {
        swal("Error!", "Email or Password are not matches!!", "error");
        console.log(err);
      });
  };

  const pass = () => {
    debugger;
    const password = generateRandomPassword();
    password2(email, password);
    Swal.fire({
      title: "הכנס את הסיסמה שנשלחה למייל",
      html: '<input id="pass" class="swal2-input" placeholder="password">',
      focusConfirm: false,
      preConfirm: () => {
        return [document.getElementById("pass").value];
      },
    }).then((result) => {
      const [pass] = result.value;
      if (pass !== password) {
        swal("Error", `your password not match`, "error");
        return;
      }
      allAdvertiser()
        .then((x) => {
          for (let i = 0; i < x.data.length; i++) {
            debugger;
            if (x.data[i].email === email) {
              token()
                .then((y) => {
                  localStorage.setItem("token", y.data);
                  localStorage.setItem(
                    "currentUser",
                    JSON.stringify(x.data[i])
                  );
                  localStorage.setItem("currentCustomer", null);
                  console.log(x.data);
                  swal("Success", `you login in successfully`, "success");
                  nav(`/Home/`);
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#f0f0f0",
        }}
      >
        <Card
          style={{
            minWidth: 450,
            maxWidth: "90%",
            width: "auto",
            margin: "0 20px 20px 20px",
            padding: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            marginTop: "-5vh",
          }}
        >
          <CardContent>
            <div style={{ textAlign: "left", marginBottom: "20px" }}>
              <h2 style={{ margin: 0 }}>התחברות</h2>
              <Divider style={{ margin: "8px 0" }} />
            </div>
            <form
              onSubmit={send}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <TextField
                label="אימייל"
                type="email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="סיסמא"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={togglePasswordVisibility}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                onClick={() => pass()}
                style={{ marginTop: "20px", backgroundColor: "black" }}
              >
                לכניסה באמצעות סיסמה חד פעמית
              </Button>
              <div>
                <Button
                  type="submit"
                  variant="contained"
                  style={{
                    marginTop: "20px",
                    backgroundColor: "black",
                    width: "45%",
                    float: "left",
                    marginRight: "10%",
                  }}
                >
                  מפרסם
                </Button>
                <Button
                  onClick={() => customer()}
                  variant="contained"
                  style={{
                    marginTop: "20px",
                    backgroundColor: "black",
                    width: "45%",
                    float: "left",
                  }}
                >
                  לקוח
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
