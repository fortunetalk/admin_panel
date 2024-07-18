import React, { useEffect, useState } from "react";
import { propStyles, useStyles } from "../../assets/styles.js";
import {
  Avatar,
  Grid,
  Box
} from "@mui/material";
import MaterialTable from "material-table";
import Swal from "sweetalert2";
import * as Actions from "../../redux/Actions/requestActions.js";
import { connect } from "react-redux";
import { format } from 'date-fns';

const GalleryRequest = ({
  dispatch,
  galleryRequestData,
}) => {
  const classes = useStyles();

  useEffect(function () {
    dispatch(Actions.getGalleryReqesut());
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
          Actions.updateGalleryRequest({
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
      <div className={classes.box}>
        {galleryRequestData && displayTable()}
      </div>
    </div>
  );

  function displayTable() {
    return (
      <Grid container spacing={1}>
        <Grid item lg={12} sm={12} md={12} xs={12}>
          <MaterialTable
            title="Bank Request"
            data={galleryRequestData}
            columns={[
              {
                title: "S.No",
                editable: "never",
                render: (rowData) =>
                  Array.isArray(galleryRequestData)
                    ? galleryRequestData.indexOf(rowData) + 1
                    : "N/A",
              },
              // {
              //   title: "Astrologer ID",
              //   field: "astrologerId",
              //   render: rowData => rowData.astrologerId ? rowData.astrologerId : 'N/A'
              // },
            
              {
                title: "Image",
                field: "astrologerId.galleryImage",
                render: (rowData) => (
                  <Box display="flex" gap={1}>
                    {rowData?.galleryImage?.map((image, index) => (
                      <Avatar
                        key={index}
                        src={image}
                        style={{ width: 50, height: 50 }}
                        variant="rounded"
                      />
                    ))}
                  </Box>
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
  galleryRequestData: state.request.galleryRequestData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(GalleryRequest);
