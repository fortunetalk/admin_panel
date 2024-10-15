import React, { useEffect, useState } from "react";
import { propStyles, useStyles } from "../../assets/styles.js";
import MaterialTable from 'material-table';
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as ReportsActions from '../../redux/Actions/reportsActions.js'
import { connect } from "react-redux";
import Loader from "../../Components/loading/Loader.js";
import { secondsToHMS } from "../../utils/services.js";
import moment from "moment";

export const VideoEarning = ({dispatch, adminEarningData}) => {
  var classes = useStyles();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');
  const [startDateError, setStartDateError] = useState(false);
  const [endDateError, setEndDateError] = useState('');

  useEffect(()=>{
    dispatch(ReportsActions.getAdminEarnings())
  }, [])

  const handleDateChange = (e, dateType) => {
    const value = e.target.value;

    if (dateType === 'start') {
      setStartDate(value);
    } else if (dateType === 'end') {
      setEndDate(value);
    }
  };

  const handleValidation = () => {
    if (!startDate && !endDate) {
      setError('Please select both start and end dates.');
      setStartDateError(true);
      setEndDateError(true);
      return false;
    }

    if (!startDate) {
      setError('Please select the start date.');
      setStartDateError(true);
      setEndDateError(false);
      return false;
    }

    if (!endDate) {
      setError('Please select the end date.');
      setStartDateError(false);
      setEndDateError(true);
      return false;
    }

    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    if (startDateObj > endDateObj) {
      setError('End date should be equal to or greater than the start date.');
      setStartDateError(true);
      setEndDateError(true);
      return false;
    }

    setError('');
    setStartDateError(false);
    setEndDateError(false);
    return true;
  };

  const handleApply = () => {
    if (handleValidation()) {
      console.log('Validation passed. Performing the action.');
    }
  };

  return (
    <div className={classes.container}>
      <Loader />
      <div className={classes.box}>
        <Grid container spacing={2}>
          {/* {searchFilterInfo()} */}
          {adminEarningData && tableInfo()}
        </Grid>
      </div>
    </div>
  );

  function tableInfo(){
    return(
      <Grid item lg={12} sm={12} md={12} xs={12} style={{ marginTop: 15 }}>
      <MaterialTable
        title="Video Call Earning"
        data={adminEarningData} 
        columns={[
          { title: 'Stream Id', field:'streamId' },
          { title: 'Customer Name', render: rowData => `${rowData.customerId.firstName} ${rowData.customerId.lastName}` },
          { title: 'Room Id', field: 'roomId' },
          { title: 'Start Time', render: rowData => rowData.startTime ? moment(rowData.startTime).format('HH:mm:ss A') : '' },
          { title: 'End Time', render: rowData => rowData.endTime ? moment(rowData.endTime).format('HH:mm:ss A') : '' },
          { title: 'Duration', render: rowData => secondsToHMS(rowData.durationInSeconds) },
          { title: 'Max Duration', field: 'maxDuration' },
          { title: 'Amount', render: rowData => parseFloat(rowData.amount).toFixed(2) },
          { title: 'Call Type', field: 'callType' },
          {
            title: 'Admin Share',
            render: rowData => {
              let adminShare = 0;
              const videoPrice = parseFloat(rowData.astrologerId.liveVideoPrice || 0) ;
              const callPrice = parseFloat(rowData.astrologerId.liveCallPrice || 0);

              if (rowData.callType === 'VIDEO_CALL') {
                adminShare = videoPrice;
              } else if (rowData.callType === 'VOICE_CALL') {
                adminShare = callPrice;
              }
          
              return adminShare.toFixed(2);
            }
          },
          {
            title: 'Astrologer Share',
            render: rowData => {
              let astrologerShare = 0;
          
              // Ensure companyLiveVideoPrice and companyLiveCallPrice are defined
              const videoPrice = parseFloat(rowData.astrologerId.companyLiveVideoPrice || 0) ;
              const callPrice = parseFloat(rowData.astrologerId.companyLiveCallPrice || 0);
          
              // Determine the share based on callType
              if (rowData.callType === 'VIDEO_CALL') {
                astrologerShare = videoPrice;
              } else if (rowData.callType === 'VOICE_CALL') {
                astrologerShare = callPrice;
              }
          
              // Return the formatted share amount
              return astrologerShare.toFixed(2);
            }
          },
         
          { title: 'Status', field: 'status' },
          { title: 'Date', render: rowData => rowData.endTime ? moment(rowData.endTime).format('DD-MM-YYYY') : '' },
      ]}
        options={{ ...propStyles.tableStyles, filtering: false, exportButton: true, exportAllData: true, }}
      />
    </Grid>
    )
  }

  function searchFilterInfo(){
    return (
      <Grid item lg={12} sm={12} md={12} xs={12}>
      <div className={classes.headingContainer}>
        <Grid item lg={4} sm={12} md={12} xs={12}>
          <label>From Date</label>
          <input
            type="date"
            id="fromDateInput"
            name="fromDateInput"
            value={startDate}
            onChange={(e) => handleDateChange(e, 'start')}
            style={{ width: '100%', height: '50px', border: startDateError ? '1px solid red' : '1px solid #ced4da' }}
          />
        </Grid>
        <Grid item lg={4} sm={12} md={12} xs={12}>
          <label>End Date</label>
          <input
            type="date"
            id="endDateInput"
            name="endDateInput"
            value={endDate}
            onChange={(e) => handleDateChange(e, 'end')}
            style={{ width: '100%', height: '50px', border: endDateError ? '1px solid red' : '1px solid #ced4da' }}
         
         />

        </Grid>
        <Grid item lg={2} sm={12} md={12} xs={12}>
          <div onClick={handleApply} className={classes.submitbutton} disabled={!startDate || !endDate}>
            Apply
          </div>
        </Grid>
       
      </div>
    </Grid>
    )
  }

};

const mapStateToProps = state =>({
  adminEarningData: state.reports.adminEarningData
})

const mapDispatchToProps = dispatch =>({dispatch})

export default connect(mapStateToProps, mapDispatchToProps)(VideoEarning);