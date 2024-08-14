import React, { useEffect, useState } from "react";
import { propStyles, useStyles } from "../../assets/styles.js";
import {
  Avatar,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  CircularProgress
} from "@mui/material";
import { AddCircleRounded } from "@mui/icons-material";
import MaterialTable from "material-table";
import { Colors } from "../../assets/styles.js";
import logo_icon from "../../assets/images/logo_icon.png";
import {
  delete_review,
  get_all_astrologers,
  get_all_customers,
  get_review,
  get_skills,
  get_subSkill,
  update_review,
  update_subSkill,
} from "../../utils/Constants.js";
import { getData, postData, putData } from "../../utils/FetchNodeServices.js";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { CloseRounded } from "@mui/icons-material";
import Swal from "sweetalert2";
import Loader from "../../Components/loading/Loader.js";
import * as ReviewActions from "../../redux/Actions/reviewsActions.js";
import { connect } from "react-redux";

const DisplayReview = ({ dispatch, isLoading, astrologersReviews }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [customerList, setCustomerList] = useState([]);
  const [astrologerList, setAstrologerList] = useState([]);

  const [astrologer, setAstrologer] = useState("");
  const [customer, setCustomer] = useState("");
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const [reviewId, setReviewId] = useState();
  const [open, setOpen] = useState();
  const [error, setError] = useState({});

  const [state, setState] = useState({});

  useEffect(function () {
    dispatch(ReviewActions.getAstrologersReviews());
    // fetchAllCustomers()
    // fetchAllAstrologers()
  }, []);


  const fetchAllCustomers = async () => {
    var response = await getData(get_all_customers);
    setCustomerList(response.customers);
  };

  const fetchAllAstrologers = async () => {
    var response = await getData(get_all_astrologers);
    setAstrologerList(response.astrologers);
  };

  const handleOpen = (rowData) => {
    setOpen(true);
    setReviewId(rowData._id);
    setAstrologer(rowData.astrologer._id);
    setCustomer(rowData.customer._id);
    setComment(rowData.comments);
    setRating(rowData.ratings);
  };

  const handleClose = () => {
    setOpen(false);
    setReviewId("");
    setAstrologer("");
    setCustomer("");
    setComment("");
    setRating("");
  };

  const handleError = (input, value) => {
    setError((prev) => ({ ...prev, [input]: value }));
  };

  const validation = () => {
    var isValid = true;
    if (!reviewId) {
      handleError("reviewId", "Please Select Skill");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async () => {
    if (validation()) {
      // setIsLoading(true)
      var body = {
        reviewId: reviewId,
        ratings: rating,
        comments: comment,
      };
      var response = await postData(update_review, body);
      // setIsLoading(false)
      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Review Updated Successfull",
          showConfirmButton: true,
          timer: 2000,
        });
        // fetchAllReviews();
        handleClose();
      } else {
        Swal.fire({
          title: "Failed",
          text: "Please Check your Internet!",
          icon: "error",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }
  };

  const handleDelete = async (rowData) => {
    Swal.fire({
      title: `Are you sure to Delete Review`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: Colors.primaryLight,
      cancelButtonColor: Colors.red,
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(ReviewActions.deleteAstrologerReivew(rowData._id));
      }
    });
  };

  const updateState = (data) => {
    setState((prevState) => {
      const newData = { ...prevState, ...data };
      return newData;
    });
  };

  const {} = state;

  const reverseData = Array.isArray(astrologersReviews) ? astrologersReviews.slice().reverse() : [];

  if (!astrologersReviews) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        {astrologersReviews && displayTable()}
        {editModal()}
      </div>
    </div>
  );


  function displayTable() {
    return (
      <Grid container spacing={1}>
        <Loader isVisible={isLoading} />
        <Grid item lg={12} sm={12} md={12} xs={12}>
          <MaterialTable
            title=" All Review"
            data={reverseData}
            columns={[
              {
                title: "S.No",
                editable: "never",
                render: (rowData) => reverseData.indexOf(rowData) + 1,
              },
              { title: "Customer", field: "customerId.customerName" },
              { title: "astrologer", field: "astrologerId.displayName" },
              { title: "Comments", field: "comments", filtering: false },
              { title: "Rating", field: "rating", filtering: false },
              // {
              //   title: "Verify",
              //   field: "isVerified",
              //   filtering: false,
              //   render: (rowData) => {
              //     return (
              //       <div
              //         onClick={() =>
              //           dispatch(
              //             ReviewActions.updateAstrologerReviewStatus({
              //               isVerify: !rowData.is_verified,
              //               id: rowData?._id,
              //             })
              //           )
              //         }
              //         style={{
              //           backgroundColor: !rowData.is_verified
              //             ? Colors.red_a
              //             : Colors.greenLight,

              //           color: Colors.white,
              //           textAlign: "center",
              //           paddingTop: 5,
              //           paddingBottom: 5,
              //           width: "100%",
              //           fontSize: 14,
              //           fontFamily: "Philospher",
              //           borderRadius: 5,
              //           cursor: "pointer",
              //           alignSelf: "center",
              //         }}
              //       >
              //         {!rowData.is_verified ? "Verify" : "Unverify"}
              //       </div>
              //     );
              //   },
              // },
            ]}
            options={propStyles.tableStyles}
            actions={[
              // {
              //   icon: "edit",
              //   tooltip: "Edit Review",
              //   onClick: (event, rowData) => handleOpen(rowData),
              // },
              {
                icon: "delete",
                tooltip: "Delete Review",
                onClick: (event, rowData) => handleDelete(rowData),
              },
              {
                icon: () => (
                  <div className={classes.addButton}>
                    <AddCircleRounded />
                    <div className={classes.addButtontext}>Add New</div>
                  </div>
                ),
                tooltip: "Add Skill",
                isFreeAction: true,
                onClick: () => navigate("/AddReview"),
              },
            ]}
          />
        </Grid>
      </Grid>
    );
  }

  function editModal() {
    // const showEditForm = () => {
    //   return (
    //     <Grid container spacing={2}>
    //       <Grid item lg={12} sm={12} md={12} xs={12}>
    //         <div className={classes.headingContainer}>
    //           <div className={classes.heading}>All Customer</div>
    //           <div onClick={handleClose} className={classes.closeButton}>
    //             <CloseRounded />
    //           </div>
    //         </div>
    //       </Grid>

    //       <Grid item lg={4} sm={12} md={12} xs={12}>
    //         <FormControl fullWidth>
    //           <InputLabel id="select-label">Select Astrologer</InputLabel>
    //           <Select
    //             label="Select Option"
    //             labelId="select-label"
    //             value={astrologer}
    //             disabled
    //             onChange={(e) => setAstrologer(e.target.value)}
    //             variant="outlined"
    //             error={error.astrologer ? true : false}
    //           >
    //             <MenuItem value="-Select Astrologer-" disabled>
    //               -Select Astrologer-
    //             </MenuItem>
    //             {astrologerList &&
    //               astrologerList?.map((item) => {
    //                 return (
    //                   <MenuItem value={item._id}>
    //                     {item.astrologerName}
    //                   </MenuItem>
    //                 );
    //               })}
    //           </Select>
    //           <div className={classes.errorstyles}>{error.astrologer}</div>
    //         </FormControl>
    //       </Grid>

    //       <Grid item lg={4} sm={12} md={12} xs={12}>
    //         <FormControl fullWidth>
    //           <InputLabel id="select-label">Select Customer</InputLabel>
    //           <Select
    //             disabled
    //             label="Select Option"
    //             labelId="select-label"
    //             value={customer}
    //             onChange={(e) => setCustomer(e.target.value)}
    //             variant="outlined"
    //             error={error.customer ? true : false}
    //           >
    //             <MenuItem value="-Select Astrologer-" disabled>
    //               -Select Customer-
    //             </MenuItem>
    //             {astrologerList &&
    //               customerList.map((item) => {
    //                 return (
    //                   <MenuItem value={item._id}>{item.customerName}</MenuItem>
    //                 );
    //               })}
    //           </Select>
    //           <div className={classes.errorstyles}>{error.customer}</div>
    //         </FormControl>
    //       </Grid>

    //       <Grid item lg={4} sm={6} md={6} xs={6}>
    //         <TextField
    //           type="number"
    //           value={rating}
    //           variant="outlined"
    //           fullWidth
    //           error={error.rating ? true : false}
    //           helperText={error.rating}
    //           inputProps={{ min: 1, max: 5 }}
    //           onChange={(e) => {
    //             const inputValue = e.target.value;
    //             if (inputValue >= 0 && inputValue <= 5) {
    //               setRating(inputValue);
    //             }
    //           }}
    //         />
    //       </Grid>

    //       <Grid item lg={12} sm={6} md={6} xs={6}>
    //         <TextField
    //           id="outlined-multiline-static"
    //           label="Comment"
    //           multiline
    //           rows={4}
    //           fullWidth
    //           value={comment}
    //           onChange={(e) => setComment(e.target.value)}
    //           error={error.comment ? true : false}
    //           helperText={error.comment}
    //         />
    //       </Grid>

    //       <Grid item lg={6} sm={6} md={6} xs={6}>
    //         <div onClick={handleSubmit} className={classes.submitbutton}>
    //           Submit
    //         </div>
    //       </Grid>
    //       <Grid item lg={6} sm={6} md={6} xs={6}>
    //         <div onClick={handleClose} className={classes.denyButton}>
    //           Reset
    //         </div>
    //       </Grid>
    //     </Grid>
    //   );
    // };

    return (
      <div>
        <Dialog open={open}>
          {/* <DialogContent>{showEditForm()}</DialogContent> */}
        </Dialog>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  isLoading: state.dashboard.isLoading,
  astrologersReviews: state.review.astrologersReviews,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(DisplayReview);
