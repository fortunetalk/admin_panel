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
} from "@mui/material";
import {
  AddCircleRounded,
  Chat,
  Check,
  Close,
  CloseRounded,
  DashboardCustomize,
  Delete,
  DockOutlined,
  DocumentScannerOutlined,
  Edit,
  GradeOutlined,
  Info,
  PausePresentation,
  Subject,
} from "@mui/icons-material";
import MaterialTable from "material-table";
import { Colors } from "../../assets/styles.js";
import {
  ban_customer,
  base_url,
  delete_customer,
  get_all_customers,
  online_offline_customer,
  update_customer,
} from "../../utils/Constants.js";
import { getData, postData } from "../../utils/FetchNodeServices.js";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Swal from "sweetalert2";
import { validateDate } from "@mui/x-date-pickers/internals";
import { BiRupee } from "react-icons/bi";
import { connect } from "react-redux";
import * as CustomerActions from "../../redux/Actions/customerActions.js";
import Loader from "../../Components/loading/Loader.js";

const DisplayCustomer = ({ customerListData, dispatch }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [customerData, setCustomersData] = useState([]);
  const [infoData, setInfoData] = useState([]);
  const [open, setOpen] = useState(false);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [customerId, setCustomerId] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [mobileNumber, setMobileNumber] = useState();
  const [profilePicture, setProfilePicture] = useState({ file: "", bytes: "" });
  const [error, setError] = useState({});

  useEffect(function () {
    dispatch(CustomerActions.getAllCustomer());
  }, [dispatch]);

  const fetchAllCustomers = async () => {
    var response = await getData(get_all_customers);
    setCustomersData(response.customers);
  };

  const handleBanned = async (rowData) => {
    var status = rowData.banned_status ? "Unban" : "Ban";
    Swal.fire({
      title: `Are you sure to ${status} this Customer`,
      text: `This Customer will be ${status} for active in App`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: Colors.primaryLight,
      cancelButtonColor: Colors.red_a,
      confirmButtonText: status,
    }).then(async (result) => {
      if (result.isConfirmed) {
        var response = await postData(ban_customer, {
          customerId: rowData._id,
        });
        if (response.success) {
          Swal.fire({
            title: rowData.banned_status
              ? "Unbanned Successful"
              : "Banned Successful",
            text: response.message,
            icon: "success",
          });
          fetchAllCustomers();
        } else {
          Swal.fire({
            title: `Failed to ${
              rowData.banned_status ? "Unban" : "Ban"
            } Customer`,
            text: response.message,
            icon: "success",
          });
          fetchAllCustomers();
        }
      }
    });
  };

  const handleOnlineOffline = async (rowData) => {
    var status = rowData.isOnline ? "Offline" : "Online";
    Swal.fire({
      title: `Are you sure to ${status} this Customer`,
      text: `This Customer will be ${status}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: Colors.primaryLight,
      cancelButtonColor: Colors.red_a,
      confirmButtonText: status,
    }).then(async (result) => {
      if (result.isConfirmed) {
        var response = await postData(online_offline_customer, {
          customerId: rowData._id,
        });
        if (response.success) {
          Swal.fire({
            title: rowData.isOnline
              ? "Offline Successful"
              : "Online Successful",
            text: response.message,
            icon: "success",
          });
          fetchAllCustomers();
        } else {
          Swal.fire({
            title: `Failed to ${
              rowData.banned_status ? "Unban" : "Ban"
            } Customer`,
            text: response.message,
            icon: "success",
          });
          fetchAllCustomers();
        }
      }
    });
  };

  const handleOpen = (rowData) => {
    setOpen(true);
    setCustomerId(rowData._id);
    setName(rowData.customerName);
    setEmail(rowData.email);
    setMobileNumber(rowData.phoneNumber);
    setProfilePicture({ file: base_url + rowData.image, bytes: rowData.image });
  };

  const handleError = (input, value) => {
    setError((prev) => ({ ...prev, [input]: value }));
  };

  const handleClose = () => {
    setName("");
    setEmail("");
    setProfilePicture({ file: "", bytes: "" });
    setOpen(false);
    setCustomerId("");
  };

  const handleProfilePicture = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setProfilePicture({
        file: URL.createObjectURL(e.target.files[0]),
        bytes: e.target.files[0],
      });
      handleError("icon", null);
    }
  };

  const validation = () => {
    var isValid = true;
    if (!name) {
      handleError("name", "Please Input Customer Name");
      isValid = false;
    }
    if (!email) {
      handleError("email", "Please Input Email");
      isValid = false;
    }
    if (!mobileNumber) {
      handleError("mobileNumber", "Please Input Mobile Number");
      isValid = false;
    }
    if (!profilePicture.bytes) {
      handleError("profilePicture", "Please Select Profile Picture");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async () => {
    if (validation()) {
      var formData = new FormData();
      formData.append("customerId", customerId);
      formData.append("customerName", name);
      formData.append("phoneNumber", mobileNumber);
      formData.append("email", email);
      formData.append("image", profilePicture.bytes);
      setOpen(false)
      dispatch(CustomerActions.updateCustomer({data: formData, onSuccess: setOpen}))
    
    }
  };

  const handleViewInfo = (rowData) => {
    setInfoModalOpen(true);
    setInfoData([rowData]);
  };


  const handleOrderHistory = (rowData) => {
    navigate("/displayCustomerOrderHistory", {
      state: { customerData: rowData },
    });
  };

  const handlePaymentHistory = (rowData) => {
    navigate("/displayCustomerPaymentHistory", {
      state: { customerData: rowData },
    });
  };

  return (
    <div className={classes.container}>
      <Loader />
      <div className={classes.box}>
        {customerListData && displayTable()}
        {editModal()}
        {infoModal()}
      </div>
    </div>
  );

  function displayTable() {
    return (
      <Grid container spacing={1}>
        <Grid item lg={12} sm={12} md={12} xs={12}>
          <MaterialTable
            title="Customer"
            data={customerListData}
            columns={[
              {
                title: "S.No",
                editable: "never",
                render: (rowData) => customerListData.indexOf(rowData) + 1,
              },
              { title: "Name", field: "customerName" },
              { title: "Mobile", field: "phoneNumber" },
              { title: "Email", field: "email" },
              {
                title: "Walllet",
                render: (rowData) =>
                  parseFloat(rowData.wallet_balance.toFixed(2)),
              },
              {
                title: "Restration Date",
                field: "createdAt",
                render: (rowData) =>
                  moment(rowData.createdAt).format("MMMM Do YYYY, h:mm:ss a"),
              },
              {
                title: "Last Login Date",
                field: "createdAt",
                render: (rowData) =>
                  moment(rowData.updatedAt).format("MMMM Do YYYY, h:mm:ss a"),
              },
              {
                title: "Actions",
                render: (rowData) => (
                  <div>
                    {/* Info */}
                    <div
                      onClick={() => handleViewInfo(rowData)}
                      style={{
                        backgroundColor: Colors.grayDark,
                        color: Colors.white,
                        textAlign: "center",
                        padding: 5,
                        fontSize: "1.2rem",
                        fontFamily: "Philospher",
                        borderRadius: 5,
                        cursor: "pointer",
                        margin: 5,
                        display: "flex",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <Info />
                      <div>Info</div>
                    </div>
                    {/* Info
                                        {/* Edit */}
                    <div
                      onClick={() => handleOpen(rowData)}
                      style={{
                        backgroundColor: Colors.blueFacebook,
                        color: Colors.white,
                        textAlign: "center",
                        padding: 5,
                        fontSize: "1.2rem",
                        fontFamily: "Philospher",
                        borderRadius: 5,
                        cursor: "pointer",
                        margin: 5,
                        display: "flex",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <Edit />
                      <div>Edit</div>
                    </div>
                    {/* Edit */}

                    {/* Order Hisotry */}
                    {/* <div
                      onClick={() => handleOrderHistory(rowData)}
                      style={{
                        backgroundColor: Colors.blueFacebook,
                        color: Colors.white,
                        textAlign: "center",
                        padding: 5,
                        fontSize: "1.2rem",
                        fontFamily: "Philospher",
                        borderRadius: 5,
                        cursor: "pointer",
                        margin: 5,
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                      }}
                    >
                      <Subject />
                      <div>Order History</div>
                    </div> */}
                    {/* Order Hisotry */}
                    {/* Payment Hisotry */}
                    {/* <div
                      onClick={() => handlePaymentHistory(rowData)}
                      style={{
                        backgroundColor: Colors.blueFacebook,
                        color: Colors.white,
                        textAlign: "center",
                        padding: 5,
                        fontSize: "1.2rem",
                        fontFamily: "Philospher",
                        borderRadius: 5,
                        cursor: "pointer",
                        margin: 5,
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                      }}
                    >
                      <BiRupee fontSize={20} />
                      <div>Payment History</div>
                    </div>
                     */}
                    <div
                      onClick={() => dispatch(CustomerActions.banCustomer({customerId: rowData?._id, customerName: rowData?.customerName, status: rowData?.banned_status}))}
                      style={{
                        backgroundColor: rowData.banned_status
                          ? Colors.red_a
                          : Colors.greenLight,
                        color: Colors.white,
                        textAlign: "center",
                        padding: 5,
                        fontSize: "1.2rem",
                        fontFamily: "Philospher",
                        borderRadius: 5,
                        cursor: "pointer",
                        margin: 5,
                        display: "flex",
                        justifyContent: "space-evenly",
                      }}
                    >
                      {rowData.banned_status ? <Close /> : <Check />}
                      <div>{!!rowData.banned_status ? "Banned" : "Unbanned"}</div>
                    </div>
                    {/* Banning */}
                    {/* Delete */}
                    {/* <div
                      onClick={() =>
                        dispatch(
                          CustomerActions.deleteCustomer({
                            customerId: rowData._id,
                            customerName: rowData?.customerName
                          })
                        )
                      }
                      style={{
                        backgroundColor: Colors.red_a,
                        color: Colors.white,
                        textAlign: "center",
                        padding: 5,
                        fontSize: "1.2rem",
                        fontFamily: "Philospher",
                        borderRadius: 5,
                        cursor: "pointer",
                        margin: 5,
                        display: "flex",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <Delete />
                      <div> Delete</div>
                    </div> */}
                    {/* Delete */}
                  </div>
                ),
              },
            ]}
            options={{...propStyles.tableStyles, filtering: false}}
            actions={[
              {
                icon: () => (
                  <div className={classes.addButton}>
                    <AddCircleRounded />
                    <div className={classes.addButtontext}>Add New</div>
                  </div>
                ),
                tooltip: "Add Customer",
                isFreeAction: true,
                // onClick: () => navigate("/AddCustomer")
              },
            ]}
          />
        </Grid>
      </Grid>
    );
  }

  function infoModal() {
    return (
      <Dialog open={infoModalOpen} maxWidth={false}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item lg={12} sm={12} md={12} xs={12}>
              <MaterialTable
                title="Customer Information"
                data={infoData}
                columns={[
                  { title: "Name", field: "customerName" },
                  { title: "Mobile", field: "phoneNumber" },
                  { title: "Email", field: "email" },
                  { title: "Wallet", field: "wallet_balance" },
                  { title: "City", field: "city" },
                  { title: "State", field: "state" },
                  { title: "Country", field: "country" },
                  { title: "DOB", field: "dateOfBirth" },
                  { title: "TOB", field: "timeOfBirth" },
                  { title: "Place of Birth", field: "placeOfBirth" },
                ]}
                options={{
                  sorting: false,
                  search: false,
                  searchFieldAlignment: "right",
                  filtering: false,
                  paging: false,
                }}
                actions={[
                  {
                    icon: () => (
                      <div
                        className={classes.addButton}
                        onClick={() => setInfoModalOpen(false)}
                      >
                        <CloseRounded />
                      </div>
                    ),
                    tooltip: "Close",
                    isFreeAction: true,
                  },
                ]}
              />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
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
          <Grid
            item
            lg={4}
            sm={12}
            md={12}
            xs={12}
            className={classes.uploadContainer}
          >
            <Grid
              component="label"
              onClick={handleProfilePicture}
              className={classes.uploadImageButton}
            >
              Upload Picutre
              <input
                onChange={handleProfilePicture}
                hidden
                accept="image/*"
                type="file"
              />
            </Grid>
          </Grid>
          <Grid item lg={2} sm={12} md={12} xs={12}>
            <Avatar
              color={Colors.primaryDark}
              src={profilePicture.file}
              style={{ width: 56, height: 56 }}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label=" Enter Username"
              error={error.name ? true : false}
              helperText={error.name}
              value={name}
              onFocus={() => handleError("name", null)}
              onChange={(event) => setName(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label=" Enter Phone"
              error={error.mobileNumber ? true : false}
              helperText={error.mobileNumber}
              value={mobileNumber}
              onFocus={() => handleError("mobileNumber", null)}
              onChange={(event) => setMobileNumber(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label=" Enter Email"
              error={error.email ? true : false}
              helperText={error.email}
              value={email}
              onFocus={() => handleError("email", null)}
              onChange={(event) => setEmail(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item lg={6} sm={6} md={6} xs={6}>
            <div onClick={handleSubmit} className={classes.submitbutton}>
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
  customerListData: state.customer.customerListData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(DisplayCustomer);
