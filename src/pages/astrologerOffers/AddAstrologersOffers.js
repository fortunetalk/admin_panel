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
import { Colors } from "../../assets/styles.js";
import DvrIcon from "@mui/icons-material/Dvr";
import { useNavigate } from "react-router-dom";

import { connect } from "react-redux";
import * as OffersActions from "../../redux/Actions/offersActions.js";

const AddAstrologersOffers = ({ dispatch, isLoading }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [offer, setOffer] = useState("");
  const [offerName, setofferName] = useState("");
  const [displayName, setdisplayName] = useState("");
  const [discount, setDiscount] = useState("");
  const [error, setError] = useState({ offer: "" });


  
  const handleError = (field, message) => {
    setError((prevError) => ({ ...prevError, [field]: message }));
  };
 

  const validation = () => {
    var isValid = true;
    if (!offerName) {
      handleError("offerName", "Please input Offer Name");
      isValid = false;
    }

    if (!displayName) {
      handleError("description", "Please input Display Name");
      isValid = false;
    }

    if (!discount) {
      handleError("discount", "Please input Discount ");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async () => {
    if (validation()) {

      dispatch(
      OffersActions.addAstrologesOffers({offerName: offerName, displayName: displayName, discount:discount ,})
      );
      handleReset();
    }
  };

  const handleReset = useCallback(() => {
    setofferName("");
    setdisplayName("");
    setDiscount("");
    setError({ offer: "" });
    
  });

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>Add Astrologer Offers</div>
              <div
                onClick={() => navigate("/displayAstrologerOffer")}
                className={classes.addButton}
              >
                <DvrIcon />
                <div className={classes.addButtontext}>Display Remedies</div>
              </div>
            </div>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Offer Name"
              error={error.offerName ? true : false}
              helperText={error.offerName}
              value={offerName}
              onFocus={() => handleError("offerName", null)}
              onChange={(event) => setofferName(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Display Name"
              error={error.displayName ? true : false}
              helperText={error.displayName}
              value={displayName}
              onFocus={() => handleError("remedy", null)}
              onChange={(event) => setdisplayName(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item lg={12} md={12} sm={12} xs={12}>
            <TextField
              label="Discount"
              error={error.discount ? true : false}
              helperText={error.discount}
              value={discount}
              onFocus={() => handleError("discount", null)}
              onChange={(event) => setDiscount(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item lg={6} sm={6} md={6} xs={6}>
          <div onClick={handleSubmit} className={classes.submitbutton}>
                {isLoading ? <CircularProgress size={24} /> : " Submit"}
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
  isLoading: state.remedies.isLoading,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(AddAstrologersOffers);
