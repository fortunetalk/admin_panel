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

export const ListAstrology = ({ dispatch, enquiryAstroData }) => {
  var classes = useStyles();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState({
    editModalOpen: false,
    selectedAstro: null,
  });

  useEffect(() => {
    dispatch(AstrologerActions.getEnquiryAstrologers());
  }, []);

  const handleEdit = (rowData) => {
    navigate("/editAstrologer", { state: {astroData: rowData} })
  };

  const handleVerify = (rowData) => {
    Swal.fire({
      title: "Are you sure to verify this Astrologer",
      text: "This Astrologer will be verified for active in App",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: Colors.primaryLight,
      cancelButtonColor: Colors.red_a,
      confirmButtonText: "Verify",
    }).then((result) => {
      if (result.isConfirmed) {
        confirmVerify(rowData);
      }
    });
  };

  const confirmVerify = async (rowData) => {
    var status = rowData.isVerified ? "false" : "true";
    var response = await postData(verify_astrologer, {
      astrologerId: rowData._id,
      isVerified: status,
    });
    if (response.success) {
      Swal.fire({
        title: status ? "Unverified Successfull!" : "Verified Successfull!",
        text: response.message,
        icon: "success",
      });
      // fetch_all_astrologers();
    }
  };

  const handleDelete = (rowData) => {
    Swal.fire({
      title: `Are you sure to Delete ${rowData.skill}`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: Colors.primaryLight,
      cancelButtonColor: Colors.red,
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        confirmDelete(rowData);
      }
    });
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

  const onVerifyStatus = (astroData)=>{
    dispatch(AstrologerActions.updateEnquiryStatus({astrologerId: astroData?._id}))
  }

  const { editModalOpen, selectedAstro } = state;

  return (
    <div className={classes.container}>
      <Loader isVisible={isLoading} />
      <div className={classes.box}>{enquiryAstroData && displayTable()}</div>
    </div>
  );

  function displayTable() {
    return (
      <Grid container spacing={2}>
        <Grid item lg={12} sm={12} md={12} xs={12} style={{ marginTop: 15 }}>
          <MaterialTable
            title="List of Astrologers"
            data={enquiryAstroData}
            columns={[
              {
                title: "S.No",
                editable: "never",
                render: (rowData) => enquiryAstroData.indexOf(rowData) + 1,
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
                    onClick={() => onVerifyStatus(rowData)}
                    style={{
                      backgroundColor: rowData?.enquiry
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
                    {rowData.isVerified ? "Unverify" : "Verify"}
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
                onClick: (event, rowData) => handleDelete(rowData),
              },
            ]}
          />
        </Grid>
      </Grid>
    );
  }

};

const mapStateToProps = (state) => ({
    enquiryAstroData: state.astrologer.enquiryAstroData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(ListAstrology);
