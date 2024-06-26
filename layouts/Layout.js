import SideBar from "./Sidebar/Sidebar";
import Header from "./Header/Header";
// import { useDispatch, useSelector } from "react-redux";
import "./layout.css";
import { Outlet } from "react-router-dom";
import { connect } from "react-redux";
// import Loading from "../Components/loading/loading";
import * as Actions from '../redux/Actions/dashboardActions'

const Layout = ({dispatch, isSidebarOpen}) => {
  const handleClickOutside = () => {
    dispatch(Actions.setIsSidebarOpne(!isSidebarOpen));
  };

  return (
    <>
      <div className="main-container">
        <SideBar />
        <div style={{ flex: 1, height: "100vh", overflowY: "auto" }}>
          <Header />
          <main className="maincontainer">
            <Outlet />{" "}
          </main>
        </div>
        <div
          onClick={handleClickOutside}
          className={`overlay ${isSidebarOpen ? "show" : ""}`}
        ></div>
      </div>
    </>
  );
};

const mapStateToProps = state =>({
  isSidebarOpen: state.dashboard.isSidebarOpen
})

const mapDispatchToProps = dispatch =>({dispatch})

export default connect(mapStateToProps, mapDispatchToProps)(Layout); 
