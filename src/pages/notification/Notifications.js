import React, { useState, useEffect } from "react";
import { useStyles } from "../../assets/styles.js";
import {
  Avatar,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  OutlinedInput,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { Colors } from "../../assets/styles.js";
import logo_icon from "../../assets/images/logo_icon.png";
import { useLocation, useNavigate } from "react-router-dom";
import { add_notifications, get_all_users } from "../../utils/Constants.js";
import { getData, postData } from "../../utils/FetchNodeServices.js";
import Loader from "../../Components/loading/Loader.js";
import DvrIcon from "@mui/icons-material/Dvr";
import { isValid, set } from "date-fns";
import Swal from "sweetalert2";
import { Description } from "@mui/icons-material";
import { connect } from "react-redux";
import * as CustomerActions from "../../redux/Actions/customerActions.js";
import * as NotificationActions from "../../redux/Actions/notificationActions.js";
import * as AstroActions from "../../redux/Actions/astrologerActions.js";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Notifications = ({ customerListData, astrologerListData, dispatch }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const screenType = location.state && location.state.type;
  const [usersList, setUsersList] = useState([]);
  const [title, setTitle] = useState("");
  const [users, setUsers] = useState([]);
  const [redirectTo, setRedirectTo] = useState("");
  const [text, setText] = useState("");
  const [icon, setIcon] = useState({
    file: logo_icon,
    bytes: "",
  });
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  useEffect(
    function () {
      try {
        if (screenType == "customer" && !customerListData) {
          dispatch(CustomerActions.getAllCustomer());
        } else if (!astrologerListData) {
          dispatch(AstroActions.getAllAstrologer());
        }
      } catch (e) {
        console.log(e);
      }
    },
    [location?.state]
  );

  const handleUsers = (event) => {
    const {
      target: { value },
    } = event;
    if (value.includes("All")) {
      // If "All" is selected, toggle the state of all other users
      const allUserIds = usersList.map((item) => item._id);
      const allSelected = users.length === allUserIds.length;
      setUsers(allSelected ? [] : allUserIds);
    } else {
      // If other values are selected, check if "All" is already selected and deselect it
      const updatedUsers = value.includes("All")
        ? value.filter((item) => item !== "All")
        : value;
      setUsers(updatedUsers);
    }
  };

  const handleIcon = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setIcon({
        file: URL.createObjectURL(e.target.files[0]),
        bytes: e.target.files[0],
      });
      handleError("icon", null);
    }
  };

  const handleError = (input, value) => {
    setError((prev) => ({ ...prev, [input]: value }));
  };

  const validation = () => {
    var isValid = true;
    if (!title) {
      handleError("title", "Please Input Title");
      isValid = false;
    }
    if (!redirectTo) {
      handleError("redirectTo", "Please Select Redirect Page");
      isValid = false;
    }
    if (!text) {
      handleError("text", "Please Input Description");
      isValid = false;
    }
    if (!icon.bytes) {
      handleError("icon", "Please Select Image");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async () => {
    if (validation()) {
      if (screenType == "customer" && customerListData) {
        let customer_ids = [];
        if (users.length == 0) {
          customerListData.map((item) => {
            customer_ids.push(item?._id);
          });
        } else {
          users.map((item) => {
            customer_ids.push(item);
          });
        }
        const data = {
          title: title,
          customerIds: customer_ids,
          description: text,
          redirectTo: redirectTo,
        };
        dispatch(NotificationActions.sendCustomerNotification(data));
      } else if(astrologerListData) {
        let astrloger_ids = [];
        if (users.length == 0) {
          astrologerListData.map((item) => {
            astrloger_ids.push(item?._id);
          });
        } else {
          users.map((item) => {
            astrloger_ids.push(item);
          });
        }
        const data = {
          title: title,
          astrologerIds: astrloger_ids,
          description: text,
          redirectTo: redirectTo,
        };
        dispatch(NotificationActions.sendAstrologerNotification(data));
      }
    }
  };

  return (
    <div className={classes.container}>
      <Loader isVisible={isLoading} />
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>Send Notification</div>
              <div
                onClick={() => navigate("/displayNotifications")}
                className={classes.addButton}
              >
                <DvrIcon />
                <div className={classes.addButtontext}>
                  Display Notifications
                </div>
              </div>
            </div>
          </Grid>

          <Grid item lg={6} sm={12} md={12} xs={12}>
            <TextField
              label="Enter Title"
              error={error.title ? true : false}
              helperText={error.title}
              value={title}
              onFocus={() => handleError("title", null)}
              onChange={(event) => setTitle(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item lg={6} sm={12} md={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="select-label">Users</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={users}
                onChange={handleUsers}
                onFocus={() => handleError("users", null)}
                error={error.users ? true : false}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => {
                  if (selected.includes("All")) {
                    return "All";
                  } else {
                    return selected
                      .map((userId) => {
                        const user = usersList.find(
                          (item) => item._id === userId
                        );
                        return user ? user.customerName : "";
                      })
                      .join(", ");
                  }
                }}
                MenuProps={MenuProps}
              >
                <MenuItem value={"All"}>
                  <Checkbox checked={users.length == usersList.length} />
                  <ListItemText primary={"All"} />
                </MenuItem>
                { screenType == "customer" ? customerListData &&
                  customerListData.map((item) => (
                    <MenuItem key={item._id} value={item._id}>
                      <Checkbox checked={users.indexOf(item._id) > -1} />
                      <ListItemText
                        primary={`${item?.customerName}  ${item.phoneNumber}`}
                      />
                    </MenuItem>
                  )) : astrologerListData && astrologerListData.map((item) => (
                    <MenuItem key={item._id} value={item._id}>
                      <Checkbox checked={users.indexOf(item._id) > -1} />
                      <ListItemText
                        primary={`${item?.astrologerName}  ${item.phoneNumber}`}
                      />
                    </MenuItem>
                  ))}
              </Select>
              <div className={classes.errorstyles}>{error.users}</div>
            </FormControl>
          </Grid>
          <Grid item lg={6} sm={12} md={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="select-label">Redirect Page</InputLabel>
              <Select
                label="Select Option"
                labelId="select-label"
                value={redirectTo}
                onFocus={() => handleError("redirectTo", null)}
                error={error.redirectTo ? true : false}
                onChange={(e) => setRedirectTo(e.target.value)}
                variant="outlined"
              >
                <MenuItem value="Recharge Offers Page">
                  Recharge Offers Page
                </MenuItem>
                <MenuItem value="Free Kundli">Free Kundli</MenuItem>
                <MenuItem value="Astrologer Profile Page">
                  Astrologer Profile Page
                </MenuItem>
              </Select>
              {error.redirectTo && (
                <div className={classes.errorstyles}>{error.redirectTo}</div>
              )}
            </FormControl>
          </Grid>

          <Grid
            item
            lg={2}
            sm={6}
            md={6}
            xs={6}
            className={classes.uploadContainer}
          >
            <Grid
              component="label"
              onClick={handleIcon}
              className={classes.uploadImageButton}
            >
              Upload Image
              <input
                onChange={handleIcon}
                hidden
                accept="image/*"
                type="file"
              />
            </Grid>
            <div className={classes.errorstyles}>{error.icon}</div>
          </Grid>
          <Grid item lg={4} sm={6} md={6} xs={6}>
            <Avatar
              color={Colors.primaryDark}
              src={icon.file}
              style={{ width: 56, height: 56 }}
            />
          </Grid>

          <Grid item lg={12} sm={12} md={12} xs={12}>
            <TextField
              id="outlined-multiline-static"
              label="Text"
              multiline
              rows={4}
              fullWidth
              value={text}
              onChange={(event) => setText(event.target.value)}
              variant="outlined"
              error={error.text ? true : false}
              helperText={error.text}
              onFocus={() => handleError("text", null)}
            />
          </Grid>

          <Grid item lg={6} sm={6} md={6} xs={6}>
            <div onClick={handleSubmit} className={classes.submitbutton}>
              Submit
            </div>
          </Grid>

          <Grid item lg={6} sm={6} md={6} xs={6}>
            <div className={classes.denyButton}>Reset</div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  astrologerListData: state.astrologer.astrologerListData,
  customerListData: state.customer.customerListData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
