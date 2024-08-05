import React, { useEffect, useState } from "react";
import { useStyles, propStyles } from "../../assets/styles.js";
import {
  Grid,
  TextField,
} from "@mui/material";
import MaterialTable from "material-table";
import * as Actions from "../../redux/Actions/demoClassActions.js";
import Loader from "../../Components/loading/Loader.js";
import { connect } from "react-redux";

const BookedDemoClass = ({ dispatch, bookedDemoClassData }) => {
  const classes = useStyles();

  useEffect(function () {
    dispatch(Actions.bookedDemoClassList());
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0] 
  };

  return (
    <div className={classes.container}>
      <Loader />
      <div className={classes.box}>
        {bookedDemoClassData && displayTable()}
      </div>
    </div>
  );
  function displayTable() {
    return (
      <Grid container spacing={1}>
        <Grid item lg={12} sm={12} md={12} xs={12}>
          <MaterialTable
            title="Booked Demo Class Data"
            data={bookedDemoClassData}
            columns={[
              {
                title: "S.No",
                editable: "never",
                render: rowData => Array.isArray(bookedDemoClassData) ? bookedDemoClassData.indexOf(rowData) + 1 : 'N/A'
              },
             
              { title: "Course Name", field: "courseId.title" },
              { title: "Astrologer Display Name", field: "astrologerId.displayName" },
              { title: "Customer Name", field: "customerName" },
              { title: "Mobile Name", field: "mobileNumber" },
              { title: "Class Name", field: "demoClassId.className" },
              { 
                title: "Date", field: "demoClassId.date",
                render: (rowData) => formatDate(rowData.demoClassId.date),
             },
              { title: "Time", field: "demoClassId.time" },
             
            ]}
            options={{ ...propStyles.tableStyles, filtering: false }}
          
          />
        </Grid>
      </Grid>
    );
  }

};

const mapStateToProps = (state) => ({
  bookedDemoClassData: state.demoClass.bookedDemoClassData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(BookedDemoClass);
