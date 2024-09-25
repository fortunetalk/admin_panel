import React, { useEffect, useState } from "react";
import { propStyles, useStyles } from "../../assets/styles.js";
import {
  Avatar,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress
} from "@mui/material";
import { AddCircleRounded } from "@mui/icons-material";
import MaterialTable from "material-table";

import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { CloseRounded } from "@mui/icons-material";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import * as ExpertiesActions from '../../redux/Actions/expertiesActions.js'

const DisplayExpertise = ({dispatch, expertiesData}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [expertiseId, setExpertiseId] = useState();
  const [expertise, setExpertise] = useState();

  const [error, setError] = useState({});
  const [status,setStatus] = useState("");

  useEffect(function () {
      dispatch(ExpertiesActions.getExpertiesData())

  }, []);


  const handleOpen = (rowData) => {
    setOpen(true);
    setExpertiseId(rowData._id);
    setExpertise(rowData.title);
    setStatus(rowData.status)
  };

  const handleClose = () => {
    setExpertiseId("");
    setExpertise("");
    setStatus("");
    setOpen(false);
  };

  const validation = () => {
    var isValid = true;
    if (!expertise) {
      handleError("expertise", "Please input expertise");
      isValid = false;
    }
    return isValid;
  };

  const handleError = (input, value) => {
    setError((prev) => ({ ...prev, [input]: value }));
  };

  const handleSubmit = async () => {
    if (validation()) {
      const data = {
        title: expertise,
        status: status
      }
      dispatch(ExpertiesActions.updateExperties({data, expertiseId}))
      handleClose()
    }
  };
  const handleOptionChange = (e) => {
    setStatus(e.target.value);
  };

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
        const newStatus = rowData.status === 'Active' ? 'InActive' : 'Active';
        dispatch(ExpertiesActions.updateExpertiesStatus({ expertiseId: rowData._id, status: newStatus }));
      }
    });
  };

  return (
    <div className={classes.container}>
      {!expertiesData ? (
        <CircularProgress />
      ) : (
        <div className={classes.box}>
          {expertiesData && displayTable()}
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
            title="Expertise"
            data={expertiesData}
            columns={[
              {
                title: "S.No",
                editable: "never",
                render: rowData => Array.isArray(expertiesData) ? expertiesData.indexOf(rowData) + 1 : 'N/A'

              },
              { title: "Expertise", field: "title" },

              { title: "Status", field: "status", render: rowData => (
                <div className={classes.statusButton}
                style={{ backgroundColor: rowData.status === 'Active' ? '#90EE90' : '#FF7F7F '}}
                onClick={() => handleClickOpen(rowData)}>
                  {rowData.status}
                </div>
              )},
            ]}
            options={propStyles.tableStyles}
            style={{ fontSize: "1.0rem" }}
            actions={[
              {
                icon: "edit",
                tooltip: "Edit Main Expertise",
                onClick: (event, rowData) => handleOpen(rowData),
              },
              {
                icon: "delete",
                tooltip: "Delete Main Expertise",
                onClick: (event, rowData) => dispatch(ExpertiesActions.deleteExperties({title: rowData?.title, expertiseId: rowData?._id })),
              },
              {
                icon: () => (
                  <div className={classes.addButton}>
                    <AddCircleRounded />
                    <div className={classes.addButtontext}>Add New</div>
                  </div>
                ),
                tooltip: "Add MainExperties",
                isFreeAction: true,
                onClick: () => navigate("/AddExpertise"),
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
              <div className={classes.heading}>Edit Expertise</div>
            </div>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Enter Exprtise"
              error={error.expertise ? true : false}
              helperText={error.expertise}
              value={expertise}
              onFocus={() => handleError("expertise", null)}
              onChange={(event) => setExpertise(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item lg={6} sm={12} md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="select-label">Select Status</InputLabel>
                <Select
                  labelId="select-label"
                  value={status}
                  onChange={handleOptionChange}
                  variant="outlined"
                  error={!!error.status}
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="InActive">InActive</MenuItem>
                </Select>
                <div className={classes.errorstyles}>{error.status}</div>
              </FormControl>
            </Grid>

          <Grid item lg={6} sm={6} md={6} xs={6}>
            <div onClick={handleSubmit} className={classes.submitbutton}>
              Submit
            </div>
          </Grid>
          <Grid item lg={6} sm={6} md={6} xs={6}>
            <div onClick={handleClose} className={classes.denyButton}>
              Cancel
            </div>
          </Grid>
        </Grid>
      );
    };

    return (
      <div>
        <Dialog open={open}>
          <DialogContent>{showEditForm()}</DialogContent>
        </Dialog>
      </div>
    );
  }
};

const mapStateToProps = state =>({
  expertiesData: state.experites.expertiesData
})

const mapDispatchToProps = dispatch =>({dispatch})

export default connect(mapStateToProps, mapDispatchToProps)(DisplayExpertise);
