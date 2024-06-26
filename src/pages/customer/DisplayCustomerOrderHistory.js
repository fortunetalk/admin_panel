import React, { useEffect, useState } from "react";
import { propStyles, useStyles } from '../../assets/styles.js'
import { Avatar, Grid, TextField, FormControl, InputLabel, Select, MenuItem, Dialog, DialogContent, FormControlLabel, RadioGroup, FormLabel, Radio } from "@mui/material";
import { AddCircleRounded, Chat, Check, Close, CloseRounded, DashboardCustomize, Delete, DockOutlined, DocumentScannerOutlined, Edit, GradeOutlined, Info, PausePresentation, Subject } from '@mui/icons-material';
import MaterialTable, { MTableToolbar } from "material-table";
import { Colors } from "../../assets/styles.js";
import { ban_customer, base_url, customer_call_history, customer_chat_history, customer_order_history, delete_customer, get_all_customers, online_offline_customer, update_customer } from "../../utils/Constants.js";
import { getData, postData } from '../../utils/FetchNodeServices.js'
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

const DisplayCustomerOrderHistory = () => {
    const classes = useStyles()
    const navigate = useNavigate()
    const [typeToggle, setTypeToggle] = useState('Chat')
    const [historyData, setHistoryData] = useState([])
    const location = useLocation();
    const customerData = location.state && location.state.customerData;

    useEffect(function () {
        fetchAllOrderHistory()
    }, [typeToggle])

    const fetchAllOrderHistory = async () => {
        if (typeToggle == "Chat") {
            var response = await postData(customer_chat_history, { customerId: customerData._id })
            setHistoryData(response.chatHistory)
        }
        else {
            var response = await postData(customer_call_history, { customerId: customerData._id })
            setHistoryData(response.callHistory)
        }
    }

    return (
        <div className={classes.container}>
            <div className={classes.box}>
                {displayTable()}
            </div>
        </div >

    );

    function displayTable() {
        return (
            <Grid container spacing={2}>
                <Grid item lg={12} sm={12} md={12} xs={12}>
                    <MaterialTable
                        title="Customer Information"
                        data={historyData}
                        columns={[
                            { title: 'Order ID', field: '_id' },
                            { title: 'Astrologer', field: 'astrologerId.astrologerName' },
                            {
                                title: 'Type',
                                render: (rowData) => `${typeToggle}`
                            },
                            {
                                title: 'Start Time',
                                render: (rowData) => {
                                    const startTime = typeToggle === "Chat" ? rowData.startTime : parseInt(rowData.startTime);
                                    return moment(startTime).format('MMMM Do YYYY, h:mm:ss a');
                                },
                            },
                            {
                                title: 'Time Spent',
                                render: (rowData) => {
                                    const totalSeconds = rowData.durationInSeconds;
                                    const minutes = Math.floor(totalSeconds / 60);
                                    const seconds = Math.floor(totalSeconds % 60);
                                    const formattedSeconds = seconds.toString().padStart(2, '0');
                                    return `${minutes} mins ${formattedSeconds} secs`;
                                }
                            },
                            {
                                title: 'Charges',
                                render: (rowData) => typeToggle == "Chat" ? "₹ " + rowData.totalChatPrice : "₹ " + rowData.totalCallPrice
                            }
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
                                <div>
                                    <MTableToolbar {...props} />
                                    <div style={{ padding: '10px' }}>
                                        <FormControl component="fieldset">
                                            <FormLabel
                                                component="legend"
                                                style={{
                                                    fontFamily: "Philospher",
                                                    color: Colors.black,
                                                    fontSize: "1.2rem",
                                                }}
                                            >
                                                Are you working on any other online portal?
                                            </FormLabel>
                                            <RadioGroup
                                                row
                                                aria-label="position"
                                                name="position"
                                                defaultValue={typeToggle}
                                                onChange={(e) => setTypeToggle(e.target.value)}
                                            >
                                                <FormControlLabel
                                                    value={"Chat"}
                                                    control={<Radio color="primary" />}
                                                    label="Chat"
                                                />
                                                <FormControlLabel
                                                    value={"Call"}
                                                    control={<Radio color="primary" />}
                                                    label="Call"
                                                />
                                            </RadioGroup>
                                        </FormControl>
                                    </div>
                                </div>
                            ),
                        }}
                    />
                </Grid>
            </Grid >
        )
    }

};

export default DisplayCustomerOrderHistory;




