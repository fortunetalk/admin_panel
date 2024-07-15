import React, { useEffect, useState } from "react";
import { useStyles } from '../../assets/styles.js'
import { Avatar, Grid, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { AddCircleRounded } from '@mui/icons-material';
import MaterialTable from "material-table";
import { Colors } from "../../assets/styles.js";
import logo_icon from '../../assets/images/logo_icon.png'
import { get_skills, get_subSkill, update_subSkill } from "../../utils/Constants.js";
import { getData, postData } from '../../utils/FetchNodeServices.js'
import { useNavigate } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { CloseRounded } from "@mui/icons-material";
import Swal from "sweetalert2";
const DisplayFaq = () => {
    const classes = useStyles()
    const navigate = useNavigate()
    const [subSkillsData, setSubSkillsData] = useState()
    const [skillsList, setSkillsList] = useState()
    const [open, setOpen] = useState(false)
    const [subSkill_id, setSubSkill_id] = useState('')
    const [skill_id, setSkill_id] = useState('')
    const [subSkill, setSubSkill] = useState('')
    const [icon, setIcon] = useState({ file: '', bytes: '' })
    const [oldIcon, setOldIcon] = useState()
    const [error, setError] = useState({})

    useEffect(function () {
        fetchAllSubSkills()
        fetchAllSkills()
    }, [])

    const fetchAllSubSkills = async () => {
        var response = await getData(get_subSkill)
        console.log(response)
        setSubSkillsData(response.subSkills)
    }

    const fetchAllSkills = async () => {
        var response = await getData(get_skills)
        setSkillsList(response.skills)
    }


    const handleOpen = (rowData) => {
        setOpen(true);
        setSubSkill_id(rowData._id)
        setSkill_id(rowData.skill._id)
        setSubSkill(rowData.subskill)
        setIcon({ file: logo_icon, bytes: '' })
        setOldIcon(rowData.icon)
    };

    console.log('_id', subSkill_id, 'skill_id', skill_id, 'subSkill', subSkill)
    const handleError = (input, value) => {
        setError((prev) => ({ ...prev, [input]: value }))
    }

    const handleIcon = (e) => {
        setIcon({ file: URL.createObjectURL(e.target.files[0]), bytes: e.target.files[0] })
    }

    const validation = () => {
        var isValid = true
        if (!skill_id) {
            handleError('skill_id', 'Please Select Skill')
            isValid = false
        }
        if (!subSkill) {
            handleError('subSkill', 'Please input Sub Skill')
            isValid = false
        }
        return isValid
    }

    const handleSubmit = async () => {
        if (validation()) {
            var formData = new FormData()
            formData.append('_id', subSkill_id)
            formData.append('skillId', skill_id)
            formData.append('subSkill', subSkill)
            formData.append('image', icon.bytes)
            var response = await postData(update_subSkill, formData)
            if (response.status) {
                Swal.fire({
                    icon: 'success',
                    title: "Sub Skill Updated Successfull",
                    showConfirmButton: false,
                    timer: 2000
                })
                handleClose()
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: "Server Error",
                    text: "Failed to Update Sub Skill",
                    showConfirmButton: false,
                    timer: 2000
                })
            }
        }
    }

    const handleClose = () => {
        setSkill_id('')
        setSubSkill_id('')
        setSubSkill('')
        setIcon({ file: logo_icon, bytes: '' })
        setOpen(false)
    }

    return (
        <div className={classes.container}>
            <div className={classes.box}>
                {displayTable()}
                {editModal()}
            </div>
        </div >

    );
    function displayTable() {
        return (
            <Grid container spacing={1}>
                <Grid item lg={12} sm={12} md={12} xs={12}>
                    <MaterialTable
                        title="Our Astrologers"
                        data={subSkillsData}
                        columns={[
                            {
                                title: 'S.No',
                                editable: 'never',
                                render: rowData => subSkillsData.indexOf(rowData) + 1
                            },
                            {
                                title: 'Name',
                                editable: 'never',
                                render: rowData => subSkillsData.indexOf(rowData) + 1
                            },
                            {
                                title: 'Designation',
                                editable: 'never',
                                render: rowData => subSkillsData.indexOf(rowData) + 1
                            },
                            {
                                title: 'Image',
                                editable: 'never',
                                render: rowData => subSkillsData.indexOf(rowData) + 1
                            },
                            {
                                title: 'About',
                                editable: 'never',
                                render: rowData => subSkillsData.indexOf(rowData) + 1
                            },
                            {
                                title: 'Date',
                                editable: 'never',
                                render: rowData => subSkillsData.indexOf(rowData) + 1
                            },


                        ]}
                        options={{
                            sorting: true,
                            search: true,
                            searchFieldAlignment: "right",
                            filtering: true,
                            paging: true,
                            // pageSizeOptions: createArrayWithBreakdowns(editable?.length, 5),
                            pageSize: 5,
                            paginationType: "stepped",
                            showFirstLastPageButtons: true,
                            paginationPosition: "bottom",
                            exportButton: false,
                            exportAllData: false,
                            exportFileName: "Category data",
                            addRowPosition: "first",
                            actionsColumnIndex: -1,
                            selection: false,
                            showSelectAllCheckbox: false,
                        }}
                        actions={[
                            {
                                icon: 'edit',
                                tooltip: 'Edit Sub Skill',
                                onClick: (event, rowData) => handleOpen(rowData)
                            },
                            {
                                icon: () => (
                                    <div className={classes.addButton}
                                    >
                                        <AddCircleRounded />
                                        <div className={classes.addButtontext}>Add New</div>
                                    </div>
                                ),
                                tooltip: 'Add Skill',
                                isFreeAction: true,
                                onClick: () => navigate("/AddOurAstrologers")
                            }
                        ]}
                    />
                </Grid>
            </Grid>
        )
    }

    function editModal() {
        const fillSkillList = () => {
            return (
                skillsList.map((item) => {
                    return (
                        <MenuItem value={item._id}>{item.skill}</MenuItem>
                    )
                })
            )
        }
        const showEditForm = () => {
            return (
                <Grid container spacing={2}>
                    <Grid item lg={12} sm={12} md={12} xs={12}>
                        <div className={classes.headingContainer}>
                            <div className={classes.heading} >
                               All Customer
                            </div>
                            <div onClick={handleClose} className={classes.closeButton}>
                                <CloseRounded />
                            </div>
                        </div>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} >
                        <TextField
                            label="Enter Sub Skill"
                            error={error.subSkill ? true : false}
                            helperText={error.subSkill}
                            value={subSkill}
                            onFocus={() => handleError('subSkill', null)}
                            onChange={(event) => setSubSkill(event.target.value)}
                            variant='outlined' fullWidth />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Skill</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Skill"
                                value={skill_id}
                                onFocus={() => handleError('skill_id', null)}
                                onChange={(e) => setSkill_id(e.target.value)}
                                error={error.skill_id ? true : false}
                            >
                                <MenuItem disabled value={null}>-Select Skill-</MenuItem>
                                {skillsList != null && fillSkillList()}
                            </Select>
                        </FormControl>
                        <div className={classes.errorstyles}>{error.skill_id}</div>
                    </Grid>
                    <Grid item lg={2} sm={6} md={6} xs={6} className={classes.uploadContainer}   >
                        <Grid component="label" onClick={handleIcon} className={classes.uploadImageButton}>
                            Upload Picutre
                            <input onChange={handleIcon} hidden accept="image/*" type="file" />
                        </Grid>
                        <div className={classes.errorstyles}>{error.icon}</div>
                    </Grid>
                    <Grid item lg={10} sm={6} md={6} xs={6} >
                        <Avatar
                            color={Colors.primaryDark}
                            src={icon.file}
                            style={{ width: 56, height: 56 }}
                        />
                    </Grid>
                    <Grid item lg={6} sm={6} md={6} xs={6} >
                        <div onClick={handleSubmit} className={classes.submitbutton}>
                            Submit
                        </div>
                    </Grid>
                    <Grid item lg={6} sm={6} md={6} xs={6} >
                        <div onClick={handleClose} className={classes.denyButton}>
                            Reset
                        </div>
                    </Grid>
                </Grid>
            )

        }

        return (
            <div>
                <Dialog
                    open={open}>
                    <DialogContent>
                        {showEditForm()}
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
};

export default DisplayFaq;




