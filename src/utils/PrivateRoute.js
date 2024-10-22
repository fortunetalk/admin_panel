import { useNavigate } from "react-router-dom";
import Layout from "../layouts/Layout";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as AdminActions from "../redux/Actions/adminAction";
function PrivateRoute({ dispatch }) {
  const navigate = useNavigate();
  const [data, setData] = useState();

  useEffect(() => {
    try {
      const userData = localStorage.getItem("adminData");
      const parsedData = JSON.parse(userData);
      if (!parsedData) {
        navigate("/login");
        return;
      }
      dispatch(AdminActions.setAdminData(parsedData));
    } catch (e) {
      console.log(e);
    }
  }, [data, navigate]);

  return <Layout />;
}

const mapStateToProps = (state) => ({
  adminData: state.admin.adminData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
