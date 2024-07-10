import React from 'react';
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

const Details = ({ classes, astrologerData, error, handleError, updateState, currencyType, language, languages, country, countryData, countryState, countryStateData, stateCityData }) => (
    <>
        <Grid item lg={4} md={12} sm={12} xs={12}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Currency Type</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Currency Type"
                    value={currencyType}
                    defaultValue={astrologerData?.currencyType}
                    error={!!error.currencyType}
                    onFocus={() => handleError("currencyType", null)}
                    onChange={(e) => updateState({ currencyType: e.target.value })}
                >
                    <MenuItem value="" disabled>
                        -Select currencyType-
                    </MenuItem>
                    <MenuItem value="INR">INR</MenuItem>
                    <MenuItem value="USD">USD</MenuItem>
                </Select>
                {error.currencyType && (
                    <div className={classes.errorstyles}>{error.currencyType}</div>
                )}
            </FormControl>
        </Grid>

        <Grid item lg={4} md={12} sm={12} xs={12}>
            <FormControl fullWidth>
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                    labelId="gender-label"
                    id="gender-select"
                    label="Gender"
                    value={state.gender}
                    error={!!state.error.gender}
                    onFocus={() => handleError("gender", null)}
                    onChange={handleChange("gender")}
                    defaultValue={astrologerData?.gender}
                >
                    <MenuItem value="" disabled>
                        -Select Gender-
                    </MenuItem>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                </Select>
                {state.error.gender && (
                    <div className={classes.errorstyles}>{state.error.gender}</div>
                )}
            </FormControl>
        </Grid>

        <Grid item lg={4} sm={12} md={12} xs={12}>
            <TextField
                label="Experience"
                defaultValue={astrologerData?.experience}
                variant="outlined"
                fullWidth
                onFocus={() => handleError("experience", null)}
                onChange={(e) => updateState({ experience: e.target.value })}
                helperText={error.experience}
                error={!!error.experience}
                InputLabelProps={{ shrink: true }}
            />
        </Grid>

        <Grid item lg={4} sm={12} md={12} xs={12}>
            <FormControl fullWidth>
                <InputLabel id="demo-multiple-checkbox-label">Language</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={language}
                    onChange={(e) => updateState({ language: e.target.value })}
                    onFocus={() => handleError("language", null)}
                    renderValue={(selected) => selected.join(", ")}
                    error={!!error.language}
                >
                    <MenuItem disabled value="">
                        -Select Language-
                    </MenuItem>
                    {languages.map((item) => (
                        <MenuItem key={item} value={item}>
                            <Checkbox checked={language.indexOf(item) > -1} />
                            <ListItemText primary={item} />
                        </MenuItem>
                    ))}
                </Select>
                {error.language && (
                    <div className={classes.errorstyles}>{error.language}</div>
                )}
            </FormControl>
        </Grid>

        <Grid item lg={4} sm={12} md={12} xs={12}>
            <TextField
                label="Address"
                defaultValue={astrologerData?.address}
                variant="outlined"
                fullWidth
                onFocus={() => handleError("address", null)}
                onChange={(e) => updateState({ address: e.target.value })}
                helperText={error.address}
                error={!!error.address}
                InputLabelProps={{ shrink: true }}
            />
        </Grid>

        <Grid item lg={4} md={12} sm={12} xs={12}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Country</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Country"
                    value={country}
                    onFocus={() => handleError("country", null)}
                    onChange={(e) => updateState({ country: e.target.value })}
                    error={!!error.country}
                >
                    <MenuItem disabled value={null}>
                        -Select your Country-
                    </MenuItem>
                    {countryData?.map((item) => (
                        <MenuItem key={item.id} value={item._id}>
                            {item.title}
                        </MenuItem>
                    ))}
                </Select>
                {error.country && (
                    <div className={classes.errorstyles}>{error.country}</div>
                )}
            </FormControl>
        </Grid>
    </>
);

export default Details;
