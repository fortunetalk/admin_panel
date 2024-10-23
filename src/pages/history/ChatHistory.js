import React, { useEffect, useRef, useState } from "react";
import { useStyles, propStyles } from "../../assets/styles.js";
import {
  Grid,
  Button,
  TextField,
  Select,
  Avatar,
  InputLabel,
  MenuItem,
  FormControl,
  Checkbox,
  FormGroup,
  FormControlLabel,
  FormLabel,
  ListItemText,
  CircularProgress,
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
import { api_url, get_chat_history } from "../../utils/Constants.js";
import { CSVLink, CSVDownload } from "react-csv";
import DownloadIcon from "@mui/icons-material/Download";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const ChatHistory = ({
  dispatch,
  chatHistoryData,
  chatHistoryApiPayload,
  csvData,
  adminData,
}) => {
  const { user, type } = adminData || {};
  const classes = useStyles();
  const navigate = useNavigate();
  const tableRef = useRef(null);
  const [viewData, setViewData] = useState(false);
  const [review, setReview] = useState(false);
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
  const [showModal, setShowModal] = useState(false);
  const [searchDateModal, setSearchDateModal] = useState(false);
  const [searchType, setSearchType] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [isCustomSelected, setIsCustomSelected] = useState(false);
  const [customSelection, setCustomSelection] = useState(""); // State for custom dropdown selection
  const [singleDate, setSingleDate] = useState(""); // State for single date
  const [startDate, setStartDate] = useState(""); // State for start date
  const [endDate, setEndDate] = useState(""); // State for end date
  const [reviewData, setReviewData] = useState({
    chatReviewFromAdmin: "",
    chatConcernFromAdmin: "",
    chatHistoryId: "",
  }); // State for end date
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    onRefreshTable();
  }, [searchData]);

  const handleReview = (rowData) => {
    if (
      type === "subadmin" &&
      !user.permissions.customer?.chatHistory?.addReview
    ) {
      return;
    }
    setReview(true);
    setReviewData({
      chatReviewFromAdmin: rowData.chatReviewFromAdmin,
      chatConcernFromAdmin: rowData.chatConcernFromAdmin,
      chatHistoryId: rowData._id,
    });
  };

  const handleView = (rowData) => {
    if (
      type === "subadmin" &&
      !user.permissions.customer?.chatHistory?.viewChatHistoryData
    ) {
      return;
    }

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
      chatReviewFromAdmin: rowData?.chatReviewFromAdmin || "",
      chatConcernFromAdmin: rowData?.chatConcernFromAdmin || "",
    });
  };

  const openDownloadModal = () => {
    if (
      type === "subadmin" &&
      !user.permissions.customer?.chatHistory?.download
    ) {
      return;
    }
    setShowModal(true);
  };

  const openSearchDateModal = () => {
    setSearchDateModal(true);
  };

  function transformTransactionId(transactionId) {
    const parts = transactionId.split("fortunetalk");
    return `#FTCH${parts[1] || ""}`;
  }

  const handleClose = () => {
    setViewData(false);
    setShowModal(false);
    setReview(false);
    setSearchDateModal(false);
  };

  const handleFirstDropdownChange = (event) => {
    const value = event.target.value;
    setSearchType(value);
    setIsCustomSelected(value === "Custom");
    // Reset custom selection and dates when changing the main dropdown
    setCustomSelection("");
    setSingleDate("");
    setStartDate("");
    setEndDate("");
  };

  const handleCustomDropdownChange = (event) => {
    const value = event.target.value;
    setCustomSelection(value);
    // Reset dates when changing custom selection
    setSingleDate("");
    setStartDate("");
    setEndDate("");
  };

  // Your existing handleDownload remains unchanged
  const handleGet = () => {
    try {
      if (!searchType) {
        alert("Please select a search type."); // You can replace this with a more user-friendly notification
        return; // Prevent further execution if searchType is not selected
      }

      let searchDate = "";

      if (singleDate) {
        searchDate = singleDate; // Only send singleDate
      } else if (startDate && endDate) {
        searchDate = `${startDate},${endDate}`; // Send startDate and endDate
      }

      const payload = {
        searchType: searchType,
        searchDate: searchDate, // This will be an empty string if neither condition is met
      };

      console.log("payload", payload);
      dispatch(HistoryActions.getDownloadChatHistory({ payload }));
    } catch (e) {
      console.log(e);
    }
  };

  const handleDateSearch = () => {
    try {
      if (!searchType) {
        alert("Please select a search type.");
        return;
      }

      let searchDate = "";

      if (singleDate) {
        searchDate = moment(singleDate).format("DD-MM-YYYY"); // Only send singleDate
      } else if (startDate && endDate) {
        searchDate = `${moment(startDate).format("DD-MM-YYYY")},${moment(
          endDate
        ).format("DD-MM-YYYY")}`; // Send startDate and endDate
      }

      const searchData = {
        searchType: searchType,
        searchDate: searchDate,
      };

      // Store searchData in state
      console.log("searchData", {
        ...chatHistoryApiPayload,
        searchType,
        searchDate,
      });
      if (chatHistoryApiPayload) {
        dispatch(
          HistoryActions.setChatHistoryApiPayload({
            ...chatHistoryApiPayload,
            searchType,
            searchDate,
          })
        );
      }
      setSearchData(searchData);
      handleClose();

      // Optionally, close the modal here
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpdateReview = () => {
    console.log("hiii handleUpdateReview", reviewData);
    try {
      dispatch(
        HistoryActions.updateAdminChatReview({ reviewData, onRefreshTable })
      );
      setReview(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleClickOpen = (rowData) => {
    if (
      type === "subadmin" &&
      !user.permissions.customer?.chatHistory?.viewChatMessages
    ) {
      return;
    }
    navigate(`/history/fullChatHistory/${rowData.customerId}`, {
      state: { chatId: rowData.chatId },
    });
  };

  const onRefreshTable = () => {
    tableRef.current && tableRef.current.onQueryChange();
  };

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        {displayTable()}
        {editModal()}
        {downloadModal()}
        {reviewModal()}
        {searchByDateModal()}
      </div>
    </div>
  );

  function displayTable() {
    return (
      <Grid container spacing={1}>
        <Grid item lg={12} sm={12} md={12} xs={12}>
          <MaterialTable
            tableRef={tableRef}
            title={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    fontWeight: "500",
                    fontSize: "25px",
                    marginRight: "20px", // This adds space to the right of the title
                  }}
                >
                  Chat History
                </span>
                <button
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#10395D",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    marginLeft: "20px", // This adds space to the left of the button
                    display: "flex",
                    alignItems: "center", // Center the icon and text vertically
                  }}
                  onClick={openDownloadModal}
                >
                  <DownloadIcon
                    style={{ marginRight: "8px", color: "white" }}
                  />{" "}
                  {/* Add icon here */}
                  Download CSV
                </button>
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
                defaultFilter: chatHistoryApiPayload?.filters?.deductedAmount
                  ? [chatHistoryApiPayload?.filters?.deductedAmount]
                  : [],
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
              // {
              //   title: "Duration",
              //   field: "durationInSeconds",
              //   filtering: false,
              // },
              {
                title: "Duration",
                field: "durationInSeconds",
                filtering: false,
                render: (rowData) => {
                  const duration = moment.duration(
                    rowData.durationInSeconds,
                    "seconds"
                  );
                  const hours = Math.floor(duration.asHours());
                  const minutes = duration.minutes();
                  const seconds = duration.seconds();

                  return `${minutes}m : ${seconds}s`;
                },
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
                filtering: true,
                filterComponent: (props) => {
                  console.log(props);
                  return (
                    <button
                      style={{
                        padding: "8px 16px",
                        backgroundColor: "#10395D",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        marginLeft: "20px", // This adds space to the left of the button
                        display: "flex",
                        alignItems: "center", // Center the icon and text vertically
                      }}
                      onClick={openSearchDateModal}
                    >
                      <CalendarTodayIcon
                        style={{ marginRight: "8px", color: "white" }}
                      />
                      Filter
                    </button>
                  );
                },
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
                title: "Review-Rating ",
                field: "chatReviewFromAdmin",
                filtering: false,
              },
              {
                title: "Review-Concern ",
                field: "chatConcernFromAdmin",
                filtering: false,
              },
              // {
              //   title: "Status",
              //   field: "status",
              //   // defaultFilter: chatHistoryApiPayload?.filters?.status ? [chatHistoryApiPayload?.filters?.status] : [],
              //   lookup: {
              //     COMPLETED: "COMPLETED",
              //     REJECTED: "REJECTED",
              //     ACCEPTED: "ACCEPTED",
              //     CREATED: "CREATED",
              //     ONGOING: "ON GOING",
              //     TIMEOUT: "MISSED",
              //     CUSTOMER_NOT_AVAILABLE: "CUSTOMER NOT AVAILABLE",
              //   },
              // },

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
                  CUSTOMER_NOT_AVAILABLE: "CUSTOMER NOT AVAILABLE",
                },
                render: (rowData) => {
                  const status = rowData?.status;
                  let color;

                  switch (status) {
                    case "ONGOING":
                      color = "green";
                      break;
                    case "REJECTED":
                    case "CANCELLED":
                      color = "red";
                      break;
                    case "COMPLETED":
                      color = "purple";
                      break;
                    default:
                      color = "black"; // Default color for other statuses
                      break;
                  }

                  return <span style={{ color }}>{status}</span>;
                },
              },
              {
                title: "View Chat History",
                field: "viewChat",
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

                if (!(query.page === 0 && chatHistoryApiPayload)) {
                  dispatch(
                    HistoryActions.setChatHistoryApiPayload({
                      page: query.page + 1,
                      pageSize: query.pageSize,
                      filters: filters,
                      search: query.search,
                    })
                  );
                } else {
                }
                if (
                  query.page === 0 &&
                  chatHistoryApiPayload &&
                  query.filters.length === 0
                ) {
                  filters = chatHistoryApiPayload?.filters;
                }

                console.log(query, "query");
                console.log(chatHistoryApiPayload, "chatHistoryApiPayload");

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
                    searchType: chatHistoryApiPayload?.searchType || "",
                    searchDate: chatHistoryApiPayload?.searchDate || "",
                  }),
                })
                  .then((response) => response.json())
                  .then((result) => {
                    console.log(result?.data);
                    if (
                      result?.data?.data.length == 0 &&
                      result?.data?.pagination?.currentPage != 1
                    ) {
                      onRefreshTable();
                      resolve({
                        data: result?.data?.data,
                        page: 0,
                        totalCount: result?.data?.pagination?.totalCount,
                      });
                    }
                    resolve({
                      data: result?.data?.data,
                      page: result?.data?.pagination?.currentPage - 1,
                      totalCount: result?.data?.pagination?.totalCount,
                    });
                  })
                  .catch((error) => reject(error));
              })
            }
            options={{
              ...propStyles.tableStyles,
              paging: true,
              pageSize: chatHistoryApiPayload
                ? chatHistoryApiPayload?.pageSize
                : 10,
              pageSizeOptions: [10, 20, 50, 100, 500, 1000],
              filtering: "true",
              // exportButton: true,
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
                onClick: (event, rowData) => {
                  if (
                    type === "subadmin" &&
                    !user.permissions.customer?.chatHistory?.delete
                  ) {
                    return;
                  }
                  dispatch(
                    HistoryActions.deleteChatHistory({ chatId: rowData?._id })
                  );
                },
              },
              {
                icon: "add",
                tooltip: "Add review",
                onClick: (event, rowData) => handleReview(rowData),
              },
              // {
              //   icon: "download",
              //   tooltip: "Download Chat History",
              //   onClick: (event, rowData) => openDownloadModal(rowData),
              // },
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

  function downloadModal() {
    const showDownloadForm = () => {
      return (
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>Download CSV</div>
              <div onClick={handleClose} className={classes.closeButton}>
                <CloseRounded />
              </div>
            </div>
          </Grid>

          <Grid item lg={12} md={12} sm={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="first-dropdown-label">CSV Download</InputLabel>
              <Select
                labelId="first-dropdown-label"
                id="first-dropdown"
                value={searchType}
                onChange={handleFirstDropdownChange}
              >
                <MenuItem disabled value="">
                  -Select Option-
                </MenuItem>
                {/* <MenuItem value="Custom">Custom</MenuItem> */}
                <MenuItem value="single">Single</MenuItem>
                <MenuItem value="between">Between</MenuItem>
                <MenuItem value="oneMonth">1 Month</MenuItem>
                <MenuItem value="threeMonths">3 Months</MenuItem>
                <MenuItem value="sixMonths">6 Months</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* {isCustomSelected && (
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="custom-dropdown-label">Custom</InputLabel>
              <Select
                labelId="custom-dropdown-label"
                id="custom-dropdown"
                value={customSelection}
                onChange={handleCustomDropdownChange}
              >
                <MenuItem disabled value="">
                  -Select Option-
                </MenuItem>
                <MenuItem value="Single">Single</MenuItem>
                <MenuItem value="Between">Between</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        )} */}

          {searchType === "single" && (
            <Grid item lg={12} sm={12} md={6} xs={12}>
              <TextField
                type="date"
                value={singleDate}
                variant="outlined"
                fullWidth
                onChange={(event) => setSingleDate(event.target.value)}
                inputProps={{
                  min: "1900-01-01", // Set a minimum date as needed
                  max: new Date().toISOString().split("T")[0], // Prevent future date selection
                }}
              />
            </Grid>
          )}

          {searchType === "between" && (
            <>
              <Grid item lg={6} sm={12} md={6} xs={12}>
                <TextField
                  type="date"
                  label="From"
                  value={startDate}
                  variant="outlined"
                  fullWidth
                  onChange={(event) => setStartDate(event.target.value)}
                  inputProps={{
                    min: "1900-01-01", // Set a minimum date as needed
                    max: new Date().toISOString().split("T")[0], // Prevent future date selection
                  }}
                  InputLabelProps={{
                    shrink: true, // This keeps the label at the top
                  }}
                />
              </Grid>
              <Grid item lg={6} sm={12} md={6} xs={12}>
                <TextField
                  type="date"
                  label="To"
                  value={endDate}
                  variant="outlined"
                  fullWidth
                  onChange={(event) => setEndDate(event.target.value)}
                  inputProps={{
                    min: "1900-01-01", // Set a minimum date as needed
                    max: new Date().toISOString().split("T")[0], // Prevent future date selection
                  }}
                  InputLabelProps={{
                    shrink: true, // This keeps the label at the top
                  }}
                />
              </Grid>
            </>
          )}

          <Grid item lg={4} sm={6} md={6} xs={6}>
            <div onClick={handleGet} className={classes.submitbutton}>
              {isLoading ? <CircularProgress size={24} /> : " Submit"}
              {/* Submit */}
            </div>
          </Grid>
          {csvData && (
            <Grid item lg={4} sm={6} md={6} xs={6}>
              <div className={classes.submitbutton}>
                <CSVLink style={{ color: "white" }} data={csvData}>
                  Download
                </CSVLink>
              </div>
            </Grid>
          )}
          <Grid item lg={4} sm={6} md={6} xs={6}>
            <div onClick={handleClose} className={classes.denyButton}>
              Cancel
            </div>
          </Grid>
        </Grid>
      );
    };

    return (
      <div>
        <Dialog open={showModal}>
          <DialogContent>{showDownloadForm()}</DialogContent>
        </Dialog>
      </div>
    );
  }

  function searchByDateModal() {
    const searchDateform = () => {
      return (
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>Search By Date </div>
              <div onClick={handleClose} className={classes.closeButton}>
                <CloseRounded />
              </div>
            </div>
          </Grid>

          <Grid item lg={12} md={12} sm={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="first-dropdown-label">CSV Download</InputLabel>
              <Select
                labelId="first-dropdown-label"
                id="first-dropdown"
                value={searchType}
                onChange={handleFirstDropdownChange}
              >
                <MenuItem disabled value="">
                  -Select Option-
                </MenuItem>
                {/* <MenuItem value="Custom">Custom</MenuItem> */}
                <MenuItem value="single">Single</MenuItem>
                <MenuItem value="between">Between</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {searchType === "single" && (
            <Grid item lg={12} sm={12} md={6} xs={12}>
              <TextField
                type="date"
                value={singleDate}
                variant="outlined"
                fullWidth
                onChange={(event) => setSingleDate(event.target.value)}
                inputProps={{
                  min: "1900-01-01", // Set a minimum date as needed
                  max: new Date().toISOString().split("T")[0], // Prevent future date selection
                }}
              />
            </Grid>
          )}

          {searchType === "between" && (
            <>
              <Grid item lg={6} sm={12} md={6} xs={12}>
                <TextField
                  type="date"
                  value={startDate}
                  variant="outlined"
                  fullWidth
                  onChange={(event) => setStartDate(event.target.value)}
                  inputProps={{
                    min: "1900-01-01", // Set a minimum date as needed
                    max: new Date().toISOString().split("T")[0], // Prevent future date selection
                  }}
                />
              </Grid>
              <Grid item lg={6} sm={12} md={6} xs={12}>
                <TextField
                  type="date"
                  value={endDate}
                  variant="outlined"
                  fullWidth
                  onChange={(event) => setEndDate(event.target.value)}
                  inputProps={{
                    min: "1900-01-01", // Set a minimum date as needed
                    max: new Date().toISOString().split("T")[0], // Prevent future date selection
                  }}
                />
              </Grid>
            </>
          )}

          <Grid item lg={6} sm={6} md={6} xs={6}>
            <div onClick={handleDateSearch} className={classes.submitbutton}>
              {isLoading ? <CircularProgress size={24} /> : " Submit"}
              {/* Submit */}
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
        <Dialog open={searchDateModal}>
          <DialogContent>{searchDateform()}</DialogContent>
        </Dialog>
      </div>
    );
  }

  function reviewModal() {
    const reviewForm = () => {
      return (
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>Add Review </div>
              <div onClick={handleClose} className={classes.closeButton}>
                <CloseRounded />
              </div>
            </div>
          </Grid>

          <Grid item lg={12} md={12} sm={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="first-dropdown-label">Rating</InputLabel>
              <Select
                labelId="first-dropdown-label"
                id="first-dropdown"
                value={reviewData?.chatReviewFromAdmin}
                onChange={(event) =>
                  setReviewData((prev) => {
                    const updatedData = { ...prev };
                    updatedData.chatReviewFromAdmin = event.target.value;
                    return updatedData;
                  })
                }
              >
                <MenuItem disabled value="">
                  -Select Option-
                </MenuItem>
                <MenuItem value="Poor">Poor</MenuItem>
                <MenuItem value="Average">Average</MenuItem>
                <MenuItem value="Good">Good</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="first-dropdown-label">Concern</InputLabel>
              <Select
                labelId="first-dropdown-label"
                id="first-dropdown"
                value={reviewData?.chatConcernFromAdmin}
                onChange={(event) =>
                  setReviewData((prev) => {
                    const updatedData = { ...prev };
                    updatedData.chatConcernFromAdmin = event.target.value;
                    return updatedData;
                  })
                }
              >
                <MenuItem disabled value="">
                  -Select Option-
                </MenuItem>
                <MenuItem value="Marriage">Marriage</MenuItem>
                <MenuItem value="Career">Career</MenuItem>
                <MenuItem value="Buisness">Buisness</MenuItem>
                <MenuItem value="Relationship">Relationship</MenuItem>
                <MenuItem value="Education">Education</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item lg={6} sm={6} md={6} xs={6}>
            <div onClick={handleUpdateReview} className={classes.submitbutton}>
              {/* {isLoading ? <CircularProgress size={24} /> : " Submit"} */}
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
        <Dialog open={review}>
          <DialogContent>{reviewForm()}</DialogContent>
        </Dialog>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  chatHistoryData: state.history.chatHistoryData || [], // Default to empty array
  chatHistoryApiPayload: state.history.chatHistoryApiPayload, // Default to empty array
  csvData: state.history.csvData,
  adminData: state.admin.adminData,
  isLoading: state.astrologer.isLoading,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(ChatHistory);
