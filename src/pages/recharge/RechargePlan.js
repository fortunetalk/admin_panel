import React, { useCallback, useEffect, useState } from "react";
import { propStyles, useStyles } from "../../assets/styles.js";
import { Grid, TextField, FormControl, InputLabel, MenuItem, Select, CircularProgress } from "@mui/material";
import { Colors } from "../../assets/styles.js";
import { AddCircleRounded } from "@mui/icons-material";
import MaterialTable from "material-table";
import { useNavigate } from "react-router-dom";
import { CloseRounded } from "@mui/icons-material";
import Swal from "sweetalert2";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { connect } from "react-redux";
import * as RechargeActions from "../../redux/Actions/rechargeActions.js";

const RechargePlan = ({ dispatch, rechargePlanData }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [planId, setplanId] = useState("");
  const [rechargeAmount, setRechargeAmount] = useState('');
  const [extraPercent, setExtraPercent] = useState('');
  const [currency, setCurrency] = useState("");
  const [status, setStatus] = useState('');
  const [error, setError] = useState({});

  useEffect(function () {
    dispatch(RechargeActions.getRechargePlan());
  }, []);

  const handleOpen = (rowData) => {
    setOpen(true);
    setRechargeAmount(rowData?.amount);
    setExtraPercent(rowData?.percentage);
    setCurrency(rowData?.currency);
    setStatus(rowData?.recharge_status);
    setplanId(rowData._id);
  };


  const handleError = (field, message) => {
    setError((prevError) => ({ ...prevError, [field]: message }));
  };

  const handleSubmit = async () => {
    var body = {
      "amount": rechargeAmount,
      "percentage": extraPercent,
      "currency": currency,
      "recharge_status": status,
      "planId": planId
    }

    dispatch(
      RechargeActions.updateRechargePlan(body)
    );
    setOpen(false);
  };

  const handleClose = useCallback(() => {
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
        const newStatus = rowData.recharge_status === 'Active' ? 'InActive' : 'Active';
        dispatch(RechargeActions.updateRechargePlanStatus({ planId: rowData._id, recharge_status: newStatus }));
      }
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };


  return (
    <div className={classes.container}>
      {
        !rechargePlanData ? <CircularProgress /> :
          <div className={classes.box}>
            {rechargePlanData && displayTable()}
            {editModal()}
          </div>
      }
    </div>
  );
  function displayTable() {
    return (
      <Grid container spacing={1}>
        <Grid item lg={12} sm={12} md={12} xs={12}>
          <MaterialTable
            title="Recharge Plan List"
            data={rechargePlanData}
            columns={[
              {
                title: "S.No",
                editable: "never",
                render: rowData => Array.isArray(rechargePlanData) ? rechargePlanData.indexOf(rowData) + 1 : 'N/A'
              },
              { title: "Amount", field: "amount" },
              {
                title: "Percentage",
                field: "percentage",
              },
              { title: "Currency", field: "currency", filtering: false },
              {
                title: "Status", field: "recharge_status", render: rowData => (
                  <div className={classes.statusButton}
                    style={{ backgroundColor: rowData.recharge_status === 'Active' ? '#90EE90' : '#FF7F7F ' }}
                    onClick={() => handleClickOpen(rowData)}>
                    {rowData.recharge_status}
                  </div>
                )
              },
            ]}
            options={propStyles.tableStyles}
            style={{ fontSize: "1.0rem" }}
            actions={[
              {
                icon: "edit",
                tooltip: "Edit Recharge",
                onClick: (event, rowData) => handleOpen(rowData),
              },
              {
                icon: "delete",
                tooltip: "Delete Recharge",
                onClick: (event, rowData) =>
                  dispatch(
                    RechargeActions.deleteRechargePlan({
                      planId: rowData?._id,
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
                tooltip: "Add Recharge",
                isFreeAction: true,
                onClick: () => navigate("/addRechargePlan"),
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
              <div className={classes.heading}>Edit Recharge</div>
              <div onClick={handleClose} className={classes.closeButton}>
                <CloseRounded />
              </div>
            </div>
          </Grid>
          <Grid item lg={6} sm={12} md={12} xs={12} >
            <TextField
              label="Recharge Amount"
              type="text"
              error={Boolean(error.rechargeAmount)}
              helperText={error.rechargeAmount}
              value={rechargeAmount}
              onFocus={() => handleError('rechargeAmount', null)}
              onChange={(event) => setRechargeAmount(event.target.value)}
              variant='outlined' fullWidth />
          </Grid>
          <Grid item lg={6} sm={12} md={12} xs={12} >
            <TextField
              label="Percent"
              type="text"
              error={Boolean(error.extraPercent)}
              helperText={error.extraPercent}
              value={extraPercent}
              onFocus={() => handleError('extraPercent', null)}
              onChange={(event) => setExtraPercent(event.target.value)}
              variant='outlined' fullWidth />
          </Grid>

          <Grid item lg={6} sm={12} md={12} xs={12}>
            <TextField
              label="Enter Currency"
              type="text"
              error={Boolean(error.currency)}
              helperText={error.currency}
              value={currency}
              onFocus={() => handleError("currency", null)}
              onChange={(event) => setCurrency(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item lg={6} sm={12} md={12} xs={12} >
            <FormControl fullWidth>
              <InputLabel id="select-label">Status</InputLabel>
              <Select
                label="Select Status"
                labelId="select-label"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                variant="outlined"
                error={error.status ? true : false}
                fullWidth
              >
                <MenuItem value="null" disabled>Select Status</MenuItem>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="InActive">InActive</MenuItem>
              </Select>

            </FormControl>
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
  rechargePlanData: state.recharge.rechargePlanData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(RechargePlan);
