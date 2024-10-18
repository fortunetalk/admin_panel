import React, { useState } from "react";
import { useStyles } from "../../../assets/styles.js";
import { Grid, TextField } from "@mui/material";
import DvrIcon from "@mui/icons-material/Dvr";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import * as InternationalPricingActions from "../../../redux/Actions/internationalPricesActions.js";

const AddInternationalPricing = ({ dispatch }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [countryPhoneCode, setCountryPhoneCode] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [countryName, setCountryName] = useState("");
  const [countryCurrency, setCountryCurrency] = useState("");
  const [currencyCode, setCurrencyCode] = useState("");
  const [countryPrice, setCountryPrice] = useState("");
  const [multiplier, setMultiplier] = useState("");

  // Error states
  const [errors, setErrors] = useState({
    countryCode: "",
    countryPhoneCode: "",
    countryName: "",
    countryCurrency: "",
    currencyCode: "",
    countryPrice: "",
    multiplier: "",
  });

  const handleReset = () => {
    setCountryCode("");
    setCountryPhoneCode("");
    setCountryName("");
    setCountryCurrency("");
    setCurrencyCode("");
    setCountryPrice("");
    setMultiplier("");
    setErrors({
      countryCode: "",
      countryPhoneCode: "",
      countryName: "",
      countryCurrency: "",
      currencyCode: "",
      countryPrice: "",
      multiplier: "",
    });
  };

  const validation = () => {
    const newErrors = {
      countryCode: "",
      countryPhoneCode: "",
      countryName: "",
      countryCurrency: "",
      currencyCode: "",
      countryPrice: "",
      multiplier: "",
    };

    // Validate countryPhoneCode (numbers only)
    if (!countryPhoneCode || !/^\d+$/.test(countryPhoneCode)) {
      newErrors.countryPhoneCode = "Please enter a valid Country Phone Code (numbers only).";
    }

    // Validate countryCode (alphanumeric and symbols allowed)
    if (!countryCode || !/^[a-zA-Z0-9!@#$%^&*()_+=-]+$/.test(countryCode)) {
      newErrors.countryCode = "Please enter a valid Country Code (letters, numbers, and symbols only).";
    }

    if (!countryName) {
      newErrors.countryName = "Country Name cannot be empty.";
    }
    if (!countryCurrency) {
      newErrors.countryCurrency = "Country Currency cannot be empty.";
    }
    if (!currencyCode) {
      newErrors.currencyCode = "Currency Code cannot be empty.";
    }
    if (!countryPrice || isNaN(countryPrice) || countryPrice <= 0) {
      newErrors.countryPrice = "Please enter a valid Country Price (positive number).";
    }
    if (!multiplier || isNaN(multiplier) || multiplier <= 0) {
      newErrors.multiplier = "Please enter a valid Multiplier (positive number).";
    }

    // Set errors state
    setErrors(newErrors);

    // If no errors, proceed
    return !Object.values(newErrors).some((error) => error);
  };

  const onAdd = () => {
    navigate('/international-prices');
  };

  const handleSubmit = async () => {
    if (validation()) {
      const body = {
        countryCode,
        countryPhoneCode,
        countryName,
        countryCurrency,
        currencyCode,
        currencyPriceForOneRupee: countryPrice,
        priceMultiplier: multiplier,
      };
      dispatch(InternationalPricingActions.createInternationalPrice({ body, onAdd }));
      handleReset();
    }
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
              label="Country Phone Code"
              value={countryPhoneCode}
              variant="outlined"
              type="text"
              fullWidth
              error={Boolean(errors.countryPhoneCode)}
              helperText={errors.countryPhoneCode}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  setCountryPhoneCode(value);
                  setErrors((prev) => ({ ...prev, countryPhoneCode: "" })); // Clear error
                }
              }}
              InputProps={{
                style: { color: 'black' },
              }}
            />
          </Grid>
          <Grid item lg={4} sm={12} md={12} xs={12}>
            <TextField
              label="Country Code"
              value={countryCode}
              variant="outlined"
              type="text"
              fullWidth
              error={Boolean(errors.countryCode)}
              helperText={errors.countryCode}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[a-zA-Z0-9!@#$%^&*()_+=-]*$/.test(value)) {
                  setCountryCode(value);
                  setErrors((prev) => ({ ...prev, countryCode: "" })); // Clear error
                }
              }}
              InputProps={{
                style: { color: 'black' },
              }}
            />
          </Grid>
          <Grid item lg={4} sm={12} md={12} xs={12}>
            <TextField
              label="Country Name"
              value={countryName}
              variant="outlined"
              fullWidth
              error={Boolean(errors.countryName)}
              helperText={errors.countryName}
              onChange={(e) => {
                setCountryName(e.target.value);
                setErrors((prev) => ({ ...prev, countryName: "" })); // Clear error
              }}
              InputProps={{
                style: { color: 'black' },
              }}
            />
          </Grid>
          <Grid item lg={4} sm={12} md={12} xs={12}>
            <TextField
              label="Country Currency"
              value={countryCurrency}
              variant="outlined"
              fullWidth
              error={Boolean(errors.countryCurrency)}
              helperText={errors.countryCurrency}
              onChange={(e) => {
                setCountryCurrency(e.target.value);
                setErrors((prev) => ({ ...prev, countryCurrency: "" })); // Clear error
              }}
              InputProps={{
                style: { color: 'black' },
              }}
            />
          </Grid>
          <Grid item lg={4} sm={12} md={12} xs={12}>
            <TextField
              label="Currency Code"
              value={currencyCode}
              variant="outlined"
              fullWidth
              error={Boolean(errors.currencyCode)}
              helperText={errors.currencyCode}
              onChange={(e) => {
                setCurrencyCode(e.target.value);
                setErrors((prev) => ({ ...prev, currencyCode: "" })); // Clear error
              }}
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
              error={Boolean(errors.countryPrice)}
              helperText={errors.countryPrice}
              onChange={(e) => {
                setCountryPrice(e.target.value);
                setErrors((prev) => ({ ...prev, countryPrice: "" })); // Clear error
              }}
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
              error={Boolean(errors.multiplier)}
              helperText={errors.multiplier}
              onChange={(e) => {
                setMultiplier(e.target.value);
                setErrors((prev) => ({ ...prev, multiplier: "" })); // Clear error
              }}
              InputProps={{
                style: { color: 'black' },
              }}
            />
          </Grid>
          <Grid item lg={4} sm={12} md={12} xs={12}>
            
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

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapDispatchToProps)(AddInternationalPricing);
