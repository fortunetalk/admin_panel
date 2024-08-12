import React, { useEffect, useState } from "react";
import { useStyles, propStyles } from "../../assets/styles.js";
import { Grid, CircularProgress } from "@mui/material";
import MaterialTable from "material-table";
import * as Actions from "../../redux/Actions/customerActions.js";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";

const CustomerRechargeHistory = ({ dispatch, rechargeHistoryData }) => {
  const classes = useStyles();
  const location = useLocation();

  const [customerId, setCustomerId] = useState(location.state?.customerId);

  useEffect(() => {
    if (customerId) {
      dispatch(Actions.getCustomerRechargeHistory({customerId}));
    }
  }, [customerId, dispatch]);

  console.log('rechargeHistoryData',rechargeHistoryData)

  return (
    <div className={classes.container}>
      {!rechargeHistoryData ? (
        <CircularProgress />
      ) : (
        <div className={classes.box}>{displayTable()}</div>
      )}
    </div>
  );

  function displayTable() {
    return (
      <Grid container spacing={1}>
        <Grid item lg={12} sm={12} md={12} xs={12}>
          {(rechargeHistoryData && rechargeHistoryData.length>1) && <MaterialTable
            title="Customer Recharge History"
            data={rechargeHistoryData || []}
            columns={[
              {
                title: "S.No",
                editable: "never",
                render: (rowData) =>
                  Array.isArray(rechargeHistoryData)
                    ? rechargeHistoryData.indexOf(rowData) + 1
                    : "N/A",
              },
              { title: "Customer Name", field: "customerId.customerName" },
              { title: "Email", field: "customerId.email" },
              { title: "Amount", field: "amount" },
              { title: "Total Amount", field: "totalAmount" },
              { title: "Discount", field: "discount" },
              { title: "Offer", field: "offer" },
            ]}
            options={{ ...propStyles.tableStyles, filtering: false }}
          />}
        </Grid>
      </Grid>
    );
  }
};

const mapStateToProps = (state) => ({
  rechargeHistoryData: state.customer.rechargeHistoryData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerRechargeHistory);
