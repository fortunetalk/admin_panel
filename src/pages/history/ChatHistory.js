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
import { secondsToHMS } from "../../utils/services.js";
import moment from "moment";
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import axios from "axios";

// FilterDropdown Component
const FilterDropdown = ({ onFilterChange, options, label }) => {
  const [filter, setFilter] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    setFilter(value);
    onFilterChange(value);
  };

  return (
    <FormControl variant="outlined" style={{ minWidth: 120 }}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={filter}
        onChange={handleChange}
        label={label}
      >
        <MenuItem value="">All</MenuItem>
        {options.map((option, index) => (
          <MenuItem key={index} value={option}>{option}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const StatusFilterDropdown = ({ onFilterChange, options }) => {
  const [statusFilter, setStatusFilter] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    setStatusFilter(value);
    onFilterChange(value);
  };

  return (
    <FormControl variant="outlined" style={{ minWidth: 120 }}>
       <InputLabel >Status</InputLabel>
       {/* <InputLabel style={{ color: 'black', fontSize:'px'}}>Status</InputLabel> */}
      <Select
        value={statusFilter}
        onChange={handleChange}
        label="Status"
      >
        <MenuItem value="">All</MenuItem>
        {options.map((option, index) => (
          <MenuItem key={index} value={option}>{option}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const ChatHistory = ({ dispatch, chatHistoryData }) => {
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
    navigate(`/history/fullChatHistory/${rowData.customerId._id}`, { state: { chatId: rowData.chatId } })
  };

  const filterOptions = chatHistoryData && Array.isArray(chatHistoryData)
    ? Array.from(new Set(chatHistoryData.map(data => data.astrologerId?.displayName || '')))
    : [];

  const statusOptions = chatHistoryData && Array.isArray(chatHistoryData)
    ? Array.from(new Set(chatHistoryData.map(data => data.status || '')))
    : [];

  const reverseData = Array.isArray(chatHistoryData) ? chatHistoryData.slice().reverse() : [];
  const filteredData = reverseData.filter(rowData => 
    (filter === '' || rowData.astrologerId?.displayName === filter) &&
    (statusFilter === '' || rowData.status === statusFilter)
  );

  return (
    <div className={classes.container}>
      {
        !chatHistoryData ? <CircularProgress /> :
        chatHistoryData.length === 0 ? <p>No chat history available.</p> :
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
                <span style={{fontWeight:'500', fontSize:'25px', marginRight:'20px'}}>Chat History</span>
                <StatusFilterDropdown
                  onFilterChange={(value) => setStatusFilter(value)}
                  options={statusOptions}
                />
              </div>
            }
            // data={filteredData}
            columns={[
              {
                title: "S.No",
                editable: "never",
                render: (rowData) =>rowData.tableData.id+1,
              },
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
              {
                title: "Customer Phone Number",
                render: (rowData) => {
                  const phoneNumber = rowData?.customerId?.phoneNumber || "";
                  return `${phoneNumber}`;
                }
              },
              { title: "Call Price", field: "callPrice" },
              { title: "Chat Price", field: "chatPrice" },
              { title: "Commission Price", field: "commissionPrice" },
              { title: "Total Charge", field: "deductedAmount" },
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
                title: "Start Time",
                render: (rowData) => (
                  <div>
                    {rowData?.startTime
                      ? moment(rowData?.startTime).format("DD-MM-YYYY HH:mm:ss A")
                      : "N/A"}
                  </div>
                ),
              },
              {
                title: "End time",
                render: (rowData) => (
                  <div>
                    {rowData?.endTime ? rowData?.endTime &&
                      moment(rowData?.endTime).format("DD-MM-YYYY HH:mm:ss A")
                      : "N/A"}
                  </div>
                ),
              },
              { title: "Status", field: "status" },
              {
                title: "View Chat History",
                field: "status",
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
                console.log("query", query)
                // API call using axios
                axios.get(`http://localhost:8000/api/admin/chat_history`, {
                  data: {
                    page: query.page + 1, // MaterialTable uses 0-indexed pages
                    limit: query.pageSize ==0? 10: query.pageSize,
                  }
                })
                .then(response => {
                  console.log("response", response);
                  // Resolve the promise with data, page, and totalCount
                  resolve({
                    data: response.data.data.data, // assuming the API returns data in this format
                    page: response.data.data.pagination.page - 1, // Adjust for 0-indexed pages
                    totalCount: response?.data?.data.pagination?.totalCount, // Total number of rows in your dataset
                  });
                })
                .catch(error => {
                  console.error('Error fetching data:', error);
                  reject(error);
                });
              })
            }

            options={{ ...propStyles.tableStyles, filtering: false, paging: true, pageSize: 10, pageSizeOptions: [10, 20, 50, 100], }}
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
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(ChatHistory);
