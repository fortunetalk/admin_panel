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
import * as Actions from "../../redux/Actions/customerActions.js";

const AddCustomer = ({ dispatch, isLoading }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState();
  const [gender, setGender] =useState('');
  const [dob, setDob] = useState("");
  const [tob, setTob] = useState('');
  const [occupation, setOccupation] = useState('');
  const [problem, setProblem] = useState('')
  const [error, setError] = useState({ firstName: "", lastName: "", customerName: "", gender:"", dob:"",tob:"", occupation:"",problem:"" });
  const [status, setStatus] = useState("");


  const handleError = (field, message) => {
    setError((prevError) => ({ ...prevError, [field]: message }));
  };

  const handleOptionChange = (e) => {
    setStatus(e.target.value);
  };


  const validation = () => {
    let isValid = true;
    if (!firstName) {
      handleError("firstName", "Please Input Name");
      isValid = false;
    }
    if (!lastName) {
      handleError("lastName", "Please Input Last Name");
      isValid = false;
    }
    if (!customerName) {
      handleError("customerName", "Please Input Customer Name");
      isValid = false
    }
    if (!phoneNumber) {
      handleError("phoneNumber", "Please Input Phone Number");
      isValid = false;
    }
    if (!gender) {
      handleError("gender", "Please Select Gender");
      isValid = false;
    }
    if (!dob) {
      handleError("dob", "Please Input Date of Birth");
      isValid = false;
    }
    if (!tob) {
      handleError("tob", "Please Input Time of Birth");
      isValid = false;
    }
    if (!occupation) {
      handleError("occupation", "Please Input Occupation");
      isValid = false;
    }
    if (!problem) {
      handleError("problem", "Please Input Problem");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async () => {
    if (validation()) {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("customerName", customerName);
      formData.append("phoneNumber", phoneNumber);
      formData.append("gender", gender);
      formData.append("dateOfBirth", dob);
      formData.append("timeOfBirth", tob);
      formData.append("occupation", occupation);
      formData.append("problem", problem);

      formData.append("status", status);

      dispatch(Actions.addCustomer(formData));
      handleReset();
    }
  };

  const handleReset = useCallback(() => {
    setFirstName("");
    setLastName("");
    setCustomerName("");
    setPhoneNumber("");
    setGender("");
    setDob("");
    setTob("");
    setOccupation("");
    setProblem("");

    setError({ firstName: "", lastName: "", customerName: "", gender:"", dob:"",tob:"", occupation:"",problem:"", icon: "" });
    setStatus("");
  }, []);

  const validateTime = (time) => {
    const regex = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;
    return regex.test(time);
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setTob(value);
    if (!validateTime(value)) {
      handleError('tob', 'Time of Birth must be a valid time (HH:mm)');
    } else {
      handleError('tob', null);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>Add Customer</div>
              <div onClick={() => navigate("/displayCustomer")} className={classes.addButton}>
                <DvrIcon />
                <div className={classes.addButtontext}>Display Customer</div>
              </div>
            </div>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="First Name"
              error={!!error.firstName}
              helperText={error.firstName}
              value={firstName}
              onFocus={() => handleError("firstName", null)}
              onChange={(event) => setFirstName(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Last Name"
              error={!!error.lastName}
              helperText={error.lastName}
              value={lastName}
              onFocus={() => handleError("lastName", null)}
              onChange={(event) => setLastName(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Customer Name"
              error={!!error.customerName}
              helperText={error.customerName}
              value={customerName}
              onFocus={() => handleError("customerName", null)}
              onChange={(event) => setCustomerName(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item lg={6} sm={12} md={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="select-label">Select Gender</InputLabel>
              <Select
                labelId="select-label"
                value={gender}
                onChange={(e)=>setGender(e.target.value)}
                variant="outlined"
                error={!!error.gender}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
              <div className={classes.errorstyles}>{error.gender}</div>
            </FormControl>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Phone Number"
              error={!!error.phoneNumber}
              helperText={error.phoneNumber}
              value={phoneNumber}
              onFocus={() => handleError("phoneNumber", null)}
              onChange={(event) => setPhoneNumber(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              type="date"
            //   label="Enter DOB"  
              error={!!error.dob}
              helperText={error.dob}
              value={dob}
              onFocus={() => handleError("dob", null)}
              onChange={(event) => setDob(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
          <TextField
        type="time"
        label="Time of Birth"
        error={!!error.tob}
        helperText={error.tob}
        value={tob}
        onFocus={() => handleError('tob', null)}
        onChange={handleChange}
        variant="outlined"
        fullWidth
      />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Occupation"
              error={!!error.occupation}
              helperText={error.occupation}
              value={occupation}
              onFocus={() => handleError("occupation", null)}
              onChange={(event) => setOccupation(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Problem"
              error={!!error.problem}
              helperText={error.problem}
              value={problem}
              onFocus={() => handleError("problem", null)}
              onChange={(event) => setProblem(event.target.value)}
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
    isLoading: state.customer.isLoading,
  });
  
  const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(AddCustomer);
