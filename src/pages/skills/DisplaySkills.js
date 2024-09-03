import React, { useEffect, useState } from "react";
import { Colors, propStyles, useStyles } from "../../assets/styles.js";
import {
  Avatar,
  Grid,
  Button,
  TextField,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import { AddCircleRounded, Close } from "@mui/icons-material";
import MaterialTable from "material-table";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import { DialogContent, CircularProgress } from "@mui/material";
import { CloseRounded } from "@mui/icons-material";
import Swal from "sweetalert2";
import Loader from "../../Components/loading/Loader.js";
import { connect } from "react-redux";
import * as SkillActions from "../../redux/Actions/skillsActions.js";

const DisplaySkills = ({ dispatch, skillsData }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [skill_id, setSkill_id] = useState("");
  const [skill, setSkill] = useState("");
  const [icon, setIcon] = useState({ file: "", bytes: "" });
  const [file, setFile] = useState(null);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(function () {
    dispatch(SkillActions.getSkillData());
  }, []);

  const handleOpen = (rowData) => {
    setSkill_id(rowData._id);
    setSkill(rowData.title);
    setIcon({ file: rowData.image, bytes: rowData.image });
    setOpen(true);
  };

  const handleOptionChange = (e) => {
    setStatus(e.target.value);
  };

  const handleError = (input, value) => {
    setError((prev) => ({ ...prev, [input]: value }));
  };

  const handleIcon = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      handleError("icon", null);
    }
  };

  const validation = () => {
    var isValid = true;
    if (!skill) {
      handleError("skill", "Please input Skill");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (validation()) {
      var formData = new FormData();
      formData.append("title", skill);
      formData.append("skillId", skill_id);
      formData.append("image", file);
      formData.append("status", status);

      dispatch(SkillActions.updateSkill(formData));
      setOpen(false);
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSkill_id("");
    setSkill("");
    setFile("")
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
          SkillActions.updateSkillStatus({
            skillId: rowData._id,
            status: newStatus,
          })
        );
      }
    });
  };

  return (
    <div className={classes.container}>
      {
        !skillsData ? <CircularProgress/> :
      <div className={classes.box}>
        {skillsData && displayTable()}
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
            title="Skills"
            data={skillsData}
            columns={[
              {
                title: "S.No",
                editable: "never",
                render: (rowData) =>
                  Array.isArray(skillsData)
                    ? skillsData.indexOf(rowData) + 1
                    : "N/A",
              },
              { title: "Skill", field: "title" },
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
                icon: "edit",
                tooltip: "Edit Skill",
                onClick: (event, rowData) => handleOpen(rowData),
              },
              {
                icon: "delete",
                tooltip: "Delete Skill",
                onClick: (event, rowData) =>
                  dispatch(
                    SkillActions.deleteSkill({
                      title: rowData?.title,
                      skill_id: rowData?._id,
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
                tooltip: "Add Skill",
                isFreeAction: true,
                onClick: () => navigate("/addSkills"),
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
              <div className={classes.heading}>Edit Skill</div>
            </div>
          </Grid>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <TextField
              label="Enter Skill"
              error={!!error.skill}
              helperText={error.skill}
              value={skill}
              onFocus={() => handleError("skill", null)}
              onChange={(event) => setSkill(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item lg={12} sm={12} md={6} xs={12}>
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
          <Grid
            item
            lg={6}
            sm={6}
            md={6}
            xs={6}
            className={classes.uploadContainer}
          >
            <Grid
              component="label"
              onClick={handleIcon}
              className={classes.uploadImageButton}
            >
              Upload Picutre
              <input
                required
                error={!error.file}
                onChange={handleIcon}
                hidden
                accept="image/*"
                type="file"
              />
            </Grid>
          </Grid>
          <Grid item lg={6} sm={6} md={6} xs={6}>
            <Avatar src={file} style={{ width: 56, height: 56 }} />
            {error.file && (
              <div className={classes.errorText}>{error.file}</div>
            )}
          </Grid>
          <Grid item lg={6} sm={6} md={6} xs={6}>
            <div onClick={handleSubmit} className={classes.submitbutton}>
              {loading ? <Loader /> : "Submit"}
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
  skillsData: state.skills.skillsData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(DisplaySkills);
