import React, { useEffect, useState } from "react";
import { propStyles, useStyles } from "../../../assets/styles.js";
import {
  Grid,
  TextField,
  Dialog,
  DialogContent,
  Button,
  CircularProgress
} from "@mui/material";
import { AddCircleRounded, CloseRounded } from "@mui/icons-material";
import MaterialTable from "material-table";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import * as InternationalPricingActions from "../../../redux/Actions/internationalPricesActions.js";

const InternationalPricing = ({ dispatch, internationalPricingData, isLoading }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(InternationalPricingActions.getInternationalPrice());
  }, [dispatch]);

  const [internationalPricing, setInternationalPricing] = useState({
    internationalPriceId: "",
    countryCode: "",
    countryPhoneCode: "",
    countryName: "",
    countryCurrency: "",
    currencyCode: "",
    countryPrice: "",
    multiplier: "",
  });
  const [open, setOpen] = useState(false);

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

  const handleOpen = (rowData) => {
    setOpen(true);
    setInternationalPricing({
      internationalPriceId: rowData?._id || "",
      countryCode: rowData?.countryCode || "",
      countryPhoneCode: rowData?.countryPhoneCode || "",
      countryName: rowData?.countryName || "",
      countryCurrency: rowData?.countryCurrency || "",
      currencyCode: rowData?.currencyCode || "",
      countryPrice: rowData?.currencyPriceForOneRupee || "",
      multiplier: rowData?.priceMultiplier || "",
    });
  };

  const handleClose = () => {
    setOpen(false);
    setInternationalPricing({
      countryCode: "",
      countryName: "",
      countryCurrency: "",
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

    const { countryPhoneCode, countryCode, countryName, countryCurrency, currencyCode, countryPrice, multiplier } = internationalPricing;

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

  const handleUpdate = async () => {
    if (validation()) {
      const body = {
        internationalPriceId: internationalPricing.internationalPriceId,
        countryCode: internationalPricing.countryCode,
        countryPhoneCode: internationalPricing.countryPhoneCode,
        countryName: internationalPricing.countryName,
        countryCurrency: internationalPricing.countryCurrency,
        currencyCode: internationalPricing.currencyCode,
        currencyPriceForOneRupee: internationalPricing.countryPrice,
        priceMultiplier: internationalPricing.multiplier,
      };

      console.log("body", body);
      dispatch(InternationalPricingActions.updateInternationalPrice({ body, onAdd }));
      setOpen(false);
    }
  };

  const displayTable = () => (
    <Grid container spacing={1}>
      <Grid item lg={12} sm={12} md={12} xs={12}>
        <MaterialTable
          title="International Pricing"
          data={internationalPricingData}
          columns={[
            { title: "S.No", render: rowData => internationalPricingData.indexOf(rowData) + 1 },
            { title: "Country Code", field: "countryCode" },
            { title: "Country Phone Code", field: "countryPhoneCode" },
            { title: "Country Name", field: "countryName" },
            { title: "Country Currency", field: "countryCurrency" },
            { title: "Currency Code", field: "currencyCode" },
            { title: "Country Price", field: "currencyPriceForOneRupee" },
            { title: "Multiplier", field: "priceMultiplier" },
          ]}
          options={propStyles.tableStyles}
          actions={[
            {
              icon: "edit",
              tooltip: "Edit Blog",
              onClick: (event, rowData) => handleOpen(rowData),
            },
            {
              icon: "delete",
              tooltip: "Delete Blog",
              onClick: (event, rowData) => dispatch(InternationalPricingActions.deleteInternationalPrice({ internationalPriceId: rowData?._id })),

            },
            {
              icon: () => (
                <div className={classes.addButton}>
                  <AddCircleRounded />
                  <div className={classes.addButtontext}>Add New</div>
                </div>
              ),
              tooltip: "Add Blog",
              isFreeAction: true,
              onClick: () => navigate("/add-international-prices"),
            },
          ]}
        />
      </Grid>
    </Grid>
  );

  const editModal = () => (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>Edit International Prices</div>
              <div onClick={handleClose} className={classes.closeButton}>
                <CloseRounded />
              </div>
            </div>
          </Grid>

          <Grid item lg={6} sm={12} md={12} xs={12}>
            <TextField
              label="Country Phone Code"
              value={internationalPricing.countryPhoneCode}
              variant="outlined"
              type="text"
              fullWidth
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) { // Only digits
                  setInternationalPricing(prev => ({ ...prev, countryPhoneCode: value }));
                }
              }}
              InputProps={{ style: { color: 'black' } }}
            />
          </Grid>

          <Grid item lg={6} sm={12} md={12} xs={12}>
            <TextField
              label="Country Code"
              value={internationalPricing.countryCode}
              variant="outlined"
              type="text"
              fullWidth
              onChange={(e) => {
                const value = e.target.value;
                if (/^[a-zA-Z0-9!@#$%^&*()_+=-]*$/.test(value)) { // Alphanumeric and symbols
                  setInternationalPricing(prev => ({ ...prev, countryCode: value }));
                }
              }}
              InputProps={{ style: { color: 'black' } }}
            />
          </Grid>

          <Grid item lg={6} sm={12} md={12} xs={12}>
            <TextField
              label="Country Name"
              value={internationalPricing.countryName}
              variant="outlined"
              fullWidth
              onChange={(e) => setInternationalPricing(prev => ({ ...prev, countryName: e.target.value }))}
              InputProps={{ style: { color: 'black' } }}
            />
          </Grid>
          <Grid item lg={6} sm={12} md={12} xs={12}>
            <TextField
              label="Country Currency"
              value={internationalPricing.countryCurrency}
              variant="outlined"
              fullWidth
              onChange={(e) => setInternationalPricing(prev => ({ ...prev, countryCurrency: e.target.value }))}
              InputProps={{ style: { color: 'black' } }}
            />
          </Grid>
          <Grid item lg={6} sm={12} md={12} xs={12}>
            <TextField
              label="Currency Code"
              value={internationalPricing.currencyCode}
              variant="outlined"
              fullWidth
              onChange={(e) => setInternationalPricing(prev => ({ ...prev, currencyCode: e.target.value }))}
              InputProps={{ style: { color: 'black' } }}
            />
          </Grid>
          <Grid item lg={6} sm={12} md={12} xs={12}>
            <TextField
              label="Country Price"
              value={internationalPricing.countryPrice}
              variant="outlined"
              type="number"
              fullWidth
              onChange={(e) => setInternationalPricing(prev => ({ ...prev, countryPrice: e.target.value }))}
              InputProps={{ style: { color: 'black' } }}
            />
          </Grid>
          <Grid item lg={6} sm={12} md={12} xs={12}>
            <TextField
              label="Multiplier"
              value={internationalPricing.multiplier}
              variant="outlined"
              type="number"
              fullWidth
              onChange={(e) => setInternationalPricing(prev => ({ ...prev, multiplier: e.target.value }))}
              InputProps={{ style: { color: 'black' } }}
            />
          </Grid>
          <Grid item lg={6} sm={12} md={12} xs={12}>
            
          </Grid>
          <Grid item lg={6} sm={6} md={6} xs={6}>
            <div onClick={handleUpdate} className={classes.submitbutton}>
              Submit
            </div>
          </Grid>
          <Grid item lg={6} sm={6} md={6} xs={6}>
            <div onClick={handleClose} className={classes.denyButton}>
              Reset
            </div>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className={classes.container}>
      {!internationalPricingData ? <CircularProgress /> : (
        <div className={classes.box}>
          {displayTable()}
          {editModal()}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  internationalPricingData: state.internationalPricing.internationalPricingData,
  isLoading: state.callDiscussion.isLoading,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(InternationalPricing);
