import React, { useState } from "react";
import { useStyles } from "../../../assets/styles.js";
import {
  Grid,
  TextField,
  CircularProgress,
} from "@mui/material";
import DvrIcon from "@mui/icons-material/Dvr";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

const AddInternationalPricing = ({ dispatch, isLoading }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [countryCode, setCountryCode] = useState("");
  const [countryName, setCountryName] = useState("");
  const [countryCurrency, setCountryCurrency] = useState("");
  const [countryPrice, setCountryPrice] = useState("");
  const [multiplier, setMultiplier] = useState("");

  const handleReset = () => {
    setCountryCode("");
    setCountryName("");
    setCountryCurrency("");
    setCountryPrice("");
    setMultiplier("");
  };

  const handleSubmit = () => {
    // Your submit logic here
    console.log({
      countryCode,
      countryName,
      countryCurrency,
      countryPrice,
      multiplier,
    });
  };

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>Add International Pricing</div>
              <div
                onClick={() => navigate("/international-prices")}
                className={classes.addButton}
              >
                <DvrIcon />
                <div className={classes.addButtontext}>Display International Pricing</div>
              </div>
            </div>
          </Grid>
          <Grid item lg={4} sm={12} md={12} xs={12}>
            <TextField
              label="Country Code"
              value={countryCode}
              variant="outlined"
              type="text" // Keep type as text to allow special characters
              fullWidth
              onChange={(e) => {
                const value = e.target.value;
                if (/^[\d+]*$/.test(value)) {
                  setCountryCode(value);
                }
              }}
              InputProps={{
                style: { color: 'black' }, // Ensure text color is visible
              }}
            />
          </Grid>
          <Grid item lg={4} sm={12} md={12} xs={12}>
            <TextField
              label="Country Name"
              type="text"
              value={countryName}
              variant="outlined"
              fullWidth
              onChange={(e) => setCountryName(e.target.value)}
              InputProps={{
                style: { color: 'black' },
              }}
            />
          </Grid>
          <Grid item lg={4} sm={12} md={12} xs={12}>
            <TextField
              label="Country Currency"
              type="text"
              value={countryCurrency}
              variant="outlined"
              fullWidth
              onChange={(e) => setCountryCurrency(e.target.value)}
              InputProps={{
                style: { color: 'black' },
              }}
            />
          </Grid>
          <Grid item lg={4} sm={12} md={12} xs={12}>
            <TextField
              label="Country Price"
              value={countryPrice}
              variant="outlined"
              type="number"
              fullWidth
              onChange={(e) => setCountryPrice(e.target.value)}
              InputProps={{
                style: { color: 'black' },
              }}
            />
          </Grid>
          <Grid item lg={4} sm={12} md={12} xs={12}>
            <TextField
              label="Multiplier"
              value={multiplier}
              variant="outlined"
              type="number"
              fullWidth
              onChange={(e) => setMultiplier(e.target.value)}
              InputProps={{
                style: { color: 'black' },
              }}
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
  isLoading: state.astrologerBanner.isLoading,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(AddInternationalPricing);
