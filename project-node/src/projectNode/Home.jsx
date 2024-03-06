import { NavLink, useNavigate } from "react-router-dom";
import "./homeStyle.css";
import { TextField } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import FacebookIcon from "@mui/icons-material/Facebook";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Typography from "@mui/material/Typography";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import React from "react";
import MdPhone from "@mui/icons-material/Phone";
import Chip from "@mui/material/Chip";

export const Home = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const moveLogin = () => {
    nav(`/Login`);
  };
  const moveRegister = () => {
    nav(`/Register`);
  };
  let nav = useNavigate();

  return (
    <>
      <div
        style={{
          width: "100%",
          marginTop: "-1.5%",
          background: "url(../../images/home10.png) no-repeat center center ",
          backgroundSize: "cover",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1 style={{ color: "white", fontSize: "3rem", marginTop: "9rem" }}>
          דירות ארוח, התחלת<span className="underline"></span> המסע שלך כאן
        </h1>
        <p style={{ color: "white", fontSize: "1.5rem", marginTop: "2rem" }}>
          <NavLink
            to="/AllApartments"
            style={{ color: "white", borderColor: "white", cursor: "pointer" }}
          >
            עיצוב , נוחות , ואיכות - בלחיצת כפתור
          </NavLink>
        </p>
        <React.Fragment>
          <Box
            sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
          >
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="large"
                sx={{ ml: -90 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar
                  sx={{
                    fontSize: "large",
                    width: 90,
                    height: 90,
                    color: "white",
                    backgroundColor: "black",
                  }}
                >
                  {
                    <AccountCircleIcon
                      fontSize="large"
                      style={{ width: 90, height: 90 }}
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
            <MenuItem onClick={moveLogin}>
              <Avatar /> My account
            </MenuItem>
            <Divider />
            <MenuItem onClick={moveRegister}>
              <ListItemIcon>
                <PersonAdd fontSize="small" />
              </ListItemIcon>
              Add another account
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
          </Menu>
        </React.Fragment>
      </div>
      <div style={{ backgroundColor: "#f9f9f9" }} id="about">
        <div
          style={{
            marginRight: "5%",
            float: "right",
            marginTop: "3%",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h1 style={{ borderBottomColor: "greenyellow" }}>
            אודות <span className="underline"></span>האתר
          </h1>
          <br></br>
          <p style={{ textAlign: "right", marginTop: "2%" }}>
            ברוכים הבאים לאתר 'דירות ארוח'<br></br>, מקום המפגש שלכם עם דירות
            האירוח המובחרות ביותר בארץ<br></br>. מציעים חווית שהייה בלתי נשכחת
            <br></br>, עם דירות מאובזרות ברמה הגבוהה ביותר וממוקמות במיקומים
            מרכזיים ונחשקים<br></br>. תוכלו להנות ממגוון רחב של דירות<br></br>,
            המתאימות לכל אירוע ולכל צורך - בין אם זו חופשה משפחתית, או שהייה
            עסקית<br></br>. 'דירות ארוח' מחויבת לאיכות ולשביעות רצון מלאה
            <br></br>, על מנת להבטיח שהשהות שלכם תהיה נעימה<br></br>, מפנקת וללא
            דאגות<br></br>. הפכו כל רגע לחוויה מושלמת עם דירות ארוח - הבית שלכם
            הרחק מהבית.
          </p>
        </div>
        <div style={{ marginTop: "3%", backgroundColor: "#f9f9f9" }}>
          <img src="../../images/honeSmall.jpg" width={"40%"}></img>
        </div>
      </div>

      <div
        style={{
          marginLeft: "8%",
          marginRight: "5%",
          width: "80%",
          height: "550px",
          marginBottom: "3%",
        }}
      >
        <h1 style={{ borderBottomColor: "greenyellow", marginBottom: "3%" }}>
          מה <span className="underline"></span>מסביב{" "}
        </h1>
        <br></br>
        <Card
          sx={{
            width: "23%",
            float: "right",
            marginRight: "8%",
            marginLeft: "5%",
            borderBottomColor: "rgb(146, 244, 198)",
            minHeight:50
          }}
        >
          <CardContent>
            <Typography color="text.secondary">
              <div className="circle">
                <img
                  src="../../images/honeSmall.jpg"
                  alt="Your Image"
                  style={{ width: "200px%", height: "200px" }}
                ></img>
              </div>
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              <h3>נקודות עניין</h3>
            </Typography>
            <Typography variant="body2">
              <p>
                'נקודות עניין' מהווה מלווה מושלם לכל חובב טיולים שרוצה להפוך כל
                יום יציאה להרפתקה אישית. שירותינו מאפשר למשתמשים למצוא בקלות
                אתרים קרובים למקום הנוכחי או נקודות עניין ביעדים מתוכננים, עם
                ידע עשיר ועדכני שמעמיק את החוויה בכל ביקור.
              </p>
            </Typography>
            <span className="underline"></span>
          </CardContent>
        </Card>
        <Card
          sx={{
            width: "23%",
            float: "right",
            marginLeft: "5%",
            borderBottomColor: "rgb(146, 244, 198)",
          }}
        >
          <CardContent>
            <Typography
              sx={{ fontSize: 14 ,minHeight:50}}
              color="text.secondary"
              gutterBottom
            >
              <div className="circle">
                <img
                  src="../../images/honeSmall.jpg"
                  alt="Your Image"
                  style={{ width: "100%", height: "200px" }}
                ></img>
              </div>
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              <h2>אטרקציות</h2>
            </Typography>
            <Typography variant="body2">
              <p>
                'אטרקציות בסביבה' מחברת אותך עם ההתרגשות שנמצאת ממש מעבר לפינה!
                מפעילויות מרתקות ועד מקומות מרגיעים , הפלטפורמה המקיפה שלנו היא
                הבחירה שלך לתכנון יום בילוי מושלם. לא עוד חיפוש אינסופי - אנחנו
                מביאים את האטרקציות היישר אליכם.
              </p>
            </Typography>
            <span className="underline"></span>
          </CardContent>
        </Card>
        <Card
          sx={{
            width: "23%",
            float: "right",
            marginLeft: "5%",
            borderBottomColor: "rgb(146, 244, 198)",
          }}
        >
          <CardContent>
            <Typography
              sx={{ fontSize: 14,minHeight:50}}
              color="text.secondary"
              gutterBottom
            >
              <div className="circle">
                <img
                  src="../../images/honeSmall.jpg"
                  alt="Your Image"
                  style={{ width: "100%", height: "200px" }}
                ></img>
              </div>
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              <h3>צימרים</h3>
            </Typography>
            <Typography variant="body2">
              <p>
                צימרים מציע מפלט שליו מההמולה של חיי היומיום, ומספק חדרי אירוח
                נעימים ופרטיים השוכנים בכמה מהמקומות הציוריים ביותר. כל חלל
                מעוצב באופן ייחודי מבטיח שילוב של נוחות וטבע, מושלם לחופשה מרגשת
                או מפלט שליו ורגוע.
              </p>
            </Typography>
            <span className="underline"></span>
          </CardContent>
        </Card>
      </div>

      <div className="navBottom" style={{ marginBottom: "3%" }} id="contact">
        <h1 style={{ borderBottomColor: "greenyellow" }}>
          ליצירת<span className="underline"></span> קשר
        </h1>

        <div
          style={{
            width: "40%",
            float: "right",
            marginTop: "7%",
            marginRight: "5%",
          }}
        >
          <p>New York, NY, United states</p>
          <p>
            <Chip
              icon={<MdPhone />}
              label="123456789"
              style={{ marginBottom: "2%" }}
            />
            <br></br>
            <Chip icon={<MailIcon></MailIcon>} label={<a href="https://mailto:esther286641@gmail.com">tzipi974@gmail.com</a>} />
          </p>
          <p style={{ alignItems: "center" }}>
            <FacebookIcon fontSize="large"></FacebookIcon>
          </p>
        </div>
        <div style={{ width: "40%", marginLeft: "10%", marginTop: "4%" }}>
          <div style={{ marginBottom: "2rem" }}>
            <TextField
              id="filled-multiline-flexible1"
              label="שם"
              multiline
              maxRows={5}
              variant="filled"
              className="input"
              style={{ width: "40%", marginRight: "2%", textAlign: "right" }}
            />
            <TextField
              id="filled-multiline-flexible1"
              label="פלאפון"
              multiline
              maxRows={5}
              variant="filled"
              className="input"
              style={{ width: "40%" }}
            />
          </div>
          <div style={{ marginBottom: "2rem" }}>
            <TextField
              id="filled-multiline-flexible1"
              label="כתובת אימייל"
              multiline
              maxRows={5}
              variant="filled"
              className="input"
              style={{ width: "82%" }}
            />
          </div>
          <div style={{ marginBottom: "2rem" }}>
            <textarea
              placeholder="הערה"
              style={{ width: "81%", height: "60px" }}
            ></textarea>
          </div>
          <button
            type="submit"
            className="button"
            style={{
              width: "82%",
              backgroundColor: "black",
              borderColor: "black",
              borderRadius: "3%",
              color: "white",
            }}
          >
            צור קשר
          </button>
        </div>
      </div>
      <div style={{ width: "100%", height: "100px" }} id="map">
        <img
          src="../../images/map3.png"
          alt=""
          width={"100%"}
          height={"400px"}
        />
      </div>
      <div
        style={{
          width: "100%",
          height: "200px",
          color: "black",
          backgroundColor: "red",
        }}
      ></div>
      <div style={{width:'100%',height:'100px',backgroundColor:'white',color:'black',textAlign:'center'}}>
      <p style={{marginTop:'10%'}}>example@example</p>
      <div style={{textAlign:'left'}}>
        <a style={{margin:'2%'}} href="http://localhost:3000/AllApartments">כל הדירות</a>
        <a style={{margin:'2%'}} href="http://localhost:3000/Login">התחברות</a>
        <a style={{margin:'2%'}} href="http://localhost:3000/Register">הרשמה</a>
      </div>
      </div>
    </>
  );
};
