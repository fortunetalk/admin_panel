import React, { useState } from "react";
import { useStyles } from "../../assets/styles.js";
import { Grid, TextField,} from "@mui/material";
import DvrIcon from "@mui/icons-material/Dvr";
import { useNavigate } from "react-router-dom";
import logo_icon from "../../assets/images/logo_icon.png";

export const AddGift = () => {
    var classes = useStyles();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({
        title: "",
        amount: "",
        shortBio: "",
        profilePhoto: "",
    });
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [shortBio, setShortBio] = useState("");
    const [profilePhoto, setProfilePhoto] = useState({
        file: logo_icon,
        bytes: "",
    });

    const handleProfile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setProfilePhoto({
                file: URL.createObjectURL(e.target.files[0]),
                bytes: e.target.files[0],
            });
        }
    };

    const handleValidation = () => {
        let isValid = true;
        const newErrors = { title: "", amount: "", shortBio: "", profilePhoto: "" };

        // Validate Title field
        if (!name.trim()) {
            newErrors.title = "Please enter a title";
            isValid = false;
        }

        // Validate Amount field
        // (You can add more specific validation for the amount if needed)
        if (!amount.trim()) {
            newErrors.amount = "Please enter an amount";
            isValid = false;
        }

        // Validate Short Bio field
        if (!shortBio.length > 150) {
            newErrors.shortBio = "Short Bio should be maximum 150 characters";
            isValid = false;
        }

        // Validate Profile Photo
        if (!profilePhoto.bytes) {
            newErrors.profilePhoto = "Please upload a profile photo";
            isValid = false;
        }

        setErrors(newErrors);

        return isValid;
    };

    const handleSubmit = () => {
        if (handleValidation()) {
            // Perform submission logic here
            console.log("Form submitted successfully");
        } else {
            console.log("Form validation failed");
        }
    };

    const handleReset = () => {
        // Reset form fields and validation state
        setName("");
        setAmount("");
        setShortBio("");
        setProfilePhoto({
            file: logo_icon,
            bytes: "",
        });
        setErrors({ title: "", amount: "", shortBio: "", profilePhoto: "" });
    };


    return (
        <div className={classes.container}>
            <div className={classes.box}>
                <Grid container spacing={2}>
                    <Grid item lg={12} sm={12} md={12} xs={12}>
                        <div className={classes.headingContainer}>
                            <div className={classes.heading}>Add Gift</div>
                            <div
                                onClick={() => navigate("/displayGift")}
                                className={classes.addButton}
                            >
                                <DvrIcon />
                                <div className={classes.addButtontext}>
                                    Display/AddGift
                                </div>
                            </div>
                        </div>
                    </Grid>
                    <Grid item lg={6} sm={12} md={12} xs={12}>
                        <TextField
                            label="Enter Title"
                            value={name}
                            variant="outlined"
                            fullWidth
                            onChange={(e) => setName(e.target.value)}
                        />
                        {errors.title && (
                            <div className={classes.errorText}>{errors.title}</div>
                        )}
                    </Grid>
                    {/* ... (your existing code) */}
                    <Grid item lg={6} sm={12} md={12} xs={12}>
                        <TextField
                            label="Enter Amount"
                            value={amount}
                            variant="outlined"
                            fullWidth
                            onChange={(e) => setAmount(e.target.value)}
                        />
                        {errors.amount && (
                            <div className={classes.errorText}>{errors.amount}</div>
                        )}
                    </Grid>
                    <Grid item lg={12} sm={12} md={12} xs={12}>
                        <TextField
                            id="outlined-multiline-static"
                            multiline
                            rows={4}
                            label="Short Bio (max-150)"
                            value={shortBio}
                            variant="outlined"
                            fullWidth
                            onChange={(e) => setShortBio(e.target.value)}
                        />
                        {errors.shortBio && (
                            <div className={classes.errorText}>{errors.shortBio}</div>
                        )}
                    </Grid>
                    {/* ... (your existing code) */}
                    <Grid
                        item
                        lg={4}
                        sm={6}
                        md={6}
                        xs={6}
                        className={classes.uploadContainer}
                    >
                        <Grid
                            component="label"
                            onClick={handleProfile}
                            className={classes.uploadImageButton}
                        >
                            Upload Profile Icon
                            <input
                                onChange={handleProfile}
                                hidden
                                accept="image/*"
                                type="file"
                            />
                        </Grid>
                        {errors.profilePhoto && (
                            <div className={classes.errorText}>{errors.profilePhoto}</div>
                        )}
                    </Grid>
                    {/* ... (your existing code) */}
                    <Grid item lg={4} sm={6} md={6} xs={6}>
                        <div onClick={handleSubmit} className={classes.submitbutton}>
                            Submit
                        </div>
                    </Grid>
                    <Grid item lg={4} sm={6} md={6} xs={6}>
                        <div onClick={handleReset} className={classes.denyButton}>
                            Reset
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default AddGift;