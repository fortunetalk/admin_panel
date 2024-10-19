import React, { useEffect } from "react";
import { useStyles } from "../../assets/styles.js";
import {
  Grid,
  CircularProgress,
  InputAdornment,
  IconButton,
  TextField,
  FormControl,
  Checkbox,
  FormGroup,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import DvrIcon from "@mui/icons-material/Dvr";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import * as Actions from "../../redux/Actions/adminAction.js";
import { useState } from "react";

export const ViewSubAdmin = ({ dispatch, subAdminByIdData, isLoading }) => {
  const { _id } = useParams();
  const classes = useStyles();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);


  useEffect(() => {
    dispatch(Actions.getSubAdminById({ id: _id }));
  }, [dispatch, _id]);

  if (isLoading) {
    return <CircularProgress />;
  }

  
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const permissions = subAdminByIdData?.data?.permissions || {
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
  };

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>View SubAdmin Details</div>
              <div
                onClick={() => navigate("/display-sub-admin")}
                className={classes.addButton}
              >
                <DvrIcon />
                <div className={classes.addButtontext}>Display SubAdmins</div>
              </div>
            </div>
          </Grid>
          <Grid item lg={4} md={6} sm={12} xs={12}>
            <TextField
              label="User Name"
              value={subAdminByIdData?.data?.username || ""}
              variant="outlined"
              InputProps={{ readOnly: true }} // Make it read-only
              fullWidth
            />
          </Grid>
          <Grid item lg={4} md={6} sm={12} xs={12}>
            <TextField
              label="Name"
              value={subAdminByIdData?.data?.name || ""}
              variant="outlined"
              InputProps={{ readOnly: true }} // Make it read-only
              fullWidth
            />
          </Grid>
          <Grid item lg={4} sm={6} md={6} xs={6}>
            <TextField
              id="outlined-description-static"
              label="Password"
              fullWidth
              type={showPassword ? "text" : "password"}
              value={subAdminByIdData?.data?.plainPassword || ""}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePasswordVisibility}
                      onMouseDown={(event) => event.preventDefault()} // Prevents focus loss
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>


<Grid item lg={12} sm={12} md={12} xs={12}>
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
          value={permissions.astrologer.isPermited}
          className={classes.checkbox}
          control={
            <Checkbox
              checked={permissions.astrologer.isPermited}
              disabled
            />
          }
          label={
            <span
              style={{
                fontWeight: "bold",
                color: "#10395D",
                fontWeight: "600",
                fontSize: "14px",
              }}
            >
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
          value={"Add Astrologer"}
          className={classes.checkbox}
          control={
            <Checkbox
              disabled={!permissions.astrologer.isPermited}
              checked={permissions.astrologer.addAstrologer}
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
          value={permissions.astrologer.listOfAstrologer.isPermited}
          className={classes.checkbox}
          control={
            <Checkbox
              disabled={!permissions.astrologer.isPermited}
              checked={permissions.astrologer.listOfAstrologer.isPermited}
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
          value={permissions.astrologer.listOfAstrologer.updateStatus}
          control={
            <Checkbox
              disabled={
                !permissions.astrologer.isPermited ||
                !permissions.astrologer.listOfAstrologer.isPermited
              }
              checked={permissions.astrologer.listOfAstrologer.updateStatus}
            />
          }
          label={"Update Status"}
          labelPlacement="end"
        />
      </div>
      <div>
        <FormControlLabel
          value={"Update Chat Status"}
          className={classes.checkbox}
          control={
            <Checkbox
              disabled={
                !permissions.astrologer.isPermited ||
                !permissions.astrologer.listOfAstrologer.isPermited
              }
              checked={permissions.astrologer.listOfAstrologer.updateChatStatus}
            />
          }
          label={"Update Chat Status"}
          labelPlacement="end"
        />
      </div>
      <div>
        <FormControlLabel
          value={"Update Call Status"}
          className={classes.checkbox}
          control={
            <Checkbox
              disabled={
                !permissions.astrologer.isPermited ||
                !permissions.astrologer.listOfAstrologer.isPermited
              }
              checked={permissions.astrologer.listOfAstrologer.updateCallStatus}
            />
          }
          label={"Update Call Status"}
          labelPlacement="end"
        />
      </div>
      <div>
        <FormControlLabel
          value={permissions.astrologer.listOfAstrologer.editAstrologer}
          className={classes.checkbox}
          control={
            <Checkbox
              disabled={
                !permissions.astrologer.isPermited ||
                !permissions.astrologer.listOfAstrologer.isPermited
              }
              checked={permissions.astrologer.listOfAstrologer.editAstrologer}
            />
          }
          label={"Edit Astrologer"}
          labelPlacement="end"
        />
      </div>
      <div>
        <FormControlLabel
          value={permissions.astrologer.listOfAstrologer.viewAstrologer}
          className={classes.checkbox}
          control={
            <Checkbox
              disabled={
                !permissions.astrologer.isPermited ||
                !permissions.astrologer.listOfAstrologer.isPermited
              }
              checked={permissions.astrologer.listOfAstrologer.viewAstrologer}
            />
          }
          label={"View Astrologer"}
          labelPlacement="end"
        />
      </div>
      <div>
        <FormControlLabel
          value={permissions.astrologer.listOfAstrologer.deleteAstrologer}
          className={classes.checkbox}
          control={
            <Checkbox
              disabled={
                !permissions.astrologer.isPermited ||
                !permissions.astrologer.listOfAstrologer.isPermited
              }
              checked={permissions.astrologer.listOfAstrologer.deleteAstrologer}
            />
          }
          label={"Delete Astrologer"}
          labelPlacement="end"
        />
      </div>
    </FormGroup>
  </FormControl>
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

export default connect(mapStateToProps)(ViewSubAdmin);
