import React, { useEffect, useState } from "react";
import { useStyles, propStyles } from "../../assets/styles.js";
import {
  Grid,
  TextField,
  CircularProgress
} from "@mui/material";
import MaterialTable from "material-table";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { CloseRounded } from "@mui/icons-material";
import Swal from "sweetalert2";
import * as Actions from "../../redux/Actions/liveStreamActions.js";
import Loader from "../../Components/loading/Loader.js";
import { connect } from "react-redux";
import { secondsToHMS } from "../../utils/services.js";
import moment from "moment";

const LiveStream = ({ dispatch, liveStreamData }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [viewData, setViewData] = useState(false);
  const [data, setData] = useState({
    liveId: "",
    name: "",
    astrologerName: "",
    astrologerDisplayName: "",
    startTime: "",
    endTime: "",
    voiceCallPrice: "",
    vedioCallPrice: "",
    commissionVoiceCallPrice: "",
    status: "",
    commissionVideoCallPrice: "",
    totalVoiceCall: "",
    totalVedioCall: "",
    totalGiftShared: "",
    chatId: "",
  });

  useEffect(function () {
    dispatch(Actions.getLiveStream());
  }, []);

  const handleView = (rowData) => {
    setViewData(true);
    setData({
      liveId: rowData?.liveId || "",
      name: rowData?.astrologerId?.name || "",
      astrologerName: rowData?.astrologerId?.name || "",
      astrologerDisplayName: rowData?.astrologerId?.displayName || "",

      startTime: new Date(rowData?.startTime).toLocaleString() || "",
      endTime: new Date(rowData?.endTime).toLocaleString() || "",
      voiceCallPrice: rowData?.voiceCallPrice || "",
      vedioCallPrice: rowData?.vedioCallPrice || "",
      commissionVoiceCallPrice: rowData?.commissionVoiceCallPrice || "",
      status: rowData?.status || "",
      commissionVideoCallPrice: rowData?.commissionVideoCallPrice || "",
      totalVoiceCall: rowData?.totalVoiceCall || "",
      totalVedioCall: rowData?.totalVedioCall || "",
      totalGiftShared: rowData?.totalGiftShared || "",
      chatId: rowData?.chatId || "",
    });
  };

  const handleClose = () => {
    setViewData(false);
  };

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
          Actions.updateLiveStreamStatus({
            liveStreamId: rowData._id,
            status: newStatus,
          })
        );
      }
    });
  };  

  const reverseData = Array.isArray(liveStreamData) ? liveStreamData.slice().reverse() : [];

  return (
    <div className={classes.container}>
      {!liveStreamData ? (
        <CircularProgress />
      ) : (
        <div className={classes.box}>
          {liveStreamData && displayTable()}
          {editModal()}
        </div>
      )}
    </div>
  );
  
  function displayTable() {
    return (
      <Grid container spacing={1}>
        <Grid item lg={12} sm={12} md={12} xs={12}>
          <MaterialTable
            title="Live Stream Data"
            data={reverseData}
            columns={[
              {
                title: "S.No",
                editable: "never",
                render: rowData => Array.isArray(reverseData) ? reverseData.indexOf(rowData) + 1 : 'N/A'
              },
              {
                title: "Astrologer Display Name",
                field: "astrologerId.displayName",
              },
              { title: "Astrologer Name", field: "astrologerId.name" },
              { title: "Session Time", field: "sessionTime" },
              { title: "Duration", field: "liveDuration" },
              
              {
                title: "Start Time",
                render: (rowData) => (
                  <div>
                    {rowData?.startTime ? rowData?.startTime && moment(rowData?.startTime).format("HH:mm:ss A"): "N/A"}
                  </div>
                ),
              },
              {
                title: "End time",
                render: (rowData) => (
                  <div>
                    {rowData?.endTime? rowData?.endTime &&
                      moment(rowData?.endTime).format("HH:mm:ss A")
                    : "N/A"}
                  </div>
                ),
              },
              // {
              //   title: "Date",
              //   render: (rowData) => (
              //     <div>
              //       {rowData?.endTime &&
              //         moment(rowData?.createdAt).format("DD-MM-YYYY")}
              //     </div>
              //   ),
              // },
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
                        backgroundColor:
                          rowData.status === 'Created'
                            ? '#90EE90' // Light Green
                            : rowData.status === 'Completed'
                            ? '#FF7F7F' // Light Red
                            : rowData.status === 'Ongoing'
                            ? '#FFD700' // Gold
                            : '#D3D3D3', 
                      }}
                    >
                      <option value="Created">Created</option>
                      <option value="Completed">Completed</option>
                      <option value="Ongoing">Ongoing</option>
                    </select>
                  </div>
                ),
              },
            ]}
            options={{ ...propStyles.tableStyles, filtering: false }}
            actions={[
              {
                icon: "visibility",
                tooltip: "View Data",
                onClick: (event, rowData) => handleView(rowData),
              },
              {
                icon: "delete",
                tooltip: "Delete Data",
                onClick: (event, rowData) =>
                  dispatch(
                    Actions.deleteLiveStream({
                      liveStreamId: rowData?._id,
                    })
                  ),
              },
         
            ]}
          />
        </Grid>
      </Grid>
    );
  }

  function editModal() {
    const showEditForm = () => {
      return (
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>Live Stream Data</div>
              <div onClick={handleClose} className={classes.closeButton}>
                <CloseRounded />
              </div>
            </div>
          </Grid>
        
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Transaction ID"
              value={data.liveId}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          
       
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Customer Name"
              value={data.name}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
         
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Astrologer Name"
              value={data.astrologerName}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Astrologer Display Name"
              value={data.astrologerDisplayName}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Start Time"
              value={data.startTime}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="End Time"
              value={data.endTime}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Voice Call Price"
              value={data.voiceCallPrice}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Video Call Price"
              value={data.vedioCallPrice}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Voice Call Price Commission"
              value={data.commissionVoiceCallPrice}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Video Call Price Commission"
              value={data.commissionVideoCallPrice}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Total Voice Call"
              value={data.totalVoiceCall}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Total Video Call"
              value={data.totalVedioCall}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Total Gift Shared"
              value={data.totalGiftShared}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Status"
              value={data.status}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
        </Grid>
      );
    };

    return (
      <div>
        <Dialog open={viewData}>
          <DialogContent>{showEditForm()}</DialogContent>
        </Dialog>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  liveStreamData: state.liveStream.liveStreamData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(LiveStream);
