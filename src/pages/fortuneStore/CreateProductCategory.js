import React, { useState, useEffect } from "react";
import { useStyles } from "../../assets/styles.js";
import { Grid, TextField, MenuItem, Select, InputLabel, FormControl, Avatar } from "@mui/material";
import DvrIcon from "@mui/icons-material/Dvr";
import { setProductCategory } from '../../redux/Actions/productCategoryActions.js'
import { Colors } from "../../assets/styles.js";
import { useNavigate } from "react-router-dom";
import { useDispatch,connect } from "react-redux";

export const CreateProductCategory = () => {
  var classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState({ file: "", bytes: null });
  const [file, setFile] = useState(null);

  const [status, setStatus] = useState("");
  const [error, setError] = useState({ title: '', profilePhoto: '', status: '' });


  const handleOptionChange = (e) => {
    setStatus(e.target.value);
    setError({ ...error, status: '' });
  };


  const handleIcon = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setIcon({
        file: URL.createObjectURL(e.target.files[0]),
        bytes: e.target.files[0],
      });
      setFile(e.target.files[0]);
      handleError('icon', null);
    }
  };

  const handleError = (input, value) => {
    setError((prev) => ({ ...prev, [input]: value }));
  };

  const validation = () => {
    var isValid = true;
    if (!title) {
      handleError("title", "Please Enter Title");
      isValid = false;
    }
    if (!status) {
      handleError("status", "Please Select Status");
      isValid = false;
    }
    return isValid;
  };
  
  const handleSubmit = async () => {
    if (validation()) {
      const formData = new FormData();
      formData.append("status", status);
      formData.append("title", title);
  
        formData.append("image", file);
  
      dispatch(setProductCategory(formData));
      navigate('/fortune-store/product-category')
    }
  };
  
  return (
    <>
      <div className={classes.container}>
        <div className={classes.box}>
          <Grid container spacing={2}>
            <Grid item lg={12} sm={12} md={12} xs={12}>
              <div className={classes.headingContainer}>
                <div className={classes.heading}>Add Product Category</div>
                <div
                  onClick={() => navigate("/fortune-store/product-category")}
                  className={classes.addButton}
                >
                  <DvrIcon />
                  <div className={classes.addButtontext}>
                    Display/Create Product Category
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item lg={6} sm={12} md={12} xs={12}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Enter Title"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                error={!!error.title}
                helperText={error.title}
              />
            </Grid>
            <Grid item lg={6} sm={12} md={12} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="select-label">Select</InputLabel>
                <Select
                  label="Select Option"
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
            <Grid
            item
            lg={4}
            sm={6}
            md={4}
            xs={6}
            className={classes.uploadContainer}
          >
            <Grid component="label" className={classes.uploadImageButton}>
              Upload Picture
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
            <Grid item lg={6} sm={12} md={12} xs={12}>
              <div onClick={handleSubmit} className={classes.submitbutton}>
                Submit
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  productCategoryData: state.productCategory?.productCategoryData,
});

const mapDispatchToProps = {
  setProductCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProductCategory);
