import React, { useEffect, useState } from "react";
import { useStyles } from "../../assets/styles.js";
import {
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { add_review, get_all_astrologers, get_all_customers } from "../../utils/Constants.js";
import * as AstrologerActions from "../../redux/Actions/astrologerActions.js";
import * as CustomerActions from "../../redux/Actions/customerActions.js";
import { getData, postData } from "../../utils/FetchNodeServices.js";
import Loader from "../../Components/loading/Loader.js";
import Swal from "sweetalert2";

const AddReview = ({activeAstrologerData,customerListData, dispatch}) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false)
  const [astrologerId, setAstrologerId] = useState("");
  const [astrologer, setAstrologer] = useState("");
  const [customer, setCustomer] = useState("");
  const [rating, setRating] = useState();
  const [comment, setComment] = useState("");
  const [error, setError] = useState({});

  useEffect(function () {
    dispatch(AstrologerActions.getAllActiveAstrologer());
    dispatch(CustomerActions.getAllCustomer());
  }, [])

  const handleError = (input, value) => {
    setError((prev) => ({ ...prev, [input]: value }));
  };

  const validation = () => {
    var isValid = true;
    // if (!astrologer) {
    //   handleError("astrologer", "Please Select Astrologer");
    //   isValid = false;
    // }
    // if (!customer) {
    //   handleError("customer", "Please Select Customer");
    //   isValid = false;
    // }
    if (!rating) {
      handleError("rating", "Please Select Rating");
      isValid = false;
    }
    if (!comment) {
      handleError("comment", "Please Enter Comment");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async () => {
    if (validation()) {
      var response = await postData(add_review, {
        customerId: customer,
        astrologerId: astrologerId,
        rating: rating,
        comments: comment
      });
      if (response?.success) {
        Swal.fire({
          icon: "success",
          title: "Added Successful",
          text: "Review Added Successful",
          showConfirmButton: false,
          timer: 2000,
        });
        handleReset();
      } else {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Review Submission Failed",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }
  };

  const handleReset = () => {
    setAstrologer("");
    setCustomer("");
    setRating("");
    setComment("");
    setError({});
  };

  function fillAstrologerList() {
    return activeAstrologerData.map((item) => {
      return <MenuItem value={item._id}>{item.displayName}</MenuItem>;
    });
  }
  function fillCustomerList() {
    return customerListData.map((item) => {
      return <MenuItem value={item._id}>{item.customerName}</MenuItem>;
    });
  }

  return (
    <div className={classes.container}>
      <Loader isVisible={isLoading} />
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>All Review</div>
              <div
                onClick={() => navigate("/displayReview")}
                className={classes.addButton}
              >
                <div className={classes.addButtontext}>Display Review</div>
              </div>
            </div>
          </Grid>

          <Grid item lg={4} md={6} sm={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select Astrologer
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Astrologer"
                value={astrologerId}
                onFocus={() => handleError("astrologerId", null)}
                onChange={(e) => setAstrologerId(e.target.value)}
                error={error.astrologerId ? true : false}
              >
                <MenuItem disabled value={null}>
                  -Select Astrologer-
                </MenuItem>
                {activeAstrologerData && fillAstrologerList()}
              </Select>
            </FormControl>
            <div className={classes.errorstyles}>{error.astrologerId}</div>
          </Grid>

          <Grid item lg={4} sm={12} md={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="select-label">Select Customer</InputLabel>
              <Select
                label="Select Option"
                labelId="select-label"
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
                variant="outlined"
                error={error.customer ? true : false}
              >
                <MenuItem value="-Select Astrologer-" disabled>-Select Customer-</MenuItem>
               {customerListData && fillCustomerList()}
              </Select>
              <div className={classes.errorstyles}>{error.customer}</div>
            </FormControl>
          </Grid>

          <Grid item lg={4} sm={6} md={6} xs={6}>
            <TextField
              type="number"
              value={rating}
              label="Rating"
              variant="outlined"
              fullWidth
              error={error.rating ? true : false}
              helperText={error.rating}
              inputProps={{ min: 1, max: 5 }}
              onChange={(e) => {
                const inputValue = e.target.value;
                if (inputValue >= 0 && inputValue <= 5) {
                  setRating(inputValue);
                }
              }}
            />
          </Grid>

          <Grid item lg={12} sm={6} md={6} xs={6}>
            <TextField
              id="outlined-multiline-static"
              label="Comment"
              multiline
              rows={4}
              fullWidth
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              error={error.comment ? true : false}
              helperText={error.comment}
            />
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

const mapStateToProps = (state) => ({
  activeCourseData: state.course.activeCourseData,
  activeAstrologerData: state.astrologer.activeAstrologerData,
  customerListData: state.customer.customerListData,
  isLoading: state.liveClass.isLoading,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(AddReview);
