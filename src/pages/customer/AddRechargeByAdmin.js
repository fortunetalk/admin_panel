import React, { useState } from "react";
import { useStyles } from "../../assets/styles.js";
import {
  Grid,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
} from "@mui/material";
import DvrIcon from "@mui/icons-material/Dvr";
import Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useLocation } from "react-router-dom";
import Loader from "../../Components/loading/Loader.js";
import { connect } from "react-redux";
import * as CustomerActions from "../../redux/Actions/customerActions.js";

const AddRechargeByAdmin = ({ dispatch }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const location = useLocation();
  const customerId = location.state?.customerId;

  const [rechargeAmount, setRechargeAmount] = useState("");
  const [description, setdescription] = useState("");
  const [transactionType, settransactionType] = useState("");
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleError = (input, value) => {
    setError((prev) => ({ ...prev, [input]: value }));
  };

  const validation = () => {
    let isValid = true;
    if (!rechargeAmount) {
      handleError("rechargeAmount", "Please enter Recharge Amount");
      isValid = false;
    }
    if (!description) {
      handleError("description", "Please enter Extra Percent");
      isValid = false;
    }
    if (!transactionType) {
      handleError("transactionType", "Please select transactionType");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async () => {
    if (validation()) {
      var body = {
        customerId: customerId,
        amount: rechargeAmount,
        description: description,
        transactionType: transactionType,
      };
      handleReset();
      dispatch(CustomerActions.addRechargeByAdmin(body));
    }
  };

  const handleReset = () => {
    setRechargeAmount("");
    setdescription("");
    settransactionType("");
    setError({});
  };

  return (
    <div className={classes.container}>
      <Loader isVisible={isLoading} />
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>Add Recharge </div>
             
            </div>
          </Grid>

          <Grid item lg={6} sm={12} md={12} xs={12}>
            <TextField
              label="Enter Recharge Amount"
              type="text"
              error={Boolean(error.rechargeAmount)}
              helperText={error.rechargeAmount}
              value={rechargeAmount}
              onFocus={() => handleError("rechargeAmount", null)}
              onChange={(event) => setRechargeAmount(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item lg={6} sm={12} md={12} xs={12}>
            <TextField
              label="Enter Description"
              type="text"
              error={Boolean(error.description)}
              helperText={error.description}
              value={description}
              onFocus={() => handleError("description", null)}
              onChange={(event) => setdescription(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item lg={6} sm={12} md={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="select-label">Select Transaction Type</InputLabel>
              <Select
                label="Select transactionType"
                labelId="select-label"
                value={transactionType}
                onChange={(e) => settransactionType(e.target.value)}
                variant="outlined"
                error={error.transactionType ? true : false}
                fullWidth
              >
                <MenuItem value="null" disabled>
                  Select transactionType
                </MenuItem>
                <MenuItem value="CREDIT">CREDIT</MenuItem>
                <MenuItem value="DEBIT">DEBIT</MenuItem>
              </Select>
              {error.transactionType && (
                <div className={classes.errorstyles}>{error.transactionType}</div>
              )}
            </FormControl>
          </Grid>
          <Grid item lg={6} sm={12} md={12} xs={12}></Grid>
          <Grid item lg={6} sm={6} md={6} xs={6}>
            {/* <div onClick={handleSubmit} className={classes.submitbutton}>
              {isLoading ? <CircularProgress size={24} /> : " Submit"}
            </div> */}
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

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(AddRechargeByAdmin);
