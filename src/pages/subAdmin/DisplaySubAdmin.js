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

const DisplaySubAdmin = ({ dispatch, adminListData, isLoading }) => {
  console.log("adminListData", adminListData);
  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [permission, setPermission] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  useEffect(function () {
    dispatch(Actions.getAllSubadmin());
  }, []);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleOpen = (rowData) => {
    setOpen(true);
    setId(rowData?._id);
    setUserName(rowData?.username);
    setName(rowData?.name);
    setPassword(rowData?.plainPassword);
    setPermission(rowData?.permissions);
  };

  const handleError = (field, message) => {
    setError((prevError) => ({ ...prevError, [field]: message }));
  };

  const handleOptionChange = (e) => {
    setPermission(e.target.value);
  };

  const validation = () => {
    var isValid = true;

    if (!userName) {
      handleError("userName", "Please Enter User Name");
      isValid = false;
    }
    if (!name) {
      handleError("name", "Please Enter Name");
      isValid = false;
    }
    if (!password) {
      handleError("password", "Please Enter password");
      isValid = false;
    }

    // if (!permission) {
    //   handleError("permission", "Please input Permission");
    //   isValid = false;
    // }
    return isValid;
  };

  const handleSubmit = async () => {
    if (validation()) {
      var body = {
        id: id,
        username: userName,
        name: name,
        permissions: permission,
        password: password,
      };
      dispatch(Actions.subadminUpdate(body));
      setOpen(false);
    }
  };

  const handleClose = useCallback(() => {
    setUserName("");
    setName("");
    setPassword("");
    setPermission("");
    setOpen(false);
  });

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        {adminListData && displayTable()}
        {editModal()}
      </div>
    </div>
  );

  function displayTable() {
    return (
      <Grid container spacing={1}>
        <Grid item lg={12} sm={12} md={12} xs={12}>
          <MaterialTable
            title="Sub Admins"
            data={adminListData}
            columns={[
              {
                title: "S.No",
                editable: "never",
                render: (rowData) =>
                  Array.isArray(adminListData)
                    ? adminListData.indexOf(rowData) + 1
                    : "N/A",
              },
              { title: "User Name", field: "username" },
              { title: "Name", field: "name" },
              { title: "Password", field: "plainPassword" },
              // { title: "permission", field: "permissions" },
            ]}
            options={propStyles.tableStyles}
            style={{ fontSize: "1.0rem" }}
            actions={[
              {
                icon: "edit",
                tooltip: "Edit",
                // onClick: (event, rowData) => handleOpen(rowData),
                  onClick: (event, rowData) => navigate(`/edit-sub-admin/${rowData._id}`),
              },
              {
                icon: "delete",
                tooltip: "Delete",
                onClick: (event, rowData) =>
                  dispatch(
                    Actions.subadminDelete({ subadminId: rowData?._id })
                  ),
              },
              {
                icon: "visibility",
                tooltip: "View Sub-Admin",
                onClick: (event, rowData) => navigate(`/view-sub-admin/${rowData._id}`),
              },
              {
                icon: () => (
                  <div className={classes.addButton}>
                    <AddCircleRounded />
                    <div className={classes.addButtontext}>Add New</div>
                  </div>
                ),
                tooltip: "Add Gift",
                isFreeAction: true,
                onClick: () => navigate("/add-sub-admin"),
              },
            ]}
          />
        </Grid>
      </Grid>
    );
  }

  function editModal() {
    const showEditForm = () => {
      return (
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>Edit SubAdmin</div>
              <div onClick={handleClose} className={classes.closeButton}>
                <CloseRounded />
              </div>
            </div>
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="User Name"
              error={error.userName ? true : false}
              helperText={error.userName}
              value={userName}
              onFocus={() => handleError("userName", null)}
              onChange={(event) => setUserName(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Name"
              error={error.name ? true : false}
              helperText={error.name}
              value={name}
              onFocus={() => handleError("name", null)}
              onChange={(event) => setName(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item lg={6} sm={6} md={6} xs={6}>
            <TextField
              id="outlined-description-static"
              label="Password"
              fullWidth
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              variant="outlined"
              error={!!error.password}
              helperText={error.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePasswordVisibility}
                      onMouseDown={(event) => event.preventDefault()} // Prevents focus loss
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item lg={6} sm={12} md={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="select-label">Select Permissions</InputLabel>
              <Select
                labelId="select-label"
                value={permission}
                onChange={handleOptionChange}
                variant="outlined"
                error={!!error.permission}
              >
                {/* <MenuItem value="Good">Good</MenuItem>
                  <MenuItem value="NotGood">Not Good</MenuItem>
                  <MenuItem value="Excelent">Excelent</MenuItem>
                  <MenuItem value="Average">Average </MenuItem> */}
              </Select>
              <div className={classes.errorstyles}>{error.permission}</div>
            </FormControl>
          </Grid>

          <Grid item lg={6} sm={6} md={6} xs={6}>
            <div onClick={handleSubmit} className={classes.submitbutton}>
              {isLoading ? <CircularProgress size={24} /> : "Submit"}
            </div>
          </Grid>
          <Grid item lg={6} sm={6} md={6} xs={6}>
            <div onClick={handleClose} className={classes.denyButton}>
              Cancel
            </div>
          </Grid>
        </Grid>
      );
    };

    return (
      <div>
        <Dialog open={open}>
          <DialogContent>{showEditForm()}</DialogContent>
        </Dialog>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  adminListData: state.admin.adminListData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(DisplaySubAdmin);
