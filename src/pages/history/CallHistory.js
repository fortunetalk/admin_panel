import React, { useEffect, useState } from "react";
import { useStyles, propStyles } from "../../assets/styles.js";
import {
  Grid,
  TextField,
  CircularProgress
} from "@mui/material";
import MaterialTable from "material-table";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { CloseRounded } from "@mui/icons-material";
import Swal from "sweetalert2";
import * as HistoryActions from "../../redux/Actions/historyActions.js";
import Loader from "../../Components/loading/Loader.js";
import { connect } from "react-redux";
import { secondsToHMS, showNumber } from "../../utils/services.js";
import moment from "moment";
import { api_url, get_call_history } from "../../utils/Constants.js";


const ChatHistory = ({ dispatch, callHistoryData }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [viewData, setViewData] = useState(false);
  const [data, setData] = useState({
    transactionId: "",
    customerId: "",
    astrologerId: "",
    customerName: "",
    customerEmail: "",
    astrologerName: "",
    astrologerDisplayName: "",
    astrologerEmail: "",
    startTime: "",
    endTime: "",
    durationInSeconds: "",
    callPrice: "",
    commissionPrice: "",
    status: "",
    deductedAmount: "",
    callType: "",
    callId: "",
  });

  // useEffect(function () {
  //   dispatch(HistoryActions.getCallHistory());
  // }, []);

  const handleView = (rowData) => {
    setViewData(true);
    setData({
      transactionId: rowData?.transactionId || "",
      customerId: rowData?.customerId?._id || "",
      astrologerId: rowData?.astrologerId?._id || "",
      customerName: `${rowData?.customerId?.firstName} ${rowData?.customerId?.lastName}` || "",
      customerEmail: rowData?.customerId?.email || "",
      astrologerName: rowData?.astrologerId?.name || "",
      astrologerDisplayName: rowData?.astrologerId?.displayName || "",
      astrologerEmail: rowData?.astrologerId?.email || "",

      startTime: new Date(rowData?.startTime).toLocaleString() || "",
      endTime: new Date(rowData?.endTime).toLocaleString() || "",
      durationInSeconds: rowData?.durationInSeconds || "",
      callPrice: rowData?.callPrice || "",
      commissionPrice: rowData?.commissionPrice || "",
      status: rowData?.status || "",
      deductedAmount: rowData?.deductedAmount || "",
      callType: rowData?.callType || "",
      callId: rowData?.callId || "",
    });
  };

  const handleClose = () => {
    setViewData(false);
  };

  const reverseData = Array.isArray(callHistoryData) ? callHistoryData.slice().reverse() : [];

  function transformTransactionId(transactionId) {
    const parts = transactionId.split("fortunetalk");
    return `#FTCA${parts[1] || ''}`;
  }

  return (
    <div className={classes.container}>
      {

        <div className={classes.box}>
          {displayTable()}
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
            title={
              <div>
                <span style={{ fontWeight: '500', fontSize: '25px', marginRight: '20px' }}>Call History</span>
              </div>
            }

            columns={[
              // {
              //   title: "S.No",
              //   editable: "never",
              //   render: (rowData) => rowData.tableData.id + 1,
              // },

              //   { title: "Call ID", field: "_id" },
              {
                title: "Call-Id",
                field: "transactionId",
                filtering: false,
                render: (rowData) => transformTransactionId(rowData.transactionId),

              },
              {
                title: "Astrologer Display Name",
                field: "astrologerDisplayName",
                filtering: false,
              },
              {
                title: "Customer Name",
                filtering: false,
                field: "customerName",
              },
              {
                title: "Customer Phone Number",
                filtering: false,
                field: "phoneNumber",
              },
              // { title: "Call Price", field: "callPrice", filtering: false, },
              {
                title: "Call Price",
                field: "callPrice",
                filtering: false,
                render: (rowData) => showNumber(rowData.callPrice),
              },
              {
                title: "Commission Price", field: "commissionPrice", filtering: false,
                render: (rowData) => showNumber(rowData.commissionPrice),
              },

              {
                title: "Deducted Amount", field: "deductedAmount",
                filtering: true,
                lookup: { ZEROS: "NO BALANCE", NONZEROS: "HAVE BALANCE", },
                render: (rowData) => {
                  const balance = Number(rowData.deductedAmount).toFixed(2);
                  return balance;
                }
              },
              {
                title: "Duration",
                filtering: false,
                render: (rowData) => (
                  <div>
                    {rowData?.durationInSeconds &&
                      secondsToHMS(rowData?.durationInSeconds) || "N/A"}
                  </div>
                ),
              },

              // {
              //   title: "Date",
              //   render: (rowData) => (
              //     <div>
              //       {rowData?.endTime &&
              //         moment(rowData?.createdAt).format("DD-MM-YYYY")}
              //     </div>
              //   ),
              // },
              {
                title: "Request Time",
                field: "createdAt",
                filtering: false,
                render: (rowData) => (
                  <div>
                    {rowData?.createdAt
                      ? moment(rowData?.createdAt).format("DD-MM-YYYY HH:mm A")
                      : "N/A"}
                  </div>
                ),
              },
              {
                title: "Start Time",
                field: "startTime",
                filtering: false,
                render: (rowData) => (
                  <div>
                    {rowData?.startTime
                      ? moment(rowData?.startTime).format("DD-MM-YY HH:mm A")
                      : "N/A"}
                  </div>
                ),
              },
              {
                title: "End time",
                field: "endTime",
                filtering: false,
                render: (rowData) => (
                  <div>
                    {rowData?.endTime ? rowData?.endTime &&
                      moment(rowData?.endTime).format("DD-MM-YY HH:mm A")
                      : "N/A"}
                  </div>
                ),
                 export: rowData => moment(rowData.endTime).format("DD-MM-YYYY HH:mm A"),
              },
              // { title: "Status", field: "status" },

              // {
              //   title: "Status",
              //   render: (rowData) => {
              //     const statusMap = {
              //       TIMEOUT: "MISSED",
              //       REJECTED: "REJECTED",
              //       CANCELLED: "CANCELLED",
              //       COMPLETED: "COMPLETED"
              //     };

              //     return statusMap[rowData?.status] || "UNKNOWN"; // Provide a default value if status is not found
              //   }
              // },
              { title: "Status", field: "status", lookup: { COMPLETED: "COMPLETED", REJECTED: "REJECTED", ACCEPTED: "ACCEPTED", CREATED: "CREATED", ONGOING: "ON GOING", CANCELLED: "CANCELLED" }, },

            ]}
            // data={reverseData}

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

                fetch(api_url + get_call_history, {
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

            options={{ ...propStyles.tableStyles, paging: true, pageSize: 10, pageSizeOptions: [10, 20, 50, 100], filtering: 'true' }}
            style={{ fontSize: "1.0rem" }}
            actions={[
              // {
              //   icon: "visibility",
              //   tooltip: "View Chat History",
              //   onClick: (event, rowData) => handleView(rowData),
              // },
              {
                icon: "delete",
                tooltip: "Delete Chat History",
                onClick: (event, rowData) =>
                  dispatch(
                    HistoryActions.deleteCallHistory({
                      callId: rowData?._id,
                    })
                  ),
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
              <div className={classes.heading}>Call History Data</div>
              <div onClick={handleClose} className={classes.closeButton}>
                <CloseRounded />
              </div>
            </div>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Call ID"
              value={data.callId}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Transaction ID"
              value={data.transactionId}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Customer ID"
              value={data.customerId}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Astrologer ID"
              value={data.astrologerId}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Customer Name"
              value={data.customerName}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Customer Email"
              value={data.customerEmail}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Astrologer Name"
              value={data.astrologerName}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Astrologer Display Name"
              value={data.astrologerDisplayName}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Astrologer Email"
              value={data.astrologerEmail}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Start Time"
              value={data.startTime}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="End Time"
              value={data.endTime}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Duration (seconds)"
              value={data.durationInSeconds}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Call Price"
              value={data.callPrice}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Commission Price"
              value={data.commissionPrice}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Status"
              value={data.status}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Deducted Amount"
              value={data.deductedAmount}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Call Type"
              value={data.callType}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
        </Grid>
      );
    };

    return (
      <div>
        <Dialog open={viewData}>
          <DialogContent>{showEditForm()}</DialogContent>
        </Dialog>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  callHistoryData: state.history.callHistoryData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(ChatHistory);
