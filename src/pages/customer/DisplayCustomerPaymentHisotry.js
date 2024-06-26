import React, { useEffect, useState } from "react";
import { propStyles, useStyles } from '../../assets/styles.js'
import { Avatar, Grid, TextField, FormControl, InputLabel, Select, MenuItem, Dialog, DialogContent } from "@mui/material";
import { AddCircleRounded, Chat, Check, Close, CloseRounded, CurrencyRupee, DashboardCustomize, Delete, DockOutlined, DocumentScannerOutlined, Edit, GradeOutlined, Info, PausePresentation, Subject } from '@mui/icons-material';
import MaterialTable, { MTableToolbar } from "material-table";
import { Colors } from "../../assets/styles.js";
import { add_customer_recharge, ban_customer, base_url, customer_call_history, customer_chat_history, customer_order_history, customer_payment_history, delete_customer, get_all_customers, online_offline_customer, update_customer } from "../../utils/Constants.js";
import { getData, postData } from '../../utils/FetchNodeServices.js'
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import Loader from "../../Components/loading/Loader.js";
import Swal from "sweetalert2";
import { type } from "@testing-library/user-event/dist/type/index.js";

const DisplayCustomerPaymentHistory = () => {
    const classes = useStyles()
    const navigate = useNavigate()
    const [historyData, setHistoryData] = useState([])

    const [isLoading, setIsLoading] = useState('')
    const [amount, setAmount] = useState('')
    const [type, setType] = useState('')
    const [error, setError] = useState({})
    const [open, setOpen] = useState(false)

    const location = useLocation();
    const customerData = location.state && location.state.customerData;

    useEffect(function () {
        fetchAllPaymentHistory()
    }, [])

    const fetchAllPaymentHistory = async () => {
        setIsLoading(true)
        var response = await postData(customer_payment_history, { customerId: customerData._id })
        setIsLoading(false)
        setHistoryData(response.data)
        console.log(response.data)
    }

    const handleError = (input, value) => {
        setError((prev) => ({ ...prev, [input]: value }));
    };

    const validation = () => {
        var isValid = true;
        if (!amount) {
            handleError("amount", "Please Enter Amount");
            isValid = false;
        }
        if (!type) {
            handleError("type", "Please Selecct  Transaction Type");
            isValid = false;
        }
        return isValid;
    };

    const handleSubmit = async () => {
        if (validation()) {
            setIsLoading(true)
            var response = await postData(add_customer_recharge, {
                customerId: customerData._id,
                amount: amount,
                payment_method: 'By Admin',
                transactionId: 'NMA1234567890',
                type: type
            });
            setIsLoading(false)
            console.log(response.success)
            if (response.success) {
                Swal.fire({
                    icon: "success",
                    title: type == 'credit' ? "Added Successful" : "Debit Successful",
                    text: type == 'credit' ? "Recharge Added Successful" : "Wallet Debited Successful",
                    showConfirmButton: false,
                    timer: 2000,
                });
                fetchAllPaymentHistory()
                setOpen(false)
                handleClose();
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Server Error",
                    text: "Recharge Submission Failed",
                    showConfirmButton: false,
                    timer: 2000,
                });
            }
        }
    };

    const handleClose = () => {

        setAmount('')
        setType(null)
    }

    return (
        <div className={classes.container}>
            <Loader isVisible={isLoading} />
            <div className={classes.box}>
                {displayTable()}
                {addModal()}
            </div>
        </div >

    );

    function displayTable() {
        return (
            <Grid container spacing={2}>
                <Grid item lg={12} sm={12} md={12} xs={12}>
                    <MaterialTable
                        title="Customer Payment History"
                        data={historyData}
                        columns={[
                            { title: 'Order ID', field: '_id' },
                            { title: 'Amount', field: 'amount' },
                            { title: 'Transaction Id', field: 'transactionId' },
                            { title: 'Date', field: 'createdAt' },
                            { title: 'Type', field: 'type' },
                            { title: 'Method', field: 'method' },
                        ]}
                        options={propStyles.tableStyles}
                        actions={[
                            {
                                icon: () => (
                                    <div className={classes.addButton}
                                        onClick={() => navigate("/displayCustomer")}
                                    >
                                        <CloseRounded />
                                    </div>
                                ),
                                tooltip: 'Close',
                                isFreeAction: true,
                            }
                        ]}
                        components={{
                            Toolbar: (props) => (
                                <div >
                                    <MTableToolbar {...props} />
                                    <div style={{ display: "flex", justifyContent: 'space-between' }}>
                                        <div className={classes.addButton}
                                            style={{ width: '15%', marginLeft: 20 }}
                                            onClick={() => setOpen(true)}
                                        >
                                            <AddCircleRounded />
                                            <div className={classes.addButtontext}>Add Recharge</div>
                                        </div>
                                        <div className={classes.addButton}
                                            style={{ padding: 10, marginRight: 20, background: Colors.greenLight }}
                                        >
                                            <CurrencyRupee style={{ fontSize: '1.5rem' }} />
                                            <div style={{ fontSize: '1.5rem' }}>{parseFloat(customerData.wallet_balance.toFixed(2))}</div>
                                        </div>
                                    </div>
                                </div>
                            ),
                        }}
                    />
                </Grid>
            </Grid >
        )
    }

    function addModal() {
        const addForm = () => {
            return (
                <Grid container spacing={2}>
                    <Grid item lg={12} sm={12} md={12} xs={12}>
                        <div className={classes.headingContainer}>
                            <div className={classes.heading}>Add Recharge</div>
                            <div onClick={handleClose} className={classes.closeButton}>
                                <CloseRounded />
                            </div>
                        </div>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TextField
                            label="Enter Amount"
                            type="number"
                            error={error.amount ? true : false}
                            helperText={error.amount}
                            value={amount}
                            onFocus={() => handleError("amount", null)}
                            onChange={(event) => setAmount(event.target.value)}
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Type"
                                value={type}
                                onFocus={() => handleError("type", null)}
                                onChange={(e) => setType(e.target.value)}
                                error={error.type ? true : false}
                            >
                                <MenuItem disabled value={null}>  -Select Type-</MenuItem>
                                <MenuItem value="credit"> Credit</MenuItem>
                                <MenuItem value="debit"> Debit </MenuItem>
                            </Select>
                        </FormControl>
                        <div className={classes.errorstyles}>{error.skill_id}</div>
                    </Grid>

                    <Grid item lg={6} sm={6} md={6} xs={6}>
                        <div onClick={handleSubmit} className={classes.submitbutton}>
                            Submit
                        </div>
                    </Grid>
                    <Grid item lg={6} sm={6} md={6} xs={6}>
                        <div onClick={handleClose} className={classes.denyButton}>
                            Reset
                        </div>
                    </Grid>
                </Grid>
            );

        }

        return (
            <div>
                <Dialog
                    open={open}>
                    <DialogContent>
                        {addForm()}
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
};

export default DisplayCustomerPaymentHistory;




