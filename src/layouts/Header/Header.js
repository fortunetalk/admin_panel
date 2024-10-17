// import React, { useEffect, useState } from "react";
// import "./header.css";
// import { FaBars, FaSignOutAlt, FaUser } from "react-icons/fa";
// import { NavLink, Navigate } from "react-router-dom";
// import { BiLogOutCircle } from "react-icons/bi";
// import { connect, useDispatch } from "react-redux";
// import logo_icon from "../../assets/images/logo_icon.png";
// import { useNavigate } from "react-router-dom";
// import { Colors } from "../../assets/styles";
// import Swal from "sweetalert2";
// import * as Actions from '../../redux/Actions/dashboardActions'
// import { adminLogoutRequest } from "../../redux/Actions/adminAction";


// const Header = ({ isSidebarOpen }) => {
//   const dispatch = useDispatch();
//   const [userToggle, setUserToggle] = useState(false);
//   const navigate = useNavigate();
//   const [data, setData] = useState();

//   useEffect(() => {
//     try {
//       const userData = localStorage.getItem("accessToken");
//       setData(userData);

//       if (!userData) {
//         navigate("/login");
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   }, [data, userToggle]);

//   const toggle = () =>
//     dispatch(Actions.setIsSidebarOpne(!isSidebarOpen));

//   const handleLogout = () => {
//     Swal.fire({
//       title: 'Are you sure you want to Logout?',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: Colors.primaryLight,
//       cancelButtonColor: Colors.grayDark,
//       confirmButtonText: 'Logout',
//     }).then((result) => {
//       if (result.isConfirmed) {
//         try {
//           dispatch(adminLogoutRequest());
//           Swal.fire({
//             icon: 'success',
//             title: 'Logout Successful',
//             showConfirmButton: false,
//             timer: 2000,
//           }).then(() => {
//             setTimeout(() => {
//               setData('');
//               localStorage.clear();
//               navigate('/login');
//             }, 1500);
//           });
//         } catch (e) {
//           console.log(e);
//         }
//       }
//     });
//   };

//   return (
//     <>
//       <header className="header">
//         <div className="header_wrapper">
//           <div>
//             <div className="bars">
//               <FaBars onClick={toggle} />
//             </div>
//           </div>

//           <div className="header_icon_name">
//             <img src={logo_icon} style={{ width: 40, height: 40 }} alt="logo" />
//             <h3 style={{ marginLeft: 10 }}>Fortune Talk </h3>
//           </div>
//           <div>
//             <FaSignOutAlt onClick={handleLogout} className="user_icon" />
//           </div>
//         </div>
//       </header>
//     </>
//   );
// };

// const mapStateToProps = state => ({
//   isSidebarOpen: state.dashboard.isSidebarOpen
// })

// const mapDispatchToProps = dispatch => ({ dispatch })

// export default connect(mapStateToProps, mapDispatchToProps)(Header);



import React, { useEffect, useState } from "react";
import "./header.css";
import { FaBars } from "react-icons/fa";
import { connect, useDispatch } from "react-redux";
import logo_icon from "../../assets/images/logo_icon.png";
import { useNavigate } from "react-router-dom";
import { Colors } from "../../assets/styles";
import Swal from "sweetalert2";
import * as Actions from '../../redux/Actions/dashboardActions';
import { adminLogoutRequest } from "../../redux/Actions/adminAction";
import {
  Button,
  Menu,
  MenuItem,
  Avatar,
  Typography,
  IconButton
} from "@mui/material";

const Header = ({ isSidebarOpen, adminData, adminType}) => {
  console.log("adminData", adminData);
  console.log("adminType", adminType);
  const dispatch = useDispatch();
  const [userToggle, setUserToggle] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const [data, setData] = useState();

  useEffect(() => {
    try {
      const userData = localStorage.getItem("accessToken");
      setData(userData);

      if (!userData) {
        navigate("/login");
      }
    } catch (e) {
      console.log(e);
    }
  }, [data, userToggle]);

  const toggle = () => dispatch(Actions.setIsSidebarOpne(!isSidebarOpen));

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure you want to Logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: Colors.primaryLight,
      cancelButtonColor: Colors.grayDark,
      confirmButtonText: 'Logout',
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          dispatch(adminLogoutRequest());
          Swal.fire({
            icon: 'success',
            title: 'Logout Successful',
            showConfirmButton: false,
            timer: 2000,
          }).then(() => {
            setTimeout(() => {
              setData('');
              localStorage.clear();
              navigate('/login');
            }, 1500);
          });
        } catch (e) {
          console.log(e);
        }
      }
    });
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header className="header">
      <div className="header_wrapper">
        <div>
          <div className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>

        <div className="header_icon_name">
          <img src={logo_icon} style={{ width: 40, height: 40 }} alt="logo" />
          <h3 style={{ marginLeft: 10 }}>FortuneTalk</h3>
        </div>
        
        <div>
          <IconButton onClick={handleMenuClick}>
            <Avatar alt={adminData?.email} src="/path/to/avatar.jpg" /> {/* Replace with user image or initials */}
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              sx: {
                mt: 1,
                // Additional styles for dropdown
                "& .MuiMenuItem-root": {
                  "&:hover": {
                    backgroundColor: Colors.primaryLight,
                    color: 'white',
                  },
                },
              },
            }}
          >
            <MenuItem onClick={handleClose}>
              <Typography variant="body1"> {adminData?.email} </Typography>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <Typography variant="body1" >Logout</Typography>
            </MenuItem>
          </Menu>
        </div>
      </div>
    </header>
  );
};

const mapStateToProps = state => ({
  adminData: state.admin.adminData,
  adminType: state.admin.adminType,
  isSidebarOpen: state.dashboard.isSidebarOpen
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Header);

