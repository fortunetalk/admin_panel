import React, { useEffect, useState } from "react";
import { useStyles, propStyles } from "../../assets/styles.js";
import { Grid, TextField, CircularProgress } from "@mui/material";
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
import { api_url, get_chat_history } from "../../utils/Constants.js";

const ChatHistory = ({ dispatch, chatHistoryData, chatHistoryApiPayload }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [viewData, setViewData] = useState(false);
  const [data, setData] = useState({
    transactionId: "",
    customerId: "",
    astrologerId: "",
    customerName: "",
    customerPhoneNumber: "",
    customerEmail: "",
    astrologerName: "",
    astrologerDisplayName: "",
    astrologerEmail: "",
    requestTime: "",
    startTime: "",
    endTime: "",
    durationInSeconds: "",
    chatPrice: "",
    commissionPrice: "",
    status: "",
    deductedAmount: "",
    maxduration: "",
    chatId: "",
  });

  const [filter, setFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    dispatch(HistoryActions.getChatHistory());
  }, [dispatch]);

  useEffect(() => {}, [chatHistoryApiPayload]);

  const handleView = (rowData) => {
    setViewData(true);
    setData({
      transactionId: rowData?.transactionId || "",
      customerId: rowData?.customerId?._id || "",
      astrologerId: rowData?.astrologerId?._id || "",
      customerName: rowData?.customerName || "",
      customerPhoneNumber: rowData?.phoneNumber || "",
      customerEmail: rowData?.email || "",
      astrologerName: rowData?.astrologerName || "",
      astrologerDisplayName: rowData?.astrologerDisplayName || "",
      astrologerEmail: rowData?.astrologerId?.email || "",
      requestTime: rowData?.createdAt
        ? moment(rowData?.createdAt).format("DD-MM-YYYY HH:mm:ss A")
        : "N/A" || "N/A",
      startTime: new Date(rowData?.startTime).toLocaleString() || "",
      // startTime: rowData?.startTime || "NA",
      // startTime: rowData?.startTime? moment(rowData?.startTime).format("DD-MM-YY HH:mm A")  : "N/A",
      endTime: new Date(rowData?.endTime).toLocaleString() || "",
      durationInSeconds:
        (rowData?.durationInSeconds &&
          secondsToHMS(rowData?.durationInSeconds)) ||
        "",
      chatPrice: rowData?.chatPrice || "",
      commissionPrice: rowData?.commissionPrice || "",
      status: rowData?.status || "",
      deductedAmount: rowData?.deductedAmount || "",
      maxduration: rowData?.maxduration || "",
      chatId: rowData?.chatId || "",
    });
  };

  function transformTransactionId(transactionId) {
    const parts = transactionId.split("fortunetalk");
    return `#FTCH${parts[1] || ""}`;
  }

  const handleClose = () => {
    setViewData(false);
  };

  const handleClickOpen = (rowData) => {
    navigate(`/history/fullChatHistory/${rowData.customerId}`, {
      state: { chatId: rowData.chatId },
    });
  };

  const filterOptions =
    chatHistoryData && Array.isArray(chatHistoryData)
      ? Array.from(
          new Set(
            chatHistoryData.map((data) => data.astrologerId?.displayName || "")
          )
        )
      : [];

  const statusOptions =
    chatHistoryData && Array.isArray(chatHistoryData)
      ? Array.from(new Set(chatHistoryData.map((data) => data.status || "")))
      : [];

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        {displayTable()}
        {editModal()}
      </div>
    </div>
  );

  function displayTable() {
    return (
      <Grid container spacing={1}>
        <Grid item lg={12} sm={12} md={12} xs={12}>
          <MaterialTable
            title={
              <div>
                <span
                  style={{
                    fontWeight: "500",
                    fontSize: "25px",
                    marginRight: "20px",
                  }}
                >
                  Chat History
                </span>
              </div>
            }
            columns={[
              // {
              //   title: "S.No",
              //   editable: "never",
              //   render: (rowData) => rowData.tableData.id + 1,
              // },

              {
                title: "Chat-Id",
                field: "transactionId",
                filtering: false,
                render: (rowData) =>
                  transformTransactionId(rowData.transactionId),
              },
              {
                title: "Astrologer Display Name",
                field: "astrologerDisplayName",
                filtering: false,
              },
              {
                title: "Customer Name",
                field: "customerName",
                filtering: false,
              },
              {
                title: "Customer Phone Number",
                field: "phoneNumber",
                filtering: false,
              },
              {
                title: "Chat Price",
                field: "chatPrice",
                filtering: false,
                render: (rowData) => showNumber(rowData.chatPrice),
              },
              {
                title: "Commission Price",
                field: "commissionPrice",
                filtering: false,
                render: (rowData) => showNumber(rowData.commissionPrice),
              },
              {
                title: "Total Charge",
                field: "deductedAmount",
                filtering: true,
                lookup: { ZEROS: "NO BALANCE", NONZEROS: "HAVE BALANCE" },
                render: (rowData) => {
                  const amount = Number(rowData.deductedAmount).toFixed(2);
                  return `₹ ${amount}`;
                },
                export: (rowData) => {
                  // Ensure the amount is formatted correctly for CSV
                  return Number(rowData.deductedAmount).toFixed(2); // or just return rowData.deductedAmount
                },
              },
              {
                title: "Duration",
                field: "durationInSeconds",
                filtering: false,
              },
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
                    {rowData?.endTime
                      ? rowData?.endTime &&
                        moment(rowData?.endTime).format("DD-MM-YY HH:mm A")
                      : "N/A"}
                  </div>
                ),
                export: (rowData) =>
                  moment(rowData.endTime).format("DD-MM-YYYY HH:mm A"),
              },
              {
                title: "Status",
                field: "status",
                lookup: {
                  COMPLETED: "COMPLETED",
                  REJECTED: "REJECTED",
                  ACCEPTED: "ACCEPTED",
                  CREATED: "CREATED",
                  ONGOING: "ON GOING",
                  TIMEOUT: "MISSED",
                },
              },
              {
                title: "View Chat History",
                filtering: false,
                render: (rowData) => (
                  <div
                    className={classes.statusButton}
                    style={{ backgroundColor: "#90EE90" }}
                    onClick={() => handleClickOpen(rowData)}
                  >
                    View Chat
                  </div>
                ),
              },
            ]}
            data={(query) =>
              new Promise((resolve, reject) => {
                let filters = {};
                query.filters.forEach((item) => {
                  if (item.value.length > 0) {
                    filters[item.column.field] = item.value[0];
                  }
                });

                dispatch(
                  HistoryActions.setChatHistoryApiPayload({
                    page: query.page + 1,
                    pageSize: query.pageSize,
                    filters: filters,
                    search: query.search,
                  })
                );

                if (
                  query.page === 0 &&
                  chatHistoryApiPayload &&
                  query.filters.length === 0
                ) {
                  filters = chatHistoryApiPayload?.filters;
                }

                console.log(query, "query");

                console.log({
                  page:
                    query.page == 0 && chatHistoryApiPayload
                      ? chatHistoryApiPayload?.page
                      : query.page + 1,
                  limit:
                    query.pageSize === 0
                      ? chatHistoryApiPayload
                        ? chatHistoryApiPayload?.pageSize
                        : 10
                      : query.pageSize,
                  ...filters,
                  search:
                    query.page == 0 &&
                    chatHistoryApiPayload &&
                    query.search.length == 0
                      ? chatHistoryApiPayload?.search
                      : query.search,
                });

                fetch(api_url + get_chat_history, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    page:
                      query.page == 0 && chatHistoryApiPayload
                        ? chatHistoryApiPayload?.page
                        : query.page + 1,
                    limit:
                      query.pageSize === 0
                        ? chatHistoryApiPayload
                          ? chatHistoryApiPayload?.pageSize
                          : 10
                        : query.pageSize,
                    ...filters,
                    search:
                      query.page == 0 &&
                      chatHistoryApiPayload &&
                      query.search.length == 0
                        ? chatHistoryApiPayload?.search
                        : query.search,
                  }),
                })
                  .then((response) => response.json())
                  .then((result) => {
                    const processedData = result?.data?.data.map((item) => ({
                      ...item,
                    }));

                    resolve({
                      data: processedData,
                      page: result?.data?.pagination?.currentPage - 1,
                      totalCount: result?.data?.pagination?.totalCount,
                    });
                  })
                  .catch((error) => reject(error));
              })
            }
            options={{
              ...propStyles.tableStyles,
              page: 2,
              paging: true,
              pageSize: 10,
              pageSizeOptions: [10, 20, 50, 100, 500, 1000],
              filtering: "true",
              exportButton: true,
            }}
            style={{ fontSize: "1rem" }}
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
                    HistoryActions.deleteChatHistory({
                      chatId: rowData?._id,
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
              <div className={classes.heading}>Chat History Data</div>
              <div onClick={handleClose} className={classes.closeButton}>
                <CloseRounded />
              </div>
            </div>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Chat ID"
              // value={data.chatId}
              value={transformTransactionId(data.transactionId)}
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
              label="Customer Phone Number"
              value={data.customerPhoneNumber}
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
              label="Request Time"
              value={data.requestTime}
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
              label="Chat Price"
              value={data.chatPrice}
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
              label="Max Duration"
              value={data.maxduration}
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
  chatHistoryData: state.history.chatHistoryData || [], // Default to empty array
  chatHistoryApiPayload: state.history.chatHistoryApiPayload, // Default to empty array
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(ChatHistory);
