import React, { useState, useEffect } from "react";
import { useStyles } from "../../assets/styles.js";
import {
  Avatar,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import DvrIcon from "@mui/icons-material/Dvr";
import { add_subSkill, get_skills } from "../../utils/Constants.js";
import { getData, postData } from "../../utils/FetchNodeServices.js";
import Swal from "sweetalert2";
import { Colors } from "../../assets/styles.js";
import { useNavigate } from "react-router-dom";
import logo_icon from "../../assets/images/logo_icon.png";
import { connect } from "react-redux";
import * as SkillActions from "../../redux/Actions/skillsActions.js";
import Loader from "../../Components/loading/Loader.js";

const AddSubSkills = ({ dispatch, skillsData }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [skill, setskill] = useState("");
  const [title, setTitle] = useState("");
  const [error, setError] = useState({});
  const [status, setStatus] = useState("")
  const [description,setDescription]= useState("")

  useEffect(function () {
    if (!skillsData) {
      dispatch(SkillActions.getSkillData());
    }
  }, []);

  const handleError = (input, value) => {
    setError((prev) => ({ ...prev, [input]: value }));
  };

  const validation = () => {
    var isValid = true;
    if (!title) {
      handleError("title", "Please input Skill");
      isValid = false;
    }
    return isValid;
  };


  const handleSubmit = async () => {
    if (validation()) {
      var formData = new FormData();
      formData.append("title", title);
      formData.append("skill", skill);
      formData.append("status", status);
      formData.append("description", description);

      dispatch(SkillActions.createSubSkill(formData))
      handleReset();
      navigate('/displaySubSkills')
    }
  };

  const handleReset = () => {
    setTitle("");
    setDescription("");
    setStatus("");
  };

  const handleOptionChange = (e) => {
    setStatus(e.target.value);
  };

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>Add Sub Skill</div>
              <div
                onClick={() => navigate("/displaySubSkills")}
                className={classes.addButton}
              >
                <DvrIcon />
                <div className={classes.addButtontext}>Display Sub Skills</div>
              </div>
            </div>
          </Grid>
        
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Skill</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Skill"
                value={skill}
                onFocus={() => handleError("skill", null)}
                onChange={(e) => setskill(e.target.value)}
                error={error.skill ? true : false}
              >
                <MenuItem disabled value={null}>
                  -Select Skill-
                </MenuItem>
                {skillsData && fillSkillList()}
              </Select>
            </FormControl>
            <div className={classes.errorstyles}>{error.skill}</div>
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
              label="Enter Sub Skill"
              error={error.title ? true : false}
              helperText={error.title}
              value={title}
              onFocus={() => handleError("title", null)}
              onChange={(event) => setTitle(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
          <TextField fullWidth label="Description" id="fullWidth" value={description} 
                onChange={(e) => setDescription(e.target.value)}
          
          />
          </Grid>
          <Grid item lg={6} sm={6} md={6} xs={6}>
            <div onClick={handleSubmit} className={classes.submitbutton}>
              Submit
            </div>
          </Grid>
          <Grid item lg={6} sm={6} md={6} xs={6}>
            <div onClick={handleReset} className={classes.denyButton}>
              Reset
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );

  function fillSkillList() {
    if (!Array.isArray(skillsData)) {
      return <MenuItem disabled>No skills available</MenuItem>;
    }
  
    return skillsData.map((item) => (
      <MenuItem key={item._id} value={item._id}>
        {item.title}
      </MenuItem>
    ));
  }
  
};

const mapStateToProps = (state) => ({
  subSkillData: state.skills.subSkillData,
  skillsData: state.skills.skillsData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(AddSubSkills);
