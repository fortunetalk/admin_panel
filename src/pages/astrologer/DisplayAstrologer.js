import React, { useEffect, useState } from "react";
import { Colors, propStyles, useStyles } from "../../assets/styles.js";
import MaterialTable from "material-table";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Modal,
  TextField,
  Typography,
  DialogActions,
  DialogContentText,
  DialogContent,
  DialogTitle,
  Dialog,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getData, postData } from "../../utils/FetchNodeServices.js";
import {
  base_url,
  delete_astrologer,
  get_all_astrologers,
  verify_astrologer,
} from "../../utils/Constants.js";
import Swal from "sweetalert2";
import Loader from "../../Components/loading/Loader.js";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  getAllAstrologer,
  updateAstrologerChatStatus,
  updateAstrologerCallStatus,
  deleteAstrologer,
  verifyUnverifyAstrologer,
  updateAstrologerStatus,
} from "../../redux/Actions/astrologerActions.js";

const ListAstrology = ({ astrologerListData }) => {
  const dispatch = useDispatch();
  var classes = useStyles();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState({
    editModalOpen: false,
    viewModalOpen: false,
    selectedAstro: null,
  });

  useEffect(() => {
    dispatch(getAllAstrologer());
  }, []);

  const handleEdit = (astrologerId) => {
    // const selectedAstro = astrologerListData.find(astro => astro._id === astrologerId);
    // updateState({ editModalOpen: true, selectedAstro });
    navigate(`/editAstrologer/${astrologerId}`);
  };

  const handleView = (rowData) => {
    updateState({ viewModalOpen: true, selectedAstro: rowData });
  };

  const handleHistory = (rowData) => {
    // Add your history logic here
  };

  const handleViewClose = (event) => {
    if (event.target === event.currentTarget) {
      updateState({ viewModalOpen: false });
    }
  };

  const updateState = (data) => {
    setState((prevState) => {
      const newData = { ...prevState, ...data };
      return newData;
    });
  };

  const { editModalOpen, viewModalOpen, selectedAstro } = state;

  const handleClickOpen = (rowData) => {
    Swal.fire({
      title: "Are you sure to Change the Status?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Change it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const newStatus = rowData.status === "Active" ? "Blocked" : "Active";
        dispatch(
          updateAstrologerStatus({
            astrologerId: rowData._id,
            status: newStatus,
          })
        );
      }
    });
  };

  const handleChangeCallStatus = (rowData) => {
    Swal.fire({
      title: "Are you sure to Change the Call Status?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Change it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const newStatus =
          rowData.callStatus === "Online" ? "Offline" : "Online";
        dispatch(
          updateAstrologerCallStatus({
            astrologerId: rowData._id,
            callStatus: newStatus,
          })
        );
      }
    });
  };
  const handleChangeChatStatus = (rowData) => {
    Swal.fire({
      title: "Are you sure to Change the Chat Status?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Change it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const newStatus =
          rowData.chatStatus === "Online" ? "Offline" : "Online";
        dispatch(
          updateAstrologerChatStatus({
            astrologerId: rowData._id,
            chatStatus: newStatus,
          })
        );
      }
    });
  };

  return (
    <div className={classes.container}>
      {/* <Loader isVisible={isLoading} /> */}
      <div className={classes.box}>{astrologerListData && displayTable()}</div>
      {viewModalInfo()}
    </div>
  );

  function displayTable() {
    return (
      <Grid container spacing={2}>
        <Grid item lg={12} sm={12} md={12} xs={12} style={{ marginTop: 15 }}>
          <MaterialTable
            title="List of Astrologers"
            data={astrologerListData}
            columns={[
              {
                title: "S.No",
                editable: "never",
                render: (rowData) => astrologerListData.indexOf(rowData) + 1,
              },
              {
                title: "Display Name",
                field: "displayName",
              },
              {
                title: "Email",
                field: "email",
              },
              {
                title: "Mobile",
                field: "phoneNumber",
              },
              {
                title: "Wallet",
                field: "wallet_balance",
              },
              {
                title: "Status",
                field: "status",
                render: (rowData) => (
                  <div
                    className={classes.statusButton}
                    style={{
                      backgroundColor:
                        rowData.status === "Blocked" ? "#90EE90" : "#FF7F7F ",
                    }}
                    onClick={() => handleClickOpen(rowData)}
                  >
                    {rowData.status}
                  </div>
                ),
              },

              {
                title: "Call",
                field: "callStatus",
                render: (rowData) => (
                  <div
                    className={classes.statusButton}
                    style={{
                      backgroundColor:
                        rowData.callStatus === "Online"
                          ? "#90EE90"
                          : "#FF7F7F ",
                    }}
                    onClick={() => handleChangeCallStatus(rowData)}
                  >
                    {rowData.callStatus}
                  </div>
                ),
              },

              {
                title: "Chat",
                field: "chatStatus",
                render: (rowData) => (
                  <div
                    className={classes.statusButton}
                    style={{
                      backgroundColor:
                        rowData.chatStatus === "Online"
                          ? "#90EE90"
                          : "#FF7F7F ",
                    }}
                    onClick={() => handleChangeChatStatus(rowData)}
                  >
                    {rowData.chatStatus}
                  </div>
                ),
              },
            ]}
            options={{ ...propStyles.tableStyles, filtering: false }}
            style={{ fontSize: "1.4rem" }}
            actions={[
              {
                icon: "edit",
                tooltip: "Edit Skill",
                onClick: (event, rowData) => handleEdit(rowData._id),
              },
              {
                icon: "delete",
                tooltip: "Delete Astrologer",
                onClick: (event, rowData) =>
                  dispatch(deleteAstrologer({ astrologerId: rowData._id })),
              },
              {
                icon: "visibility",
                tooltip: "View Astrologer",
                onClick: (event, rowData) => handleView(rowData),
              },
              {
                icon: "history",
                tooltip: "View History",
                onClick: (event, rowData) => handleHistory(rowData),
              },
            ]}
          />
        </Grid>
      </Grid>
    );
  }

  function viewModalInfo() {
    return (
      <Modal
        open={viewModalOpen}
        onClose={handleViewClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClick={() => updateState({ viewModalOpen: false })}
      >
        <div
          style={{
            display: "flex",
            flex: 1,
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#fff",
              padding: "10px",
              width: "60%",
              maxHeight: "90%",
              overflowY: "auto",
              outline: 0,
            }}
            // onClick={(e) => e.stopPropagation()}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ margin: "1rem" }}
            >
              Astrologer Details
            </Typography>
            {selectedAstro && (
              <form noValidate autoComplete="off">
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Display Name"
                      value={selectedAstro.displayName}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Name"
                      value={selectedAstro.name}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      value={selectedAstro.email}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone"
                      value={`${selectedAstro.phoneCode} ${selectedAstro.phoneNumber}`}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Gender"
                      value={selectedAstro.gender}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Date of Birth"
                      value={new Date(
                        selectedAstro.dateOfBirth
                      ).toLocaleDateString()}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Experience"
                      value={selectedAstro.experience}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Address"
                      value={selectedAstro.address}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Country"
                      value={selectedAstro.country}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="State"
                      value={selectedAstro.state}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="City"
                      value={selectedAstro.city}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Zip Code"
                      value={selectedAstro.zipCode}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Languages"
                      value={selectedAstro.language.join(", ")}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="About"
                      value={selectedAstro.about}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Education Qualification"
                      value={selectedAstro.educationQualification}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Astrology Qualification"
                      value={selectedAstro.astrologyQualification}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Follower Count"
                      value={selectedAstro.follower_count}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Rating"
                      value={selectedAstro.rating}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Average Rating"
                      value={selectedAstro.avgRating}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Bank Account Number"
                      value={selectedAstro.bankAcountNumber}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Bank Name"
                      value={selectedAstro.bankName}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Account Type"
                      value={selectedAstro.accountType}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="IFSC Code"
                      value={selectedAstro.ifscCode}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Account Holder Name"
                      value={selectedAstro.accouuntHolderName}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Aadhar Number"
                      value={selectedAstro.addharNumber}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="PAN Number"
                      value={selectedAstro.panNumber}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Chat Price"
                      value={selectedAstro.chatPrice}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Company Chat Price"
                      value={selectedAstro.companyChatPrice}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Call Price"
                      value={selectedAstro.callPrice}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Company Call Price"
                      value={selectedAstro.companyCallPrice}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Live Video Price"
                      value={selectedAstro.liveVideoPrice}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Company Live Video Price"
                      value={selectedAstro.companyLiveVideoPrice}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Live Call Price"
                      value={selectedAstro.liveCallPrice}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Company Live Call Price"
                      value={selectedAstro.companyLiveCallPrice}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Astrologer Type"
                      value={selectedAstro.astrologerType}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Status"
                      value={selectedAstro.status}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Wallet Balance"
                      value={selectedAstro.wallet_balance}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid container spacing={2} sx={{ margin: "10px" }}>
                    {/* Profile Image */}
                    <Grid item xs={12} sm={3}>
                      <label htmlFor="">Profile Image</label>
                      <Avatar
                        src={selectedAstro.profileImage}
                        variant="square"
                        style={{
                          width: "100%",
                          height: "100px",
                          objectFit: "cover",
                        }}
                      />
                    </Grid>

                    {/* ID Proof Image */}
                    <Grid item xs={12} sm={3}>
                      <label htmlFor="">ID Proof Image</label>
                      <Avatar
                        src={selectedAstro.idProofImage}
                        variant="square"
                        style={{
                          width: "100%",
                          height: "100px",
                          objectFit: "cover",
                        }}
                      />
                    </Grid>

                    {/* Bank Proof Image */}
                    <Grid item xs={12} sm={3}>
                      <label htmlFor="">Bank Proof Image</label>
                      <Avatar
                        src={selectedAstro.bankProofImage}
                        variant="square"
                        style={{
                          width: "100%",
                          height: "100px",
                          objectFit: "cover",
                        }}
                      />
                    </Grid>
                  </Grid>
                  {/* Gallery Images */}
                  <Grid container spacing={2} sx={{ marginLeft: "10px" }}>
                    {selectedAstro.galleryImage.map((image, index) => (
                      <Grid item xs={12} sm={3} key={index}>
                        <label htmlFor="">Gallery Image {index + 1}</label>
                        <Avatar
                          src={image}
                          variant="square"
                          style={{
                            width: "100%",
                            height: "100px",
                            objectFit: "cover",
                          }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </form>
            )}
          </Box>
        </div>
      </Modal>
    );
  }
};

const mapStateToProps = (state) => ({
  astrologerListData: state.astrologer.astrologerListData,
});

const mapDispatchToProps = (dispatch) => ({
  getAllAstrologer: () => dispatch(getAllAstrologer()),
  updateAstrologerChatStatus: (data) =>
    dispatch(updateAstrologerChatStatus(data)),
  updateAstrologerCallStatus: (data) =>
    dispatch(updateAstrologerCallStatus(data)),
  deleteAstrologer: (data) => dispatch(deleteAstrologer(data)),
  verifyUnverifyAstrologer: (data) => dispatch(verifyUnverifyAstrologer(data)),
  updateAstrologerStatus,
});

export default connect(mapStateToProps, mapDispatchToProps)(ListAstrology);
