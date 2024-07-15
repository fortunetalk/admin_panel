import React, { useEffect, useState } from "react";
import { useStyles, propStyles, Colors } from '../../assets/styles.js'
import { Grid, } from "@mui/material";
import { AddCircleRounded, Close } from '@mui/icons-material';
import MaterialTable from "material-table";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import * as RechargeActions from '../../redux/Actions/rechargeActions.js'
import moment from "moment";

const DisplayRechargePlans = ({ rechargePlanData, dispatch }) => {
    const classes = useStyles()
    const navigate = useNavigate()

    const [rechargePlansData, setRechargePlansData] = useState([])

    useEffect(function () {
        dispatch(RechargeActions.getRechargePlan())
    }, [])

    return (
        <div className={classes.container}>
            <div className={classes.box}>
                {rechargePlanData && displayTable()}
            </div>
        </div >
    );


    function displayTable() {
        return (
            <Grid container spacing={1}>
                <Grid item lg={12} sm={12} md={12} xs={12}>
                    <MaterialTable
                        style={{ boxShadow: '0' }}
                        title="Recharge Plans"
                        data={rechargePlanData}
                        columns={[
                            {
                                title: 'S.No',
                                editable: 'never',
                                render: rowData => rechargePlanData.indexOf(rowData) + 1
                            },
                            { title: 'Amount', field: 'amount' },
                            { title: 'Extra Percentage Amount', field: 'percentage' },
                            { title: 'Start Date', render: rowData => <div>{rowData?.startDate && moment(rowData?.startDate).format('DD-MM-YYYY')}</div> },
                            { title: 'End Date', render: rowData => <div>{rowData?.endDate && moment(rowData?.endDate).format('DD-MM-YYYY')}</div> },
                            {
                                title: "Status",
                                // field: "recharge_status",
                                render: (rowData) => (
                                    <div
                                        onClick={() =>
                                            dispatch(
                                                RechargeActions.updateRechargePlanStatus({
                                                    status: rowData.recharge_status == 'Active' ? "Inactive" : "Active",
                                                    rechargePlanId: rowData?._id
                                                })
                                            )
                                        }
                                        style={{
                                            backgroundColor: rowData.recharge_status == 'Active'
                                                ? Colors.greenLight
                                                : Colors.red_a,

                                            color: Colors.white,
                                            textAlign: "center",
                                            padding: 5,
                                            fontSize: "1.2rem",
                                            fontFamily: "Philospher",
                                            borderRadius: 5,
                                            cursor: "pointer",
                                        }}
                                    >
                                        {rowData.recharge_status}
                                    </div>
                                ),
                            },
                        ]}
                        options={{ ...propStyles.tableStyles, filtering: false }}
                        actions={[
                            // {
                            //     icon: "edit",
                            //     tooltip: "Edit Skill",
                            //     onClick: (event, rowData) => {},
                            //   },
                            {
                                icon: "delete",
                                tooltip: "Delete Recharge Plan",
                                onClick: (event, rowData) => dispatch(RechargeActions.deleteRechargePlan({ rechargePlanId: rowData?._id, })),
                            },
                            {
                                icon: () => (
                                    <div className={classes.addButton}
                                    >
                                        <AddCircleRounded />
                                        <div className={classes.addButtontext}>Add New</div>
                                    </div>
                                ),
                                tooltip: 'Add Skill',
                                isFreeAction: true,
                                onClick: () => navigate("/addRechargePlan")
                            },

                        ]}
                    />
                </Grid>
            </Grid>
        )
    }

}

const mapStateToProps = state => ({
    rechargePlanData: state.recharge.rechargePlanData
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(DisplayRechargePlans);
