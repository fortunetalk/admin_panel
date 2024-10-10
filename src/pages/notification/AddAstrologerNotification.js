import React, { useCallback, useState } from "react";
import { useStyles } from "../../assets/styles.js";
import {
  Avatar,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress
} from "@mui/material";
import DvrIcon from "@mui/icons-material/Dvr";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import * as Actions from "../../redux/Actions/notificationActions.js";
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'; // Import the emoji icon
import EmojiPicker from 'emoji-picker-react';

const AddAstrologerNotification = ({ dispatch, isLoading }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [error, setError] = useState({ name: "", description: "", astrologerType: "", icon: "" });
  const [description, setDescriptionText] = useState("");
  const [status, setStatus] = useState("");
  const [icon, setIcon] = useState({ file: '', bytes: null });
  const [file, setFile] = useState(null);
  const [astrologerType, setastrologerType] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // To control visibility of the emoji picker


  const handleError = (field, message) => {
    setError((prevError) => ({ ...prevError, [field]: message }));
  };

  const handleOptionChange = (e) => {
    setStatus(e.target.value);
  };

  const onEmojiClick = (emojiData, event) => {
    console.log("emojiObject", emojiData);
    setDescriptionText((prev) => prev + emojiData.emoji);
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
    let isValid = true;
    if (!name) {
      handleError("name", "Please input name");
      isValid = false;
    }
    if (!file) {
      handleError("icon", "Please upload an image");
      isValid = false;
    }
    if (!astrologerType) {
      handleError("astrologerType", "Please Select Customer Type");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async () => {
    if (validation()) {
      const formData = new FormData();
      formData.append("title", name);
      formData.append("description", description);
      formData.append("status", status);
      formData.append("image", file);
      formData.append("astrologerType", astrologerType);

      dispatch(Actions.sendAstrologerNotification(formData));
      handleReset();
    }
  };

  const handleReset = useCallback(() => {
    setName("");
    setDescriptionText("");
    setError({ name: "", description: "", astrologerType: "", icon: "" });
    setStatus("");
    setIcon({ file: "", bytes: null });
    setFile(null);
    setastrologerType("");
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>Add Astrologer Notification</div>
              <div onClick={() => navigate("/astrologerNotification")} className={classes.addButton}>
                <DvrIcon />
                <div className={classes.addButtontext}>Display Astrologer Notification</div>
              </div>
            </div>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Enter Title"
              error={!!error.name}
              helperText={error.name}
              value={name}
              onFocus={() => handleError("name", null)}
              onChange={(event) => setName(event.target.value)}
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
              <InputLabel id="select-astrologerType-label">Select Astrologer Type</InputLabel>
              <Select
                labelId="select-astrologerType-label"
                value={astrologerType}
                onChange={(e) => setastrologerType(e.target.value)}
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
          <Grid item lg={4} sm={6} md={6} xs={6} className={classes.uploadContainer}>
            <label className={classes.uploadImageButton}>
              Upload Image
              <input onChange={handleIcon} hidden accept="image/*" type="file" />
            </label>
            <div className={classes.errorstyles}>{error.icon}</div>
          </Grid>
          <Grid item lg={2} sm={6} md={2} xs={6}>
            <Avatar src={icon.file} style={{ width: 56, height: 56 }} />
          </Grid>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <TextField
              id="outlined-description-static"
              label="Description"
              multiline
              rows={4}
              fullWidth
              value={description}
              onChange={(event) => setDescriptionText(event.target.value)}
              variant="outlined"
              error={!!error.description}
              helperText={error.description}
              onFocus={() => setShowEmojiPicker(false)} // Hide emoji picker when typing
              style={{ marginBottom: '8px' }} // Margin for spacing
            />


          </Grid>

          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginBottom: '8px' }}>
              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                style={{
                  backgroundColor: '#10395D', // Primary color
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                  marginRight: '8px' // Space between button and emoji picker
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#10395D')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#10395D')}
              >
                <EmojiEmotionsIcon style={{ marginRight: '4px', fontSize: '18px', color: '#FFFF00' }} /> {/* Icon with margin */}
              Emoji
              </button>
            </div>

            {showEmojiPicker && (
              <div style={{ width: '100%' }}>
                <EmojiPicker
                  onEmojiClick={onEmojiClick}
                  width= '100%'
                />
              </div>
            )}
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
    isLoading: state.notification.isLoading,
  });
  
  const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(AddAstrologerNotification);
