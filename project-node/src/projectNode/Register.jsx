import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as React from 'react';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { Button, Card, CardContent, Divider, IconButton, InputAdornment } from '@mui/material';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import swal from 'sweetalert';


const Register = () => {

  const nav = useNavigate()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneAdd, setPhoneAdd] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [choose, setChoose] = useState(false);
  const [button, setButton] = useState(true);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  // const checkEmailIntegrity = (email) => {

  //   // Basic email integrity check
  //   if (email.includes("@") && email.includes(".")) {
  //     return true;
  //   }
  //   return false;
  // };

  // const [alertMessage, setAlertMessage] = useState('')

  const send = (event) => {
    event.preventDefault()
    debugger
    const advertiser = {
      email: event.target[0].value,
      password: event.target[2].value,
      phone: event.target[5].value,
      phoneAdd: event.target[7].value
    }
    axios.post(`http://localhost:3001/advertiser/register`, advertiser)
      .then(x => {
        debugger
        console.log(x.data)

        axios.get(`http://localhost:3001/advertiser/login/${advertiser.email}/${advertiser.password}`)
          .then((y) => {
            localStorage.setItem('token', y.data.token)
            localStorage.setItem('currentUser', JSON.stringify(y.data.advertisers[0]))
            localStorage.setItem('currentCustomer', null)
            swal('Hello!',`Dear customer ${advertiser.email} register successfully!`,'success')
            nav(`/Home/`)
          })
      })
      .catch(err => {
        if (err.response.data === false) {
          swal('Error!', 'Advertiser with this email already exists', 'error')
          return
        }
      })
  }

  const customer = () => {
    debugger
    const cus = {
      email: email,
      password: password
    }
    axios.post(`http://localhost:3001/customer/register`, cus)
      .then(x => {
        debugger
        console.log(x.data)

        axios.get(`http://localhost:3001/customer/login/${cus.email}/${cus.password}`)
          .then((y) => {
            localStorage.setItem('token', y.data.token)
            localStorage.setItem('currentUser', null)
            localStorage.setItem('currentCustomer', JSON.stringify(y.data.customer[0]))
            swal('Hello!',`Dear customer ${cus.email} register successfully!`,'success')
            nav(`/Home/`)
          })
      })
      .catch(err => {
        swal('Error!', `${err.response.data.message}`, 'error')
        return
      })
  }

  const advertiser = () => {
    setChoose(true)
    setButton(false)
  }

  return <>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f0f0' }}>
      <Card style={{ minWidth: 450, maxWidth: '90%', width: 'auto', margin: '0 20px 20px 20px', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', marginTop: '2vh' }}>
        <CardContent>
          <div style={{ textAlign: 'left', marginBottom: '20px' }}>
            <h2 style={{ margin: 0 }}>הרשמה</h2>
            <Divider style={{ margin: '8px 0' }} />
          </div>
          <form onSubmit={send} style={{ display: 'flex', flexDirection: 'column' }}>
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
              type={showPassword ? 'text' : 'password'}
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
            <div hidden={!choose}>
              <TextField
                label="פלאפון"
                type="text"
                variant="outlined"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                margin="normal"
                style={{ width: '100%' }}
              />
              <TextField
                label="פלאפון נוסף"
                type="text"
                variant="outlined"
                value={phoneAdd}
                onChange={(e) => setPhoneAdd(e.target.value)}
                margin="normal"
                style={{ width: '100%' }}
              />

              <Button type='submit' variant="contained" style={{ marginTop: '20px', backgroundColor: 'black', width: '100%' }}>
                שליחה
              </Button>
            </div>
            <div hidden={!button}>
              <Button onClick={() => advertiser()} variant="contained" style={{ marginTop: '20px', backgroundColor: 'black', width: '45%', float: 'left', marginRight: '10%' }}>
                מפרסם
              </Button>
              <Button onClick={() => customer()} variant="contained" style={{ marginTop: '20px', backgroundColor: 'black', width: '45%', float: 'left' }}>
                לקוח
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  </>
}

export default Register;
