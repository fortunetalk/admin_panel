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
} from "@mui/material";
import { AddCircleRounded, PictureAsPdf, School, QuestionAnswer } from "@mui/icons-material";
import MaterialTable from "material-table";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { CloseRounded } from "@mui/icons-material";
import Swal from "sweetalert2";
import * as CourseActions from "../../redux/Actions/courseActions.js";
import * as AstrologerActions from "../../redux/Actions/astrologerActions.js";
import * as LiveClassActions from "../../redux/Actions/liveClassActions.js";
import * as ScheduleClassActions from "../../redux/Actions/scheduleLiveClassActions.js";
import { connect } from "react-redux";

const DisplayLiveClass = ({
  dispatch,
  liveClassData,
  activeAstrologerData,
  activeCourseData,
}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [viewData, setViewData] = useState(false);
  const [liveClassId, setliveClassId] = useState("");
  const [courseId, setcourseId] = useState("");
  const [astrologerId, setAstrologerId] = useState("");
  const [className, setclassName] = useState("");
  const [error, setError] = useState({});
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [courseContent, setCourseContent] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [price, setprice] = useState("");
  const [discount, setdiscount] = useState("");
  const [icon, setIcon] = useState({ file: "", bytes: null });
  const [file, setFile] = useState(null);
  const [video, setVideo] = useState({ file: "", bytes: null });
  const [pdf, setPdf] = useState({ file: "", bytes: null });


  useEffect(function () {
    dispatch(CourseActions.getActiveCourseData());
    dispatch(LiveClassActions.getLiveClassData());
    dispatch(AstrologerActions.getAllActiveAstrologer());
  }, []);

  function fillCourseList() {
    return activeCourseData.map((item) => {
      return <MenuItem value={item._id}>{item.title}</MenuItem>;
    });
  }

  function fillAstrologerList() {
    return activeAstrologerData.map((item) => {
      return <MenuItem value={item._id}>{item.displayName}</MenuItem>;
    });
  }

  const handleOpen = (rowData) => {
    setOpen(true);
    const formattedDate = new Date(rowData?.date).toISOString().split("T")[0];
    setDate(formattedDate);
    setliveClassId(rowData?._id);
    setcourseId(rowData?.courseId?.title);
    setAstrologerId(rowData?.astrologerId?.displayName);
    setclassName(rowData?.className);
    setStatus(rowData?.status);
    setDescription(rowData?.description);
    setCourseContent(rowData?.courseContent);
    setTime(rowData?.time);
    setprice(rowData?.price);
    setdiscount(rowData?.discount);
    setIcon(rowData?.image);
    setVideo(rowData?.video);
  };

  const handleView = (rowData) => {
    setViewData(true);
    const formattedDate = new Date(rowData?.date).toISOString().split("T")[0];
    setDate(formattedDate);
    setliveClassId(rowData?._id);
    setcourseId(rowData?.courseId?.title);
    setAstrologerId(rowData?.astrologerId?.displayName);
    setclassName(rowData?.className);
    setStatus(rowData?.status);
    setDescription(rowData?.description);
    setCourseContent(rowData?.courseContent);
    setTime(rowData?.time);
    setprice(rowData?.price);
    setdiscount(rowData?.discount);
    setIcon(rowData?.image);
    setVideo(rowData?.video);
  };

  const handleNavigate=(rowData)=>{
    dispatch(ScheduleClassActions.getScheduleClassData(rowData?._id))
    navigate(`/liveClassList/${rowData?._id}`);

  }
  const handleMCQ=(rowData)=>{
    navigate(`/mcqList/${rowData?._id}`);
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

  const handleVideo = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedVideo = e.target.files[0];
      setVideo({
        file: selectedVideo.name,
        bytes: selectedVideo,
      });
      handleError("video", null);
    }
  };

  const handlePdf = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedPdf = e.target.files[0];
      setPdf({
        file: selectedPdf.name,
        bytes: selectedPdf,
      });
      handleError("pdf", null);
    }
  };

  const validation = () => {
    var isValid = true;
    if (!courseId) {
      handleError("courseId", "Please Select Course");
      isValid = false;
    }

    // if (!file) {
    //   handleError("icon", "Please upload an image");
    //   isValid = false;
    // }
    return isValid;
  };

  const handleSubmit = async () => {
    if (validation()) {
      var formData = new FormData();
      formData.append("liveClassId", liveClassId);
      formData.append("astrologerId", astrologerId);
      formData.append("courseId", courseId);
      formData.append("className", className);
      formData.append("description", description);
      formData.append("status", status);
      formData.append("image", file);
      formData.append("courseContent", courseContent);
      formData.append("date", date);
      formData.append("time", time);
      formData.append("price", price);
      formData.append("discount", discount);
      formData.append("video", video.bytes);
      formData.append("pdf", pdf.bytes);

      dispatch(LiveClassActions.updateLiveClass(formData));
      handleClose();
    }
  };

  const handleClose = () => {
    setcourseId("");
    setclassName("");
    setOpen(false);
    setViewData(false);
  };

  const handleAdminStatusChange = (rowData, newStatus) => {
    Swal.fire({
      title: "Are you sure you want to change the Admin Status?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          LiveClassActions.updateLiveClassAdminStatus({
            liveClassId: rowData._id,
            adminStatus: newStatus,
          })
        );
      }
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
        const newStatus = rowData.status === "Active" ? "InActive" : "Active";
        dispatch(
          LiveClassActions.updateLiveClassStatus({
            liveClassId: rowData._id,
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
        {liveClassData && displayTable()}
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
            title="Live Class"
            data={liveClassData}
            columns={[
              {
                title: "S.No",
                editable: "never",
                render: (rowData) =>
                  Array.isArray(liveClassData)
                    ? liveClassData.indexOf(rowData) + 1
                    : "N/A",
              },
              { title: "Course Name", field: "courseId.title" },
              {
                title: "Astrologer Name",
                field: "astrologerId.displayName",
                render: (rowData) =>
                  rowData.astrologerId
                    ? rowData.astrologerId.displayName
                    : "N/A",
              },

              { title: "Class Name", field: "className" },

              {
                title: "Date and Time",
                field: "date",
                render: (rowData) => formatDate(rowData.date, rowData.time),
              },

              { title: "Price", field: "price" },

              {
                title: "Image",
                field: "image",
                render: (rowData) => (
                  <Avatar
                    src={rowData.image}
                    style={{ width: 50, height: 50 }}
                    variant="rounded"
                  />
                ),
              },

              {
                title: "Admin Status",
                field: "adminStatus",
                render: (rowData) => (
                  <div>
                    <select
                      className={classes.statusDropdown}
                      value={rowData.adminStatus}
                      onChange={(e) =>
                        handleAdminStatusChange(rowData, e.target.value)
                      }
                      style={{
                        backgroundColor:
                          rowData.adminStatus === "Approved"
                            ? "#90EE90" // Light Green
                            : rowData.adminStatus === "Rejected"
                            ? "#FF7F7F" // Light Red
                            : rowData.adminStatus === "Pending"
                            ? "#FFD700" // Gold
                            : "#D3D3D3",
                      }}
                    >
                      <option value="Approved">Approved</option>
                      <option value="Pending">Pending</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
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

              {
                title: "PDF",
                field: "pdf",
                render: (rowData) => (
                  <Tooltip title="Download PDF">
                    <PictureAsPdf
                      onClick={() => window.open(rowData.pdf, "_blank")}
                      style={{
                        cursor: "pointer",
                        color: "#1976d2",
                        width: "30px",
                        height: "30px",
                      }}
                    />
                  </Tooltip>
                ),
              },
            ]}
            options={propStyles.tableStyles}
            style={{ fontSize: "1.4rem" }}
            actions={[
              {
                icon: "visibility",
                tooltip: "View Live Class",
                onClick: (event, rowData) => handleView(rowData),
              },
              {
                icon: "edit",
                tooltip: "Edit Live Class",
                onClick: (event, rowData) => handleOpen(rowData),
              },
              {
                icon: "delete",
                tooltip: "Delete Live Class",
                onClick: (event, rowData) =>
                  dispatch(
                    LiveClassActions.deleteLiveClass({
                      liveClassId: rowData?._id,
                    })
                  ),
              },
              {
                icon: School,
                tooltip: 'Go to Class List',
                onClick: (event, rowData) => handleNavigate(rowData),
              },
              {
                icon: QuestionAnswer,
                tooltip: 'Go to MCQ List',
                onClick: (event, rowData) => handleMCQ(rowData),
              },

              {
                icon: () => (
                  <div className={classes.addButton}>
                    <AddCircleRounded />
                    <div className={classes.addButtontext}>Add New</div>
                  </div>
                ),
                tooltip: "Add Demo Class",
                isFreeAction: true,
                onClick: () => navigate("/scheduleLiveClass"),
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
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select Course
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Course"
                value={courseId}
                onFocus={() => handleError("courseId", null)}
                onChange={(e) => setcourseId(e.target.value)}
                error={error.courseId ? true : false}
              >
                <MenuItem disabled value="">
                  -Select Course-
                </MenuItem>
                {activeCourseData && fillCourseList()}
              </Select>
            </FormControl>
            <div className={classes.errorstyles}>{error.courseId}</div>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select Astrologer
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Astrologer"
                value={astrologerId}
                onFocus={() => handleError("astrologerId", null)}
                onChange={(e) => setAstrologerId(e.target.value)}
                error={error.astrologerId ? true : false}
              >
                <MenuItem disabled value={null}>
                  -Select Astrologer-
                </MenuItem>
                {activeAstrologerData && fillAstrologerList()}
              </Select>
            </FormControl>
            <div className={classes.errorstyles}>{error.astrologerId}</div>
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
              type="number"
              label="Price"
              value={price}
              variant="outlined"
              fullWidth
              onFocus={() => handleError("price", null)}
              onChange={(event) => setprice(event.target.value)}
              helperText={error.price}
              error={error.price ? true : false}
            />
          </Grid>
          <Grid item lg={6} sm={12} md={6} xs={12}>
            <TextField
              type="number"
              label="Discount"
              value={discount}
              variant="outlined"
              fullWidth
              onFocus={() => handleError("discount", null)}
              onChange={(event) => setdiscount(event.target.value)}
              helperText={error.discount}
              error={error.discount ? true : false}
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

          <Grid item lg={12} md={12} sm={12} xs={12}>
            <TextField
              fullWidth
              label="Course Content"
              id="fullWidth"
              value={courseContent}
              multiline
              rows={4}
              onFocus={() => handleError("courseContent", null)}
              onChange={(event) => setCourseContent(event.target.value)}
              helperText={error.courseContent}
              error={error.courseContent ? true : false}
            />
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
              {icon.file ? icon.file : "Upload Image"}
              <input
                onChange={handleIcon}
                hidden
                accept="image/*"
                type="file"
              />
            </label>
            <div className={classes.errorStyles}>{error.icon}</div>
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
              Upload Video
              <input
                onChange={handleVideo}
                hidden
                accept="video/*"
                type="file"
              />
            </label>
            <div className={classes.errorstyles}>{error.video}</div>
          </Grid>
          <Grid item lg={2} sm={6} md={2} xs={6}>
            {video.file && (
              <video src={video.file} style={{ width: 150 }} controls />
            )}
          </Grid>

          <Grid
            item
            lg={2}
            sm={6}
            md={2}
            xs={6}
            className={classes.uploadContainer}
          >
            <label className={classes.uploadImageButton}>
              {pdf.file ? pdf.file : "Upload PDF"}
              <input
                onChange={handlePdf}
                hidden
                accept="application/pdf"
                type="file"
              />
            </label>
            <div className={classes.errorStyles}>{error.pdf}</div>
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
              <div className={classes.heading}>Live Class Data</div>
              <div onClick={handleClose} className={classes.closeButton}>
                <CloseRounded />
              </div>
            </div>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Course"
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
              label="Astrologer"
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
              label="Price"
              value={price}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Discount"
              value={discount}
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
          <DialogContent>{viewForm()}</DialogContent>
        </Dialog>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  activeCourseData: state.course.activeCourseData,
  activeAstrologerData: state.astrologer.activeAstrologerData,
  liveClassData: state.liveClass.liveClassData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(DisplayLiveClass);
