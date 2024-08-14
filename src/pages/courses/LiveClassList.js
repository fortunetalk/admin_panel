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
  Tooltip,
  Typography, 
  CircularProgress
} from "@mui/material";
import { AddCircleRounded, PictureAsPdf, School } from "@mui/icons-material";
import MaterialTable from "material-table";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { CloseRounded } from "@mui/icons-material";
import Swal from "sweetalert2";
import * as ScheduleClassActions from "../../redux/Actions/scheduleLiveClassActions.js";
import { connect, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';

const LiveClassList = ({
  scheduleLiveClassData,
}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { liveClassId } = useParams();


  const [open, setOpen] = useState(false);
  const [viewData, setViewData] = useState(false);
  const [classId, setclassId] = useState("");
  const [courseName, setcourseName] = useState("");
  const [className, setclassName] = useState("");
  const [error, setError] = useState({});
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [sessionTime, setsessionTime] = useState("");
  const [googleMeet, setgoogleMeet] = useState("");


  useEffect(() => {
    dispatch(ScheduleClassActions.getScheduleClassData(liveClassId));
  }, [dispatch, liveClassId]);


  const handleOpen = (rowData) => {
    setOpen(true);
    const formattedDate = new Date(rowData?.date).toISOString().split("T")[0];
    // const formattedTime = new Date(rowData?.time).toISOString().split("T")[1].substring(0, );
    setDate(formattedDate);
    setTime(rowData?.time);
    setclassId(rowData?._id);
    setcourseName(rowData?.liveClassId?.className)
    setclassName(rowData?.className);
    setStatus(rowData?.status);
    setDescription(rowData?.description);
    setsessionTime(rowData?.sessionTime);
    setgoogleMeet(rowData?.googleMeet);
  };

  const handleView = (rowData) => {
    setViewData(true);
    const formattedDate = new Date(rowData?.date).toISOString().split("T")[0];
    // const formattedTime = new Date(rowData?.time).toISOString().split("T")[1].substring(0, 5);
    setDate(rowData?.time);
    setclassId(rowData?._id);
    setcourseName(rowData?.liveClassId?.className)
    setclassName(rowData?.className);
    setStatus(rowData?.status);
    setDescription(rowData?.description);
    setsessionTime(rowData?.sessionTime);
    setgoogleMeet(rowData?.googleMeet);

  };


  const handleError = (input, value) => {
    setError((prev) => ({ ...prev, [input]: value }));
  };


  const validation = () => {
    var isValid = true;
    if (!courseName) {
      handleError("courseName", "Please Select Course");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async () => {
    if (validation()) {
      var formData = new FormData();
      formData.append("classId", classId);
      formData.append("liveClassId", liveClassId);
      formData.append("courseName", courseName);
      formData.append("className", className);
      formData.append("description", description);
      formData.append("status", status);
      formData.append("date", date);
      formData.append("time", time);
      formData.append("sessionTime", sessionTime);
      formData.append("googleMeet", googleMeet);


      dispatch(ScheduleClassActions.updateScheduleClass(formData));
      handleClose();
    }
  };

  const handleClose = () => {
    setcourseName("");
    setclassName("");
    setOpen(false);
    setViewData(false);
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
          ScheduleClassActions.updateScheduleClassStatus({
            classId: rowData._id,
            status: newStatus,
          })
        );
      }
    });
  };

  const handleOptionChange = (e) => {
    setStatus(e.target.value);
  };

  const formatDate = (dateString, timeString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0] + " " + timeString;

  };
  

  return (
    <div className={classes.container}>
      <div className={classes.box}>
      {scheduleLiveClassData && scheduleLiveClassData.length > 0 ? (
        displayTable()
      ) : (
        <Typography variant="h6" align="center">
          No Class Found
        </Typography>
      )}
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
            title="Class List"
            data={Array.isArray(scheduleLiveClassData) ? scheduleLiveClassData : []}
            columns={[
              {
                title: "S.No",
                editable: "never",
                render: (rowData) =>
                  Array.isArray(scheduleLiveClassData)
                    ? scheduleLiveClassData.indexOf(rowData) + 1
                    : "N/A",
              },
              { title: "Course Name", field: "liveClassId.className" },
              { title: "Class Name", field: "className" },
              {
                title: "Session Time",
                field: "sessionTime",
              },
              {
                title: "Date and Time",
                field: "date",
                render: (rowData) => formatDate(rowData.date, rowData.time),
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
            style={{ fontSize: "1.4rem" }}
            actions={[
              {
                icon: "visibility",
                tooltip: "View Class",
                onClick: (event, rowData) => handleView(rowData),
              },
              {
                icon: "edit",
                tooltip: "Edit Class",
                onClick: (event, rowData) => handleOpen(rowData),
              },
              {
                icon: "delete",
                tooltip: "Delete Class",
                onClick: (event, rowData) =>
                  dispatch(
                    ScheduleClassActions.deleteScheduleClass({
                      classId: rowData?._id,
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
                tooltip: "Add Class",
                isFreeAction: true,
                onClick: () => navigate(`/addClass/${liveClassId}`),
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
              <div className={classes.heading}>Edit Live Class</div>
            </div>
          </Grid>
       
          <Grid item lg={6} sm={6} md={6} xs={12}>
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
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Class Name"
              error={error.className ? true : false}
              helperText={error.className}
              value={className}
              onFocus={() => handleError("className", null)}
              onChange={(event) => setclassName(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item lg={6} sm={12} md={6} xs={12}>
            <TextField
              type="date"
              value={date}
              variant="outlined"
              fullWidth
              onFocus={() => handleError("date", null)}
              onChange={(event) => setDate(event.target.value)}
              helperText={error.date}
              error={error.date ? true : false}
            />
          </Grid>

          <Grid item lg={6} sm={12} md={6} xs={12}>
            <TextField
              type="time"
              label="Time"
              value={time}
              variant="outlined"
              fullWidth
              onFocus={() => handleError("time", null)}
              onChange={(event) => setTime(event.target.value)}
              helperText={error.time}
              error={error.time ? true : false}
            />
          </Grid>
          <Grid item lg={6} sm={12} md={6} xs={12}>
            <TextField
              type="text"
              label="sessionTime"
              value={sessionTime}
              variant="outlined"
              fullWidth
              onFocus={() => handleError("sessionTime", null)}
              onChange={(event) => setsessionTime(event.target.value)}
              helperText={error.sessionTime}
              error={error.sessionTime ? true : false}
            />
          </Grid>
          <Grid item lg={6} sm={12} md={6} xs={12}>
            <TextField
              type="text"
              label="googleMeet"
              value={googleMeet}
              variant="outlined"
              fullWidth
              onFocus={() => handleError("googleMeet", null)}
              onChange={(event) => setgoogleMeet(event.target.value)}
              helperText={error.googleMeet}
              error={error.googleMeet ? true : false}
            />
          </Grid>


          <Grid item lg={12} md={12} sm={12} xs={12}>
            <TextField
              fullWidth
              label="Description"
              id="fullWidth"
              value={description}
              multiline
              rows={4}
              onFocus={() => handleError("description", null)}
              onChange={(event) => setDescription(event.target.value)}
              helperText={error.description}
              error={error.description ? true : false}
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

  function viewModal() {
    const viewForm = () => {
      return (
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>Class Data</div>
              <div onClick={handleClose} className={classes.closeButton}>
                <CloseRounded />
              </div>
            </div>
          </Grid>
         
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Course Name"
              value={courseName}
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

          <Grid item lg={6} sm={12} md={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="select-label">Select Status</InputLabel>
              <Select
                labelId="select-label"
                value={status}
                onChange={handleOptionChange}
                variant="outlined"
                error={!!error.status}
                InputProps={{
                  readOnly: true,
                }}
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="InActive">InActive</MenuItem>
              </Select>
              <div className={classes.errorstyles}>{error.status}</div>
            </FormControl>
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
              label="Google Meet URL"
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
};

const mapStateToProps = (state) => ({
  scheduleLiveClassData: state.scheduleLiveClass.scheduleLiveClassData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(LiveClassList);
