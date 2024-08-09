import React, { useEffect, useState } from "react";
import { propStyles, useStyles } from "../../assets/styles.js";
import {
  Avatar,
  Grid,
  CircularProgress
} from "@mui/material";
import MaterialTable from "material-table";
import Swal from "sweetalert2";
import * as Actions from "../../redux/Actions/requestActions.js";
import { connect } from "react-redux";
import { format } from 'date-fns';

const BankRequest = ({
  dispatch,
  bankRequestData,
}) => {
  const classes = useStyles();

  useEffect(function () {
    dispatch(Actions.getBankReqesut());
  }, []);

  const handleAdminStatusChange = (rowData, newStatus) => {
    Swal.fire({
      title: "Are you sure you want to change the Status?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          Actions.updateBankRequest({
            requestId: rowData._id,
            status: newStatus,
          })
        );
      }
    });
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'MMMM dd, yyyy');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return '#90EE90'; // Light Green
      case 'Rejected':
        return '#FF7F7F'; // Light Red
      case 'pending':
        return '#FFD700'; // Gold
      default:
        return '#D3D3D3'; // Light Gray
    }
  };

  return (
    <div className={classes.container}>
      {!bankRequestData ? (
        <CircularProgress />
      ) : (
        <div className={classes.box}>
          {bankRequestData && displayTable()}
        </div>
      )}
    </div>
  );

  function displayTable() {
    return (
      <Grid container spacing={1}>
        <Grid item lg={12} sm={12} md={12} xs={12}>
          <MaterialTable
            title="Bank Request"
            data={bankRequestData}
            columns={[
              {
                title: "S.No",
                editable: "never",
                render: (rowData) =>
                  Array.isArray(bankRequestData)
                    ? bankRequestData.indexOf(rowData) + 1
                    : "N/A",
              },
              // {
              //   title: "Astrologer ID",
              //   field: "astrologerId",
              //   render: rowData => rowData.astrologerId ? rowData.astrologerId : 'N/A'
              // },
              {
                title: "Name",
                field: "accountHolderName"
              },
              {
                title: "Account Number",
                field: "bankAccountNumber"
              },
              {
                title: "Bank Name",
                field: "bankName"
              },
              {
                title: "Account Type",
                field: "accountType"
              },
              {
                title: "IFSC Code",
                field: "ifscCode"
              },
              {
                title: "Request Time",
                field: "createdAt",
                render: (rowData) => formatDate(rowData.createdAt),
              },
              {
                title: "Image",
                field: "astrologerId.profileImage",
                render: (rowData) => (
                  <Avatar
                    src={rowData?.astrologerId?.profileImage}
                    style={{ width: 50, height: 50 }}
                    variant="rounded"
                  />
                ),
              },
              {
                title: 'Status',
                field: 'status',
                render: (rowData) => (
                  <div>
                    <select
                      className={classes.statusDropdown}
                      value={rowData.status}
                      onChange={(e) => handleAdminStatusChange(rowData, e.target.value)}
                      style={{
                        backgroundColor: getStatusColor(rowData.status),
                      }}
                    >
                      <option value="Approved">Approved</option>
                      <option value="pending">Pending</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                ),
              },
            ]}
            options={propStyles.tableStyles}
            style={{ fontSize: "1.4rem" }}
          />
        </Grid>
      </Grid>
    );
  }
};

const mapStateToProps = (state) => ({
  bankRequestData: state.request.bankRequestData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(BankRequest);
