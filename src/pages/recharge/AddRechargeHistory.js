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
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/loading/Loader.js";
import { connect } from "react-redux";
import * as RechargeHistoryActions from "../../redux/Actions/rechargeHistoryActions.js";

const AddRechargeHistory = ({ dispatch }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [customerNumber, setCustomerNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [offer, setOffer] = useState("");
  const [refrenceId, setRefrenceId] = useState("");
  const [emailId, setEmailId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Offline");
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleError = (input, value) => {
    setError((prev) => ({ ...prev, [input]: value }));
  };

  const validation = () => {
    let isValid = true;
    if (!customerNumber) {
      handleError("customerNumber", "Please enter Customer Number");
      isValid = false;
    }
    if (!amount) {
      handleError("amount", "Please enter Amount");
      isValid = false;
    }
    if (!paymentMethod) {
      handleError("amount", "Please enter Payment Method");
      isValid = false;
    }
    // if (!status) {
    //   handleError("status", "Please select Status");
    //   isValid = false;
    // }

    return isValid;
  };

  const handleSubmit = async () => {
    if (validation()) {
      setIsLoading(true);
      var body = {
        phoneNumber: customerNumber,
        amount: amount,
        offer: offer,
        paymentMethod: paymentMethod,
        ref_id: refrenceId,
        email: emailId,
      };
      handleReset();
      dispatch(RechargeHistoryActions.addRechargeHistory(body));
    }
  };

  const handleReset = () => {
    setCustomerNumber("");
    setAmount("");
    setOffer("");
    setPaymentMethod("");
    setRefrenceId("");
    setEmailId("");
    setError({});
  };

  return (
    <div className={classes.container}>
      <Loader isVisible={isLoading} />
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>Add Recharge History</div>
              <div
                onClick={() => navigate("/displayRechargePlan")}
                className={classes.addButton}
              >
                <DvrIcon />
                <div className={classes.addButtontext}>Display Plans</div>
              </div>
            </div>
          </Grid>

         
          
          <Grid item lg={6} sm={12} md={12} xs={12}>
            <TextField
              label="Customer Number"
              type="text"
              error={Boolean(error.customerNumber)}
              helperText={error.customerNumber}
              value={customerNumber}
              onFocus={() => handleError("customerNumber", null)}
              onChange={(event) => setCustomerNumber(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          
        
          <Grid item lg={6} sm={12} md={12} xs={12}>
            <TextField
              label="Amount"
              type="text"
              error={Boolean(error.amount)}
              helperText={error.amount}
              value={amount}
              onFocus={() => handleError("amount", null)}
              onChange={(event) => setAmount(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item lg={6} sm={12} md={12} xs={12}>
            <TextField
              label="Offer"
              type="text"
              error={Boolean(error.offer)}
              helperText={error.offer}
              value={offer}
              onFocus={() => handleError("offer", null)}
              onChange={(event) => setOffer(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item lg={6} sm={12} md={12} xs={12}>
            <TextField
              label="Reference Id"
              type="text"
              error={Boolean(error.refrenceId)}
              helperText={error.refrenceId}
              value={refrenceId}
              onFocus={() => handleError("refrenceId", null)}
              onChange={(event) => setRefrenceId(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item lg={6} sm={12} md={12} xs={12}>
            <TextField
              label="Email Id"
              type="text"
              error={Boolean(error.emailId)}
              helperText={error.emailId}
              value={emailId}
              onFocus={() => handleError("emailId", null)}
              onChange={(event) => setEmailId(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
        
          <Grid item lg={6} sm={12} md={12} xs={12}>
            <TextField
              label="Payment Method"
              type="text"
              error={Boolean(error.paymentMethod)}
              helperText={error.paymentMethod}
              value={paymentMethod}
              onFocus={() => handleError("paymentMethod", null)}
              onChange={(event) => setPaymentMethod(event.target.value)}
              variant="outlined"
              fullWidth
            />
            
          </Grid>
        
          
          {/* <Grid item lg={6} sm={12} md={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="select-label">Select Status</InputLabel>
              <Select
                label="Select Status"
                labelId="select-label"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                variant="outlined"
                error={error.status ? true : false}
                fullWidth
              >
                <MenuItem value="null" disabled>
                  Select Status
                </MenuItem>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="InActive">InActive</MenuItem>
              </Select>
              {error.status && (
                <div className={classes.errorstyles}>{error.status}</div>
              )}
            </FormControl>
          </Grid> */}
        
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

export default connect(mapStateToProps, mapDispatchToProps)(AddRechargeHistory);
