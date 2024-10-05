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
import { api_url, get_recharge_history } from "../../utils/Constants.js";

const ChatHistory = ({ dispatch, rechargeHistoryData }) => {
    const classes = useStyles();
    const navigate = useNavigate();

    const [viewData, setViewData] = useState(false);
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

    const handleClose = () => {
        setViewData(false);
    };

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
                        title="Wallet Transactions"
                        
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
                            { title: "TransactionType",
                                filtering: false,
                                render: (rowData) => {
                                   
                                    if (rowData?.transactionType=="DEBIT"){
                                        return `Deducted`;
                                    }
                                    else{
                                        return `Credited`;
                                    }
                                    
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
                        
                          options={{ ...propStyles.tableStyles,  paging: true, pageSize: 10, pageSizeOptions: [10, 20, 50, 100], filtering: true }}

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
};

const mapStateToProps = (state) => ({
    rechargeHistoryData: state.history.rechargeHistoryData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(ChatHistory);
