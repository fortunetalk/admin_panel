import React, { useEffect, useState } from "react";
import { useStyles, propStyles } from "../../assets/styles.js";
import { Grid, TextField, InputLabel, Select,FormControl, MenuItem, Avatar, CircularProgress } from "@mui/material";
import MaterialTable from "material-table";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { CloseRounded } from "@mui/icons-material";
import Swal from "sweetalert2";
import * as HistoryActions from "../../redux/Actions/historyActions.js";
import Loader from "../../Components/loading/Loader.js";
import { connect } from "react-redux";

const DemoClassHistory = ({ dispatch, demoClassHistoryData }) => {
  const classes = useStyles();

  const [viewData, setViewData] = useState(false);
  const [demoClassId, setDemoClassId] = useState("");
  const [courseId, setcourseId] = useState("");
  const [astrologerId, setAstrologerId] = useState("");
  const [className, setclassName] = useState("");
  const [error, setError] = useState({});
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [learn, setLearn] = useState("");
  const [courseContent, setCourseContent] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [sessionTime, setSessionTime] = useState("");
  const [googleMeet, setGoogleMeet] = useState("");
  const [customerName, setCustomerName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('')
  const [classStatus, setClassStatus] = useState('');
  const [adminStatus, setAdminStatus] = useState('');
  const [icon, setIcon] = useState({ file: "", bytes: null });
  const [video, setVideo] = useState({ file: '', bytes: null });

  useEffect(function () {
    dispatch(HistoryActions.getDemoClassHistory());
  }, []);

  const handleView = (rowData) => {
    setViewData(true);
    const formattedDate = new Date(rowData?.date).toISOString().split("T")[0];
    setDate(formattedDate);
    setDemoClassId(rowData?._id)
    setcourseId(rowData?.courseId?.title);
    setAstrologerId(rowData?.astrologerId?.displayName);
    setclassName(rowData?.demoClassId.className);
    setStatus(rowData?.demoClassId.status);
    setDescription(rowData?.demoClassId.description);
    setLearn(rowData?.demoClassId.learn);
    setCourseContent(rowData?.demoClassId.courseContent);
    setTime(rowData?.demoClassId.time);
    setSessionTime(rowData?.demoClassId.sessionTime);
    setGoogleMeet(rowData?.demoClassId.googleMeet);
    setClassStatus(rowData?.demoClassId.classStatus);
    setAdminStatus(rowData?.demoClassId.adminStatus);
    setCustomerName(rowData?.customerName);
    setMobileNumber(rowData?.mobileNumber);
    setIcon(rowData?.demoClassId.image);
    setVideo(rowData?.demoClassId.video);
   
  };

  const handleClose = () => {
    setViewData(false);
  };
  const handleOptionChange = (e) => {
    setStatus(e.target.value);
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
        dispatch(HistoryActions.updateDemoClassHistoryStatus({ id: rowData._id, status: newStatus }));
      }
    });
  };

  return (
    <div className={classes.container}>
      {
        !demoClassHistoryData ? <CircularProgress/> :
      <div className={classes.box}>
        {demoClassHistoryData && displayTable()}
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
            title="Demo Class History"
            data={demoClassHistoryData}
            columns={[
              {
                title: "S.No",
                editable: "never",
                render: rowData => Array.isArray(demoClassHistoryData) ? demoClassHistoryData.indexOf(rowData) + 1 : 'N/A'
              },
              {
                title: "Course Name",
                field: "courseId.title",
              },
              { title: "Class Name", field: "demoClassId.className" },
              {
                title: "Astrologer Display Name",
                field: "astrologerId.displayName",
              },
              {
                title: "Customer Name",
                field: "customerName",
              },
              {
                title: "Mobile Number",
                field: "mobileNumber",
              },

              { title: "Status", field: "status", render: rowData => (
                <div className={classes.statusButton}
                style={{ backgroundColor: rowData.status === 'Active' ? '#90EE90' : '#FF7F7F '}}
                onClick={() => handleClickOpen(rowData)}>
                  {rowData.status}
                </div>
              )},
            ]}
            options={{ ...propStyles.tableStyles, filtering: false }}
            style={{ fontSize: "1.0rem" }}
            actions={[
              {
                icon: "visibility",
                tooltip: "View Data",
                onClick: (event, rowData) => handleView(rowData),
              },
              {
                icon: "delete",
                tooltip: "Delete Gift",
                onClick: (event, rowData) =>
                  dispatch(
                    HistoryActions.deleteDemoClassHistory({
                      id: rowData?._id,
                    })
                  ),
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
                  <div className={classes.heading}>Demo Class History Data</div>
                  <div onClick={handleClose} className={classes.closeButton}>
                    <CloseRounded />
                  </div>
                </div>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextField
                  label="Course Name"
                  value={courseId}
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextField
                  label="Astrologer Display Name"
                  value={astrologerId}
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextField
                  label="Class Name"
                  value={className}
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextField
                  label="Customer Name"
                  value={customerName}
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
                  value={mobileNumber}
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
                  value={status}
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextField
                  label="Class Status"
                  value={classStatus}
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextField
                  label="Admin Status"
                  value={adminStatus}
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
    
    
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextField
                  label="Date"
                  value={date}
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextField
                  label="Time"
                  value={time}
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextField
                  label="Session Time"
                  value={sessionTime}
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextField
                  label="Google Meet"
                  value={googleMeet}
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  id="fullWidth"
                  value={description}
                  multiline
                  rows={2}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <TextField
                  fullWidth
                  label="Learn"
                  id="fullWidth"
                  value={learn}
                  multiline
                  rows={2}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <TextField
                  fullWidth
                  label="Course Content"
                  id="fullWidth"
                  value={courseContent}
                  multiline
                  rows={2}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <label htmlFor="">Image</label>
                <Avatar
                  src={icon}
                  variant="square"
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <label htmlFor="">Video</label>
                <video
                  src={video}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                  }}
                  controls
                />
              </Grid>
            </Grid>
          );
    };

    return (
      <div>
        <Dialog open={viewData}>
          <DialogContent>{showEditForm()}</DialogContent>
        </Dialog>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  demoClassHistoryData: state.history.demoClassHistoryData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(DemoClassHistory);
