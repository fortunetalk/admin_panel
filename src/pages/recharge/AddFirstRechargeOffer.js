import React, { useState } from "react";
import { useStyles } from '../../assets/styles.js';
import { Grid, TextField, MenuItem, FormControl, InputLabel, Select } from "@mui/material";
import DvrIcon from '@mui/icons-material/Dvr';
import { add_first_recharge_offer, add_recharge_plans } from "../../utils/Constants.js";
import { postData } from '../../utils/FetchNodeServices.js';
import Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css"; // Add this line
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/loading/Loader.js";
import { connect } from "react-redux";
import * as RechargeActions from '../../redux/Actions/rechargeActions.js'

const AddFirstRechargeOffer = ({dispatch}) => {

    const navigate = useNavigate();
    const classes = useStyles();
    const [rechargeAmount, setRechargeAmount] = useState('');
    const [extraPercent, setExtraPercent] = useState('');
    const [status, setStatus] = useState('');
    const [error, setError] = useState({});
    const [isLoading, setIsLoading] = useState(false)


    const handleError = (input, value) => {
        setError((prev) => ({ ...prev, [input]: value }));
    };

    const validation = () => {
        let isValid = true;
        if (!rechargeAmount) {
            handleError('rechargeAmount', 'Please input Recharge Amount');
            isValid = false;
        }
        if (!extraPercent) {
            handleError('extraPercent', 'Please input Extra Percent');
            isValid = false;
        }
        if (!status) {
            handleError('status', 'Please Select Status');
            isValid = false;
        }
        return isValid;
    };

    const handleSubmit = async () => {
        if (validation()) {
            var body = {
                "first_recharge_plan_amount": rechargeAmount,
                "first_recharge_plan_extra_percent": extraPercent,
                "first_recharge_status": status
            }

            dispatch(RechargeActions.createFirstRechargeOffer(body))
            handleReset();
        }
    };

    const handleReset = () => {
        setRechargeAmount('');
        setExtraPercent('');
        setStatus('');
        setError({});
    };

    return (
        <div className={classes.container}>
            <Loader  />
            <div className={classes.box}>
                <Grid container spacing={2}>
                    <Grid item lg={12} sm={12} md={12} xs={12}>
                        <div className={classes.headingContainer}>
                            <div className={classes.heading} >
                                First Recharge Offer
                            </div>
                            <div onClick={() => navigate("/displayFirstRechargeOffer")} className={classes.addButton}>
                                <DvrIcon />
                                <div className={classes.addButtontext}>Display First Recharge Offer</div>
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
                        <div onClick={handleReset} className={classes.denyButton}>
                            Reset
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    firstRechareOfferData: state.recharge.firstRechareOfferData
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(AddFirstRechargeOffer);
