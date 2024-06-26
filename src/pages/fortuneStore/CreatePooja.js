import React, { useState, useEffect } from "react";
import { useStyles, Colors } from "../../assets/styles.js";
import {
  Avatar,
  Grid,
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Typography
} from "@mui/material";
import CloseRounded from "@mui/icons-material/CloseRounded";
import { useNavigate } from "react-router-dom";
import logo_icon from "../../assets/images/logo_icon.png";
import DvrIcon from "@mui/icons-material/Dvr";
import { connect } from "react-redux";
import * as PoojaActions from "../../redux/Actions/poojaActions.js";
import {getPoojaCategory} from "../../redux/Actions/poojaCategoryActions.js";

const CreatePooja = ({ dispatch, poojaCategoryData }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  
  const [poojaCategory, setPoojaCategory] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [file, setFile] = useState(null);
  const [icon, setIcon] = useState({ file: logo_icon, bytes: null });
  const [poojaCategoryTitle, setPoojaCategoryTitle] = useState('')
  const [error, setError] = useState({});

  useEffect(() => {
    if (!poojaCategoryData) {
      dispatch(getPoojaCategory());
    }
  }, []);

  function fillPoojaCategoryList() {
    return poojaCategoryData?.map((item) => {
      return <MenuItem value={item._id}>{item.title}</MenuItem>;
    });
  }
  
  const handleError = (input, value) => {
    setError((prev) => ({ ...prev, [input]: value }));
  };

  const handleOptionChange = (e) => {
    setStatus(e.target.value);
  };

  const handleIcon = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setIcon({
        file: URL.createObjectURL(e.target.files[0]),
        bytes: e.target.files[0],
      });
      handleError("icon", null);
      setFile(e.target.files[0]);
    }
  };

  const validation = () => {
    let isValid = true;
    if (!poojaCategory) {
      handleError("poojaCategory", "Please enter product name");
      isValid = false;
    }
    if (!status) {
      handleError("status", "Please select status");
      isValid = false;
    }
    if (!file) {
      handleError("icon", "Please upload an image");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async () => {
    if (validation()) {
      let formData = new FormData();
      formData.append("poojaCategoryId", poojaCategoryTitle);
      formData.append("title", poojaCategory);
      formData.append("image", file);
      formData.append("status", status);
      formData.append("description", description);
      formData.append("shortDescription", shortDescription);

      dispatch(PoojaActions.addPooja(formData));
    }
  };

  const handleReset = () => {
    setPoojaCategory("");
    setStatus("");
    setDescription("");
    setShortDescription("");
    setIcon({ file: logo_icon, bytes: null });
    setFile(null);
    setError({});
  };


  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
          <div className={classes.headingContainer}>
              <div className={classes.heading}>Add Pooja</div>
              <div
                onClick={() => navigate("/fortune-store/pooja")}
                className={classes.addButton}
              >
                <DvrIcon />
                <div className={classes.addButtontext}>Display Pooja</div>
              </div>
            </div>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Select Pooja Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Product Category"
                value={poojaCategoryTitle}
                onFocus={() => handleError("poojaCategoryTitle", null)}
                onChange={(e) => setPoojaCategoryTitle(e.target.value)}
                error={error.poojaCategoryTitle ? true : false}
              >
                <MenuItem disabled value={null}>
                  -Select Skill-
                </MenuItem>
                {fillPoojaCategoryList && fillPoojaCategoryList()}
              </Select>
            </FormControl>
            <div className={classes.errorstyles}>{error.poojaCategoryTitle}</div>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Pooja Name"
              error={error.poojaCategory ? true : false}
              helperText={error.poojaCategory}
              value={poojaCategory}
              onFocus={() => handleError("poojaCategory", null)}
              onChange={(event) => setPoojaCategory(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item lg={6} sm={6} md={12} xs={12}>
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
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
              <div className={classes.errorstyles}>{error.status}</div>
            </FormControl>
          </Grid>
         
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <TextField
              label="Short Description"
              error={error.shortDescription ? true : false}
              helperText={error.shortDescription}
              value={shortDescription}
              onFocus={() => handleError("shortDescription", null)}
              onChange={(event) => setShortDescription(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <TextField
              label="Description"
              error={error.description ? true : false}
              helperText={error.description}
              value={description}
              onFocus={() => handleError("description", null)}
              onChange={(event) => setDescription(event.target.value)}
              variant="outlined"
              fullWidth
              multiline
              rows={4}
            />
          </Grid>

          <Grid
            item
            lg={6}
            sm={6}
            md={4}
            xs={6}
            className={classes.uploadContainer}
          >
            <Grid component="label" className={classes.uploadImageButton}>
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
          <Grid item lg={2} sm={6} md={2} xs={6}>
            <Avatar
              color={Colors.primaryDark}
              src={icon.file}
              style={{ width: 56, height: 56 }}
            />
          </Grid>

          <Grid item lg={6} sm={6} md={6} xs={6}>
            <div onClick={handleSubmit} className={classes.submitbutton}>
              Submit
            </div>
          </Grid>
          <Grid item lg={6} sm={6} md={6} xs={6}>
            <div onClick={handleReset} className={classes.denyButton}>
              Reset
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
    poojaCategoryData: state.poojaCategory?.poojaCategoryData,
  });

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(CreatePooja);
