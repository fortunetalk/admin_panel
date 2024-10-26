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
import { secondsToHMS } from "../../utils/services.js";
import moment from "moment";
import { api_url, get_recharge_history } from "../../utils/Constants.js";
import DownloadIcon from "@mui/icons-material/Download";
import { CSVLink, CSVDownload } from "react-csv";

const ChatHistory = ({ dispatch, rechargeHistoryData , csvData, csvRechargeData,
    adminData,
    isLoading}) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [searchType, setSearchType] = useState("");
    const [viewData, setViewData] = useState(false);
    const [singleDate, setSingleDate] = useState(""); // State for single date
    const [customSelection, setCustomSelection] = useState(""); // State for custom dropdown selection
    const [isCustomSelected, setIsCustomSelected] = useState(false);
    const [startDate, setStartDate] = useState(""); // State for start date
    const [endDate, setEndDate] = useState(""); // State for end date
    const [data, setData] = useState({
        customerId: "",
        customerName: "",
        customerNumber: "",
        invoiceId: "",
        amount: "",
        gst:"",
        paymentMethod: "",
        transactionType: "",
        referenceModel: "",
        type: "",
    });

    // useEffect(() => {
    //     dispatch(HistoryActions.getRechargeHistory());
    // }, [dispatch]);

    const handleView = (rowData) => {
        setViewData(true);
        setData({
            customerId: rowData?._id || "",
            customerName: rowData?.customerName || "",
            customerNumber: rowData?.phoneNumber || "",
            invoiceId: rowData?.invoiceId || "",
            amount: rowData?.amount || "",
            gst: rowData?.gst || "",
            referenceModel: rowData?.referenceModel || "",
            paymentMethod: rowData?.paymentMethod || "",
            transactionType: rowData?.transactionType || "",
            type: rowData?.type || "",
        });
    };


    const openDownloadModal = () => {

        setShowModal(true);
      };


    const handleClose = () => {
        setViewData(false);
        setShowModal(false);
    };

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
          dispatch(HistoryActions.getDownloadRechargeHistory({ payload }));
        } catch (e) {
          console.log(e);
        }
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


    return (
        <div className={classes.container}>
          {
          <div className={classes.box}>
            {displayTable()}
            {editModal()}
            {downloadModal()}
          </div>
          }
        </div>
      );

    function displayTable() {
        return (
            <Grid container spacing={1}>
                <Grid item lg={12} sm={12} md={12} xs={12}>
                    <MaterialTable
                        // title="Wallet Transactions"
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
                                Wallet Transactions
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
                            //     title: "S.No",
                            //     editable: "never",
                            //     render: (rowData) => rowData.tableData.id + 1,
                              
                            // },
                            { title: "InvoiceId",
                              field: "invoiceId",
                              filtering: false ,
                            
                            },
                            // { title: "Customer Id", field: "customerId.customerUniqueId" },
                            { title: "Customer Name", 
                                filtering: false,
                                field: "customerName",

                             },
                             { title: "Customer Number", filtering: false, field: "phoneNumber" },
                             {
                                title: "Date",
                                filtering: false,
                                render: (rowData) => (
                                  <div>
                                    {rowData?.createdAt
                                      ? moment(rowData?.createdAt).format("DD-MM-YYYY HH:mm A")
                                      : "N/A"}
                                  </div>
                                ),
                              },
                            //  { title: "GST", field: "gst" },
                            //  { 
                            //     title: "Amount", 
                            //     field: "amount",
                            //     render: (rowData) => {
                            //       const balance = Number(rowData.amount).toFixed(2);
                            //       if (rowData.amount === 0) {
                            //         return `₹ 0.00`;
                            //       }
                            //       if (rowData?.transactionType === "DEBIT") {
                            //         return `- ₹${balance}`;
                            //       }
                            //       return `+ ₹${balance}`;
                            //     }
                            //   },
                              {
                                title: "Amount",
                                field: "amount",
                                filtering: true,
                                lookup: { unpaid: "NO BALANCE", paid: "HAVE BALANCE", },
                                render: (rowData) => {
                                    const balance = Number(rowData.amount).toFixed(2);
                                    if (rowData.amount === 0) {
                                      return `₹ 0.00`;
                                    }
                                    if (rowData?.transactionType === "DEBIT") {
                                      return `- ₹${balance}`;
                                    }
                                    return `+ ₹${balance}`;
                                  }
                              },
                            
                            // { title: "PaymentMethod", field: "paymentMethod" },
                            // { title: "TransactionType",
                            //     filtering: false,
                            //     render: (rowData) => {
                                   
                            //         if (rowData?.transactionType=="DEBIT"){
                            //             return `Deducted`;
                            //         }
                            //         else{
                            //             return `Credited`;
                            //         }
                                    
                            //       }
                            // },
                            {
                                title: "TransactionType",
                                field: "transactionType",
                                lookup: { credited: "Credited", nonCredited: "Non-Credited", },
                                filtering: true,
                                render: (rowData) => {
                                    const transactionType = rowData?.transactionType;
                                    const text = transactionType === "DEBIT" ? 'Deducted' : 'Credited';
                                    const color = transactionType === "CREDIT" ? 'green' : 'red';
                                    return (
                                        <span style={{ color }}>
                                            {text}
                                        </span>
                                    );
                                }
                            },
                            // { title: "ReferenceModel", field: "referenceModel" },
                            { title: "Type", field: "type", filtering: false },
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
                        
                          options={{ ...propStyles.tableStyles,  paging: true, pageSize: 10, pageSizeOptions: [10, 20, 50, 100, 500, 1000, 10000], filtering: true }}

                        style={{ fontSize: "1.0rem" }}
                        actions={[
                            {
                                icon: "visibility",
                                tooltip: "View Chat History",
                                onClick: (event, rowData) => handleView(rowData),
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
                            <div className={classes.heading}>Wallet Transaction</div>
                            <div onClick={handleClose} className={classes.closeButton}>
                                <CloseRounded />
                            </div>
                        </div>
                    </Grid>
                    {/* <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TextField
                            label="Customer ID"
                            value={data.customerId}
                            variant="outlined"
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid> */}
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
                            value={data.customerNumber}
                            variant="outlined"
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TextField
                            label="Amount"
                            value={data.amount || "0"}
                            variant="outlined"
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    {data.transactionType === "CREDIT" && (
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TextField
                            label="GST"
                            value={`${data.gst || "0"}%`} 
                            variant="outlined"
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                )}
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TextField
                            label="Invoice ID"
                            value={data.invoiceId}
                            variant="outlined"
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TextField
                            label="Payment Method"
                            value={data.paymentMethod}
                            variant="outlined"
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TextField
                            label="Transaction Type"
                            value={data.transactionType}
                            variant="outlined"
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TextField
                            label="Reference Model"
                            value={data.referenceModel}
                            variant="outlined"
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TextField
                            label="Type"
                            value={data.type}
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
            <Dialog open={viewData} onClose={handleClose}>
                <DialogContent>{showEditForm()}</DialogContent>
            </Dialog>
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
              {csvRechargeData && (
                <Grid item lg={4} sm={6} md={6} xs={6}>
                  <div className={classes.submitbutton}>
                    <CSVLink style={{ color: "white" }} data={csvRechargeData}>
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

};

const mapStateToProps = (state) => ({
    rechargeHistoryData: state.history.rechargeHistoryData,
    csvRechargeData: state.history.csvRechargeData,
    isLoading: state.admin.isLoading,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(ChatHistory);
