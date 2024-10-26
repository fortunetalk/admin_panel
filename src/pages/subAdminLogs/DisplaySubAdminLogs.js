import React, { useCallback, useEffect, useState } from "react";
import { propStyles, useStyles } from "../../assets/styles.js";
import {
  Grid,
  TextField,
  CircularProgress,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Colors } from "../../assets/styles.js";
import { AddCircleRounded } from "@mui/icons-material";
import logo_icon from "../../assets/images/logo_icon.png";
import MaterialTable from "material-table";
import { useNavigate } from "react-router-dom";
import { CloseRounded } from "@mui/icons-material";
import Swal from "sweetalert2";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { connect } from "react-redux";
import * as Actions from "../../redux/Actions/adminAction.js";
import moment from "moment";

const DisplaySubAdminLogs = ({ dispatch, isLoading, subAdminLogs }) => {
  console.log("subAdminLogs", subAdminLogs);
  const classes = useStyles();
  const navigate = useNavigate();

  useEffect(function () {
    dispatch(Actions.getAdminLogs());
  }, []);


  return (
    <div className={classes.container}>
      <div className={classes.box}>
        {subAdminLogs && displayTable()}
      </div>
    </div>
  );

  function displayTable() {
    return (
      <Grid container spacing={1}>
        <Grid item lg={12} sm={12} md={12} xs={12}>
          <MaterialTable
            title="Sub Admins Logs"
            data={subAdminLogs}
            columns={[
              {
                title: "S.No",
                editable: "never",
                render: (rowData) => Array.isArray(subAdminLogs)  ? subAdminLogs.indexOf(rowData) + 1  : "N/A",  },
              { title: "Action Performed", field: "action" },
              { title: "Astrologer Name", field: "details.name" },
              { title: "Astrologer Number", field: "details.phoneNumber" },
              { title: "Description", field: "details.message" },
            //   { title: "Type", field: "type" },
              // { title: "permission", field: "permissions" },
            ]}
            options={propStyles.tableStyles}
            style={{ fontSize: "1.0rem" }}
            actions={[
            
            //   {
            //     icon: "visibility",
            //     tooltip: "View Sub-Admin",
            //     onClick: (event, rowData) => navigate(`/view-sub-admin/${rowData._id}`),
            //   },
            
            ]}
          />
        </Grid>
      </Grid>
    );
  }

 
};

const mapStateToProps = (state) => ({
  subAdminLogs: state.admin.subAdminLogs,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(DisplaySubAdminLogs);
