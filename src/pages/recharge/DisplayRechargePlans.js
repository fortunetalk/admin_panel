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
import { api_url, get_recharge_history } from "../../utils/Constants.js";
import moment from "moment";

const DisplayRechargePlan = ({ dispatch, rechargeHistoryData }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  // useEffect(function () {
  //   dispatch(Actions.getRechargeHistory());
  // }, []);



  return (
    <div className={classes.container}>
      
      <div className={classes.box}>
        {displayTable()}

      </div>

    </div>
  );
  function displayTable() {
    return (
      <Grid container spacing={1}>
        <Grid item lg={12} sm={12} md={12} xs={12}>
          <MaterialTable
            title="Recharge History Data"
            // data={rechargeHistoryData}
            columns={[
              {
                title: "S.No",
                editable: "never",
                render: (rowData) => rowData.tableData.id + 1,
                // render: rowData => Array.isArray(rechargeHistoryData) ? rechargeHistoryData.indexOf(rowData) + 1 : 'N/A'
              },
             
              // { title: "Customer ID", field: "customerId.customerUniqueId",  filtering: false, },
              { title: "Customer Name", field: "customerName",  filtering: false, },
              { title: "Customer Number", field: "phoneNumber",  filtering: false, },
              // { title: "Reference Model", field: "referenceModel" },
              { title: "Invoice ID", field: "invoiceId",  filtering: false, },
              { title: "Type", field: "type",  filtering: false,},
              // { title: "Discount", field: "discount" },
              // { title: "Offer", field: "offer" },
              {
                title: "Date",
                field: "createdAt",
                filtering: false,
                render: (rowData) => (
                    <div>
                       {rowData?.createdAt &&  moment(rowData?.createdAt).format("DD-MM-YY HH:mm A")}
                    </div>
                   ),    
              },
              // render: rowData => new Date(rowData.createdAt).toLocaleDateString()
              
              { 
                title: "Amount", field: "amount" , filtering: false,
                render: (rowData) => {
                  const balance = Number(rowData.amount).toFixed(2);
                  return balance;
                }
              },
              { title: "GST", field: "gst" ,filtering: false,},
              // { title: "Total Amount", field: "totalAmount",  filtering: false, },
              // { title: "Payment Method", field: "paymentMethod",  filtering: false, },
              { title: "Transaction Type", field: "transactionType",  filtering: false, },
           
              
            ]}
            data={query =>
              new Promise((resolve, reject) => {
                console.log('Query:', query);
                const filters = {};
            
                query.filters.forEach(item => {
                  if (item.value.length > 0) {
                    filters[item.column.field] = item.value[0];
                  }
                });
            
                console.log('Filters:', filters);
            
                fetch(api_url + get_recharge_history, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    page: query.page + 1,
                    limit: query.pageSize === 0 ? 10 : query.pageSize,
                    ...filters,
                    search: query.search,
                  }),
                })
                  .then(response => response.json())
                  .then(result => {
                    console.log('Fetch Result:', result.data);
                    resolve({
                      data: result.data.data,
                      page: result.data.pagination.currentPage - 1,
                      totalCount: result.data.pagination.totalCount,
                    });
                  })
                  .catch(error => {
                    console.error('Fetch Error:', error);
                    reject(error);
                  });
              })
            }

            options={{ ...propStyles.tableStyles,  paging: true, pageSize: 10, pageSizeOptions: [10, 20, 50, 100], filtering: 'true'}}
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
