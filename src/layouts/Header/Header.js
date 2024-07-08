import React, { useEffect, useState } from "react";
import "./header.css";
import { FaBars, FaSignOutAlt, FaUser } from "react-icons/fa";
import { NavLink, Navigate } from "react-router-dom";
import { BiLogOutCircle } from "react-icons/bi";
import { connect, useDispatch } from "react-redux";
import logo_icon from "../../assets/images/logo_icon.png";
import { useNavigate } from "react-router-dom";
import { Colors } from "../../assets/styles";
import Swal from "sweetalert2";
import * as Actions from '../../redux/Actions/dashboardActions'
import { adminLogoutRequest } from "../../redux/Actions/adminAction";


const Header = ({ isSidebarOpen }) => {
  const dispatch = useDispatch();
  const [userToggle, setUserToggle] = useState(false);
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

  const toggle = () =>
    dispatch(Actions.setIsSidebarOpne(!isSidebarOpen));

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

  return (
    <>
      <header className="header">
        <div className="header_wrapper">
          <div>
            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>

          <div className="header_icon_name">
            <img src={logo_icon} style={{ width: 40, height: 40 }} />
            <h3 style={{ marginLeft: 10 }}>Fortune Talk </h3>
          </div>
          <div>
            <FaSignOutAlt onClick={handleLogout} className="user_icon" />
          </div>
        </div>
      </header>
    </>
  );
};

const mapStateToProps = state => ({
  isSidebarOpen: state.dashboard.isSidebarOpen
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(Header);
