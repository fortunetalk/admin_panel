import React, { useState, useEffect } from "react";
import { useStyles } from '../../assets/styles.js'
import { Avatar, Grid, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import DvrIcon from '@mui/icons-material/Dvr';
import { add_subSkill, get_skills } from "../../utils/Constants.js";
import { getData, postData } from '../../utils/FetchNodeServices.js'
import Swal from "sweetalert2"

import { Colors } from "../../assets/styles.js";
import { useNavigate } from "react-router-dom";
import logo_icon from '../../assets/images/logo_icon.png'
const AddCustomer = () => {

    const navigate = useNavigate()
    const classes = useStyles()
    const [skillsList, setSkillsList] = useState([])
    const [skill_id, setSkill_id] = useState('')
    const [subSkill, setSubSkill] = useState('')
    const [icon, setIcon] = useState({ file: logo_icon, bytes: '' })
    const [error, setError] = useState({})


    useEffect(function () {
        fetchAllSkills()
    }, [])

    const fetchAllSkills = async () => {
        var response = await getData(get_skills)
        console.log(response)
        setSkillsList(response.skills)
    }


    const handleError = (input, value) => {
        setError((prev) => ({ ...prev, [input]: value }))
    }

    console.log(icon.file, + "sdads", icon.bytes)

    const handleIcon = (e) => {
        setIcon({ file: URL.createObjectURL(e.target.files[0]), bytes: e.target.files[0] })
        handleError('icon', null)
    }

    const validation = () => {
        var isValid = true
        if (!skill_id) {
            handleError('skill_id', 'Please Select Skill')
            isValid = false
        }
        if (!subSkill) {
            handleError('subSkill', 'Please input Skill')
            isValid = false
        }
        if (!icon.bytes) {
            handleError('icon', 'Please Select icon')
            isValid = false
        }
        return isValid
    }

    const handleSubmit = async () => {
        if (validation()) {
            var formData = new FormData()
            formData.append('skill_id', skill_id)
            formData.append('subSkill', subSkill)
            formData.append('image', icon.bytes)
            var response = await postData(add_subSkill, formData)
            if (response.status) {
                Swal.fire({
                    icon: 'success',
                    title: "Sub Skill Added Successful",
                    showConfirmButton: false,
                    timer: 2000
                })
                handleReset()
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: "Server Error",
                    text: " Sub Skill Submission Failed",
                    showConfirmButton: false,
                    timer: 2000
                })
            }
        }
    }

    const handleReset = () => {
        setSkill_id(null)
        setSubSkill('')
        setIcon({ file: logo_icon, bytes: '' })
    }

    console.log("sdddasdad", setSkill_id)

    return (
        <div className={classes.container}>
            <div className={classes.box}>
                <Grid container spacing={2}>
                    <Grid item lg={12} sm={12} md={12} xs={12}>
                        <div className={classes.headingContainer}>
                            <div className={classes.heading} >
                                Add Customer
                            </div>
                            <div onClick={() => navigate("/displayCustomer")} className={classes.addButton}>
                                <DvrIcon />
                                <div className={classes.addButtontext}>Add Customer</div>
                            </div>
                        </div>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} >
                        
                        <TextField
                            label=" Enter Username"
                            error={error.subSkill ? true : false}
                            helperText={error.subSkill}
                            value={subSkill}
                            onFocus={() => handleError('subSkill', null)}
                            onChange={(event) => setSubSkill(event.target.value)}
                            variant='outlined' fullWidth />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} >
                     
                        <TextField
                            label=" Enter Phone"
                            error={error.subSkill ? true : false}
                            helperText={error.subSkill}
                            value={subSkill}
                            onFocus={() => handleError('subSkill', null)}
                            onChange={(event) => setSubSkill(event.target.value)}
                            variant='outlined' fullWidth />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} >
                      
                        <TextField
                            label=" Enter Email"
                            error={error.subSkill ? true : false}
                            helperText={error.subSkill}
                            value={subSkill}
                            onFocus={() => handleError('subSkill', null)}
                            onChange={(event) => setSubSkill(event.target.value)}
                            variant='outlined' fullWidth />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} >
                    
                        <TextField
                            label=" EnterPassword"
                     
                            error={error.subSkill ? true : false}
                            helperText={error.subSkill}
                            value={subSkill}
                            onFocus={() => handleError('subSkill', null)}
                            onChange={(event) => setSubSkill(event.target.value)}
                            variant='outlined' fullWidth />
                    </Grid>
                   

                    <Grid item lg={6} sm={6} md={6} xs={6} >
                        <div onClick={handleSubmit} className={classes.submitbutton}>
                            Submit
                        </div>
                    </Grid>
                    <Grid item lg={6} sm={6} md={6} xs={6} >
                        <div onClick={handleReset} className={classes.denyButton}>
                            Reset
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>

    );

    function fillSkillList() {
        return (
            skillsList.map((item) => {
                return (
                    <MenuItem value={item._id}>{item.skill}</MenuItem>
                )
            })
        )
    }
};

export default AddCustomer;
