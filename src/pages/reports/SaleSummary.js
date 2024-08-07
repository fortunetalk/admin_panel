import React, { useEffect, useState } from "react";
import { useStyles, propStyles } from "../../assets/styles.js";
import MaterialTable from 'material-table'; // Import MaterialTable

import {
    Grid,
    TextField,
    DateField

} from "@mui/material";
import DvrIcon from "@mui/icons-material/Dvr";
import { useNavigate } from "react-router-dom";
import * as ReportsActions from '../../redux/Actions/reportsActions.js'
import logo_icon from "../../assets/images/logo_icon.png";
import { connect } from "react-redux";
import moment from "moment";
import { secondsToHMS } from "../../utils/services.js";

export const SaleSummary = ({dispatch, adminEarningData}) => {
    var classes = useStyles();

    useEffect(()=>{
        dispatch(ReportsActions.getAdminEarnings())
      }, [])

    const handleOpen = (rowData) => {
        // Implement the logic to handle the opening of a record
        console.log("Opening record:", rowData);
        // You can add more logic here based on what you want to achieve
    };

    return (
        <div className={classes.container}>
            <div className={classes.box}>
                <Grid container spacing={2}>
                    {adminEarningData && tableInfo()}
                    {/* <Grid item lg={3} sm={12} md={12} xs={12}>
                        <div className={classes.headingContainer}>
                            <div className={classes.heading}>GST Sale Summary</div>
                        </div>
                    </Grid>
                    <Grid item lg={12} sm={12} md={12} xs={12}>
                        <div className={classes.headingContainer}>
                            <Grid item lg={4} sm={12} md={12} xs={12}>
                                <label>Frome Date</label>
                                <input
                                    type="date"
                                    id="fromDateInput"
                                    name="fromDateInput"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    style={{ width: '100%', height: '50px' }}
                                />
                            </Grid>
                            <Grid item lg={4} sm={12} md={12} xs={12}>
                                <label>End Date</label>
                                <input
                                    type="date"
                                    id="endDateInput"
                                    name="endDateInput"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    style={{ width: '100%', height: '50px' }}
                                />
                            </Grid>
                            <Grid item lg={2} sm={12} md={12} xs={12}>
                                <div onClick={Submit} className={classes.submitbutton}>
                                    Apply
                                </div>
                            </Grid>
                        </div>



                    
                    </Grid> */}
                </Grid>
            </div>
        </div>
    );

    function tableInfo() {
        return (
            <Grid item lg={12} sm={12} md={12} xs={12} style={{ marginTop: 15 }}>
                <MaterialTable
                    title="Sales Summary"
                    data={adminEarningData}
                    columns={[
                        {
                            title: 'S.No',
                            editable: 'never',
                            render: rowData => adminEarningData.indexOf(rowData) + 1
                        },
                        {
                            title: 'Invoice Date',
                            editable: 'never',
                            render: rowData=>(<div>{rowData?.endTime && moment(rowData?.createdAt).format('DD-MM-YYYY')}</div>)
                        },
                        {
                            title: 'Invoice id',
                            editable: 'never',
                            field: 'transactionId' 
                        },
                        // {
                        //     title: 'Txn id',
                        //     editable: 'never',
                        //     render: rowData => adminEarningData.indexOf(rowData) + 1
                        // },
                        {
                            title: 'Txn Type Call/Chat/Report',
                            editable: 'never',
                            field: 'type'
                        },
                        {
                            title: 'Duretion',
                            editable: 'never',
                            render: rowData=>(<div>{secondsToHMS(rowData?.duration)}</div>)
                        },
                        {
                            title: 'Customer Name',
                            editable: 'never',
                            field: 'customerDetails.customerName'
                        },
                        {
                            title: 'Country',
                            editable: 'never',
                            render: rowData => <div>India</div>
                        },
                        {
                            title: 'Sales',
                            editable: 'never',
                            render: rowData=>(<div>{parseFloat(rowData?.totalPrice).toFixed(2)}</div>)
                        },
                        {
                            title: 'Discount',
                            editable: 'never',
                            render: rowData => <div>0</div>
                        },
                        {
                            title: 'Sale Total',
                            editable: 'never',
                            render: rowData=>(<div>{parseFloat(rowData?.totalPrice).toFixed(2)}</div>)
                        },
                        {
                            title: 'IGST On Sales @18%',
                            editable: 'never',
                            render: rowData=>(<div>{parseFloat(parseFloat(rowData?.totalPrice)*18/100).toFixed(2)}</div>)
                        },
                        {
                            title: 'Total Sales',
                            editable: 'never',
                            render: rowData=>(<div>{parseFloat(parseFloat(rowData?.totalPrice) + (rowData?.totalPrice*18/100)).toFixed(2)}</div>)
                        },

                        // Add more columns as needed
                    ]}
                    // options={{...propStyles.tableStyles, filtering: false}}
                    options={{
                        sorting: true,
                        search: true,
                        searchFieldAlignment: "right",
                        filtering: false,
                        paging: true,
                        pageSize: 5,
                        paginationType: "stepped",
                        showFirstLastPageButtons: true,
                        paginationPosition: "bottom",
                        exportButton: false,
                        exportAllData: false,
                        exportFileName: "Category data",
                        addRowPosition: "first",
                        actionsColumnIndex: -1,
                        selection: false,
                        showSelectAllCheckbox: false,
                    }}
                    // actions={[
                    //     {
                    //         icon: 'edit',
                    //         tooltip: 'Edit Skill',
                    //         onClick: (event, rowData) => handleOpen(rowData),
                    //     },
                    // ]}
                />
            </Grid>
        )
    }


};

const mapStateToProps = state => ({
    adminEarningData: state.reports.adminEarningData
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(SaleSummary);