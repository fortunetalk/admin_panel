import React, { useState } from "react";
import { useStyles } from '../../assets/styles.js';
import {  Grid, TextField } from "@mui/material";
import DvrIcon from '@mui/icons-material/Dvr';
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import * as LanguageActions from '../../redux/Actions/languageActions.js'


const AddLanguage = ({dispatch}) => {
    var classes = useStyles();
    const navigate = useNavigate();
    const [language, setLanguage] = useState("");
    const [error, setError] = useState({});

    const handleError = (input, value) => {
        setError((prev) => ({ ...prev, [input]: value }));
    };

    const validation = () => {
        let isValid = true;
        if (!language.trim()) {
          handleError("language", "language is required");
          isValid = false;
        }

        return isValid;
    };

    
    const handleSubmit = async () => {
        if (validation()) {

          dispatch(LanguageActions.createLanguage({languageName: language}))

            // var response = await postData(add_language,{language:language})
            // if (response.success) {
            //     Swal.fire({
            //         icon:"success",
            //       title: "language Added Successfull",
            //       showConfirmButton: false,
            //       timer: 2000,
            //     });
            //     handleReset()
            // }
            // else {
            //     Swal.fire({
            //       icon: "error",
            //       title: "Server Error",
            //       text: "language Submission Failed",
            //       showConfirmButton: false,
            //       timer: 2000,
            //     });
            // }
        }
    }

    
    const handleReset = () => {
        setLanguage("");
        setError({});
    };

    return (
      <div className={classes.container}>
        <div className={classes.box}>
          <Grid container spacing={2}>
            <Grid item lg={12} sm={12} md={12} xs={12}>
              <div className={classes.headingContainer}>
                <div className={classes.heading}>Add Language</div>
                <div
                  onClick={() => navigate("/displayLanguage")}
                  className={classes.addButton}
                >
                  <DvrIcon />
                  <div className={classes.addButtontext}>Display Lanugage</div>
                </div>
              </div>
            </Grid>
            <Grid item lg={12} md={6} sm={12} xs={12}>
              <TextField
                label="Language"
                error={Boolean(error.language)}
                helperText={error.language}
                value={language}
                onFocus={() => handleError("language", null)}
                onChange={(event) => setLanguage(event.target.value)}
                variant="outlined"
                fullWidth
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

const mapStateToProps = state =>({

})

const mapDispatchToProps = dispatch =>({dispatch})

export default connect(mapStateToProps, mapDispatchToProps)(AddLanguage);