import React, { useEffect, useState } from "react";
import { useStyles, propStyles } from "../../assets/styles.js";
import { Avatar, Grid, FormControl, InputLabel, Select, DialogContent, Dialog, MenuItem, TextField, CircularProgress } from "@mui/material";
import { AddCircleRounded } from "@mui/icons-material";
import MaterialTable from "material-table";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/loading/Loader.js";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import moment from 'moment';
import * as NotificationActions from "../../redux/Actions/notificationActions.js";

const AstrologerNotification = ({ astrologerNotificationData, dispatch }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState({});
  const [status, setStatus] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [astrologerType, setastrologerType] = useState("");
  const [time, setTime] = useState("");
  const [icon, setIcon] = useState({ file: '', bytes: null });
  const [file, setFile] = useState(null);
  const [notificationId, setNotificationId] = useState('');

  useEffect(() => {
    if(!astrologerNotificationData){
      dispatch(NotificationActions.getAstrologerNotification());
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
    setastrologerType(rowData.astrologerType);
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

  const handleSubmit = async () => {
      var formData = new FormData();
      formData.append("notificationId", notificationId);
      formData.append("image", file);
      formData.append("status", status);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("astrologerType", astrologerType);

      dispatch(NotificationActions.updateAstrologerNotification(formData));
      setOpen(false);
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
          NotificationActions.updateAstrologerNotificationStatus({
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

  const reverseData = Array.isArray(astrologerNotificationData) ? astrologerNotificationData.slice().reverse() : [];


  return (
    <div className={classes.container}>
      {
        !astrologerNotificationData ? <CircularProgress/> :
      <div className={classes.box}>
        {astrologerNotificationData && displayTable()}
        {editModal()}
      </div>
      }
    </div>
  );

  function displayTable() {
    return (
      <Grid container spacing={1}>
        <Grid item lg={12} sm={12} md={12} xs={12}>
          <MaterialTable
            title="Astrologer Notifications"
            data={reverseData}
            columns={[
              {
                title: "S.No",
                editable: "never",
                render: (rowData) =>
                  Array.isArray(reverseData)
                    ? reverseData.indexOf(rowData) + 1
                    : "N/A",
              },
              { title: "Title", field: "title" },
              { title: "Astrologer Type", field: "astrologerType" },
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
            options={propStyles.tableStyles}
            actions={[
              {
                icon: "edit",
                tooltip: "Edit Notification",
                onClick: (event, rowData) => handleOpen(rowData)
              },
              {
                icon: "delete",
                tooltip: "Delete Notification",
                onClick: (event, rowData) =>
                  dispatch(
                    NotificationActions.deleteAstrologerNotification({
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
                  navigate("/addAstrologerNotification", {
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
                value={astrologerType}
                onChange={(e)=>setastrologerType(e.target.value)}
                variant="outlined"
                error={!!error.astrologerType}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="New">New</MenuItem>
                <MenuItem value="Old">Old</MenuItem>
              </Select>
              <div className={classes.errorstyles}>{error.astrologerType}</div>
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
  astrologerNotificationData: state.notification.astrologerNotificationData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AstrologerNotification);
