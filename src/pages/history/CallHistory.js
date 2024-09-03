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
import { secondsToHMS } from "../../utils/services.js";
import moment from "moment";

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

  useEffect(function () {
    dispatch(HistoryActions.getCallHistory());
  }, []);

  const handleView = (rowData) => {
    setViewData(true);
    setData({
      transactionId: rowData?.transactionId || "",
      customerId: rowData?.customerId?._id || "",
      astrologerId: rowData?.astrologerId?._id || "",
      customerName: `${rowData?.customerId?.firstName } ${rowData?.customerId?.lastName }`|| "",
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

  return (
    <div className={classes.container}>
      {
        !callHistoryData ? <CircularProgress/> :
      <div className={classes.box}>
        {callHistoryData && displayTable()}
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
            title=" Call History"
            data={reverseData}
            columns={[
              {
                title: "S.No",
                editable: "never",
                render: rowData => Array.isArray(reverseData) ? reverseData.indexOf(rowData) + 1 : 'N/A'
              },

            //   { title: "Call ID", field: "_id" },
              {
                title: "Astrologer Display Name",
                field: "astrologerId.displayName",
              },
              {
                title: "Customer Name",
                render: (rowData) => {
                  const firstName = rowData?.customerId?.firstName || "";
                  const lastName = rowData?.customerId?.lastName || "";
                  return `${firstName} ${lastName}`;
                }
              },
              { title: "Commission Price", field: "commissionPrice" },
              { title: "Deducted Amount", field: "deductedAmount",
                render: (rowData) => {
                  const balance = Number(rowData.deductedAmount).toFixed(2);
                  return balance;
                }
               },
              {
                title: "Duration",
                render: (rowData) => (
                  <div>
                    {rowData?.durationInSeconds &&
                      secondsToHMS(rowData?.durationInSeconds)}
                  </div>
                ),
              },
            
              {
                title: "Date",
                render: (rowData) => (
                  <div>
                    {rowData?.endTime &&
                      moment(rowData?.createdAt).format("DD-MM-YYYY")}
                  </div>
                ),
              },
              { title: "Status", field: "status" },
            ]}
            options={{ ...propStyles.tableStyles, filtering: false }}
            style={{ fontSize: "1.2rem" }}
            actions={[
              {
                icon: "visibility",
                tooltip: "View Chat History",
                onClick: (event, rowData) => handleView(rowData),
              },
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
