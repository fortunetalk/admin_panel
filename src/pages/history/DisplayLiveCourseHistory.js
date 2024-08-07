import React, { useEffect, useState } from "react";
import { useStyles, propStyles } from "../../assets/styles.js";
import { Grid, TextField, InputLabel, Select,FormControl, MenuItem, Avatar } from "@mui/material";
import MaterialTable from "material-table";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { CloseRounded } from "@mui/icons-material";
import Swal from "sweetalert2";
import * as HistoryActions from "../../redux/Actions/historyActions.js";
import Loader from "../../Components/loading/Loader.js";
import { connect } from "react-redux";
import { secondsToHMS } from "../../utils/services.js";
import moment from "moment";

const DisplayLiveCourseHistory = ({ dispatch, liveCourseHistoryData }) => {
  const classes = useStyles();


  useEffect(function () {
    dispatch(HistoryActions.getLiveCourseHistory());
  }, []);


  const handleClickOpen = (rowData) => {
    Swal.fire({
      title: 'Are you sure to Change the Status?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Change it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const newStatus = !rowData.courseCompleted;
        dispatch(HistoryActions.updateLiveCourseHistoryStatus({
          liveCourseId: rowData?.liveId?._id,
          customerId: rowData.customerId._id,
          courseCompleted: newStatus.toString()
        }));
      }
    });
  };

  return (
    <div className={classes.container}>
      <Loader />
      <div className={classes.box}>
        {liveCourseHistoryData && displayTable()}
        {/* {editModal()} */}
      </div>
    </div>
  );
  function displayTable() {
    return (
      <Grid container spacing={1}>
        <Grid item lg={12} sm={12} md={12} xs={12}>
          <MaterialTable
            title="Live Course History"
            data={liveCourseHistoryData}
            columns={[
              {
                title: "S.No",
                editable: "never",
                render: rowData => Array.isArray(liveCourseHistoryData) ? liveCourseHistoryData.indexOf(rowData) + 1 : 'N/A'
              },
              {
                title: "Course Name",
                field: "liveId.courseId.title",
              },
              { title: "Class Name", field: "liveId.className" },
              {
                title: "Astrologer Name",
                field: "liveId.astrologerId.name",
              },
              {
                title: "Customer Email",
                field: "customerId.email",
              },
              {
                title: "Live Class Price",
                field: "liveClassPrice",
              },
              {
                title: "Amount to be Paid",
                field: "amountToBePaid",
              },
              {
                title: "Deducted Amount",
                field: "deductedAmount",
              },
              {
                title: "Half Payment Amount",
                field: "halfPaymentAmount",
              },
              {
                title: "Full Payment Amount",
                field: "fullPaymentAmount",
              },
              {
                title: "Status",
                field: "status",
              },
              { title: "Course Completed", field: "courseCompleted", render: rowData => (
                <div className={classes.statusButton}
                style={{ backgroundColor: rowData.courseCompleted ? '#90EE90' : '#FF7F7F' }}
                onClick={() => handleClickOpen(rowData)}>
                {rowData.courseCompleted.toString()}
              </div>
              )},
              {
                title: "Transaction ID",
                field: "transactionId",
              },

            ]}
            options={{ ...propStyles.tableStyles, filtering: false }}
            // actions={[
            //   {
            //     icon: "visibility",
            //     tooltip: "View Data",
            //     onClick: (event, rowData) => handleView(rowData),
            //   },
            //   {
            //     icon: "delete",
            //     tooltip: "Delete Gift",
            //     onClick: (event, rowData) =>
            //       dispatch(
            //         HistoryActions.deleteLiveClassHistory({
            //           id: rowData?._id,
            //         })
            //       ),
            //   },
            // ]}
          />
        </Grid>
      </Grid>
    );
  }

};

const mapStateToProps = (state) => ({
  liveCourseHistoryData: state.history.liveCourseHistoryData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(DisplayLiveCourseHistory);
