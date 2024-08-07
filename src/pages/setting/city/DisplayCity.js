import React, { useEffect, useState } from "react";
import { Colors, propStyles, useStyles } from "../../../assets/styles.js";
import { Avatar, Grid, Button, TextField, InputLabel, FormControl, MenuItem, Select } from "@mui/material";
import { AddCircleRounded, Close } from "@mui/icons-material";
import MaterialTable from "material-table";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import {DialogContent, CircularProgress } from "@mui/material";
import { CloseRounded } from "@mui/icons-material";
import Swal from "sweetalert2";
import Loader from "../../../Components/loading/Loader.js";
import { connect, dispatch } from "react-redux";
import * as settingActions from "../../../redux/Actions/settingActions.js";
import { useDispatch } from "react-redux";

const DisplayCity = ({  cityData, stateData }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [cityId, setcityId] = useState("");
  const [state, setstate] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");



  useEffect(function () {
    dispatch(settingActions.getCities());
    dispatch(settingActions.getStates());
  }, []);

  const handleOpen = (rowData) => {
    setcityId(rowData._id)
    setCity(rowData.title);
    // setstate(rowData.stateData.title);
    setStatus(rowData.status);
    setOpen(true);
  };

  const handleOptionChange = (e) => {
    setStatus(e.target.value);
  };

  const handleError = (input, value) => {
    setError((prev) => ({ ...prev, [input]: value }));
  };



  const validation = () => {
    let isValid = true;
    if (!state) {
      handleError("state", "Please select state name");
      isValid = false;
    }
    if (!city) {
      handleError("city", "Please input city name");
      isValid = false;
    }


  };

  const handleSubmit = async () => {
    // setLoading(true);
        var formData = new FormData();
      formData.append("title", city);
      formData.append("status", status);
      formData.append("stateId", state);

      dispatch(settingActions.updateCity({formData, cityId}));
      setOpen(false);
      // setLoading(false);
  };

  const handleClose = () => {
    setcityId("");
    setstate("");
    setOpen(false);
  };

  const handleClickOpen = (rowData) => {

    Swal.fire({
      title: 'Are you sure to Change the Status?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Change it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const newStatus = rowData.status === 'Active' ? 'InActive' : 'Active';
        dispatch(settingActions.updateCityStatus({ cityId: rowData._id, status: newStatus }));
      }
    });
  };

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        {cityData && displayTable()}
        {editModal()}
      </div>
    </div>
  );

  function displayTable() {
    return (
      <Grid container spacing={1}>
        <Grid item lg={12} sm={12} md={12} xs={12}>
          <MaterialTable
            title="City List"
            data={cityData}
            columns={[
              {
                title: "S.No",
                editable: "never",
                render: (rowData) => cityData.indexOf(rowData) + 1,
                sorting: true,
              },
              { title: "City", field: "title", sorting: true },
              {
                title: "State",
                field: "stateId.title",
                sorting: true,
              },
              { title: "Status", field: "status", render: rowData => (
                <div className={classes.statusButton}
                style={{ backgroundColor: rowData.status === 'Active' ? '#90EE90' : '#FF7F7F '}}
                onClick={() => handleClickOpen(rowData)}>
                  {rowData.status}
                </div>
              )},

            ]}
            options={{
              ...propStyles.tableStyles,
              sorting: true,
            }}
            style={{ fontSize: "1.4rem" }}
            actions={[
              {
                icon: "edit",
                tooltip: "Edit City",
                onClick: (event, rowData) => handleOpen(rowData),
              },
              {
                icon: "delete",
                tooltip: "Delete City",
                onClick: (event, rowData) =>
                  dispatch(
                    settingActions.deleteCity({
                      title: rowData?.title,
                      cityId: rowData?._id,
                    })
                  ),
              },
              {
                icon: () => (
                  <div className={classes.addButton}>
                    <AddCircleRounded />
                    <div className={classes.addButtontext}>Add New</div>
                  </div>
                ),
                tooltip: "Add City",
                isFreeAction: true,
                onClick: () => navigate("/add-city"),
              },
            ]}
          />
        </Grid>
      </Grid>
    );
  }

  function editModal() {
    const fillSkillList = () => {
      return stateData?.map((item) => {
        return <MenuItem value={item._id}>{item.title}</MenuItem>;
      });
    };
    const showEditForm = () => {
      return (
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>Edit state</div>
            </div>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">State</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="State"
                value={state}
                onFocus={() => handleError("state", null)}
                onChange={(e) => setstate(e.target.value)}
                error={!!error.state}
                required

              >
                <MenuItem disabled value={null}>
                  -Select state-
                </MenuItem>
                {cityData && fillSkillList()}
              </Select>
            </FormControl>
            <div className={classes.errorstyles}>{error.skill_id}</div>
          </Grid>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <TextField
              label="Enter City Name"
              error={!!error.city}
              required
              helperText={error.city}
              value={city}
              onFocus={() => handleError("city", null)}
              onChange={(event) => setCity(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item lg={12} sm={12} md={12} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="select-label">Select Status</InputLabel>
                <Select
                  labelId="select-label"
                  value={status}
                  onChange={handleOptionChange}
                  variant="outlined"
                  error={!!error.status}
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="InActive">InActive</MenuItem>
                </Select>
                <div className={classes.errorstyles}>{error.status}</div>
              </FormControl>
            </Grid>
        
        <Grid item lg={6} sm={6} md={6} xs={6}>
            <div onClick={handleSubmit} className={classes.submitbutton}>
              {/* {loading? <Loader/> : "Submit"} */}
              Submit
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
  stateData: state.setting.stateData,
  cityData: state.setting.cityData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(DisplayCity);
