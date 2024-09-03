import React, { useState, useCallback } from "react";
import { useStyles } from "../../assets/styles.js";
import {
  Grid,
  TextField,
  CircularProgress,
  Avatar,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import DvrIcon from "@mui/icons-material/Dvr";
import { useNavigate } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import * as Actions from "../../redux/Actions/giftActions.js";

export const CallDiscussion = ({ isLoading }) => {
  var classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [amount, setAmount] = useState("");
  const [name, setname] = useState("");
  const [error, setError] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [icon, setIcon] = useState({ file: '', bytes: null });
  const [file, setFile] = useState(null);

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

  const handleError = (field, message) => {
    setError((prevError) => ({ ...prevError, [field]: message }));
  };

  const handleOptionChange = (e) => {
    setStatus(e.target.value);
  };

  const validation = () => {
    var isValid = true;
    if (!name) {
      handleError("name", "Please input name");
      isValid = false;
    }

    if (!description) {
      handleError("description", "Please input Description");
      isValid = false;
    }
    if (!status) {
      handleError("status", "Please Select Status");
      isValid = false;
    }
    if (!amount) {
      handleError("amount", "Please Input Amount");
      isValid = false;
    }
    if (!icon.file) {
      handleError("icon", "Please Upload Image");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async () => {
    if (validation()) {
      var formData = new FormData();
      formData.append("status", status);
      formData.append("title", name);
      formData.append("description", description);
      formData.append("image", file);
      formData.append("amount", amount);

      dispatch(Actions.addGift(formData));
      handleReset();
    }
  };

  const handleReset = useCallback(() => {
    setname("");
    setAmount("");
    setStatus("");
    setDescription("");
    setIcon({ file: '', bytes: null });
    setFile(null);
  });

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>Call Discussion</div>
              {/* <div
                onClick={() => navigate("/displayGift")}
                className={classes.addButton}
              >
                <DvrIcon />
                <div className={classes.addButtontext}>Display/AddGift</div>
              </div> */}
            </div>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="User"
              error={error.name ? true : false}
              helperText={error.name}
              value={name}
              onFocus={() => handleError("name", null)}
              onChange={(event) => setname(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Admin"
              error={error.name ? true : false}
              helperText={error.name}
              value={name}
              onFocus={() => handleError("name", null)}
              onChange={(event) => setname(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
        

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Discussion"
              error={error.amount ? true : false}
              helperText={error.amount}
              value={amount}
              onFocus={() => handleError("amount", null)}
              onChange={(event) => setAmount(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
        
          <Grid item lg={12} sm={6} md={6} xs={6}>
            <TextField
              id="outlined-description-static"
              label="Review"
              multiline
              rows={4}
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

export default connect(mapStateToProps, mapDispatchToProps)(CallDiscussion);
