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

const ChatHistory = ({ dispatch, rechargeHistoryData }) => {
    const classes = useStyles();
    const navigate = useNavigate();

    const [viewData, setViewData] = useState(false);
    const [data, setData] = useState({
        referenceId: "",
        customerId: "",
        customerName: "",
        invoiceId: "",
        amount: "",
        paymentMethod: "",
        transactionType: "",
        referenceModel: "",
        type: "",
    });

    useEffect(() => {
        dispatch(HistoryActions.getRechargeHistory());
    }, [dispatch]);

    const handleView = (rowData) => {
        setViewData(true);
        setData({
            referenceId: rowData?.referenceId || "",
            customerId: rowData?.customerId?.customerUniqueId || "",
            customerName: rowData?.customerId?.firstName || "",
            invoiceId: rowData?.invoiceId || "",
            amount: rowData?.amount || "",
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
            !rechargeHistoryData ? <CircularProgress/> :
          <div className={classes.box}>
            {rechargeHistoryData && displayTable()}
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
                        title="Recharge History"
                        data={rechargeHistoryData}
                        columns={[
                            {
                                title: "S.No",
                                editable: "never",
                                render: (rowData) => rechargeHistoryData.indexOf(rowData) + 1,
                            },
                            { title: "Customer Id", field: "customerId.customerUniqueId" },
                            { title: "Customer Name", field: "customerId.firstName" },
                            { title: "Amount", field: "amount" },
                            { title: "InvoiceId", field: "invoiceId" },
                            { title: "ReferenceId", field: "referenceId" },
                            { title: "PaymentMethod", field: "paymentMethod" },
                            { title: "TransactionType", field: "transactionType" },
                            { title: "ReferenceModel", field: "referenceModel" },
                            { title: "Type", field: "type" },
                        ]}
                        options={{
                            ...propStyles.tableStyles,
                            filtering: false,
                            pageSize: 10,
                            pageSizeOptions: [10, 20, 30, 40, 50, 60, 80, 100],
                        }}
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
                            <div className={classes.heading}>Recharge History Data</div>
                            <div onClick={handleClose} className={classes.closeButton}>
                                <CloseRounded />
                            </div>
                        </div>
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
                            label="Amount"
                            value={data.amount || "0"}
                            variant="outlined"
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
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
                            label="Reference ID"
                            value={data.referenceId}
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
