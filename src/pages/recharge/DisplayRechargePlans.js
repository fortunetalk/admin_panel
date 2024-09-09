import React, { useEffect, useState } from "react";
import { useStyles, propStyles } from "../../assets/styles.js";

import {
  Grid,
  TextField,
  CircularProgress
} from "@mui/material";
import MaterialTable from "material-table";
import { AddCircleRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import * as Actions from "../../redux/Actions/rechargeHistoryActions.js";
import * as RechargeHistoryActions from "../../redux/Actions/rechargeHistoryActions.js";
import Loader from "../../Components/loading/Loader.js";
import { connect } from "react-redux";

const DisplayRechargePlan = ({ dispatch, rechargeHistoryData }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  useEffect(function () {
    dispatch(Actions.getRechargeHistory());
  }, []);



  return (
    <div className={classes.container}>
      {
        !rechargeHistoryData ? <CircularProgress/> :
      <div className={classes.box}>
        {rechargeHistoryData && displayTable()}

      </div>
      }
    </div>
  );
  function displayTable() {
    return (
      <Grid container spacing={1}>
        <Grid item lg={12} sm={12} md={12} xs={12}>
          <MaterialTable
            title="Recharge History Data"
            data={rechargeHistoryData}
            columns={[
              {
                title: "S.No",
                editable: "never",
                render: rowData => Array.isArray(rechargeHistoryData) ? rechargeHistoryData.indexOf(rowData) + 1 : 'N/A'
              },
             
              { title: "Customer ID", field: "customerId.customerUniqueId" },
              { title: "Customer Name", field: "customerId.customerName" },
              { title: "Customer Number", field: "customerId.phoneNumber" },
              // { title: "Reference Model", field: "referenceModel" },
              { title: "Invoice ID", field: "invoiceId" },
              { title: "Type", field: "type" },
              // { title: "Discount", field: "discount" },
              // { title: "Offer", field: "offer" },
              {
                title: "Date",
                field: "createdAt",
                render: rowData => new Date(rowData.createdAt).toLocaleDateString()
              },
              { 
                title: "Amount", field: "amount" ,
                render: (rowData) => {
                  const balance = Number(rowData.amount).toFixed(2);
                  return balance;
                }
              },
              { title: "GST", field: "gst" },
              { title: "Total Amount", field: "totalAmount" },
              { title: "Payment Method", field: "paymentMethod" },
              { title: "Transaction Type", field: "transactionType" },
           
              
            ]}
            options={{ ...propStyles.tableStyles, filtering: false }}
            actions={[
              {
                icon: "delete",
                tooltip: "Delete Recharge",
                onClick: (event, rowData) => dispatch(RechargeHistoryActions.deleteRechargeHistory({invoiceId: rowData?.invoiceId}))
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
                onClick: () => navigate("/addRechargeHistory"),
              },
            ]}

          />
        </Grid>
      </Grid>
    );
  }

};

const mapStateToProps = (state) => ({
  rechargeHistoryData: state.rechargeHistory.rechargeHistoryData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(DisplayRechargePlan);
