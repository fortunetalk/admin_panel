import React, { useState, useEffect } from "react";
import { useStyles } from "../../assets/styles.js";
import {
  Grid,
  CircularProgress,
  InputAdornment,
  IconButton,
  TextField,
  FormControl,
  FormGroup,
  FormControlLabel,
  FormLabel,
  Checkbox,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import DvrIcon from "@mui/icons-material/Dvr";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import * as Actions from "../../redux/Actions/adminAction.js";

export const EditSubAdmin = ({ dispatch, isLoading, subAdminByIdData }) => {
  const { _id } = useParams();
  const classes = useStyles();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({});
  const [state, setState] = useState({
    userName: "",
    name: "",
    plainPassword: "", // Changed this to plainPassword
    permissions: {
      astrologer: {
        isPermited: false,
        addAstrologer: false,
        listOfAstrologer: {
          isPermited: false,
          updateStatus: false,
          updateChatStatus: false,
          updateCallStatus: false,
          editAstrologer: false,
          viewAstrologer: false,
          deleteAstrologer: false,
        },
      },
    },
  });

  useEffect(() => {
    dispatch(Actions.getSubAdminById({ id: _id }));
  }, [dispatch, _id]);

  useEffect(() => {
    if (subAdminByIdData?.data) {
      const { username, name, permissions, plainPassword } = subAdminByIdData.data;
      setState((prevState) => ({
        ...prevState,
        userName: username,
        name: name,
        plainPassword: plainPassword || "", // Set plainPassword from data
        permissions: {
          astrologer: {
            ...prevState.permissions.astrologer,
            ...permissions.astrologer,
          },
        },
      }));
    }
  }, [subAdminByIdData]);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleError = (field, message) => {
    setError((prevError) => ({ ...prevError, [field]: message }));
  };

  const validation = () => {
    let isValid = true;
    const { userName, name, plainPassword } = state;

    if (!userName) {
      handleError("userName", "Please Enter User Name");
      isValid = false;
    }
    if (!name) {
      handleError("name", "Please Enter Name");
      isValid = false;
    }
    if (!plainPassword) {
      handleError("plainPassword", "Please Enter Password");
      isValid = false;
    }
    return isValid;
  };


  const handleSubmit = async () => {
    if (validation()) {
      const { userName, name, plainPassword, permissions } = state;
      const id = subAdminByIdData?.data?._id; // Get the ID from subAdminByIdData
      const data = { id, username: userName, name, password: plainPassword, permissions }; // Include id in the payload
      dispatch(Actions.subadminUpdate({ data, onAdd: () => navigate("/display-sub-admin") }));
    }
  };

  const updatePermission = (path, value) => {
    setState((prevState) => {
      const updatedState = { ...prevState };
      const keys = path.split(".");
      let current = updatedState;

      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = value;

      return updatedState;
    });
  };

  const { userName, name, permissions, plainPassword } = state;

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item lg={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>Edit SubAdmin Details</div>
              <div onClick={() => navigate("/display-sub-admin")} className={classes.addButton}>
                <DvrIcon />
                <div className={classes.addButtontext}>Display SubAdmins</div>
              </div>
            </div>
          </Grid>
          <Grid item lg={4}>
            <TextField
              label="User Name"
              error={!!error.userName}
              helperText={error.userName}
              value={userName}
              onFocus={() => handleError("userName", null)}
              onChange={(e) => setState({ ...state, userName: e.target.value })}
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item lg={4}>
            <TextField
              label="Name"
              error={!!error.name}
              helperText={error.name}
              value={name}
              onFocus={() => handleError("name", null)}
              onChange={(e) => setState({ ...state, name: e.target.value })}
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item lg={4}>
            <TextField
              label="Password"
              fullWidth
              type={showPassword ? "text" : "password"}
              value={plainPassword} // Use plainPassword here
              onChange={(e) => setState({ ...state, plainPassword: e.target.value })} // Update plainPassword
              variant="outlined"
              error={!!error.plainPassword}
              helperText={error.plainPassword}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePasswordVisibility}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item lg={12}>
  <FormControl component="fieldset" style={{ marginLeft: "10px" }}>
    <FormLabel
      component="legend"
      style={{ fontSize: "20px", fontWeight: "500", color: "black" }}
    >
      Permissions
    </FormLabel>
    <FormGroup aria-label="position" row>
      <div className={classes.chips}>
        <FormControlLabel
          control={
            <Checkbox
              checked={permissions.astrologer.isPermited}
              onChange={() => {
                const isPermited = !permissions.astrologer.isPermited;
                updatePermission("permissions.astrologer.isPermited", isPermited);
                if (!isPermited) {
                  updatePermission("permissions.astrologer.addAstrologer", false);
                  updatePermission("permissions.astrologer.listOfAstrologer.isPermited", false);
                }
              }}
            />
          }
          label={
            <span style={{ fontWeight: "bold", color: "#10395D", fontSize: "14px" }}>
              Astrologer
            </span>
          }
          labelPlacement="end"
        />
      </div>
    </FormGroup>

    <FormGroup aria-label="position" row style={{ marginLeft: "10px", marginRight: "10px" }}>
      <div className={classes.chips}>
        <FormControlLabel
          control={
            <Checkbox
              disabled={!permissions.astrologer.isPermited}
              checked={permissions.astrologer.addAstrologer}
              onChange={() => {
                updatePermission("permissions.astrologer.addAstrologer", !permissions.astrologer.addAstrologer);
              }}
            />
          }
          label={"Add Astrologer"}
          labelPlacement="end"
        />
      </div>
    </FormGroup>

    <FormGroup aria-label="position" row style={{ marginLeft: "10px", marginRight: "10px" }}>
      <div className={classes.chips}>
        <FormControlLabel
          control={
            <Checkbox
              disabled={!permissions.astrologer.isPermited}
              checked={permissions.astrologer.listOfAstrologer.isPermited}
              onChange={() => {
                const isPermited = !permissions.astrologer.listOfAstrologer.isPermited;
                updatePermission("permissions.astrologer.listOfAstrologer.isPermited", isPermited);
                if (!isPermited) {
                  updatePermission("permissions.astrologer.listOfAstrologer.updateStatus", false);
                  updatePermission("permissions.astrologer.listOfAstrologer.updateChatStatus", false);
                  updatePermission("permissions.astrologer.listOfAstrologer.updateCallStatus", false);
                  updatePermission("permissions.astrologer.listOfAstrologer.editAstrologer", false);
                  updatePermission("permissions.astrologer.listOfAstrologer.viewAstrologer", false);
                  updatePermission("permissions.astrologer.listOfAstrologer.deleteAstrologer", false);
                }
              }}
            />
          }
          label={"List of Astrologers"}
          labelPlacement="end"
        />
      </div>
    </FormGroup>

    <FormGroup aria-label="position" row style={{ marginLeft: "30px" }}>
      <div>
        <FormControlLabel
          control={
            <Checkbox
              disabled={!permissions.astrologer.isPermited || !permissions.astrologer.listOfAstrologer.isPermited}
              checked={permissions.astrologer.listOfAstrologer.updateStatus}
              onChange={() => {
                updatePermission("permissions.astrologer.listOfAstrologer.updateStatus", !permissions.astrologer.listOfAstrologer.updateStatus);
              }}
            />
          }
          label={"Update Status"}
          labelPlacement="end"
        />
      </div>
      <div>
        <FormControlLabel
          control={
            <Checkbox
              disabled={!permissions.astrologer.isPermited || !permissions.astrologer.listOfAstrologer.isPermited}
              checked={permissions.astrologer.listOfAstrologer.updateChatStatus}
              onChange={() => {
                updatePermission("permissions.astrologer.listOfAstrologer.updateChatStatus", !permissions.astrologer.listOfAstrologer.updateChatStatus);
              }}
            />
          }
          label={"Update Chat Status"}
          labelPlacement="end"
        />
      </div>
      <div>
        <FormControlLabel
          control={
            <Checkbox
              disabled={!permissions.astrologer.isPermited || !permissions.astrologer.listOfAstrologer.isPermited}
              checked={permissions.astrologer.listOfAstrologer.updateCallStatus}
              onChange={() => {
                updatePermission("permissions.astrologer.listOfAstrologer.updateCallStatus", !permissions.astrologer.listOfAstrologer.updateCallStatus);
              }}
            />
          }
          label={"Update Call Status"}
          labelPlacement="end"
        />
      </div>
      <div>
        <FormControlLabel
          control={
            <Checkbox
              disabled={!permissions.astrologer.isPermited || !permissions.astrologer.listOfAstrologer.isPermited}
              checked={permissions.astrologer.listOfAstrologer.editAstrologer}
              onChange={() => {
                updatePermission("permissions.astrologer.listOfAstrologer.editAstrologer", !permissions.astrologer.listOfAstrologer.editAstrologer);
              }}
            />
          }
          label={"Edit Astrologer"}
          labelPlacement="end"
        />
      </div>
      <div>
        <FormControlLabel
          control={
            <Checkbox
              disabled={!permissions.astrologer.isPermited || !permissions.astrologer.listOfAstrologer.isPermited}
              checked={permissions.astrologer.listOfAstrologer.viewAstrologer}
              onChange={() => {
                updatePermission("permissions.astrologer.listOfAstrologer.viewAstrologer", !permissions.astrologer.listOfAstrologer.viewAstrologer);
              }}
            />
          }
          label={"View Astrologer"}
          labelPlacement="end"
        />
      </div>
      <div>
        <FormControlLabel
          control={
            <Checkbox
              disabled={!permissions.astrologer.isPermited || !permissions.astrologer.listOfAstrologer.isPermited}
              checked={permissions.astrologer.listOfAstrologer.deleteAstrologer}
              onChange={() => {
                updatePermission("permissions.astrologer.listOfAstrologer.deleteAstrologer", !permissions.astrologer.listOfAstrologer.deleteAstrologer);
              }}
            />
          }
          label={"Delete Astrologer"}
          labelPlacement="end"
        />
      </div>
    </FormGroup>
  </FormControl>
</Grid>

          <Grid item lg={6}>
            <div onClick={handleSubmit} className={classes.submitbutton}>
              {isLoading ? <CircularProgress size={24} /> : "Submit"}
            </div>
          </Grid>
          <Grid item lg={6}>
            <div onClick={() => setState({ ...state, plainPassword: "" })} className={classes.denyButton}>
              Reset
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.gift.isLoading,
  subAdminByIdData: state.admin.subAdminByIdData,
});

export default connect(mapStateToProps)(EditSubAdmin);
