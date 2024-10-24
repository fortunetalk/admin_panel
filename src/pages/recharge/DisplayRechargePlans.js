import React, { useEffect, useState } from "react";
import { useStyles, propStyles } from "../../assets/styles.js";
import {
  Grid,
  TextField,
} from "@mui/material";
import MaterialTable from "material-table";
import { AddCircleRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import * as RechargeHistoryActions from "../../redux/Actions/rechargeHistoryActions.js";
import { connect } from "react-redux";
import { api_url, get_recharge_history } from "../../utils/Constants.js";
import moment from "moment";
import * as AdminActions from '../../redux/Actions/adminAction.js'

const DisplayRechargePlan = ({ dispatch, rechargeHistoryData, adminData }) => {
  const { user, type } = adminData || {};
  const classes = useStyles();
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState({ start: null, end: null });

  const handleDateFilterChange = (name) => (event) => {
    setDateRange({ ...dateRange, [name]: event.target.value });
  };

  const handleAdd = () => {
    if (type === "subadmin" && !user.permissions.customer?.rechargeHistory?.addRecharge) {
      alert('You do not have permission to add Recharge.');
      return;
    }
    navigate("/addRechargeHistory");
  };

  const dateFilterComponent = (filterProps) => (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <TextField
          type="date"
          label=" Date Filter"
          value={dateRange.start || ""}
          onChange={handleDateFilterChange('start')}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
    </Grid>
  );

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
            columns={[
              // {
              //   title: "S.No",
              //   editable: "never",
              //   render: (rowData) => rowData.tableData.id + 1,
              // },
              { title: "Invoice ID", field: "invoiceId", filtering: false },
              { title: "Customer Name", field: "customerName", filtering: false },
              { title: "Customer Number", field: "phoneNumber", filtering: false },
            
              {
                title: "Type",
                field: "type",
                filtering: false,
                render: (rowData) => {
                    switch (rowData.type) {
                        case "WALLET_RECHARGE":
                            return "By Customer";
                        case "WALLET_RECHARGE_BY_ADMIN":
                            return "By Admin";
                        default:
                            return rowData.type; // Return the original type if it doesn't match
                    }
                },
            },
              {
                title: "Date",
                field: "createdAt",
                filtering: false,
                render: (rowData) => (
                  <div>
                    {rowData?.createdAt && moment(rowData?.createdAt).format("DD-MM-YY HH:mm A")}
                  </div>
                ),
                // filterComponent: dateFilterComponent,
              },
              {
                title: "Amount",
                field: "amount",
                filtering: false,
                render: (rowData) => Number(rowData.amount).toFixed(2),
              },
              // { title: "GST", field: "gst", filtering: false },
              { title: "Transaction Type", field: "transactionType", filtering: false },
            ]}
            data={query =>
              new Promise((resolve, reject) => {
                const filters = {};
                query.filters.forEach(item => {
                  if (item.value.length > 0) {
                    filters[item.column.field] = item.value[0];
                  }
                });

                // Add date range to filters
                if (dateRange.start) filters.startDate = dateRange.start;
                if (dateRange.end) filters.endDate = dateRange.end;

                dispatch(AdminActions.setApiPayload({
                  page: query.page + 1,
                  limit: query.pageSize === 0 ? 10 : query.pageSize,
                  ...filters,
                  search: query.search,
                }));

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
                    transactionType: "credited"
                  }),
                })
                  .then(response => response.json())
                  .then(result => {
                    resolve({
                      data: result.data.data,
                      page: result.data.pagination.currentPage - 1,
                      totalCount: result.data.pagination.totalCount,
                    });
                  })
                  .catch(error => {
                    reject(error);
                  });
              })
            }
            options={{ ...propStyles.tableStyles, paging: true, pageSize: 10, pageSizeOptions: [10, 20, 50, 100], filtering: true }}
            actions={[
              {
                icon: "delete",
                tooltip: "Delete Recharge",
                onClick: (event, rowData) => {
                  if (
                    type === "subadmin" &&
                    !user.permissions.customer?.rechargeHistory?.delete
                  ) {
                    alert('You do not have permission to delete.');
                    return;
                  }
                  dispatch(RechargeHistoryActions.deleteRechargeHistory({ invoiceId: rowData?.invoiceId }));
                },
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
                onClick: () => handleAdd(),
                // onClick: () => navigate("/addRechargeHistory"),
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
  adminData: state.admin.adminData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(DisplayRechargePlan);
