import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { Grid } from "@mui/material";
import { useStyles, propStyles } from "../../assets/styles.js";
import { connect } from "react-redux";
import * as ReportsActions from '../../redux/Actions/reportsActions.js'
import moment from "moment";


export const ReceiptSummary = ({ dispatch, reciptSummaryData }) => {
  const classes = useStyles();
  const [selectedFromDate, setSelectedFromDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [dateError, setDateError] = useState("");
  const [subSkillsData, setSubSkillsData] = useState([]); // Replace with your actual data

  useEffect(() => {
    dispatch(ReportsActions.getRecieptSummary())
  }, [])

  const handleDateChange = (date, field) => {
    if (field === "fromDate") {
      setSelectedFromDate(date);
    } else if (field === "endDate") {
      setSelectedEndDate(date);
    }
  };

  const handleApply = () => {
    if (selectedFromDate && selectedEndDate) {
      const fromDate = new Date(selectedFromDate);
      const endDate = new Date(selectedEndDate);

      if (fromDate > endDate) {
        setDateError("From Date must be before End Date");
      } else {
        setDateError(""); // Reset error if dates are valid

        setSubSkillsData([]); // Replace with your actual data
      }
    } else {
      setDateError("Please select both From Date and End Date");
    }
  };


  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          {reciptSummaryData && tableInfo()}
          {/* <Grid item lg={3} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>Receipt Summary</div>
            </div>
          </Grid> */}
          {/* <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <Grid item lg={4} sm={12} md={12} xs={12}>
                <label>From Date</label>
                <input
                  type="date"
                  value={selectedFromDate}
                  onChange={(e) => handleDateChange(e.target.value, "fromDate")}
                  style={{ width: "100%", height: "50px" }}
                />
              </Grid>
              <Grid item lg={4} sm={12} md={12} xs={12}>
                <label>End Date</label>
                <input
                  type="date"
                  value={selectedEndDate}
                  onChange={(e) => handleDateChange(e.target.value, "endDate")}
                  style={{ width: "100%", height: "50px" }}
                />
              </Grid>
              <Grid item lg={2} sm={12} md={12} xs={12}>
                <div
                  onClick={handleApply}
                  className={classes.submitbutton}
                >
                  Apply
                </div>
              </Grid>
            </div>



           
          </Grid> */}
        </Grid>
      </div>
    </div>
  );

  function tableInfo(){
    return(
      <Grid item lg={12} sm={12} md={12} xs={12} style={{ marginTop: 15 }}>
      <MaterialTable
        title="Recipt Summary"
        data={reciptSummaryData}
        columns={[
          {
            title: 'S.No',
            editable: 'never',
            render: rowData => reciptSummaryData.indexOf(rowData) + 1
          },
          {
            title: 'Txn Date',
            editable: 'never',
            render: rowData => <div>{moment(rowData?.createdAt).format('DD-MM-YYYY')}</div>
          },
          {
            title: 'Txn id',
            editable: 'never',
            field:'invoiceId'
          },
          {
            title: 'Receipt No',
            editable: 'never',
            field: 'recieptNumber'
          },
          {
            title: 'Customer name',
            editable: 'never',
            field: 'customer.customerName'
          },
          // {
          //   title: 'Country',
          //   editable: 'never',
          //   render: rowData => reciptSummaryData.indexOf(rowData) + 1
          // },
          {
            title: 'Recharge Value',
            editable: 'never',
            field: 'amount'
          },
          // {
          //    title: 'Discount',
          //  editable: 'never',
          //   render: rowData => reciptSummaryData.indexOf(rowData) + 1
          // },
          {
            title: 'Gift/Coupon%',
            editable: 'never',
            field: 'offer'
          },
          {
            title: 'Sub Total',
            editable: 'never',
            field: 'totalAmount'
          },
          {
            title: 'Tax @18%',
            editable: 'never',
            render: rowData => <div>{parseFloat(rowData?.amount * 18/100).toFixed(2)}</div>
          },

          {
            title: 'Total Record',
            editable: 'never',
            render: rowData => <div>{parseFloat(rowData?.amount + (rowData?.amount * 18/100)).toFixed(2)}</div>
          },

          // Add more columns as needed
        ]}
        options={{...propStyles.tableStyles, filtering: false}}
        // actions={[
        //   {
        //     icon: 'edit',
        //     tooltip: 'Edit Skill',

        //   },
        // ]}
      />
    </Grid>
    )
  }

};

const mapStateToProps = state => ({
  reciptSummaryData: state.reports.reciptSummaryData
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(ReceiptSummary); 