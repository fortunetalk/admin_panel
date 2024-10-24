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

const TopAstrologers = ({ dispatch, topAstrologerData,adminData }) => {
  const { user, type } = adminData || {};
  console.log("topAstrologerData", topAstrologerData);
  var classes = useStyles();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState({
    editModalOpen: false,
    selectedAstro: null,
  });

  useEffect(() => {
    dispatch(AstrologerActions.getTopAstrologers());
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
      <div className={classes.box}>{topAstrologerData && displayTable()}</div>
      {editModalInfo()}
    </div>
  );

  function displayTable() {
    return (
      <Grid container spacing={2}>
        <Grid item lg={12} sm={12} md={12} xs={12} style={{ marginTop: 15 }}>
          <MaterialTable
            title="Top Astrologers"
            data={topAstrologerData}
            columns={[
              {
                title: "S.No",
                editable: "never",
                render: (rowData) => topAstrologerData.indexOf(rowData) + 1,
              },
              {
                title: "Name",
                field: "astrologerId.displayName",
              },
              {
                title: "Mobile",
                field: "astrologerId.phoneNumber",
              },
              
             
            ]}
            options={{ ...propStyles.tableStyles, filtering: false }}
            style={{ fontSize: "1.0rem" }}
            actions={[
              {
                icon: "delete",
                tooltip: "Delete Astrologer",
                onClick: (event, rowData) => {
                  if (
                    type === "subadmin" &&
                    !user.permissions.astrologer?.topAstrologers?.delete
                  ) {
                    alert('You do not have permission to delete.');
                    return;
                  }
                  dispatch( AstrologerActions.deleteTopAstrologers({  topAstrologerId: rowData._id, }) );
                },              
              },
            ]}
          />
          
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
  topAstrologerData: state.astrologer.topAstrologerData,
  adminData: state.admin.adminData,
});

const mapDispatchToProps = (dispatch) => ({dispatch});

export default connect(mapStateToProps, mapDispatchToProps)(TopAstrologers);
