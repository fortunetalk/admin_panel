import React, { useEffect, useState } from "react";
import { propStyles, useStyles } from "../../assets/styles.js";
import MaterialTable from 'material-table';
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as ReportsActions from '../../redux/Actions/reportsActions.js'
import { connect } from "react-redux";
import Loader from "../../Components/loading/Loader.js";
import { secondsToHMS } from "../../utils/services.js";
import format from "date-fns/format/index.js";
import moment from "moment/moment.js";

export const Earning = ({dispatch, adminEarningData}) => {
  var classes = useStyles();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');
  const [startDateError, setStartDateError] = useState(false);
  const [endDateError, setEndDateError] = useState('');

  useEffect(()=>{
    dispatch(ReportsActions.getChatEarnings())
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
      // Perform the action when validation passes
      // For example, you can navigate or fetch data here
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
        title="All Earnings"
        // data={adminEarningData} 
        columns={[
          { title: 'Astrologer Name', render: rowData => `${rowData.astrologerId.displayName}` },
          { title: 'Customer Name', render: rowData => `${rowData.customerId.firstName} ${rowData.customerId.lastName}` },
          { title: 'Duration', render: rowData => secondsToHMS(rowData.durationInSeconds) },
          { title: 'Admin Share', render: rowData => `${rowData.commissionPrice}` },
          {
              title: 'Astrologer Share',
              render: rowData => {
                // Calculate the astrologer share as the amount minus the commission price
                const astrologerShare = parseFloat(rowData.chatPrice) - parseFloat(rowData.commissionPrice);
                return astrologerShare.toFixed(2); 
              }
            },
          // { title: 'Total Charge', render: rowData =>`${rowData.deductedAmount}` },
          { title: 'Total Charge', render: rowData => `${parseFloat(rowData.deductedAmount).toFixed(2)}` },
          { title: 'Amount', render: rowData => parseFloat(rowData.chatPrice).toFixed(2) },
          { title: 'Type', field: 'type' },
          {
            title: "Time",
            field: "updatedAt",
            filtering: false,
            render: (rowData) => {
              if (rowData.updatedAt) {
                return moment(rowData?.createdAt).format("DD-MM-YY HH:mm A");
              }
              return '';
            },
          }
      ]}

    //   data={query =>
    //     new Promise((resolve, reject) => {
    //       console.log("query", query.filters);
    //       const filters = {}

    //       query.filters.map(item => {
    //         if (item.value.length > 0) {
    //           filters[item.column.field] = item.value[0]
    //         }
    //       })
    //       console.log({
    //         page: query.page + 1, // MaterialTable uses 0-indexed pages
    //         limit: query.pageSize === 0 ? 10 : query.pageSize,
    //         ...filters, // Include processed filters
    //         search: query.search,
    //       })

    //       fetch( api_url + get_chat_history, {
    //         method: 'POST', // Specify the request method
    //         headers: {
    //           'Content-Type': 'application/json', // Set the content type to JSON
    //         },
    //         body: JSON.stringify({
    //           page: query.page + 1, // MaterialTable uses 0-indexed pages
    //           limit: query.pageSize === 0 ? 10 : query.pageSize,
    //           ...filters, // Include processed filters
    //           search: query.search,
    //         }), // Convert the request body to JSON
    //       })
    //         .then(response => response.json())
    //         .then(result => {
    //           console.log(result)
    //           resolve({
    //             data: result.data.data, // Adjust based on your API response
    //             page: result.data.pagination.currentPage - 1, // Adjust for 0-indexed pages
    //             totalCount: result.data.pagination.totalCount, // Total number of rows
    //           })
    //         })
    //     })

    //   }

      options={{ ...propStyles.tableStyles,  paging: true, pageSize: 10, pageSizeOptions: [10, 20, 50, 100], filtering: false, exportButton: true, exportAllData: true, }}
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

export default connect(mapStateToProps, mapDispatchToProps)(Earning);