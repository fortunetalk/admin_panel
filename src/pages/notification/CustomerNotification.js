import React, { useEffect, useState } from "react";
import { useStyles } from "../../assets/styles.js";
import { Avatar, Grid, FormControl, InputLabel, Select, DialogContent, Dialog, MenuItem, TextField } from "@mui/material";
import { AddCircleRounded } from "@mui/icons-material";
import MaterialTable from "material-table";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/loading/Loader.js";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import moment from 'moment';
import * as NotificationActions from "../../redux/Actions/notificationActions.js";

const CustomerNotification = ({ customerNotificationData, dispatch }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState({});
  const [status, setStatus] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [customerType, setCustomerType] = useState("");
  const [recipients, setRecipients] = useState([]);
  const [time, setTime] = useState("");
  const [icon, setIcon] = useState({ file: '', bytes: null });
  const [file, setFile] = useState(null);
  const [notificationId, setNotificationId] = useState('');

  useEffect(() => {
    if(!customerNotificationData){
      dispatch(NotificationActions.getCustomerNotification());
    }
  }, []);

  const handleOptionChange = (e) => {
    setStatus(e.target.value);
  };

  const handleOpen = (rowData) =>{
    setOpen(true);
    setNotificationId(rowData?._id)
    setStatus(rowData.status);
    setTitle(rowData.title);
    setDescription(rowData.description);
    setCustomerType(rowData.customerType);
    setRecipients(rowData.recipients);
    setTime(rowData.sentAt);
    setIcon({file:rowData.image, bytes:rowData.imageSize});
  }

  const handleError = (input, value) => {
    setError((prev) => ({ ...prev, [input]: value }));
  };

  const handleIcon = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setIcon({
        file: URL.createObjectURL(e.target.files[0]),
        bytes: e.target.files[0],
      });
      handleError("icon", null);
      setFile(e.target.files[0]);
    }
  };

  const validation = () => {
    var isValid = true;
    if (!status) {
      handleError("status", "Please Select Status");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async () => {
    if (validation()) {
      var formData = new FormData();
      formData.append("notificationId", notificationId);
      formData.append("image", file);
      formData.append("status", status);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("customerType", customerType);
      formData.append("recipients", recipients);

      dispatch(NotificationActions.updateCustomerNotification(formData));
      setOpen(false);
    }
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
        const newStatus = rowData.status === "Active" ? "InActive" : "Active";
        dispatch(
          NotificationActions.updateCustomerNotificationStatus({
            notificationId: rowData._id,
            status: newStatus,
          })
        );
      }
    });
  };



  const handleClose = () => {

    setFile("")
    setOpen(false);
  };


  return (
    <div className={classes.container}>
      <Loader />
      <div className={classes.box}>
        {customerNotificationData && displayTable()}
        {editModal()}
      </div>
    </div>
  );

  function displayTable() {
    return (
      <Grid container spacing={1}>
        <Grid item lg={12} sm={12} md={12} xs={12}>
          <MaterialTable
            title="Customer Notifications"
            data={customerNotificationData}
            columns={[
              {
                title: "S.No",
                editable: "never",
                render: (rowData) =>
                  Array.isArray(customerNotificationData)
                    ? customerNotificationData.indexOf(rowData) + 1
                    : "N/A",
              },
              { title: "Title", field: "title" },
              { title: "Customer Type", field: "customerType" },
              { title: "Description", field: "description" },
              {
                title: 'Sent At',
                field: 'sentAt',
                render: (rowData) => moment(rowData.sentAt).format('YYYY-MM-DD HH:mm:ss')
              },
              
              {
                title: "Image",
                field: "image",
                render: (rowData) => (
                  <Avatar
                    src={rowData.image}
                    style={{ width: 50, height: 50 }}
                    variant="square"
                  />
                ),
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
            options={{
              sorting: true,
              search: true,
              searchFieldAlignment: "right",
              filtering: true,
              paging: true,
              // pageSizeOptions: createArrayWithBreakdowns(editable?.length, 5),
              pageSize: 5,
              paginationType: "stepped",
              showFirstLastPageButtons: true,
              paginationPosition: "bottom",
              exportButton: false,
              exportAllData: false,
              exportFileName: "Category data",
              addRowPosition: "first",
              actionsColumnIndex: -1,
              selection: false,
              showSelectAllCheckbox: false,
            }}
            actions={[
              {
                icon: "edit",
                tooltip: "Edit Notification",
                onClick: (event, rowData) => handleOpen(rowData)
              },
              {
                icon: "delete",
                tooltip: "Delete Skill",
                onClick: (event, rowData) =>
                  dispatch(
                    NotificationActions.deleteCustomerNotification({
                      title: rowData?.title,
                      notificationId: rowData?._id,
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
                tooltip: "Add New",
                isFreeAction: true,
                onClick: () =>
                  navigate("/addCustomerNotification", {
                    state: { type: "customer" },
                  }),
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
              <div className={classes.heading}>Edit Notification</div>
            </div>
          </Grid>

          <Grid item lg={6} sm={12} md={6} xs={12}>
            <TextField
              label="Enter Title"
              error={!!error.title}
              helperText={error.title}
              value={title}
              onFocus={() => handleError("title", null)}
              onChange={(event) => setTitle(event.target.value)}
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
          <Grid item lg={6} sm={12} md={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="select-label">Select Customer Type</InputLabel>
              <Select
                labelId="select-label"
                value={customerType}
                onChange={(e)=>setCustomerType(e.target.value)}
                variant="outlined"
                error={!!error.customerType}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="New">New</MenuItem>
                <MenuItem value="Old">Old</MenuItem>
              </Select>
              <div className={classes.errorstyles}>{error.customerType}</div>
            </FormControl>
          </Grid>

          <Grid
            item
            lg={4}
            sm={6}
            md={6}
            xs={6}
            className={classes.uploadContainer}
          >
            <label className={classes.uploadImageButton}>
              Upload Image
              <input
                onChange={handleIcon}
                hidden
                accept="image/*"
                type="file"
              />
            </label>
            <div className={classes.errorstyles}>{error.icon}</div>
          </Grid>
          <Grid item lg={2} sm={6} md={2} xs={6}>
            <Avatar src={icon.file} style={{ width: 56, height: 56 }} />
          </Grid>
   
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <TextField
              label="Enter Description"
              error={!!error.description}
              helperText={error.description}
              value={description}
              onFocus={() => handleError("description", null)}
              onChange={(event) => setDescription(event.target.value)}
              variant="outlined"
              fullWidth
              multiline
              rows={4}
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
  customerNotificationData: state.notification.customerNotificationData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerNotification);
