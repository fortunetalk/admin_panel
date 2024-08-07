import React, { useEffect, useState } from "react";
import { useStyles, propStyles } from "../../assets/styles.js";
import {
  Grid,
  TextField,
} from "@mui/material";
import MaterialTable from "material-table";
import * as Actions from "../../redux/Actions/rechargeHistoryActions.js";
import Loader from "../../Components/loading/Loader.js";
import { connect } from "react-redux";

const DisplayRechargePlan = ({ dispatch, rechargeHistoryData }) => {
  const classes = useStyles();

  useEffect(function () {
    dispatch(Actions.getRechargeHistory());
  }, []);



  return (
    <div className={classes.container}>
      <Loader />
      <div className={classes.box}>
        {rechargeHistoryData && displayTable()}
      </div>
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
              { title: "Reference Model", field: "referenceModel" },
              { title: "Invoice ID", field: "invoiceId" },
              { title: "Type", field: "type" },
              { title: "Discount", field: "discount" },
              { title: "Offer", field: "offer" },
              { 
                title: "Amount", field: "amount" ,
                render: (rowData) => {
                  const balance = Number(rowData.amount).toFixed(2);
                  return balance;
                }
              },
              { title: "Total Amount", field: "totalAmount" },
              { title: "Payment Methody", field: "paymentMethod" },
              { title: "Transaction Type", field: "transactionType" },
              { title: "GST", field: "gst" },
              
            ]}
            options={{ ...propStyles.tableStyles, filtering: false }}
          
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
