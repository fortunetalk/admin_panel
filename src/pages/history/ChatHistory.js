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

  const [filter, setFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    dispatch(HistoryActions.getChatHistory());
  }, [dispatch]);

  useEffect(()=>{

  }, [chatHistoryApiPayload])

  const handleView = (rowData) => {
    setViewData(true);
    setData({
      transactionId: rowData?.transactionId || "",
      customerId: rowData?.customerId?._id || "",
      astrologerId: rowData?.astrologerId?._id || "",
      customerName: rowData?.customerId?.firstName || "",
      customerPhoneNumber: rowData?.customerId?.phoneNumber || "",
      customerEmail: rowData?.customerId?.email || "",
      astrologerName: rowData?.astrologerId?.name || "",
      astrologerDisplayName: rowData?.astrologerId?.displayName || "",
      astrologerEmail: rowData?.astrologerId?.email || "",
      requestTime: new Date(rowData?.createdAt).toLocaleString() || "",
      startTime: new Date(rowData?.startTime).toLocaleString() || "",
      endTime: new Date(rowData?.endTime).toLocaleString() || "",
      durationInSeconds: rowData?.durationInSeconds || "",
      chatPrice: rowData?.chatPrice || "",
      commissionPrice: rowData?.commissionPrice || "",
      status: rowData?.status || "",
      deductedAmount: rowData?.deductedAmount || "",
      maxduration: rowData?.maxduration || "",
      chatId: rowData?.chatId || "",
    });
  };

  const handleClose = () => {
    setViewData(false);
  };

  const handleClickOpen = (rowData) => {
    navigate(`/history/fullChatHistory/${rowData.customerId}`, { state: { chatId: rowData.chatId } })
  };

  const filterOptions = chatHistoryData && Array.isArray(chatHistoryData)
    ? Array.from(new Set(chatHistoryData.map(data => data.astrologerId?.displayName || '')))
    : [];

  const statusOptions = chatHistoryData && Array.isArray(chatHistoryData)
    ? Array.from(new Set(chatHistoryData.map(data => data.status || '')))
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
                <span style={{ fontWeight: '500', fontSize: '25px', marginRight: '20px' }}>Chat History</span>
              </div>
            }

            columns={[
              // {
              //   title: "S.No",
              //   editable: "never",
              //   render: (rowData) => rowData.tableData.id + 1,
              // },
              
              {
                title: "Transaction Id",
                field: "transactionId",
                filtering: false,
                render: (rowData) => {
                    const originalId = rowData.transactionId || "";
                    const uniquePart = originalId.replace("fortunetalk", ""); // Remove common part
                    return `FT${uniquePart}`; // Prepend "ft"
                },
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
              // {
              //   title: "Customer Name",
              //   render: (rowData) => {
              //     const firstName = rowData?.customerId?.firstName || "";
              //     const lastName = rowData?.customerId?.lastName || "";
              //     return `${firstName} ${lastName}`;
              //   }
              // },
              {
                title: "Customer Phone Number",
                render: (rowData) => {
                  const phoneNumber = rowData?.phoneNumber || "";
                  return `${phoneNumber}`;
                }
              },
              { title: "Chat Price", field: "chatPrice", filtering: false, 
                render: (rowData) => showNumber(rowData.chatPrice),
              },
              { title: "Commission Price", field: "commissionPrice", filtering: false,
                render: (rowData) => showNumber(rowData.commissionPrice),
               },
              // { title: "Total Charge", field: "deductedAmount" },
              {
                title: "Total Charge",
                field: "deductedAmount",
                filtering: true,
                lookup: { ZEROS: "NO BALANCE", NONZEROS: "HAVE BALANCE", },
                render: rowData => {
                  const amount = Number(rowData.deductedAmount).toFixed(2);
                  return `₹ ${amount}`;
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
                title: "Request Time",
                render: (rowData) => (
                  <div>
                    {rowData?.createdAt
                      ? moment(rowData?.createdAt).format("DD-MM-YYYY HH:mm:ss A")
                      : "N/A"}
                  </div>
                ),
              },
              {
                title: "Start Time",
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
                render: (rowData) => (
                  <div>
                    {rowData?.endTime ? rowData?.endTime &&
                      moment(rowData?.endTime).format("DD-MM-YY HH:mm A")
                      : "N/A"}
                  </div>
                ),
              },
              { title: "Status", field: "status", lookup: { COMPLETED: "COMPLETED", REJECTED: "REJECTED", ACCEPTED: "ACCEPTED", CREATED: "CREATED", ONGOING: "ON GOING" }, },
              {
                title: "View Chat History",
                field: "status",
                filtering: false,
                render: rowData => (
                  <div className={classes.statusButton}
                    style={{ backgroundColor: '#90EE90' }}
                    onClick={() => handleClickOpen(rowData)}>
                    View Chat
                  </div>
                )
              },
            ]}


            data={query =>
              new Promise((resolve, reject) => {
                console.log("query", query.filters);
                const filters = {}

                query.filters.map(item => {
                  if (item.value.length > 0) {
                    filters[item.column.field] = item.value[0]
                  }
                })

                console.log("chatHistoryApiPayload", chatHistoryApiPayload)

                fetch(api_url + get_chat_history, {
                  method: 'POST', // Specify the request method
                  headers: {
                    'Content-Type': 'application/json', // Set the content type to JSON
                  },
                  body: JSON.stringify(chatHistoryApiPayload ?? {
                    page: 1, // MaterialTable uses 0-indexed pages
                    limit: query.pageSize === 0 ? 10 : query.pageSize,
                    ...filters, // Include processed filters
                    search: query.search,
                  }), // Convert the request body to JSON
                })
                  .then(response => response.json())
                  .then(result => {
                    console.log(result)
                    dispatch(HistoryActions.setChatHistoryApiPayload({
                      page: query.page + 1, // MaterialTable uses 0-indexed pages
                      limit: query.pageSize === 0 ? 10 : query.pageSize,
                      ...filters, // Include processed filters
                      search: query.search,
                    }))
                    resolve({
                      data: result.data.data, // Adjust based on your API response
                      page: result.data.pagination.currentPage - 1, // Adjust for 0-indexed pages
                      totalCount: result.data.pagination.totalCount, // Total number of rows
                    })
                  })
              })
            }

            options={{ ...propStyles.tableStyles, paging: true, pageSize: 10, pageSizeOptions: [10, 20, 50, 100], filtering: 'true' }}
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
              value={data.chatId}
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
  chatHistoryData: state.history.chatHistoryData || [],  // Default to empty array
  chatHistoryApiPayload: state.history.chatHistoryApiPayload,  // Default to empty array

});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(ChatHistory);
