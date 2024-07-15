import React, { useEffect, useState } from "react";
import { Colors, useStyles, propStyles } from '../../assets/styles.js'
import { Grid, TextField, MenuItem, FormControl, InputLabel, Select } from "@mui/material";

import { AddCircleRounded, Close } from '@mui/icons-material';
import MaterialTable from "material-table";
import logo_icon from '../../assets/images/logo_icon.png'
import { get_first_recharge_offer, get_skills, update_first_recharge_offer, update_skill } from "../../utils/Constants.js";
import { getData, postData } from '../../utils/FetchNodeServices.js'
import { useNavigate } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { CloseRounded } from "@mui/icons-material";
import Swal from "sweetalert2";
import * as RechargeActions from '../../redux/Actions/rechargeActions.js'
import { connect } from "react-redux";

const DisplayFirstRechargeOffer = ({dispatch, firstRechareOfferData}) => {
    const classes = useStyles()
    const navigate = useNavigate()
    const [firstRechargeOfferData, setFirstRechargeOfferData] = useState([])
    const [firstOfferId, setFirstOfferId] = useState('');
    const [rechargeAmount, setRechargeAmount] = useState('');
    const [extraPercent, setExtraPercent] = useState('');
    const [status, setStatus] = useState('');
    const [error, setError] = useState({});
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [skill, setSkill] = useState('')
    const [icon, setIcon] = useState('')

    useEffect(function () {
        dispatch(RechargeActions.getFirstRechargeOffer())
    }, [])

    const handleOpen = (rowData) => {
        setOpen(true);
        setFirstOfferId(rowData._id)
        setRechargeAmount(rowData.first_recharge_plan_amount)
        setExtraPercent(rowData.first_recharge_plan_extra_percent)
        setStatus(rowData.first_recharge_status)
    };

    const handleError = (input, value) => {
        setError((prev) => ({ ...prev, [input]: value }))
    }

    const validation = () => {
        var isValid = true
        if (!rechargeAmount) {
            handleError('rechargeAmount', 'Please input amount')
            isValid = false
        }
        return isValid
    }

    const handleSubmit = async () => {
        if (validation()) {
            setIsLoading(true)
            var body = {
                "first_recharge_plan_amount": rechargeAmount,
                "first_recharge_plan_extra_percent": extraPercent,
                "first_recharge_status": status,
                "firstRechargeOfferId": firstOfferId
            }
       
            dispatch(RechargeActions.updateFirstRechargeOffer(body))
            setOpen(false)
        }
    };

    const handleClose = () => {
        // setSkill_id('')
        setSkill('')
        setIcon({ file: logo_icon, bytes: '' })
        setOpen(false)
    }

    return (
        <div className={classes.container}>
            <div className={classes.box}>
                {firstRechareOfferData && displayTable()}
                {editModal()}
            </div>
        </div >
    );


    function displayTable() {
        return (
            <Grid container spacing={1}>
                <Grid item lg={12} sm={12} md={12} xs={12}>
                    <MaterialTable
                        style={{ boxShadow: '0' }}
                        title="First Recharge Offer"
                        data={firstRechareOfferData}
                        columns={[
                            {
                                title: 'S.No',
                                editable: 'never',
                                render: rowData => firstRechareOfferData.indexOf(rowData) + 1
                            },
                            { title: 'Amount', field: 'first_recharge_plan_amount' },
                            { title: 'Extra Amount', field: 'first_recharge_plan_extra_percent' },
                            { title: 'Status', field: 'first_recharge_status' },
                        ]}
                        options={{...propStyles.tableStyles, filtering: false}}
                        actions={[
                            {
                                icon: 'edit',
                                tooltip: 'Edit First Recharge Offer',
                                onClick: (event, rowData) => handleOpen(rowData)
                            },
                            {
                                icon: 'delete',
                                tooltip: 'Delete First Recharge Offer',
                                onClick: (event, rowData) => dispatch(RechargeActions.deleteFirstRechargeOffer({firstRechargeId: rowData?._id}))
                            },
                            {
                                icon: () => (
                                    <div className={classes.addButton}
                                    >
                                        <AddCircleRounded />
                                        <div className={classes.addButtontext}>Add New</div>
                                    </div>
                                ),
                                tooltip: 'Add First Recharge Offer',
                                isFreeAction: true,
                                onClick: () => navigate("/AddFirstRechargeOffer")
                            }
                        ]}
                    />
                </Grid>
            </Grid>
        )
    }

    function editModal() {
        const showEditForm = () => {
            return (
                <Grid container spacing={2}>
                    <Grid item lg={12} sm={12} md={12} xs={12}>
                        <div className={classes.headingContainer}>
                            <div className={classes.heading} >
                                Edit First Recharge Offer
                            </div>
                            <div onClick={handleClose} className={classes.closeButton}>
                                <CloseRounded />
                            </div>
                        </div>
                    </Grid>
                    <Grid item lg={4} sm={12} md={12} xs={12} >
                        <TextField
                            label="Pay Amount"
                            type="number"
                            error={Boolean(error.rechargeAmount)}
                            helperText={error.rechargeAmount}
                            value={rechargeAmount}
                            onFocus={() => handleError('rechargeAmount', null)}
                            onChange={(event) => setRechargeAmount(event.target.value)}
                            variant='outlined' fullWidth />
                    </Grid>
                    <Grid item lg={4} sm={12} md={12} xs={12} >
                        <TextField
                            label="Extra Amount"
                            type="number"
                            error={Boolean(error.extraPercent)}
                            helperText={error.extraPercent}
                            value={extraPercent}
                            onFocus={() => handleError('extraPercent', null)}
                            onChange={(event) => setExtraPercent(event.target.value)}
                            variant='outlined' fullWidth />
                    </Grid>

                    <Grid item lg={4} sm={6} md={6} xs={6} >
                        <FormControl fullWidth>
                            <InputLabel id="select-label">Select Status</InputLabel>
                            <Select
                                label="Select Option"
                                labelId="select-label"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                variant="outlined"
                                error={error.status ? true : false}
                                fullWidth
                            >
                                <MenuItem value="Select Status" disabled>Select Status</MenuItem>
                                <MenuItem value="Active">Active</MenuItem>
                                <MenuItem value="Inactive">Inactive</MenuItem>
                            </Select>
                            {error.status && (
                                <div style={{ color: 'red', fontSize: '0.75rem', marginTop: '8px' }}>
                                    {error.status}
                                </div>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item lg={6} sm={6} md={6} xs={6} >
                        <div onClick={handleSubmit} className={classes.submitbutton}>
                            Submit
                        </div>
                    </Grid>
                    <Grid item lg={6} sm={6} md={6} xs={6} >
                        <div onClick={handleClose} className={classes.denyButton}>
                            Cancel
                        </div>
                    </Grid>
                </Grid>
            )

        }
        return (
            <div>
                <Dialog
                    open={open}>
                    <DialogContent>
                        {showEditForm()}
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    firstRechareOfferData: state.recharge.firstRechareOfferData 
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(DisplayFirstRechargeOffer);
