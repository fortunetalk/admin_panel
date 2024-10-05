import React, { useEffect, useState } from "react";
import { propStyles, useStyles } from "../../../assets/styles.js";
import {
  Grid,
  TextField,
  Dialog,
  DialogContent,
  Button,
  CircularProgress
} from "@mui/material";
import { AddCircleRounded, CloseRounded } from "@mui/icons-material";
import MaterialTable from "material-table";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { connect, useDispatch } from "react-redux";
import {
  getBlogs,
  updateBlog,
  deleteBlog,
  updateBlogStatus
} from "../../../redux/Actions/blogActions.js";
import { getBlogCategory } from "../../../redux/Actions/blogCategoryActions.js";

const InternationalPricing = ({
  appBlogData,
  getBlogs,
  updateBlog,
  deleteBlog,
  updateBlogStatus,
  appBlogCategoryData,
  getBlogCategory
}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [internationalPricing, setInternationalPricing] = useState({
    countryCode: "",
    countryName: "",
    countryCurrency: "",
    countryPrice: "",
    multiplier: "",
  });
  const [open, setOpen] = useState(false);
  const [error, setError] = useState({});

  useEffect(() => {
    if (!appBlogData) {
      dispatch(getBlogs());
    }
  }, [dispatch, appBlogData]);

  useEffect(() => {
    dispatch(getBlogCategory());
  }, [dispatch]);

  const handleOpen = (rowData) => {
    setOpen(true);
    setInternationalPricing({
      countryCode: rowData?.countryCode || "",
      countryName: rowData?.countryName || "",
      countryCurrency: rowData?.countryCurrency || "",
      countryPrice: rowData?.countryPrice || "",
      multiplier: rowData?.multiplier || "",
    });
  };

  const handleClose = () => {
    setOpen(false);
    setInternationalPricing({
      countryCode: "",
      countryName: "",
      countryCurrency: "",
      countryPrice: "",
      multiplier: "",
    });
  };

  const handleUpdate = () => {
    const { countryCode, countryName, countryCurrency, countryPrice, multiplier } = internationalPricing;

    if (countryCode && countryName && countryCurrency && countryPrice) {
      dispatch(updateBlog(internationalPricing));
      setOpen(false);
    } else {
      Swal.fire({
        icon: "error",
        title: "Failed to Update",
        text: "All fields are required",
      });
    }
  };

  const displayTable = () => (
    <Grid container spacing={1}>
      <Grid item lg={12} sm={12} md={12} xs={12}>
        <MaterialTable
          title="International Pricing"
          data={appBlogData}
          columns={[
            { title: "S.No", render: rowData => appBlogData.indexOf(rowData) + 1 },
            { title: "Country Code", field: "countryCode" },
            { title: "Country Name", field: "countryName" },
            { title: "Country Currency", field: "countryCurrency" },
            { title: "Country Price", field: "countryPrice" },
            { title: "Multiplier", field: "multiplier" },
          ]}
          options={propStyles.tableStyles}
          actions={[
            {
              icon: "edit",
              tooltip: "Edit Blog",
              onClick: (event, rowData) => handleOpen(rowData),
            },
            {
              icon: "delete",
              tooltip: "Delete Blog",
              onClick: (event, rowData) => dispatch(deleteBlog({ blogId: rowData?._id })),
            },
            {
              icon: () => (
                <div className={classes.addButton}>
                  <AddCircleRounded />
                  <div className={classes.addButtontext}>Add New</div>
                </div>
              ),
              tooltip: "Add Blog",
              isFreeAction: true,
              onClick: () => navigate("/add-international-prices"),
            },
          ]}
        />
      </Grid>
    </Grid>
  );

  const editModal = () => (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>Edit International Prices</div>
              <div onClick={handleClose} className={classes.closeButton}>
                <CloseRounded />
              </div>
            </div>
          </Grid>
          <Grid item lg={6} sm={12} md={12} xs={12}>
            <TextField
              label="Country Code"
              value={internationalPricing.countryCode}
              variant="outlined"
              type="text" // Keep type as text to allow special characters
              fullWidth
              onChange={(e) => {
                const value = e.target.value;
                if (/^[\d+]*$/.test(value)) {
                  setInternationalPricing(prev => ({ ...prev, countryCode: value }));
                }
              }}
              InputProps={{ style: { color: 'black' } }}
            />
          </Grid>
          <Grid item lg={6} sm={12} md={12} xs={12}>
            <TextField
              label="Country Name"
              value={internationalPricing.countryName}
              variant="outlined"
              fullWidth
              onChange={(e) => setInternationalPricing(prev => ({ ...prev, countryName: e.target.value }))}
              InputProps={{ style: { color: 'black' } }}
            />
          </Grid>
          <Grid item lg={6} sm={12} md={12} xs={12}>
            <TextField
              label="Country Currency"
              value={internationalPricing.countryCurrency}
              variant="outlined"
              fullWidth
              onChange={(e) => setInternationalPricing(prev => ({ ...prev, countryCurrency: e.target.value }))}
              InputProps={{ style: { color: 'black' } }}
            />
          </Grid>
          <Grid item lg={6} sm={12} md={12} xs={12}>
            <TextField
              label="Country Price"
              value={internationalPricing.countryPrice}
              variant="outlined"
              type="number"
              fullWidth
              onChange={(e) => setInternationalPricing(prev => ({ ...prev, countryPrice: e.target.value }))}
              InputProps={{ style: { color: 'black' } }}
            />
          </Grid>
          <Grid item lg={6} sm={12} md={12} xs={12}>
            <TextField
              label="Multiplier"
              value={internationalPricing.multiplier}
              variant="outlined"
              type="number"
              fullWidth
              onChange={(e) => setInternationalPricing(prev => ({ ...prev, multiplier: e.target.value }))}
              InputProps={{ style: { color: 'black' } }}
            />
          </Grid>
          <Grid item lg={6} sm={12} md={12} xs={12}>
           
          </Grid>
          <Grid item lg={6} sm={6} md={6} xs={6}>
            <div onClick={handleUpdate} className={classes.submitbutton}>
              Submit
            </div>
          </Grid>
          <Grid item lg={6} sm={6} md={6} xs={6}>
            <div onClick={handleClose} className={classes.denyButton}>
              Reset
            </div>
          </Grid>
          {/* <Grid item lg={12} sm={12} md={12} xs={12} container justifyContent="center" alignItems="center">
            <Button onClick={handleUpdate} variant="contained" color="primary" style={{ marginRight: "10px" }}>
              Submit
            </Button>
            <Button onClick={handleClose} variant="outlined" color="secondary">
              Reset
            </Button>
          </Grid> */}
        </Grid>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className={classes.container}>
      {!appBlogData ? <CircularProgress /> : (
        <div className={classes.box}>
          {displayTable()}
          {editModal()}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  appBlogData: state.blog?.appBlogData,
  appBlogCategoryData: state.blogCategory?.appBlogCategoryData
});

const mapDispatchToProps = (dispatch) => ({
  getBlogs: () => dispatch(getBlogs()),
  updateBlog: (data) => dispatch(updateBlog(data)),
  deleteBlog: (id) => dispatch(deleteBlog(id)),
  updateBlogStatus: (statusData) => dispatch(updateBlogStatus(statusData)),
  getBlogCategory: () => dispatch(getBlogCategory()),
});

export default connect(mapStateToProps, mapDispatchToProps)(InternationalPricing);
