import React, { useState } from "react";
import { useStyles } from "../../assets/styles.js";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {
  Grid,
  TextField,
} from "@mui/material";
import DvrIcon from "@mui/icons-material/Dvr";
import { useNavigate } from "react-router-dom";
import logo_icon from "../../assets/images/logo_icon.png";

export const AddTestmonials = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [error, setError] = useState({
    name: "",
    profilePhoto: "",
    astrologer: "",
    youtubeLink: "",
    Description: "", // Added Description field to the error state
  });
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [shortBio, setShortBio] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [Submit, setSubmit] = useState("");
  const [Reset, setReset] = useState("");

  const [profilePhoto, setProfilePhoto] = useState({
    file: logo_icon,
    bytes: "",
  });

  const handleProfile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      if (!file || !file.type.startsWith("image/")) {
        setError({ ...error, profilePhoto: "Please upload a valid image file." });
      } else {
        setProfilePhoto({
          file: URL.createObjectURL(file),
          bytes: file,
        });
        setError({ ...error, profilePhoto: "" });
      }
    }
  };

  const handleAstrologerChange = (e) => {
    const value = e.target.value;
    setStatus(value);
    setError({ ...error, astrologer: "" });
  };

  const handleYoutubeLink = (e) => {
    const value = e.target.value;
    setYoutubeLink(value);
    setError({ ...error, youtubeLink: "" });
  };

  const handleSubmit = () => {
    // Field validations
    let validationError = false;

    if (!name) {
      setError({ ...error, name: "Please enter a name." });
      validationError = true;
    }

    if (!status) {
      setError({ ...error, astrologer: "Please select an astrology option." });
      validationError = true;
    }

    if (!profilePhoto.bytes) {
      setError({ ...error, profilePhoto: "Please upload a profile photo." });
      validationError = true;
    }

    if (!shortBio) {
      setError({ ...error, Description: "Please enter a description." });
      validationError = true;
    }

    if (!youtubeLink) {
      setError({ ...error, youtubeLink: "Please enter a YouTube link." });
      validationError = true;
    }

    if (validationError) {
      // Display an error message or handle accordingly
      return;
    }

    // Your submit logic goes here

    // Reset fields after successful submission
    setName("");
    setStatus("");
    setShortBio("");
    setYoutubeLink("");
    setProfilePhoto({
      file: logo_icon,
      bytes: "",
    });
    setError({
      name: "",
      profilePhoto: "",
      astrologer: "",
      youtubeLink: "",
      Description: "", // Reset Description error
    });

    // Optionally, navigate to another page
  };

  const handleReset = () => {
    // Reset fields
    setName("");
    setStatus("");
    setShortBio("");
    setYoutubeLink("");
    setProfilePhoto({
      file: logo_icon,
      bytes: "",
    });
    setError({
      name: "",
      profilePhoto: "",
      astrologer: "",
      youtubeLink: "",
      Description: "", // Reset Description error
    });
  };

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>All Testimonials</div>
              <div
                onClick={() => navigate("/displayTestimonials")}
                className={classes.addButton}
              >
                <DvrIcon />
                <div className={classes.addButtontext}>
                  Display/AddTestMonials
                </div>
              </div>
            </div>
          </Grid>
          <Grid item lg={6} sm={12} md={12} xs={12}>
            <label>Name</label>
            <TextField
              label="Enter Name"
              value={name}
              variant="outlined"
              fullWidth
              onChange={(e) => {
                setName(e.target.value);
                setError({ ...error, name: "" });
              }}
            />
            <div className={classes.errorstyles}>{error.name}</div>
          </Grid>
          <Grid
            item
            lg={3}
            sm={3}
            md={3}
            xs={3}
            className={classes.uploadContainer}
          >
            <Grid
              component="label"
              onClick={handleProfile}
              className={classes.uploadImageButton}
            >
              Upload Profile
              <input
                onChange={handleProfile}
                hidden
                accept="image/*"
                type="file"
              />
            </Grid>
            <div className={classes.errorstyles}>{error.profilePhoto}</div>
          </Grid>
          <Grid item lg={6} sm={12} md={12} xs={12}>
            <label>Astrologer</label>
            <FormControl fullWidth>
              <InputLabel id="select-label">Select Astrology</InputLabel>
              <Select
                label="Select Option"
                labelId="select-label"
                value={status}
                onChange={handleAstrologerChange}
                variant="outlined"
              >
                <MenuItem value="option1">Read Page</MenuItem>
                <MenuItem value="option2">Astrologers Profile</MenuItem>
                <MenuItem value="option3">Recharge Page</MenuItem>
              </Select>
            </FormControl>
            <div className={classes.errorstyles}>{error.astrologer}</div>
          </Grid>
          <Grid item lg={6} sm={12} md={12} xs={12}>
            <label>Youtube Link</label>
            <TextField
              label="Enter Link"
              value={youtubeLink}
              variant="outlined"
              fullWidth
              onChange={handleYoutubeLink}
            />
            <div className={classes.errorstyles}>{error.youtubeLink}</div>
          </Grid>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={4}
              label="Description"
              value={shortBio}
              variant="outlined"
              fullWidth
              onChange={(e) => setShortBio(e.target.value)}
            />
            <div className={classes.errorstyles}>{error.Description}</div>
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
};

export default AddTestmonials;