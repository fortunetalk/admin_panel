import React, { useEffect, useState } from "react";
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
import { api_url, get_call_history } from "../../utils/Constants.js";
import { CSVLink, CSVDownload } from "react-csv";
import DownloadIcon from '@mui/icons-material/Download';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const ChatHistory = ({ dispatch, callHistoryData, csvCallData, adminData }) => {
  const { user, type } = adminData || {};
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

  const [showModal, setShowModal] = useState(false);
  const [searchDateModal, setSearchDateModal] = useState(false);
  const [searchType, setSearchType] = useState("");
  const [isCustomSelected, setIsCustomSelected] = useState(false);
  const [customSelection, setCustomSelection] = useState(""); // State for custom dropdown selection
  const [singleDate, setSingleDate] = useState(""); // State for single date
  const [startDate, setStartDate] = useState(""); // State for start date
  const [endDate, setEndDate] = useState(""); // State for end date
  const [review, setReview] = useState(false);
  const [searchData, setSearchData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [reviewData, setReviewData] = useState({
    callReviewFromAdmin: '',
    callConcernFromAdmin:'',
    callHistoryId: '',
  });

  // useEffect(function () {
  //   dispatch(HistoryActions.getCallHistory());
  // }, []);

  const handleReview = (rowData) => {

    if (type === "subadmin" && !user.permissions.customer?.callHistory?.addReview) {
      return;
    }

    setReview(true);
    setReviewData({
      callReviewFromAdmin: rowData.callReviewFromAdmin,
      callConcernFromAdmin: rowData.callConcernFromAdmin,
      callHistoryId: rowData._id
    })
  };

  const openSearchDateModal = () => {
    setSearchDateModal(true);
  };

  const handleUpdateReview = () => {
    
    console.log("hiii handleUpdateReview",reviewData)
    try {
      dispatch(HistoryActions.updateAdminCallReview({reviewData}));
      setReview(false);
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

      let searchDate = '';

      if (singleDate) {
        searchDate = singleDate; // Only send singleDate
      } else if (startDate && endDate) {
        searchDate = `${startDate},${endDate}`; // Send startDate and endDate
      }

      const searchData = {
        searchType: searchType,
        searchDate: searchDate
      };

      setSearchData(searchData); // Store searchData in state
      console.log("searchData", searchData);
      // Optionally, close the modal here
      handleClose();
    } catch (e) {
      console.log(e);
    }
  };


  const handleView = (rowData) => {
    if (type === "subadmin" && !user.permissions.customer?.callHistory?.viewCallHistoryData) {
      return;
    }

    setViewData(true);
    setData({
      transactionId: rowData?.transactionId || "",
      customerId: rowData?.customerId?._id || "",
      astrologerId: rowData?.astrologerId?._id || "",
      customerName: `${rowData?.customerId?.firstName} ${rowData?.customerId?.lastName}` ||  "",
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
      callReviewFromAdmin: rowData?.callReviewFromAdmin || "",
      callConcernFromAdmin: rowData?.callConcernFromAdmin || "",
    });
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

  const openDownloadModal = () => {
    if (type === "subadmin" && !user.permissions.customer?.callHistory?.download) {
      return;
    }
    setShowModal(true);
  };

  const handleClose = () => {
    setViewData(false);
    setShowModal(false);
    setReview(false);
    setSearchDateModal(false);

  };

  const handleGet = () => {
    try {
      if (!searchType) {
        alert("Please select a search type."); // You can replace this with a more user-friendly notification
        return; // Prevent further execution if searchType is not selected
      }

      let searchDate = '';

      if (singleDate) {
        searchDate = singleDate; // Only send singleDate
      } else if (startDate && endDate) {
        searchDate = `${startDate},${endDate}`; // Send startDate and endDate
      }

      const payload = {
        searchType: searchType,
        searchDate: searchDate // This will be an empty string if neither condition is met
      };

      console.log("payload", payload);
      dispatch(HistoryActions.getDownloadCallHistory({ payload }));
    } catch (e) {
      console.log(e);
    }

  };

  const handleCustomDropdownChange = (event) => {
    const value = event.target.value;
    setCustomSelection(value);
    // Reset dates when changing custom selection
    setSingleDate("");
    setStartDate("");
    setEndDate("");
  };


  const reverseData = Array.isArray(callHistoryData)
    ? callHistoryData.slice().reverse()
    : [];

  function transformTransactionId(transactionId) {
    const parts = transactionId.split("fortunetalk");
    return `#FTCA${parts[1] || ""}`;
  }

  return (
    <div className={classes.container}>
      {
        <div className={classes.box}>
          {displayTable()}
          {editModal()}
          {downloadModal()}
          {reviewModal()}
          {searchByDateModal()}
        </div>
      }
    </div>
  );
  function displayTable() {
    return (
      <Grid container spacing={1}>
        <Grid item lg={12} sm={12} md={12} xs={12}>
          <MaterialTable
            // title={
            //   <div>
            //     <span
            //       style={{
            //         fontWeight: "500",
            //         fontSize: "25px",
            //         marginRight: "20px",
            //       }}
            //     >
            //       Call History
            //     </span>
            //   </div>
            // }
            title={
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span
                  style={{
                    fontWeight: "500",
                    fontSize: "25px",
                    marginRight: "20px", // This adds space to the right of the title
                  }}
                >
                  Call History
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
                  <DownloadIcon style={{ marginRight: "8px", color: "white" }} /> {/* Add icon here */}
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

              //   { title: "Call ID", field: "_id" },
              {
                title: "Call-Id",
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
                title: "Commission Price",
                field: "commissionPrice",
                filtering: false,
                render: (rowData) => showNumber(rowData.commissionPrice),
              },

              {
                title: "Deducted Amount",
                field: "deductedAmount",
                filtering: true,
                lookup: { ZEROS: "NO BALANCE", NONZEROS: "HAVE BALANCE" },
                render: (rowData) => {
                  const balance = Number(rowData.deductedAmount).toFixed(2);
                  return balance;
                },
              },
              {
                title: "Duration",
                filtering: false,
                render: (rowData) => (
                  <div>
                    {(rowData?.durationInSeconds &&
                      secondsToHMS(rowData?.durationInSeconds)) ||
                      "N/A"}
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
                filter:'true',
                filterComponent: (props) => {
                  console.log(props)
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

                      <CalendarTodayIcon style={{ marginRight: "8px", color: "white" }} />
                      Filter
                    </button>
                  )
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
                field: "callReviewFromAdmin",
                filtering: false,
              },
              {
                title: "Review-Concern ",
                field: "callConcernFromAdmin",
                filtering: false,
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
                    CANCELLED: "CANCELLED",
                },
                render: (rowData) => {
                    const status = rowData?.status;
                    let color;
            
                    switch (status) {
                        case "ONGOING":
                            color = 'green';
                            break;
                        case "REJECTED":
                        case "CANCELLED":
                            color = 'red';
                            break;
                        case "COMPLETED":
                            color = 'purple';
                            break;
                        default:
                            color = 'black'; // Default color for other statuses
                            break;
                    }
            
                    return (
                        <span style={{ color }}>
                            {status}
                        </span>
                    );
                }
            },
            ]}
            // data={reverseData}

            data={(query) =>
              new Promise((resolve, reject) => {
                console.log("Query:", query);
                const filters = {};

                query.filters.forEach((item) => {
                  if (item.value.length > 0) {
                    filters[item.column.field] = item.value[0];
                  }
                });

                console.log("Filters:", filters);

                fetch(api_url + get_call_history, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    page: query.page + 1,
                    limit: query.pageSize === 0 ? 10 : query.pageSize,
                    ...filters,
                    search: query.search,
                  }),
                })
                  .then((response) => response.json())
                  .then((result) => {
                    console.log("Fetch Result:", result.data);
                    resolve({
                      data: result.data.data,
                      page: result.data.pagination.currentPage - 1,
                      totalCount: result.data.pagination.totalCount,
                    });
                  })
                  .catch((error) => {
                    console.error("Fetch Error:", error);
                    reject(error);
                  });
              })
            }
            options={{
              ...propStyles.tableStyles,
              paging: true,
              pageSize: 10,
              pageSizeOptions: [10, 20, 50, 100, 500, 1000],
              filtering: "true",
            }}
            style={{ fontSize: "1.0rem" }}
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
                    !user.permissions.customer?.callHistory?.delete
                  ) {
                    return;
                  }
                  dispatch( HistoryActions.deleteCallHistory({ callId: rowData?._id, }) );
                },
              },
              {
                icon: "add",
                tooltip: "Add review",
                onClick: (event, rowData) => handleReview(rowData),
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
                <MenuItem value="Single">Single</MenuItem>
                <MenuItem value="Between">Between</MenuItem>
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

          {searchType === "Single" && (
            <Grid item lg={12} sm={12} md={6} xs={12}>
              <TextField
                type="date"
                value={singleDate}
                variant="outlined"
                fullWidth
                onChange={(event) => setSingleDate(event.target.value)}
                inputProps={{
                  min: '1900-01-01', // Set a minimum date as needed
                  max: new Date().toISOString().split("T")[0], // Prevent future date selection
                }}
              />
            </Grid>
          )}

          {searchType === "Between" && (
            <>
              <Grid item lg={6} sm={12} md={6} xs={12}>
                <TextField
                  type="date"
                  value={startDate}
                  variant="outlined"
                  fullWidth
                  onChange={(event) => setStartDate(event.target.value)}
                  inputProps={{
                    min: '1900-01-01', // Set a minimum date as needed
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
                    min: '1900-01-01', // Set a minimum date as needed
                    max: new Date().toISOString().split("T")[0], // Prevent future date selection
                  }}
                />
              </Grid>
            </>
          )}

          <Grid item lg={4} sm={6} md={6} xs={6}>
            <div onClick={handleGet} className={classes.submitbutton}>
              Submit
            </div>
          </Grid>
          {csvCallData && (
            <Grid item lg={4} sm={6} md={6} xs={6}>
              {/* <div onClick={handleDownload} className={classes.submitbutton}>
            Download
          </div> */}
              <div className={classes.submitbutton}>
                <CSVLink style={{ color: 'white', }} data={csvCallData} >Download</CSVLink>
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
                value={reviewData?.callReviewFromAdmin}
                onChange={(event) => setReviewData(prev=>{
                  const updatedData = {...prev};
                  updatedData.callReviewFromAdmin = event.target.value;
                  return updatedData;
                })} 
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
                value={reviewData?.callConcernFromAdmin}
                onChange={(event) => setReviewData(prev=>{
                  const updatedData = {...prev};
                  updatedData.callConcernFromAdmin = event.target.value;
                  return updatedData;
                })} 
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
                <MenuItem value="Single">Single</MenuItem>
                <MenuItem value="Between">Between</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {searchType === "Single" && (
            <Grid item lg={12} sm={12} md={6} xs={12}>
              <TextField
                type="date"
                value={singleDate}
                variant="outlined"
                fullWidth
                onChange={(event) => setSingleDate(event.target.value)}
                inputProps={{
                  min: '1900-01-01', // Set a minimum date as needed
                  max: new Date().toISOString().split("T")[0], // Prevent future date selection
                }}
              />
            </Grid>
          )}

          {searchType === "Between" && (
            <>
              <Grid item lg={6} sm={12} md={6} xs={12}>
                <TextField
                  type="date"
                  value={startDate}
                  variant="outlined"
                  fullWidth
                  onChange={(event) => setStartDate(event.target.value)}
                  inputProps={{
                    min: '1900-01-01', // Set a minimum date as needed
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
                    min: '1900-01-01', // Set a minimum date as needed
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

};



const mapStateToProps = (state) => ({
  callHistoryData: state.history.callHistoryData,
  csvCallData: state.history.csvCallData,
  adminData: state.admin.adminData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(ChatHistory);
