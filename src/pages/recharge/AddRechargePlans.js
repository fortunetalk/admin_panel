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
import * as RechargeActions from "../../redux/Actions/rechargeActions.js";

const AddRechargePlans = ({ dispatch }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [rechargeAmount, setRechargeAmount] = useState("");
  const [extraPercent, setExtraPercent] = useState("");
  const [status, setStatus] = useState("");
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
    if (!extraPercent) {
      handleError("extraPercent", "Please enter Extra Percent");
      isValid = false;
    }
    if (!status) {
      handleError("status", "Please select Status");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async () => {
    if (validation()) {
      setIsLoading(true);
      var body = {
        amount: rechargeAmount,
        percentage: extraPercent,
        recharge_status: status,
      };
      handleReset();
      dispatch(RechargeActions.createRechargePlan(body));
    }
  };

  const handleReset = () => {
    setRechargeAmount("");
    setExtraPercent("");
    setStatus("");
    setError({});
  };

  return (
    <div className={classes.container}>
      <Loader isVisible={isLoading} />
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>Add Recharge Plan</div>
              <div
                onClick={() => navigate("/rechargePlan")}
                className={classes.addButton}
              >
                <DvrIcon />
                <div className={classes.addButtontext}>Display Plans</div>
              </div>
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
              label="Enter Percent"
              type="text"
              error={Boolean(error.extraPercent)}
              helperText={error.extraPercent}
              value={extraPercent}
              onFocus={() => handleError("extraPercent", null)}
              onChange={(event) => setExtraPercent(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item lg={6} sm={12} md={12} xs={12}>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddRechargePlans);
