import React, { useEffect, useState } from "react";
import { Colors, propStyles, useStyles } from "../../assets/styles.js";
import { Avatar, Grid, Button, TextField, InputLabel, FormControl, MenuItem, Select } from "@mui/material";
import { AddCircleRounded, Close } from "@mui/icons-material";
import MaterialTable from "material-table";
import logo_icon from "../../assets/images/logo_icon.png";

import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import {DialogContent, CircularProgress } from "@mui/material";
import Swal from "sweetalert2";
import Loader from "../../Components/loading/Loader.js";
import { connect, useDispatch } from "react-redux";
import { getAllAstrologer } from "../../redux/Actions/astrologerActions.js";
import { getProductCategory } from "../../redux/Actions/productCategoryActions.js";
import { getPoojaCategory } from "../../redux/Actions/poojaCategoryActions.js";
import {getRedirectionBanners, updateRedirectBannerStatus, deleteRedirectBanner, updateRedirectBanner} from "../../redux/Actions/redirectBannerActions.js";

const DisplayRedirectBanner = ({ redirectBannerData, astrologerListData, productCategoryData, poojaCategoryData }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [icon, setIcon] = useState({ file: "", bytes: "" });
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const [redirect, setRedirect] = useState("");
  const [bannerId,setBannerId] = useState("")
  const [productCategory, setProductCategory] = useState("");
  const [poojaCategory, setPoojaCategory] = useState("");
  const [astrologer, setAstrologer] = useState("");
  const [youtubeUrl, setyoutubeUrl] = useState("");

  function fillAstrologerList() {
    return astrologerListData?.map((item) => {
      return <MenuItem value={item._id}>{item.name}</MenuItem>;
    });
  }

  function fillProductCategoryList() {
    return productCategoryData?.map((item) => {
      return <MenuItem value={item._id}>{item.title}</MenuItem>;
    });
  }

  function fillPoojaCategoryList() {
    return poojaCategoryData?.map((item) => {
      return <MenuItem value={item._id}>{item.title}</MenuItem>;
    });
  }


  useEffect(function () {
      dispatch(getRedirectionBanners());
  }, []);

  useEffect(() => {
    if (redirectBannerData) {
      setIcon({ file: redirectBannerData.imageUrl, bytes: "" });
      setStatus(redirectBannerData.status);
      setRedirect(redirectBannerData.redirectionUrl);
      if (redirectBannerData.astrologerId) {
        setAstrologer(redirectBannerData.astrologerId);
      }
      if (redirectBannerData.poojaId) {
        setPoojaCategory(redirectBannerData.poojaId);
      }
      if (redirectBannerData.productId) {
        setProductCategory(redirectBannerData.productId);
      }
      if (redirectBannerData.youtubeUrl) {
        setyoutubeUrl(redirectBannerData.youtubeUrl);
      }
    }
  }, [redirectBannerData]);


  const handleOpen = (rowData) => {
    // setSkill_id(rowData._id);
    setBannerId(rowData._id)
    setRedirect(rowData.title);
    setIcon({ file: rowData.image, bytes: rowData.image });
    setStatus(rowData.status)
    setOpen(true);
  };

  const handleOptionChange = (e) => {
    setStatus(e.target.value);
  };

  const handleRedirectChange = (e) => {
    if (e.target.value === "pooja") {
      dispatch(getPoojaCategory());
    }
    if (e.target.value === "product") {
      dispatch(getProductCategory());
    }
    if (e.target.value === "astrologer") {
      dispatch(getAllAstrologer());
    }
    setRedirect(e.target.value);
  };

  const handleError = (input, value) => {
    setError((prev) => ({ ...prev, [input]: value }));
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

  const validation = () => {
    var isValid = true;
    if (!redirect) {
      handleError("redirect", "Please select redirect type");
      isValid = false;
    }
    if (!status) {
      handleError("status", "Please select status");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async () => {
    if (validation()) {
      const formData = new FormData();
      if (icon.bytes) {
        formData.append("image", icon.bytes);
      }
      formData.append("status", status);
      formData.append("redirectionUrl", redirect);
      formData.append("bannerId", bannerId);

      switch (redirect) {
        case "astrologer":
          formData.append("astrologerId", astrologer);
          break;
        case "pooja":
          formData.append("poojaId", poojaCategory);
          break;
        case "product":
          formData.append("productId", productCategory);
          break;
        case "youtube":
          formData.append("youtubeUrl", youtubeUrl);
          break;
      }

      dispatch(updateRedirectBanner( {formData}));
      setOpen(false)
    }
  };

  const redirectionOptions = [
    { value: "call", label: "Call" },
    { value: "chat", label: "Chat" },
    { value: "pooja", label: "Pooja Category" },
    { value: "product", label: "Product Category" },
    { value: "astrologer", label: "Astrologer" },
    { value: "youtube", label: "YouTube" },
  ];

  const handleClose = () => {
    setIcon({ file: logo_icon, bytes: "" });
    setStatus("");
    setRedirect("");
    setOpen(false);
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
        dispatch(updateRedirectBannerStatus({ bannerId: rowData._id, status: newStatus }));
      }
    });
  };

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        {redirectBannerData && displayTable()}
        {editModal()}
      </div>
    </div>
  );

  function displayTable() {
    return (
      <Grid container spacing={1}>
        <Grid item lg={12} sm={12} md={12} xs={12}>
          <MaterialTable
            title="Redirect Banner"
            data={redirectBannerData}
            columns={[
              {
                title: "S.No",
                editable: "never",
                render: rowData => Array.isArray(redirectBannerData) ? redirectBannerData.indexOf(rowData) + 1 : 'N/A'

              },
              { title: "Redirection", field: "redirectionUrl" },
              {
                title: "Icon",
                field: "icon",
                render: (rowData) => (
                  <Avatar
                    src={rowData.image}
                    style={{ width: 50, height: 50 }}
                    variant="rounded"
                  />
                ),
              },
              { title: "Status", field: "status", render: rowData => (
                <div className={classes.statusButton}
                style={{ backgroundColor: rowData.status === 'Active' ? '#90EE90' : '#FF7F7F '}}
                onClick={() => handleClickOpen(rowData)}>
                  {rowData.status}
                </div>
              )},

            ]}
            options={propStyles.tableStyles}
            style={{ fontSize: "1.4rem" }}
            actions={[
              {
                icon: "edit",
                tooltip: "Edit Redirection Banner",
                onClick: (event, rowData) => handleOpen(rowData),
              },
              {
                icon: "delete",
                tooltip: "Delete Redirection Banner",
                onClick: (event, rowData) =>
                  dispatch(
                    deleteRedirectBanner({
                      title: rowData?.redirectionUrl,
                      bannerId: rowData?._id,
                    })
                  ),
              },
              {
                icon: () => (
                  <div className={classes.addButton}>
                    <AddCircleRounded />
                    <div className={classes.addButtontext}>Add New</div>
                  </div>
                ),
                tooltip: "Add Redirect Banner",
                isFreeAction: true,
                onClick: () => navigate("/addRedirectBanner"),
              },
            ]}
          />
        </Grid>
      </Grid>
    );
  }

  function editModal() {
    const showEditForm = () => {
      // return (
      //   <Grid container spacing={2}>
      //     <Grid item lg={12} sm={12} md={12} xs={12}>
      //       <div className={classes.headingContainer}>
      //         <div className={classes.heading}>Edit Redirect Banner</div>
      //       </div>
      //     </Grid>
      //     <Grid item lg={12} sm={12} md={12} xs={12}>
      //       <TextField
      //         label="Enter Skill"
      //         error={!error.skill}
      //         helperText={error.skill}
      //         value={skill}
      //         onFocus={() => handleError("skill", null)}
      //         onChange={(event) => setSkill(event.target.value)}
      //         variant="outlined"
      //         fullWidth
      //       />
      //     </Grid>
      //     <Grid item lg={12} sm={12} md={6} xs={12}>
      //         <FormControl fullWidth>
      //           <InputLabel id="select-label">Select Status</InputLabel>
      //           <Select
      //             labelId="select-label"
      //             value={status}
      //             onChange={handleOptionChange}
      //             variant="outlined"
      //             error={!!error.status}
      //           >
      //             <MenuItem value="Active">Active</MenuItem>
      //             <MenuItem value="InActive">InActive</MenuItem>
      //           </Select>
      //           <div className={classes.errorstyles}>{error.status}</div>
      //         </FormControl>
      //       </Grid>
      //     <Grid
      //       item
      //       lg={6}
      //       sm={6}
      //       md={6}
      //       xs={6}
      //       className={classes.uploadContainer}
      //     >
      //       <Grid
      //         component="label"
      //         onClick={handleIcon}
      //         className={classes.uploadImageButton}
      //       >
      //         Upload Picutre
      //         <input
      //           required
      //           error={!error.icon}
      //           onChange={handleIcon}
      //           hidden
      //           accept="image/*"
      //           type="file"
      //         />
      //       </Grid>
      //     </Grid>
      //     <Grid item lg={6} sm={6} md={6} xs={6}>
      //     <Avatar src={icon.file} style={{ width: 56, height: 56 }} />
      //     {error.icon && <div className={classes.errorText}>{error.icon}</div>}
      //   </Grid>
      //   <Grid item lg={6} sm={6} md={6} xs={6}>
      //       <div onClick={handleSubmit} className={classes.submitbutton}>
      //         {loading? <Loader/> : "Submit"}
      //       </div>
      //     </Grid>
      //     <Grid item lg={6} sm={6} md={6} xs={6}>
      //       <div onClick={handleClose} className={classes.denyButton}>
      //         Cancel
      //       </div>
      //     </Grid>
      //   </Grid>
      // );
      return (
        <div className={classes.container}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>Edit Redirect Banner</div>
            
            </div>
          </Grid>

          <Grid item lg={12} sm={12} md={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="select-label">Select Redirection</InputLabel>
              <Select
                labelId="select-label"
                value={redirect}
                onChange={handleRedirectChange}
                variant="outlined"
                error={!!error.redirect}
              >
                {redirectionOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              <div className={classes.errorstyles}>{error.redirect}</div>
            </FormControl>

            {redirect === "product" && (
              <FormControl
                variant="outlined"
                fullWidth
                style={{ marginTop: "16px" }}
              >
                <InputLabel id="product-category-label">
                  Product Category
                </InputLabel>
                <Select
                  labelId="product-category-label"
                  value={productCategory}
                  onChange={(e) => setProductCategory(e.target.value)}
                  label="Product Category"
                >
                  {productCategoryData && fillProductCategoryList()}
                </Select>
              </FormControl>
            )}

            {redirect === "pooja" && (
              <FormControl
                variant="outlined"
                fullWidth
                style={{ marginTop: "16px" }}
              >
                <InputLabel id="pooja-category-label">
                  Pooja Category
                </InputLabel>
                <Select
                  labelId="pooja-category-label"
                  value={poojaCategory}
                  onChange={(e) => setPoojaCategory(e.target.value)}
                  label="Pooja Category"
                >
                  {poojaCategoryData && fillPoojaCategoryList()}
                </Select>
              </FormControl>
            )}

            {redirect === "astrologer" && (
              <FormControl
                variant="outlined"
                fullWidth
                style={{ marginTop: "16px" }}
              >
                <InputLabel id="astrologer-label">Astrologer</InputLabel>
                <Select
                  labelId="astrologer-label"
                  value={astrologer}
                  onChange={(e) => setAstrologer(e.target.value)}
                  label="Astrologer"
                >
                  {astrologerListData && fillAstrologerList()}
                </Select>
              </FormControl>
            )}

            {redirect === "youtube" && (
              <TextField
                variant="outlined"
                label="YouTube Link"
                value={youtubeUrl}
                onChange={(e) => setyoutubeUrl(e.target.value)}
                fullWidth
                style={{ marginTop: "16px" }}
              />
            )}
          </Grid>

          <Grid
            item
            lg={4}
            sm={4}
            md={4}
            xs={4}
            className={classes.uploadContainer}
          >
            <Grid
              component="label"
              onClick={handleIcon}
              className={classes.uploadImageButton}
            >
              Upload Picutre
              <input
                onChange={handleIcon}
                hidden
                accept="image/*"
                type="file"
              />
            </Grid>
            <div className={classes.errorstyles}>{error.icon}</div>
          </Grid>
          <Grid item lg={2} sm={2} md={2} xs={2}>
            <Avatar
              color={Colors.primaryDark}
              src={icon.file}
              style={{ width: 56, height: 56 }}
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
              Close
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
      )
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

const mapStateToProps = (state) => ({
  redirectBannerData: state.redirectBanner.redirectBannerData,
  astrologerListData: state.astrologer.astrologerListData,
  productCategoryData: state.productCategory.productCategoryData,
  poojaCategoryData: state.poojaCategory.poojaCategoryData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });


export default connect(mapStateToProps, mapDispatchToProps)(DisplayRedirectBanner);
