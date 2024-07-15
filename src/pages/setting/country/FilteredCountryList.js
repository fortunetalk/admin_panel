import React, { useEffect, useState } from "react";
import { Colors, propStyles, useStyles } from "../../../assets/styles.js";
import { Avatar, Grid, Button, TextField, InputLabel, FormControl, MenuItem, Select } from "@mui/material";
import { AddCircleRounded, Close } from "@mui/icons-material";
import MaterialTable from "material-table";
import { useNavigate, useParams } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import {DialogContent, CircularProgress } from "@mui/material";
import Swal from "sweetalert2";
import Loader from "../../../Components/loading/Loader.js";
import { connect, dispatch } from "react-redux";
import * as settingActions from "../../../redux/Actions/settingActions.js";
import { useDispatch } from "react-redux";

const FilteredCountryList = ({  countryData, countryStateData }) => {
  const {countryId} =useParams();
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [id, setid] = useState("");
  const [country, setcountry] = useState("");
  const [code, setcode]=useState("")
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");



  useEffect(function () {
    dispatch(settingActions.getCountries());
    dispatch(settingActions.countryStateList({countryId}));
  }, []);

  const handleOpen = (rowData) => {
    setid(rowData._id);
    setcountry(rowData.title);
    setcode(rowData.code)
    setStatus(rowData.status)
    setOpen(true);
  };

  const handleOptionChange = (e) => {
    setStatus(e.target.value);
  };

  const handleError = (input, value) => {
    setError((prev) => ({ ...prev, [input]: value }));
  };

  const validation = () => {
    var isValid = true;
    if (!country) {
      handleError("country", "Please input country name");
      isValid = false;
    }
  };

  const handleSubmit = async () => {
    // setLoading(true);
      var formData = new FormData();
      formData.append("title", country);
      formData.append("status", status);
      formData.append("code", code);

      dispatch(settingActions.updateCountry({formData, id}));
      setOpen(false);
      setLoading(false);
  };

  const handleClose = () => {
    setid("");
    setcountry("");
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
        dispatch(settingActions.updateCountryStatus({ id: rowData._id, status: newStatus }));
      }
    });
  };
  console.log('data==>',countryStateData)

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        {countryData && displayTable()}
        {editModal()}
      </div>
    </div>
  );

  function displayTable() {
    return (
      <Grid container spacing={1}>
        <Grid item lg={12} sm={12} md={12} xs={12}>
          <MaterialTable
            title="State List"
            data={countryStateData}
            columns={[
              {
                title: "S.No",
                editable: "never",
                render: (rowData) => countryStateData.indexOf(rowData) + 1,
              },
              { title: "Country", field: "title"},
             
              { title: "Status", field: "status", render: rowData => (
                <div className={classes.statusButton}
                style={{ backgroundColor: rowData.status === 'Active' ? '#90EE90' : '#FF7F7F '}}
                onClick={() => handleClickOpen(rowData)}>
                  {rowData.status}
                </div>
              )},

            ]}
            options={propStyles.tableStyles}
            style={{ fontSize: "1.4rem" }}
            actions={[
              {
                icon: "edit",
                tooltip: "Edit Country",
                onClick: (event, rowData) => handleOpen(rowData),
              },
              {
                icon: "delete",
                tooltip: "Delete Country",
                onClick: (event, rowData) =>
                  dispatch(
                    settingActions.deleteCountry({
                      title: rowData?.title,
                      id: rowData?._id,
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
                tooltip: "Add country",
                isFreeAction: true,
                onClick: () => navigate("/add-country"),
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
              <div className={classes.heading}>Edit Country</div>
            </div>
          </Grid>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <TextField
              label="Enter Country Name"
              error={!!error.country}
              helperText={error.country}
              value={country}
              onFocus={() => handleError("country", null)}
              onChange={(event) => setcountry(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item lg={6} sm={12} md={12} xs={12}>
            <TextField
              label="Enter Country Code"
              // error={!error.country}
              helperText={error.code}
              value={code}
              onFocus={() => handleError("code", null)}
              onChange={(event) => setcode(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item lg={6} sm={12} md={6} xs={12}>
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
  countryData: state.setting.countryData,
  countryStateData: state.setting.countryStateData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(FilteredCountryList);
