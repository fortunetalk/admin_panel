import React, { useEffect, useState } from "react";
import { propStyles, useStyles } from "../../assets/styles.js";
import {
  Avatar,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogContent,
  CircularProgress,
} from "@mui/material";
import { CloseRounded, AddCircleRounded, Search } from "@mui/icons-material";
import MaterialTable from "material-table";
import { Colors } from "../../assets/styles.js";

import { useNavigate, useLocation } from "react-router-dom";
import moment from "moment";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import * as CustomerActions from "../../redux/Actions/customerActions.js";
import Loader from "../../Components/loading/Loader.js";
import { api_url, get_all_customers } from "../../utils/Constants.js";

const DisplayCustomer = ({ customerListData, dispatch, isLoading }) => {
  const classes = useStyles();
  const navigate = useNavigate();


  const [open, setOpen] = useState(false);
  const [viewData, setViewData] = useState(false);
  const [profilePicture, setProfilePicture] = useState({
    file: "",
    bytes: "",
  });
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    customerId: "",
    firstName: "",
    lastName: "",
    name: "",
    email: "",
    mobileNumber: "",
    gender: "",
    dob: "",
    tob: "",
    birthAddress: {
      birthPlace: "",
      latitude: "",
      longitude: "",
    },
    currentAddress: "",
    occupation: "",
    problem: "",
    walletBalance: "",
    googleId: "",
    facebookId: "",
    status: "",
    profilePicture: { file: "", bytes: "" },
    referCode: "",
  });

  // useEffect(
  //   function () {
  //     dispatch(CustomerActions.getAllCustomer());
  //   },
  //   [dispatch]
  // );

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  const formatTime = (time) => {
    if (!time) return "";
    const date = new Date(`1970-01-01T${time}Z`);
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const handleOpen = (rowData) => {
    setOpen(true);
    console.log("timeOfBirth", rowData.timeOfBirth);
    setFormData({
      customerId: rowData?._id || "",
      firstName: rowData?.firstName || "",
      lastName: rowData?.lastName || "",
      name: rowData?.customerName || "",
      email: rowData?.email || "",
      mobileNumber: rowData?.phoneNumber || "",
      gender: rowData?.gender || "",
      dob: formatDate(rowData?.dateOfBirth),
      tob: formatTime(rowData?.timeOfBirth),
      birthAddress: {
        birthPlace: rowData?.birthAddress?.birthPlace || "",
        latitude: rowData?.birthAddress?.latitude || "",
        longitude: rowData?.birthAddress?.longitude || "",
      },
      currentAddress: rowData?.currentAddress.city || "",
      occupation: rowData?.occupation || "",
      problem: rowData?.problem || "",
      walletBalance: rowData?.walletBalance || "",
      googleId: rowData?.googleId || "",
      facebookId: rowData?.facebookId || "",
      status: rowData?.status || "",
      profilePicture: { file: rowData.image, bytes: rowData.image } || {
        file: "",
        bytes: "",
      },
      referCode: rowData?.referCode,
    });
  };

  const handleError = (input, value) => {
    setError((prev) => ({ ...prev, [input]: value }));
  };

  const handleClose = () => {
    setViewData(false);
    setOpen(false);
  };

  const handleSubmit = () => {

      const formPayload = new FormData();
      formPayload.append("customerId", formData.customerId);
      formPayload.append("firstName", formData.firstName);
      formPayload.append("lastName", formData.lastName);
      formPayload.append("customerName", formData.name);
      // formPayload.append("email", formData.email);
      formPayload.append("phoneNumber", formData.mobileNumber);
      formPayload.append("gender", formData.gender);
      formPayload.append("dateOfBirth", formData.dob);
      formPayload.append("timeOfBirth", formData.tob);
      formPayload.append("occupation", formData.occupation);
      formPayload.append("problem", formData.problem);
      formPayload.append("status", formData.status);

      dispatch(CustomerActions.updateCustomer(formPayload));
      setOpen(false);
  };

  const handleView = (rowData) => {
    setViewData(true);
    setFormData({
      customerId: rowData.customerUniqueId || "",
      name: rowData.customerName || "",
      email: rowData.email || "",
      mobileNumber: rowData.phoneNumber || "",
      gender: rowData.gender || "",
      dob: rowData.dateOfBirth || "",
      tob: rowData.timeOfBirth || "",
      birthAddress: {
        birthPlace: rowData.birthPlaceAddress?.birthPlace || "",
        latitude: rowData.birthPlaceAddress?.latitude || "",
        longitude: rowData.birthPlaceAddress?.longitude || "",
      },
      currentAddress: rowData.currentAddress.city || "",
      occupation: rowData.occupation || "",
      problem: rowData.problem || "",
      walletBalance: rowData.walletBalance || "",
      googleId: rowData.googleId || "",
      facebookId: rowData.facebookId || "",
      status: rowData.status || "",
      profilePicture: {
        file: rowData.profileImage,
        bytes: rowData.profileImage,
      } || { file: "", bytes: "" },
      referCode: rowData.referCode,
    });
  };

  const handleClickOpen = (rowData) => {
    Swal.fire({
      title: "Are you sure to Change the Status?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Change it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const newStatus = rowData.status === "Active" ? "Blocked" : "Active";
        dispatch(
          CustomerActions.banCustomer({
            customerId: rowData._id,
            status: newStatus,
          })
        );
      }
    });
  };

  const addRecharge = (rowData) => {
    navigate("/rechargeByAdmin", {
      state: { customerId: rowData?._id },
    });
  };

  const viewCustomerHistory = (rowData) => {
    navigate("/customerRechargeHistory", {
      state: { customerId: rowData?._id },
    });
  };

  const handlePaymentHistory = (rowData) => {
    navigate("/displayCustomerPaymentHistory", {
      state: { customerData: rowData },
    });
  };

  return (
    <div className={classes.container}>
 
        <div className={classes.box}>
          { displayTable()}
          {editModal()}
          {viewModal()}
        </div>

    </div>
  );

  function displayTable() {
    return (
      <Grid container spacing={1}>
        <Grid item lg={12} sm={12} md={12} xs={12}>
          <MaterialTable
            title="Customer"
           
            columns={[
              {
                title: "S.No",
                editable: "never",
                render: (rowData) => rowData.tableData.id + 1,
              },
              { title: "Customer ID", field: "customerUniqueId" },
              { title: "Name", field: "customerName" },
              { title: "Mobile", field: "phoneNumber" },
              { title: "Email", field: "email" },
              {
                title: "Walllet",
                render: (rowData) =>
                  parseFloat(rowData.walletBalance.toFixed(2)),
              },
              {
                title: "Registration Date",
                field: "createdAt",
                render: (rowData) =>
                  moment(rowData.createdAt).format("MMMM Do YYYY, hh:mm:ss A"),
              },
              {
                title: "Last Login Date",
                field: "createdAt",
                render: (rowData) =>
                  moment(rowData.updatedAt).format("DD:MM:YYYY, hh:mm A"),
              },

              {
                title: "Status",
                field: "status",
                render: (rowData) => (
                  <div
                    className={classes.statusButton}
                    style={{
                      backgroundColor:
                        rowData.status === "Active" ? "#90EE90" : "#FF7F7F ",
                    }}
                    onClick={() => handleClickOpen(rowData)}
                  >
                    {rowData.status}
                  </div>
                ),
              },
            ]}
            // data={customerListData}
            data={query =>
              new Promise((resolve, reject) => {
                console.log("query", query.filters);
                const filters = {}

                query.filters.map(item => {
                  if (item.value.length > 0) {
                    filters[item.column.field] = item.value[0]
                  }
                })
                console.log({
                  page: query.page + 1, // MaterialTable uses 0-indexed pages
                  limit: query.pageSize === 0 ? 10 : query.pageSize,
                  search: query.search,
                  ...filters, // Include processed filters
                })

                fetch( api_url + get_all_customers, {
                  method: 'POST', // Specify the request method
                  headers: {
                    'Content-Type': 'application/json', // Set the content type to JSON
                  },
                  body: JSON.stringify({
                    page: query.page + 1, // MaterialTable uses 0-indexed pages
                    limit: query.pageSize === 0 ? 10 : query.pageSize,
                    search: query.search,
                  }), // Convert the request body to JSON
                })
                  .then(response => response.json())
                  .then(result => {
                    console.log(result)
                    resolve({
                      data: result.data.data, // Adjust based on your API response
                      page: result.data.pagination.currentPage - 1, // Adjust for 0-indexed pages
                      totalCount: result.data.pagination.totalCount, // Total number of rows
                    })
                  })
              })
            }

            options={{ ...propStyles.tableStyles,  paging: true, pageSize: 10, pageSizeOptions: [10, 20, 50, 100],}}
            style={{ fontSize: "1.0rem" }}
            actions={[
              {
                icon: "visibility",
                tooltip: "View Customer Data",
                onClick: (event, rowData) => handleView(rowData),
              },
              {
                icon: "edit",
                tooltip: "Edit Customer Data",
                onClick: (event, rowData) => handleOpen(rowData),
              },
              {
                icon: "delete",
                tooltip: "Delete Customer",
                onClick: (event, rowData) =>
                  dispatch( CustomerActions.deleteCustomer({customerId: rowData?._id, title: rowData?.customerName, })),
              },
              {
                icon: "add_circle",
                tooltip: "Add Recharge",
                onClick: (event, rowData) => addRecharge(rowData),
              },
              {
                icon: "history",
                tooltip: "View Customer History",
                onClick: (event, rowData) => viewCustomerHistory(rowData),
              },
              {
                icon: () => (
                  <div className={classes.addButton}>
                    <AddCircleRounded />
                    <div className={classes.addButtontext}>Add New</div>
                  </div>
                ),
                tooltip: "Add Customer",
                isFreeAction: true,
                onClick: () => navigate("/addCustomer"),
              },
            ]}
          />
        </Grid>
      </Grid>
    );
  }

  function viewModal() {
    const viewForm = () => {
      return (
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>Customer Details</div>
              <div onClick={handleClose} className={classes.closeButton}>
                <CloseRounded />
              </div>
            </div>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Customer ID"
              value={formData.customerId}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Name"
              value={formData.name}
              name="name"
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Email"
              value={formData.email}
              name="email"
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Mobile Number"
              value={formData.mobileNumber}
              name="mobileNumber"
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Gender"
              value={formData.gender}
              name="gender"
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Date of Birth"
              value={formData.dob}
              name="dob"
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Time of Birth"
              value={formData.tob}
              name="tob"
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Birth Place"
              value={formData.birthAddress.birthPlace}
              name="birthAddress.birthPlace"
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Latitude"
              value={formData.birthAddress.latitude}
              name="birthAddress.latitude"
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Longitude"
              value={formData.birthAddress.longitude}
              name="birthAddress.longitude"
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Current Address"
              value={formData.currentAddress}
              name="currentAddress"
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Occupation"
              value={formData.occupation}
              name="occupation"
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Problem"
              value={formData.problem}
              name="problem"
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Wallet Balance"
              value={formData.walletBalance}
              name="walletBalance"
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Google ID"
              value={formData.googleId}
              name="googleId"
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Facebook ID"
              value={formData.facebookId}
              name="facebookId"
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Status"
              value={formData.status}
              name="status"
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Refer Code"
              value={formData.referCode}
              name="referCode"
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <label htmlFor="">Image</label>
            <Avatar
              src={formData.profilePicture.icon}
              variant="square"
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
              }}
            />
          </Grid>
        </Grid>
      );
    };

    return (
      <div>
        <Dialog open={viewData}>
          <DialogContent>{viewForm()}</DialogContent>
        </Dialog>
      </div>
    );
  }

  function editModal() {
    const showEditForm = () => {
      return (
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>Edit Customer</div>
              <div onClick={handleClose} className={classes.closeButton}>
                <CloseRounded />
              </div>
            </div>
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="First Name"
              helperText={error.firstName}
              value={formData.firstName}
              onChange={(event) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  firstName: event.target.value,
                }))
              }
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Last Name"
              helperText={error.lastName}
              value={formData.lastName}
              onChange={(event) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  lastName: event.target.value,
                }))
              }
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Customer Name"
              helperText={error.name}
              value={formData.name}
              onChange={(event) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  name: event.target.value,
                }))
              }
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item lg={6} sm={12} md={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="select-label">Select Gender</InputLabel>
              <Select
                labelId="select-label"
                value={formData.gender}
                onChange={(event) =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    gender: event.target.value,
                  }))
                }
                variant="outlined"
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
              <div className={classes.errorstyles}>{error.gender}</div>
            </FormControl>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Phone Number"
              helperText={error.phoneNumber}
              value={formData.mobileNumber}
              onFocus={() => handleError("phoneNumber", null)}
              onChange={(event) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  mobileNumber: event.target.value,
                }))
              }
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              type="date"
              label="DOB"
              helperText={error.dob}
              value={formData.dob}
              onFocus={() => handleError("dob", null)}
              onChange={(event) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  dob: event.target.value,
                }))
              }
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              type="time"
              label="Time of Birth"
              helperText={error.tob}
              value={formData.tob}
              onFocus={() => handleError("tob", null)}
              onChange={(event) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  tob: event.target.value,
                }))
              }
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Occupation"
              error={!!error.occupation}
              helperText={error.occupation}
              value={formData.occupation}
              onFocus={() => handleError("occupation", null)}
              onChange={(event) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  occupation: event.target.value,
                }))
              }
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Problem"
              helperText={error.problem}
              value={formData.problem}
              onFocus={() => handleError("problem", null)}
              onChange={(event) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  problem: event.target.value,
                }))
              }
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item lg={6} sm={12} md={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="select-label">Select Status</InputLabel>
              <Select
                labelId="select-label"
                value={formData.status}
                onChange={(event) =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    status: event.target.value,
                  }))
                }
                variant="outlined"
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Blocked">Blocked</MenuItem>
              </Select>
              <div className={classes.errorstyles}>{error.gender}</div>
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
  customerListData: state.customer.customerListData,
  isLoading: state.customer.isLoading,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(DisplayCustomer);
