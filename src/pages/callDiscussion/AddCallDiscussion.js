import React, { useState, useCallback } from "react";
import { useStyles } from "../../assets/styles.js";
import {
  Grid,
  TextField,
  CircularProgress,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import DvrIcon from "@mui/icons-material/Dvr";
import { useNavigate } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import * as Actions from "../../redux/Actions/callDiscussionAction.js";

export const AddCallDiscussion = ({ isLoading }) => {
  var classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [adminName, setAdminName] = useState("");
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [review, setReview] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
 

  const handleError = (field, message) => {
    setError((prevError) => ({ ...prevError, [field]: message }));
  };

  const handleOptionChange = (e) => {
    setReview(e.target.value);
  };

  const validation = () => {
    var isValid = true;
    if (!adminName) {
      handleError("adminName", "Please input Admin Name");
      isValid = false;
    }

    if (!userName) {
      handleError("userName", "Please Select User Name");
      isValid = false;
    }
    if (!phone) {
      handleError("phone", "Please Input User Phone Number");
      isValid = false;
    }
    if (!review) {
      handleError("review", "Please Input Review");
      isValid = false;
    }
   
    if (!description) {
        handleError("description", "Please input Description");
        isValid = false;
      }
    return isValid;
  };

  const onAdd =()=>{
    navigate('/call-discussion')
  }

  const handleSubmit = async () => {
    if (validation()) {
      var body = {
        user_name: userName,
        admin_name: adminName,
        phone_number: phone,
        review: review,
        discussion: description,
      };
      dispatch(Actions.addCallDiscussion({body,onAdd}));
      handleReset();
    }
  };

  const handleReset = useCallback(() => {
    setAdminName("");
    setUserName("");
    setPhone("");
    setReview("");
    setDescription("");
 
  });

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>Add Call Discussion</div>
              <div
                onClick={() => navigate("/call-discussion")}
                className={classes.addButton}
              >
                <DvrIcon />
                <div className={classes.addButtontext}>Display Discussions </div>
              </div>
            </div>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Admin Name"
              error={error.adminName ? true : false}
              helperText={error.adminName}
              value={adminName}
              onFocus={() => handleError("adminName", null)}
              onChange={(event) => setAdminName(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="User Name"
              error={error.userName ? true : false}
              helperText={error.userName}
              value={userName}
              onFocus={() => handleError("userName", null)}
              onChange={(event) => setUserName(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="User Phone No."
              error={error.phone ? true : false}
              helperText={error.phone}
              value={phone}
              onFocus={() => handleError("phone", null)}
              onChange={(event) => setPhone(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item lg={6} sm={12} md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="select-label">Select Review</InputLabel>
                <Select
                  labelId="select-label"
                  value={review}
                  onChange={handleOptionChange}
                  variant="outlined"
                  error={!!error.review}
                >
                  <MenuItem value="Good">Good</MenuItem>
                  <MenuItem value="NotGood">Not Good</MenuItem>
                  <MenuItem value="Excelent">Excelent</MenuItem>
                  <MenuItem value="Average">Average </MenuItem>
                </Select>
                <div className={classes.errorstyles}>{error.review}</div>
              </FormControl>
            </Grid>
          
          <Grid item lg={12} sm={6} md={6} xs={6}>
            <TextField
              id="outlined-description-static"
              label="Discussion"
              multiline
              rows={6}
              fullWidth
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              variant="outlined"
              error={error.description ? true : false}
              helperText={error.description}
            />
          </Grid>

         

          <Grid item lg={6} sm={6} md={6} xs={6}>
            <div onClick={handleSubmit} className={classes.submitbutton}>
              {isLoading ? <CircularProgress size={24} /> : "Submit"}
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
};
const mapStateToProps = (state) => ({
  isLoading: state.gift.isLoading,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(AddCallDiscussion);
