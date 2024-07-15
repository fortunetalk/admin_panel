import React, { useState } from "react";
import { useStyles } from "../../assets/styles.js";

import {
  Grid,
  TextField,
  FormControl,
  Checkbox,
  FormGroup,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import DvrIcon from "@mui/icons-material/Dvr";
import { useNavigate } from "react-router-dom";


export const AddUser = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [altMobile, setAltMobile] = useState("");
  const [password, setPassword] = useState("");
  const [working, setWorking] = useState("");
  const [submit, setSubmit] = useState("");
  const [reset, setReset] = useState("");



  const handleSubmit = () => {
    const validationErrors = {};
    if (!name) {
      validationErrors.name = "Name is required";
    }
    if (!email) {
      validationErrors.email = "Email is required";
    }
    if (!password) {
      validationErrors.password = "Password is required";
    }
    if (!altMobile) {
      validationErrors.altMobile = "Mobile Number is required";
    }

    if (Object.keys(validationErrors).length === 0) {
      // Proceed with submission logic
      setSubmit("Submitting..."); // You can use this state to show a loading indicator
      // Add your logic here for submitting the form data
    } else {
      setErrors(validationErrors);
    }
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setMobile("");
    setAltMobile("");
    setPassword("");
    setWorking("");
    setReset("");
    setErrors({});
  };
  const astrologicalReasons = [
    {
      id: 1,
      topic: "Add Astrologer",
    },
    {
      id: 2,
      topic: "List Astrologer",
    },
    {
      id: 3,
      topic: "Edit Astrologer",
    },
    {
      id: 4,
      topic: "Delete Astrologer",
    },
    {
      id: 5,
      topic: "Block/Un-Block Astrologer",
    },
    {
      id: 6,
      topic: "Add Skil",
    },
    {
      id: 7,
      topic: "List Skill",
    },
    {
      id: 8,
      topic: "Edit Skill",
    },
 
    {
      id: 1,
      topic: "Delete Skill",
    },
    {
      id: 2,
      topic: "Add Sub Skill",
    },
    {
      id: 3,
      topic: "List Sub Skill",
    },
    {
      id: 4,
      topic: "Edit Sub Skill",
    },

    {
      id: 1,
      topic: "Delete Sub Skill",
    },
    {
      id: 2,
      topic: "Add Remedies",
    },
    {
      id: 3,
      topic: "List Remedies",
    },
    {
      id: 4,
      topic: "Edit Remedies",
    },
    {
      id: 5,
      topic: "Delete Remedies",
    },
    {
      id: 6,
      topic: "Add Expertise",
    },
    {
      id: 7,
      topic: "List Expertise",
    },
    {
      id: 8,
      topic: "Edit Expertise",
    },
    {
      id: 9,
      topic: "Delete Expertise",
    },
    {
      id: 10,
      topic: "Add Blog",
    },
    {
      id: 11,
      topic: "List Blog",
    },
    {
      id: 12,
      topic: "Edit Blog",
    },
    {
      id: 13,
      topic: "Delete Blog",
    },
    {
      id: 14,
      topic: "Add Testimonial",
    },
    {
      id: 15,
      topic: "List Testimonial",
    },
    {
      id: 16,
      topic: "Edit Testimonial",
    },
    {
      id: 17,
      topic: "Delete Testimonial",
    },
    {
      id: 18,
      topic: "Customer Enquiry",
    },
    {
      id: 19,
      topic: "Astrologer Enquiry",
    },
  
    {
      id: 1,
      topic: "Add App Banner",
    },
    {
      id: 2,
      topic: "List App Banner",
    },
    {
      id: 3,
      topic: "Edit App Banner",
    },
    {
      id: 4,
      topic: "Delete App Banner",
    },
    {
      id: 5,
      topic: "Add Video Section ",
    },
    {
      id: 6,
      topic: "List Video Section",
    },
    {
      id: 7,
      topic: "Edit Video Section",
    },
    {
      id: 8,
      topic: "Add Customer",
    },
    {
      id: 9,
      topic: "List Customer ",
    },
    {
      id: 10,
      topic: "Edit Customer",
    },
    {
        id: 1,
        topic: "Delete Customer",
      },
      {
        id: 2,
        topic: "Block/Un-block Customer",
      },
      {
        id: 3,
        topic: "Add User ",
      },
      {
        id: 4,
        topic: "List User",
      },
      {
        id: 5,
        topic: "Edit User",
      },
      {
        id: 6,
        topic: "Delete User",
      },
      {
        id: 7,
        topic: "Block/Un-block User",
      },
      {
        id: 8,
        topic: "All Review",
      },
      {
        id: 9,
        topic: "Manage Review",
      },
      {
        id: 10,
        topic: "Profile Setting",
      },
      {
        id: 10,
        topic: "Backup Download/Upload",
      },
      {
        id: 10,
        topic: "Currency Language",
      },
      {
        id: 10,
        topic: "Comission Setting",
      },
      {
        id: 10,
        topic: "Earning Report",
      },
      {
        id: 10,
        topic: "Paid & Pending Report",
      },
      {
        id: 10,
        topic: "Chat",
      },
      {
        id: 10,
        topic: "Call & Document",
      },
      
  ];

  console.log(working)
  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>Add User</div>
              <div
                onClick={() => navigate("/displayUser")}
                className={classes.addButton}
              >
                <DvrIcon />
                <div className={classes.addButtontext}>Display AddUser</div>
              </div>
            </div>
          </Grid>
          <Grid item lg={6} sm={12} md={12} xs={12}>
            <TextField
              label="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
              helperText={errors.name}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item lg={6} sm={12} md={12} xs={12}>
            <TextField
              label="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              helperText={errors.email}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item lg={6} sm={12} md={12} xs={12}>
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              helperText={errors.password}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item lg={6} sm={12} md={12} xs={12}>
            <TextField
              label="Mobile Number"
              value={altMobile}
              onChange={(e) => setAltMobile(e.target.value)}
              error={errors.altMobile}
              helperText={errors.altMobile}
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item lg={12} sm={12} md={12} xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Permission</FormLabel>
              <FormGroup aria-label="position" row>
                {astrologicalReasons.map((item) => (
                  <div key={item.id} className={classes.chips}>
                    <FormControlLabel
                      value={item.topic}
                      control={<Checkbox />}
                      label={item.topic}
                      labelPlacement="end"
                    />
                  </div>
                ))}
              </FormGroup>
            </FormControl>
          </Grid>

          <Grid item lg={6} sm={6} md={6} xs={6}>
            <div onClick={handleSubmit} className={classes.submitbutton}>
              {submit || "Submit"}
            </div>
          </Grid>
          <Grid item lg={6} sm={6} md={6} xs={6}>
            <div onClick={handleReset} className={classes.denyButton}>
              {reset || "Reset"}
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default AddUser;