import React, { useEffect, useState } from "react";
import { Colors, propStyles, useStyles } from "../../assets/styles.js";
import MaterialTable from "material-table"; // Import MaterialTable
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Grid,
  Modal,
  Typography,
  colors,
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
import { connect } from "react-redux";
import * as AstrologerActions from "../../redux/Actions/astrologerActions.js";

const data = [
  { id: 1, name: "aru" },
  { id: 2, name: "ritik" },
];

const TopAstrologers = ({ dispatch, astrologerListData }) => {
  var classes = useStyles();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState({
    editModalOpen: false,
    selectedAstro: null,
  });

  useEffect(() => {
    dispatch(AstrologerActions.getAllAstrologer());
  }, []);

  const handleEdit = (rowData) => {
    updateState({ editModalOpen: true, selectedAstro: rowData });
  };

  const confirmDelete = async (rowData) => {
    setIsLoading(true);
    var response = await postData(delete_astrologer, {
      astrologerId: rowData._id,
    });
    setIsLoading(false);
    if (response.success) {
      Swal.fire({
        title: "Deleted!",
        text: "Astrologer has been deleted.",
        icon: "success",
      });
      // fetch_all_astrologers();
    } else {
      Swal.fire({
        title: "Failed",
        text: "Failed to Delete the AStrologer",
        icon: "error",
      });
    }
  };

  const updateState = (data) => {
    setState((prevState) => {
      const newData = { ...prevState, ...data };
      return newData;
    });
  };

  const { editModalOpen, selectedAstro } = state;

  return (
    <div className={classes.container}>
      <Loader isVisible={isLoading} />
      <div className={classes.box}>{astrologerListData && displayTable()}</div>
      {editModalInfo()}
    </div>
  );

  function displayTable() {
    return (
      <Grid container spacing={2}>
        <Grid item lg={12} sm={12} md={12} xs={12} style={{ marginTop: 15 }}>
          {/* <MaterialTable
            title="Top Astrologers"
            data={astrologerListData}
            columns={[
              {
                title: "S.No",
                editable: "never",
                render: (rowData) => astrologerListData.indexOf(rowData) + 1,
              },
              {
                title: "Name",
                field: "astrologerName",
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
                title: "Experience",
                field: "experience",
              },
              // {
              //   title: "Profile",
              //   field: "profileImage",
              //   render: (rowData) => (
              //     <Avatar
              //       src={base_url + rowData.profileImage}
              //       style={{ width: 50, height: 50 }}
              //       variant="rounded"
              //     />
              //   ),
              // },
              {
                title: "Wallet",
                field: "wallet_balance",
              },
              {
                title: "Chat Price",
                field: "chat_price",
              },
              {
                title: "Call Price",
                field: "call_price",
              },
              {
                title: "Verify",
                field: "isVerified",
                render: (rowData) => (
                  <div
                    onClick={() =>
                      dispatch(
                        AstrologerActions.verifyUnverifyAstrologer({
                          isVerified: rowData.isVerified ? "false" : "true",
                          astrologerId: rowData?._id,
                        })
                      )
                    }
                    style={{
                      backgroundColor: !rowData.isVerified
                        ? Colors.red_a
                        : Colors.greenLight,

                      color: Colors.white,
                      textAlign: "center",
                      padding: 5,
                      fontSize: "1.2rem",
                      fontFamily: "Philospher",
                      borderRadius: 5,
                      cursor: "pointer",
                    }}
                  >
                    {rowData.isVerified ? "Verified" : "Unverified"}
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
                onClick: (event, rowData) => handleEdit(rowData),
              },
              {
                icon: "delete",
                tooltip: "Delete Astrologer",
                onClick: (event, rowData) =>
                  dispatch(
                    AstrologerActions.deleteAstrologer({
                      astrologerId: rowData._id,
                    })
                  ),
              },
            ]}
          /> */}
          <div >
          <h3> Coming Soon </h3>
          </div>
        </Grid>
      </Grid>
    );
  }

  function editModalInfo() {
    const on_chat_status_change = () => {
      updateState({ editModalOpen: false });
      dispatch(
        AstrologerActions.updateAstrologerChatStatus({
          astrologerId: selectedAstro?._id,
          chat_status:
            selectedAstro?.chat_status == "online" ? "offline" : "online",
        })
      );
    };

    const on_call_status_change = () => {
      updateState({ editModalOpen: false });
      dispatch(
        AstrologerActions.updateAstrologerCallStatus({
          astrologerId: selectedAstro?._id,
          call_status:
            selectedAstro?.call_status == "online" ? "offline" : "online",
        })
      );
    };

    return (
      <Modal
        open={editModalOpen}
        onClose={() => updateState({ editModalOpen: false })}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
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
          <Box sx={{ backgroundColor: "#fff", padding: "10px", width: "40%" }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {selectedAstro?.astrologerName}
            </Typography>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Button
                style={{
                  width: "28%",
                  backgroundColor:
                    selectedAstro?.chat_status == "online" ? "green" : "red",
                  color: "#fff",
                }}
                onClick={() => on_chat_status_change()}
              >
                Chat Status
              </Button>
              <Button
                style={{
                  width: "28%",
                  backgroundColor:
                    selectedAstro?.call_status == "online" ? "green" : "red",
                  color: "#fff",
                }}
                onClick={() => on_call_status_change()}
              >
                Call Status
              </Button>
              <Button
                onClick={() =>
                  navigate("/editAstrologer", {
                    state: { astroData: selectedAstro },
                  })
                }
                style={{ width: "28%" }}
              >
                Edit
              </Button>
            </div>
          </Box>
        </div>
      </Modal>
    );
  }
};

const mapStateToProps = (state) => ({
  astrologerListData: state.astrologer.astrologerListData,
});

const mapDispatchToProps = (dispatch) => ({dispatch});

export default connect(mapStateToProps, mapDispatchToProps)(TopAstrologers);
