import React, { useCallback, useEffect, useState } from "react";
import { propStyles, useStyles } from "../../assets/styles.js";
import {  Grid, TextField, CircularProgress } from "@mui/material";
import { AddCircleRounded } from "@mui/icons-material";
import MaterialTable from "material-table";
import { useNavigate } from "react-router-dom";
import { CloseRounded } from "@mui/icons-material";
import Swal from "sweetalert2";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { connect } from "react-redux";
import * as OffersActions from "../../redux/Actions/offersActions.js";

const DisplayAstrologerOffers = ({ dispatch, offerData }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  // const [offerData, setOfferData] = useState();
  const [offer_id, setOffer_id] = useState("");
  const [offerName, setofferName] = useState("");
  const [displayName, setdisplayName] = useState("");
  const [discount, setDiscount] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  useEffect(function () {
    dispatch(OffersActions.getAstrologersOffers()); 
  }, []);

 
  const handleOpen = (rowData) => {
    setOpen(true);
    setOffer_id(rowData._id);
    setofferName(rowData.offerName);
    setdisplayName(rowData.displayName);
    console.log(rowData);
  };


  const handleError = (field, message) => {
    setError((prevError) => ({ ...prevError, [field]: message }));
  };

  const handleOptionChange = (e) => {
    setStatus(e.target.value);
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
      OffersActions.updateAstrologerOffer({ offerId: offer_id, offerName: offerName, displayName: displayName, discount:discount ,})
      );
      handleReset();
      setOpen(false);
    }
  };

  const handleReset = useCallback(() => {
    setofferName("");
    setdisplayName("");
    setDiscount("");
    setError({ offer: "" });
    
  });

  const handleClose = useCallback(() => {
    setOffer_id("");
    setofferName("");
    setdisplayName("");
    setOpen(false);
  });

  const handleClickOpen = (rowData) => {

    Swal.fire({
      title: 'Are you sure to Change the Status?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Change it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const newStatus = rowData.status === 'Active' ? 'InActive' : 'Active';
        // dispatch(OffersActions.updateRemedyStatus({ remediesId: rowData._id, status: newStatus }));
      }
    });
  };

  return (
    <div className={classes.container}>
      {!offerData ? (
        <CircularProgress />
      ) : (
        <div className={classes.box}>
          {offerData && displayTable()}
          {editModal()}
        </div>
      )}
    </div>
  );

  function displayTable() {
    return (
      <Grid container spacing={1}>
        <Grid item lg={12} sm={12} md={12} xs={12}>
          <MaterialTable
            title="Astrologer Offers"
            data={offerData}
            columns={[
              {
                title: "S.No",
                editable: "never",
                render: rowData => Array.isArray(offerData) ? offerData.indexOf(rowData) + 1 : 'N/A'
              },
              { title: "Offer Name",
                render: (rowData) => {
                  const offerName = rowData?.offerName|| "";
                  return `${offerName}`;
                },
              },
              {
                title: " Display Name",
                field: "displayName",
              },
              {
                title: "Discount",
                field: "discount",
              },
              { title: "Status", field: "status", render: rowData => (
                <div className={classes.statusButton}
                style={{ backgroundColor: rowData.status === 'Active' ? '#90EE90' : '#FF7F7F '}}
                onClick={() => handleClickOpen(rowData)}>
                  {rowData.status}
                </div>
              )},
            ]}
            options={propStyles.tableStyles}
            style={{ fontSize: "1.4rem" }}
            actions={[
              {
                icon: "edit",
                tooltip: "Edit Sub Remedy",
                onClick: (event, rowData) => handleOpen(rowData),
              },
              {
                icon: "delete",
                tooltip: "Delete Offer",
                onClick: (event, rowData) =>
                  dispatch(
                    OffersActions.deleteAstrologerOffer({
                      offerId: rowData?._id,
                    })
                  ),
              },
              {
                icon: () => (
                  <div className={classes.addButton}>
                    <AddCircleRounded />
                    <div className={classes.addButtontext}>Add New</div>
                  </div>
                ),
                tooltip: "Add remedy",
                isFreeAction: true,
                onClick: () => navigate("/addAstrologerOffer"),
              },
            ]}
          />
        </Grid>
      </Grid>
    );
  }

  function editModal() {
    const showEditForm = () => {
      return (
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>Edit Astrologers Offers</div>
              <div onClick={handleClose} className={classes.closeButton}>
                <CloseRounded />
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
              Submit
            </div>
          </Grid>
          <Grid item lg={6} sm={6} md={6} xs={6}>
            <div onClick={handleClose} className={classes.denyButton}>
              Cancel
            </div>
          </Grid>
        </Grid>
      );
    };

    return (
      <div>
        <Dialog open={open}>
          <DialogContent>{showEditForm()}</DialogContent>
        </Dialog>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  offerData: state.offers.offerData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(DisplayAstrologerOffers);
