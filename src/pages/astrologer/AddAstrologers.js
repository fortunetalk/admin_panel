import React, { useEffect, useState } from "react";
import { useStyles } from "../../assets/styles.js";
import Radio from "@material-ui/core/Radio";
import moment from "moment";
import RadioGroup from "@material-ui/core/RadioGroup";
import {
  Grid,
  Button,
  TextField,
  Select,
  Avatar,
  InputLabel,
  MenuItem,
  FormControl,
  Checkbox,
  FormGroup,
  FormControlLabel,
  FormLabel,
  ListItemText,
  Modal,
  Box,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { Colors } from "../../assets/styles.js";
import logo_icon from "../../assets/images/logo_icon.png";

import { connect, useDispatch } from "react-redux";
import * as AstrologerActions from "../../redux/Actions/astrologerActions.js";
import * as ExpertiesActions from "../../redux/Actions/expertiesActions.js";
import * as SkillActions from "../../redux/Actions/skillsActions.js";
import * as RemedyActions from "../../redux/Actions/remediesActions.js";
import * as SettingActions from "../../redux/Actions/settingActions.js";
import Loader from "../../Components/loading/Loader.js";

const preferredDaysList = ["Mon", "Tues", "Wed", "Thu", "Fri", "Sat", "Sun"];
const languages = [
  "Hindi",
  "English",
  "Assamese",
  "Bengali",
  "Bodo",
  "Dogri",
  "Gujarati",
  "Kannada",
  "Kashmiri",
  "Konkani",
  "Malayalam",
  "Meithei",
  "Marathi",
  "Nepali",
  "Oriya",
  "Punjabi",
  "Sanskrit",
  "Santali",
  "Sindhi",
  "Tamil",
  "Telugu",
  "Urdu",
  "Kokborok",
  "Mizo",
  "Khasi",
  "Garo",
  "Angika",
  "Bhojpuri",
  "Magadhi",
  "Rajasthani",
  "Marwari",
  "Mewari",
  "Shekhavati",
  "Bhili",
  "Gondi",
  "Kodava",
  "Kutchi",
  "Tulu",
  "Sankethi",
  "Mahl",
];

const astrologerTypeList = ["Consultation", "Teaching", "Pandit", "All"];

export const AddAstrologers = ({
  activeSkillsData,
  activeExpertiseData,
  activeRemediesData,
  countryData,
  countryStateData,
  stateCityData,
  countryValueData,
  isLoading,
}) => {
  var classes = useStyles();
  const dispatch = useDispatch();

  const [galleryImage, setGalleryImage] = useState([]);
  const [galleryFiles, setGalleryFiles] = useState([]);

  const [states, setState] = useState({
    error: {},
    name: "",
    displayName: "",
    realName: "",
    email: "",
    phoneNumber: "",
    rating: "",
    currency: "",
    gender: "",
    password: "",
    dateOfBirth: "",
    experience: "",
    phoneCode: "",
    zipCode: "",
    currencyValue: "",
    language: [],
    address: "",
    country: null,
    state: "",
    city: null,
    follower_count: "",
    bankName: "",
    bankAccountNumber: "",
    accountType: "",
    ifscCode: "",
    accountHolderName: "",
    panNumber: "",
    aadharNumber: "",
    callPrice: "",
    chatPrice: "",
    skills: [],
    remedies: [],
    offers: [],
    expertise: [],
    mainExpertise: [],
    about: "",
    preferredDays: [],
    working: "No",
    educationQualification: "",
    astrologerCallPrice: "",
    companyCallPrice: "",
    astrologerChatPrice: "",
    companyChatPrice: "",
    liveVideoPrice: "",
    companyLiveVideoPrice: "",
    liveCallPrice: "",
    companyLiveCallPrice: "",

    astrologyQualification: "",
    gallery: "",
    astrologerType: [],
    countryValue: [],
  });

  const [profilePhoto, setprofilePhoto] = useState({
    file: logo_icon,
    bytes: "",
  });

  const [bankProof, setbankProof] = useState({
    file: logo_icon,
    bytes: "",
  });

  const [idProof, setidProof] = useState({
    file: logo_icon,
    bytes: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(SkillActions.getActiveSkillData());
    dispatch(ExpertiesActions.getActiveExpertiesData());
    dispatch(RemedyActions.getActiveRemediesData());
    dispatch(SettingActions.getCountries());
    dispatch(SettingActions.getCountryValue());
  }, []);

  const handlecurrencyValueChange = (e) => {
    const newcurrencyValue = e.target.value;
    if (isNaN(newcurrencyValue) || newcurrencyValue === "") {
      handleError("currencyValue", "Please enter a valid number");
    } else {
      const parsedcurrencyValue = parseFloat(newcurrencyValue);
      if (parsedcurrencyValue >= 0 && parsedcurrencyValue <= 5) {
        handleError("currencyValue", null);
        updateState({ currencyValue: parsedcurrencyValue });
      } else {
        handleError("currencyValue", "currencyValue must be between 0 and 5");
      }
    }
  };

  const handleSkills = (item) => {
    if (skills.some((selectedItem) => selectedItem === item._id)) {
      let skilData = skills.filter((skill) => skill !== item?._id);
      updateState({ skills: skilData });
    } else {
      updateState({ skills: [...skills, item?._id] });
    }
    handleError("skills", null);
  };

  const handleCountryValue = (item) => {
    if (countryValue.some((selectedItem) => selectedItem === item._id)) {
      let skilData = countryValue.filter((countryValue) => countryValue !== item?._id);
      updateState({ countryValue: skilData });
    } else {
      updateState({ countryValue: [...countryValue, item?._id] });
    }
    handleError("countryValue", null);
  };

  const handleRemedies = (item) => {
    if (remedies.some((selectedItem) => selectedItem === item._id)) {
      let remedyData = remedies.filter(
        (selectedItem) => selectedItem !== item._id
      );
      updateState({ remedies: remedyData });
    } else {
      updateState({ remedies: [...remedies, item?._id] });
    }

    console.log(remedies);

    handleError("remedies", null);
  };

  const handleExpertise = (item) => {
    if (expertise.some((selectedItem) => selectedItem === item._id)) {
      const expertiesData = expertise.filter(
        (selectedItem) => selectedItem !== item._id
      );
      updateState({ expertise: expertiesData });
    } else {
      updateState({ expertise: [...expertise, item?._id] });
    }
    handleError("expertise", null);
  };

  const handlePreferredDays = (item) => {
    if (preferredDays.some((selectedItem) => selectedItem === item)) {
      const preferdayData = preferredDays.filter(
        (selectedItem) => selectedItem !== item
      );
      updateState({ preferredDays: preferdayData });
    } else {
      updateState({ preferredDays: [...preferredDays, item] });
    }
    handleError("preferredDays", null);
  };

  const handleAstrologerType = (item) => {
    setState((prevState) => {
      const { astrologerType } = prevState;
      if (astrologerType.includes(item)) {
        return {
          ...prevState,
          astrologerType: astrologerType.filter((selectedItem) => selectedItem !== item),
        };
      } else {
        return {
          ...prevState,
          astrologerType: [...astrologerType, item],
        };
      }
    });
    handleError("astrologerType", null);
  };

  const handleProfile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setprofilePhoto({
        file: URL.createObjectURL(e.target.files[0]),
        bytes: e.target.files[0],
      });
      handleError("profilePhoto", null);
    }
  };

  const handleGallery = (event) => {
    const files = Array.from(event.target.files);
    const updatedGalleryImages = files.map((file) => URL.createObjectURL(file));
  
    setGalleryImage((prevImages) => [...prevImages, ...updatedGalleryImages]);
    setGalleryFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handlebankProof = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setbankProof({
        file: URL.createObjectURL(e.target.files[0]),
        bytes: e.target.files[0],
      });
      updateState({ error: { bankProof: null } });
      handleError("bankProof", null);
    }
  };

  const handleidProof = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setidProof({
        file: URL.createObjectURL(e.target.files[0]),
        bytes: e.target.files[0],
      });
      updateState({ error: { idProof: null } });
      handleError("idProof", null);

    }
  };

  const handleError = (field, message) => {
    updateState({ error: { ...error, [field]: message } });
  };

  const handleValidation = () => {
    var isValid = true;
    if (displayName.length == 0) {
      handleError("displayName", "Display Name is required");
      isValid = false;
    } else if (email.length == 0) {
      handleError("email", "Email is required");
      isValid = false;
    } else if (phoneNumber.length == 0) {
      handleError("phoneNumber", "phoneNumber Number is required");
      isValid = false;
    } else if (phoneNumber.length == 0) {
      handleError("phoneNumber", "Invalid phoneNumber Number");
      isValid = false;
    } else if (rating.length == 0) {
      handleError("rating", "Rating is required");
      isValid = false;
    } else if (currency.length == 0) {
      handleError("currency", "Currency is required");
      isValid = false;
    } else if (gender.length == 0) {
      handleError("gender", "Gender is required");
      isValid = false;
    } else if (password.length == 0) {
      handleError("password", "Password is required");
      isValid = false;
    } else if (dateOfBirth.length == 0) {
      handleError("dateOfBirth", "Date Of Birth is required");
      isValid = false;
    } else if (experience.length == 0) {
      handleError("experience", "Experience is required");
      isValid = false;
    } else if (language.length == 0) {
      handleError("language", "Language is required");
      isValid = false;
    } else if (address.length == 0) {
      handleError("address", "Address is required");
      isValid = false;
    } else if (country.length == 0) {
      handleError("country", "Country is required");
      isValid = false;
    } else if (state.length == 0) {

      handleError("state", "State is required");
      isValid = false;
    } else if (city.length == 0) {
      handleError("city", "City is required");
      isValid = false;
    } else if (follower_count.length == 0) {
      handleError("follower_count", "follower_count is required");
      isValid = false;
    } else if (zipCode.length == 0) {
      handleError("zipCode", "Pin Code is required");
      isValid = false;
    } else if (phoneCode.length == 0) {
      handleError("phoneCode", "Country Phone Code is required");
      isValid = false;
    } else if (about.length == 0) {
      handleError("about", "About is required");
      isValid = false;
    } else if (currencyValue.length == 0) {
      handleError("currencyValue", "currencyValue is required");
      isValid = false;
    } else if (!preferredDays || preferredDays.length == 0) {
      handleError("preferredDays", "Preferred Days is required");
      isValid = false;
    } 
   
    else if (profilePhoto.bytes =='') {

      handleError("profilePhoto", "Please Select a Profile Picutre");
      isValid = false;
    } else if (bankProof.bytes == '') {

      handleError("bankProof", "Please Select a Bank Proof");
      isValid = false;
    } else if (idProof.bytes != 0) {
      handleError("idProof", "Please Select a Id Proof");
      isValid = false;
    } else if (bankAccountNumber.length == 0) {
      handleError("bankAccountNumber", "Bank Account Number is required");
      isValid = false;
    } 
    // else if (isNaN(bankAccountNumber) || bankAccountNumber <= 0) {
    //   handleError("bankAccountNumber", "Invalid Bank Account Number");
    //   isValid = false;
    // } 
    else if (bankName.length == 0) {
      handleError("bankName", "Bank Name is required");
      isValid = false;
    } else if (!accountType) {
      handleError("accountType", "Account type is required");
      isValid = false;
    } else if (ifscCode.length == 0) {
      handleError("ifscCode", "IFSC Code is required");
      isValid = false;
    } else if (accountHolderName.length == 0) {
      handleError("accountHolderName", "Account Holder Name is required");
      isValid = false;
    } else if (panNumber.length == 0) {
      handleError("panNumber", "PAN Number is required");
      isValid = false;
    } else if (aadharNumber.length == 0) {
      handleError("aadharNumber", "Aadhar Number is required");
      isValid = false;
    } else if (callPrice.length == 0) {
      handleError("callPrice", "Call Price is required");
      isValid = false;
    } else if (!chatPrice) {
      handleError("chatPrice", "Chat Price is required");
      isValid = false;
    } else if (callPrice.length == 0) {
      handleError("callPrice", "Call Price is required");
      isValid = false;
    } 
    // else if (educationQualification || educationQualification.length != 0) {
    //   console.log('edu qualification',educationQualification.length)
    //   handleError(
    //     "educationQualification",
    //     "Please Select educational Qualification"
    //   );
    //   isValid = false;
    // } 
   
    else if (!companyCallPrice || companyCallPrice.length == 0) {
      handleError("companyCallPrice", "Please Select company Call price");
      isValid = false;
    } else if (!companyChatPrice || companyChatPrice.length == 0) {
      handleError("companyChatPrice", "Please Select Company Chat Price");
      isValid = false;
    } else if (!liveVideoPrice || liveVideoPrice.length == 0) {
      handleError("liveVideoPrice", "Please Select Video Price Live");
      isValid = false;
    } else if (!companyLiveVideoPrice || companyLiveVideoPrice.length == 0) {
      handleError(
        "companyLiveVideoPrice",
        "Please Select Company Video Price Live"
      );
      isValid = false;
    } else if (!liveCallPrice || liveCallPrice.length == 0) {
      handleError("liveCallPrice", "Please Select Voice Price Live");
      isValid = false;
    } else if (!companyLiveCallPrice || companyLiveCallPrice.length == 0) {
      handleError(
        "companyLiveCallPrice",
        "Please Select Company Voice Price Live"
      );
      isValid = false;
    } else if (!astrologyQualification || astrologyQualification.length == 0) {
      handleError(
        "astrologyQualification",
        "Please Select Astrological Qualification"
      );
      isValid = false;
    } 
    // else if (!gallery || gallery.length === 0) {
    //   handleError("gallery", "Please select gallery");
    //   isValid = false;
    // }
    else if (!astrologerType || astrologerType.length == 0) {
      handleError("astrologerType", "Please select astrologerType");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // if (handleValidation()) {
        let formData = new FormData();
        formData.append("displayName", displayName);
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("phoneNumber", phoneNumber);
        formData.append("phoneCode", phoneCode);
        formData.append("gender", gender);
        formData.append("dateOfBirth", dateOfBirth);
        formData.append("experience", experience);
        formData.append("address", address);
        formData.append("currencyType", currency);
        formData.append("currencyValue", currencyValue);
        formData.append("country", country);
        formData.append("state", state);
        formData.append("city", city);
        formData.append("zipCode", zipCode);
        formData.append("about", about);
        formData.append("educationQualification", educationQualification);
        formData.append("astrologyQualification", "12th");
        formData.append("follower_count", follower_count);
        formData.append("rating", rating);
        formData.append("bankAcountNumber", bankAccountNumber);
        formData.append("bankName", bankName);
        formData.append("accountType", accountType);
        formData.append("ifscCode", ifscCode);
        formData.append("accountHolderName", accountHolderName);
        formData.append("addharNumber", aadharNumber);
        formData.append("panNumber", panNumber);
        formData.append("chatPrice", chatPrice);
        formData.append("companyChatPrice", companyChatPrice);
        formData.append("callPrice", callPrice);
        formData.append("companyCallPrice", companyCallPrice);
        formData.append("liveVideoPrice", liveVideoPrice);
        formData.append("companyLiveVideoPrice", companyLiveVideoPrice);
        formData.append("liveCallPrice", liveCallPrice);
        formData.append("companyLiveCallPrice", companyLiveCallPrice);
        formData.append("status", "Active");
        formData.append("astrologerType", astrologerType);
        formData.append("allowedCountry", countryValue);


        // formData.append("working", working);
        formData.append("profileImage", profilePhoto.bytes);
        formData.append("bankProofImage", bankProof.bytes);
        formData.append("idProofImage", idProof.bytes);
        galleryFiles.forEach((imgFile) => {
          formData.append("galleryImage", imgFile);
        });

        for (let i = 0; i < preferredDays.length; i++) {
          formData.append(`preferredDays[${i}]`, preferredDays[i]);
        }
        for (let i = 0; i < language.length; i++) {
          formData.append(`language[${i}]`, language[i]);
        }
        for (let i = 0; i < skills.length; i++) {
          formData.append(`skill[${i}]`, skills[i]);
        }
        for (let i = 0; i < remedies.length; i++) {
          formData.append(`remedies[${i}]`, remedies[i]);
        }
        for (let i = 0; i < expertise.length; i++) {
          formData.append(`expertise[${i}]`, expertise[i]);
        }

        dispatch(
          AstrologerActions.addAstrologer({
            data: formData,
            reset: handleReset,
          })
        );
        console.log("data submitted");
      // }
    } catch (e) {
      console.log("error submitting data", e);
    }

  };

  const handleReset = () => {
    updateState({
      error: {},
      name: "",
      displayName: "",
      email: "",
      phoneNumber: "",
      rating: "",
      currency: "",
      gender: "",
      password: "",
      dateOfBirth: "",
      experience: "",
      phoneCode: "",
      zipCode: "",
      currencyValue: "",
      language: [],
      address: "",
      country: "",
      state: "",
      city: "",
      follower_count: "",
      bankName: "",
      bankAccountNumber: "",
      accountType: "",
      ifscCode: "",
      accountHolderName: "",
      panNumber: "",
      aadharNumber: "",
      consultationPrice: "",
      callPrice: "",
      chatPrice: "",
      skills: [],
      remedies: [],
      expertise: [],
      mainExpertise: [],
      offers: [],
      about: "",
      preferredDays: [],
      working: "No",
      educationQualification: "",
      astrologerCallPrice: "",
      companyCallPrice: "",
      astrologerChatPrice: "",
      companyChatPrice: "",
      liveVideoPrice: "",
      companyLiveVideoPrice: "",
      liveCallPrice: "",
      companyLiveCallPrice: "",
      astrologyQualification: "",
      voicePriceLiveDollar: "",
      gallery: [],
      astrologerType:'',
      galleryImage:'',
      galleryFiles:'',
    });

    setprofilePhoto({
      file: logo_icon,
      bytes: "",
    });

    setbankProof({
      file: logo_icon,
      bytes: "",
    });

    setidProof({
      file: logo_icon,
      bytes: "",
    });
  };

  const updateState = (data) => {
    setState((prevState) => {
      const newData = { ...prevState, ...data };
      return newData;
    });
  };

  const {
    error,
    name,
    displayName,
    email,
    phoneNumber,
    rating,
    currency,
    gender,
    password,
    dateOfBirth,
    experience,
    phoneCode,
    zipCode,
    currencyValue,
    language,
    country,
    state,
    city,
    follower_count,
    bankName,
    bankAccountNumber,
    ifscCode,
    accountHolderName,
    accountType,
    aadharNumber,
    about,
    address,
    working,
    panNumber,
    preferredDays,
    skills,
    mainExpertise,
    expertise,
    remedies,
    callPrice,
    chatPrice,
    educationQualification,
    indiaDisplayPrice,
    astrologerCallPrice,
    companyCallPrice,
    astrologerChatPrice,
    companyChatPrice,
    liveVideoPrice,
    companyLiveVideoPrice,
    liveCallPrice,
    companyLiveCallPrice,

    astrologyQualification,
    gallery,
    astrologerType,
    countryValue
  } = states;

  const get_date_value = () => {
    var currentDate = new Date();

    // Subtract 16 years from the current date
    var previous16YearsDate = new Date(currentDate);
    previous16YearsDate.setFullYear(currentDate.getFullYear() - 16);

    // Format the date as yyyy-mm-dd
    var formattedDate = previous16YearsDate.toISOString().split("T")[0];
    return formattedDate;
  };

  useEffect(() => {
    if (country) {
      dispatch(SettingActions.countryStateList({ countryId: country }));
    }
  }, [country]);

  useEffect(() => {
    if (state) {
      dispatch(SettingActions.stateCityList({ stateId: state }));
    }
  }, [state]);

  return (
   <>
    {/* <Loader isLoading={isLoading}/> */}
    <form onSubmit={handleSubmit}>
      <div className={classes.container}>
        <div className={classes.box}>
          <Grid container spacing={2}>
            {/* {astrologerInputsInfo()} */}
            <Grid item lg={12} sm={12} md={12} xs={12}>
              <div className={classes.headingContainer}>
                <div className={classes.heading}>Add Astrologer</div>
              </div>
            </Grid>
            <Grid item lg={4} sm={12} md={12} xs={12}>
              <TextField
                label="Display Name"
                value={displayName}
                variant="outlined"
                fullWidth
                error={!!error.displayName ? true : false}
                onFocus={() => handleError("display name", null)}
                onChange={(e) => updateState({ displayName: e.target.value })}
                helperText={error.displayName}
              />
            </Grid>
            <Grid item lg={4} sm={12} md={12} xs={12}>
              <TextField
                label="Name"
                value={name}
                variant="outlined"
                fullWidth
                error={!!error.name ? true : false}
                onFocus={() => handleError("real name", null)}
                onChange={(e) => updateState({ name: e.target.value })}
                helperText={error.name}
              />
            </Grid>
            <Grid item lg={4} sm={12} md={12} xs={12}>
              <TextField
                label="Enter Email"
                value={email}
                variant="outlined"
                fullWidth
                error={!!error.email ? true : false}
                onFocus={() => handleError("email", null)}
                onChange={(e) => updateState({ email: e.target.value })}
                helperText={error.email}
              />
            </Grid>
            <Grid item lg={4} sm={12} md={12} xs={12}>
              <TextField
                label="Enter Phone Number"
                value={phoneNumber}
                variant="outlined"
                fullWidth
                type="number"
                helperText={error.phoneNumber}
                error={error.phoneNumber ? true : false}
                onFocus={() => handleError("phoneNumber", null)}
                onChange={(e) => updateState({ phoneNumber: e.target.value })}
              />
            </Grid>

            <Grid item lg={4} md={12} sm={12} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Currency</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="currency"
                  value={currency}
                  error={error.currency ? true : false}
                  onFocus={() => handleError("currency", null)}
                  onChange={(e) => updateState({ currency: e.target.value })}
                >
                  <MenuItem disabled value={null}>
                    -Select Currency-
                  </MenuItem>
                  <MenuItem value="INR">INR</MenuItem>
                  <MenuItem value="USD">USD</MenuItem>
                </Select>
                {error.currency && (
                  <div className={classes.errorstyles}>{error.currency}</div>
                )}
              </FormControl>
            </Grid>
            <Grid item lg={4} md={12} sm={12} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="gender"
                  value={gender}
                  error={error.gender ? true : false}
                  onFocus={() => handleError("gender", null)}
                  onChange={(e) => updateState({ gender: e.target.value })}
                >
                  <MenuItem disabled value={null}>
                    -Select Gender-
                  </MenuItem>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
                {error.gender && (
                  <div className={classes.errorstyles}>{error.gender}</div>
                )}
              </FormControl>
            </Grid>
            <Grid item lg={4} sm={12} md={12} xs={12}>
              <TextField
                label="Password"
                type="password"
                value={password}
                variant="outlined"
                fullWidth
                onFocus={() => handleError("password", null)}
                onChange={(e) => updateState({ password: e.target.value })}
                helperText={error.password}
                error={error.password ? true : false}
              />
            </Grid>
            <Grid item lg={4} sm={12} md={12} xs={12}>
              <TextField
                type="date"
                value={dateOfBirth}
                variant="outlined"
                // inputProps={{ max: "2020-05-31" }}
                inputProps={{
                  max: get_date_value(),
                }}
                fullWidth
                onFocus={() => handleError("dateOfBirth", null)}
                onChange={(e) => updateState({ dateOfBirth: e.target.value })}
                helperText={error.dateOfBirth}
                error={error.dateOfBirth ? true : false}
              />
            </Grid>
            <Grid item lg={4} md={12} sm={12} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Experience in Years
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Experience in years"
                  value={experience}
                  onFocus={() => handleError("experience", null)}
                  onChange={(e) => updateState({ experience: e.target.value })}
                  error={error.experience ? true : false} // Highlight the field if there's an error
                >
                  <MenuItem disabled value={null}>
                    -Experience in Years-
                  </MenuItem>
                  {[...Array(10).keys()].map((i) => (
                    <MenuItem key={i + 1} value={i + 1}>
                      {i + 1}
                    </MenuItem>
                  ))}
                </Select>
                {error.experience && (
                  <div className={classes.errorstyles}>{error.experience}</div>
                )}
              </FormControl>
            </Grid>
            <Grid item lg={4} sm={12} md={12} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-multiple-checkbox-label">
                  Language
                </InputLabel>
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
                value={address}
                variant="outlined"
                fullWidth
                onFocus={() => handleError("address", null)}
                onChange={(e) => updateState({ address: e.target.value })}
                helperText={error.address}
                error={error.address ? true : false}
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
                  onFocus={(e) => handleError("country", null)}
                  onChange={(e) => updateState({ country: e.target.value })}
                  error={error.country ? true : false}
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
            <Grid item lg={4} md={12} sm={12} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="state-select-label">State</InputLabel>
                <Select
                  labelId="state-select-label"
                  id="state-select"
                  value={states.state}
                  onFocus={() =>
                    setState((prevState) => ({
                      ...prevState,
                      error: { ...prevState.error, state: null },
                    }))
                  }
                  onChange={(e) => updateState({ state: e.target.value })}
                  error={!!states.error.state}
                  disabled={!states.country}
                >
                  <MenuItem disabled value="">
                    -Select your State-
                  </MenuItem>
                  {countryStateData &&
                    countryStateData.length > 0 &&
                    countryStateData?.map((item) => (
                      <MenuItem key={item.id} value={item._id}>
                        {item.title}
                      </MenuItem>
                    ))}
                </Select>
                {states.error.state && (
                  <div className={classes.errorstyles}>
                    {states.error.state}
                  </div>
                )}
              </FormControl>
            </Grid>
            <Grid item lg={4} md={12} sm={12} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">City</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="City"
                  value={city}
                  onFocus={() => handleError("city", null)}
                  onChange={(e) => updateState({ city: e.target.value })}
                  error={error.city ? true : false}
                  disabled={!states.state}
                >
                  <MenuItem disabled value={null}>
                    -Select your City-
                  </MenuItem>
                  {stateCityData &&
                    stateCityData.length > 0 &&
                    stateCityData?.map((item) => (
                      <MenuItem key={item.id} value={item._id}>
                        {item.title}
                      </MenuItem>
                    ))}
                </Select>
                {error.city && (
                  <div className={classes.errorstyles}>{error.city}</div>
                )}
              </FormControl>
            </Grid>

            <Grid item lg={4} sm={12} md={12} xs={12}>
              <TextField
                label="Pin Code"
                value={zipCode}
                variant="outlined"
                type="number"
                fullWidth
                onFocus={() => handleError("zipCode", null)}
                onChange={(e) => updateState({ zipCode: e.target.value })}
                helperText={error.zipCode}
                error={error.zipCode ? true : false}
              />
            </Grid>
            <Grid item lg={4} sm={12} md={12} xs={12}>
              <TextField
                label="Country Phone Code"
                value={phoneCode}
                variant="outlined"
                fullWidth
                onFocus={() => handleError("phoneCode", null)}
                onChange={(e) => updateState({ phoneCode: e.target.value })}
                helperText={error.phoneCode}
                error={error.phoneCode ? true : false}
              />
            </Grid>

            <Grid item lg={4} sm={12} md={12} xs={12}>
              <TextField
                type="number"
                label="Currency Value"
                value={currencyValue}
                variant="outlined"
                fullWidth
                onFocus={() => handleError("currencyValue", null)}
                onChange={handlecurrencyValueChange}
                helperText={error.currencyValue}
                error={error.currencyValue ? true : false}
              />
            </Grid>
            <Grid item lg={4} sm={12} md={12} xs={12}>
              <TextField
                label="Followers Count"
                value={follower_count}
                variant="outlined"
                type="number"
                fullWidth
                onChange={(e) =>
                  updateState({ follower_count: e.target.value })
                }
                helperText={error.follower_count}
                error={error.follower_count ? true : false}
              />
            </Grid>
            <Grid item lg={4} sm={12} md={12} xs={12}>
              <TextField
                label="Rating"
                value={rating}
                variant="outlined"
                type="number"
                fullWidth
                helperText={error.rating}
                error={error.rating ? true : false}
                onFocus={() => handleError("rating", null)}
                onChange={(e) => updateState({ rating: e.target.value })}
              />
            </Grid>
            {/* astrologer container ends here */}

            <Grid item lg={4} sm={12} md={12} xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Preferred Days</FormLabel>
                <FormGroup aria-label="position" row>
                  {preferredDaysList &&
                    preferredDaysList.map((item) => {
                      return (
                        <div className={classes.chips}>
                          <FormControlLabel
                            value={item}
                            className={classes.checkbox}
                            control={
                              <Checkbox
                                checked={
                                  preferredDays && preferredDays.includes(item)
                                }
                                onChange={() => handlePreferredDays(item)}
                              />
                            }
                            label={item}
                            // style={{margin: 30}}
                            labelPlacement="end"
                          />
                        </div>
                      );
                    })}
                </FormGroup>
              </FormControl>
              {error.preferredDays && (
                <div className={classes.errorstyles}>{error.preferredDays}</div>
              )}
            </Grid>

            <Grid item lg={4} sm={12} md={12} xs={12}>
              <FormControl component="fieldset">
                <FormLabel
                  component="legend"
                  style={{
                    fontFamily: "Philospher",
                    color: Colors.black,
                    fontSize: "1.2rem",
                  }}
                >
                  Are you working on any other online portal?
                </FormLabel>
                <RadioGroup
                  row
                  aria-label="position"
                  name="position"
                  defaultValue={working}
                  onChange={(e) => updateState({ working: e.target.value })}
                >
                  <FormControlLabel
                    value={"No"}
                    control={<Radio color="primary" />}
                    label="No"
                  />
                  <FormControlLabel
                    value={"Yes"}
                    control={<Radio color="primary" />}
                    label="Yes"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            {/* days & working */}

            <Grid item lg={12} sm={12} md={12} xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Available Countries</FormLabel>
                <FormGroup aria-label="position" row>
                  {countryValueData &&
                    countryValueData.map((item) => {
                      return (
                        <div className={classes.chips}>
                          <FormControlLabel
                            value={item.title}
                            className={classes.checkbox}
                            control={
                              <Checkbox
                                checked={countryValue && countryValue.includes(item._id)}
                                onChange={() => handleCountryValue(item)}
                              />
                            }
                            label={item.title + " " + item.countryValue + 'X'}
                            
                            labelPlacement="end"
                          />
                        </div>
                      );
                    })}
                </FormGroup>
              </FormControl>
              {error.countryValue && (
                <div className={classes.errorstyles}>{error.countryValue}</div>
              )}
            </Grid>

            <Grid
              item
              lg={3}
              sm={3}
              md={3}
              xs={3}
              className={classes.uploadContainer}
            >
              <Grid
                component="label"
                onClick={handleProfile}
                className={classes.uploadImageButton}
              >
                Upload Profile Photo
                <input
                  onChange={handleProfile}
                  hidden
                  accept="image/*"
                  type="file"
                />
              </Grid>
              <div className={classes.errorstyles}>{error.profilePhoto}</div>
            </Grid>
            <Grid item lg={1} sm={1} md={1} xs={1}>
              <Avatar
                color={Colors.primaryDark}
                src={profilePhoto.file}
                style={{ width: 56, height: 56 }}
              />
            </Grid>
            <Grid
              item
              lg={3}
              sm={3}
              md={3}
              xs={3}
              className={classes.uploadContainer}
            >
              <Grid
                component="label"
                onClick={handlebankProof}
                className={classes.uploadImageButton}
              >
                Upload Bank Proof
                <input
                  onChange={handlebankProof}
                  hidden
                  accept="image/*"
                  type="file"
                />
              </Grid>
              <div className={classes.errorstyles}>{error.bankProof}</div>
            </Grid>
            <Grid item lg={1} sm={1} md={1} xs={1}>
              <Avatar
                color={Colors.primaryDark}
                src={bankProof.file}
                style={{ width: 56, height: 56 }}
              />
            </Grid>
            <Grid
              item
              lg={3}
              sm={3}
              md={3}
              xs={3}
              className={classes.uploadContainer}
            >
              <Grid
                component="label"
                onClick={handleidProof}
                className={classes.uploadImageButton}
              >
                Upload Id Proof
                <input
                  onChange={handleidProof}
                  hidden
                  accept="image/*"
                  type="file"
                />
              </Grid>
              <div className={classes.errorstyles}>{error.idProof}</div>
            </Grid>
            <Grid item lg={1} sm={1} md={1} xs={1}>
              <Avatar
                color={Colors.primaryDark}
                src={idProof.file}
                style={{ width: 56, height: 56 }}
              />
            </Grid>

            <Grid item lg={3} sm={12} md={12} xs={12}>
              <TextField
                label="Bank Account Number"
                value={bankAccountNumber}
                variant="outlined"
                fullWidth
                type="number"
                onFocus={() => handleError("bankAccountNumber", null)}
                onChange={(e) =>
                  updateState({ bankAccountNumber: e.target.value })
                }
                helperText={error.bankAccountNumber}
                error={error.bankAccountNumber ? true : false}
              />
            </Grid>
            <Grid item lg={3} sm={12} md={12} xs={12}>
              <TextField
                label="Enter Bank Name"
                value={bankName}
                variant="outlined"
                fullWidth
                onChange={(e) => updateState({ bankName: e.target.value })}
                helperText={error.bankName}
                error={!!error.bankName ? true : false}
              />
            </Grid>
            <Grid item lg={3} md={12} sm={12} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Account Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Account Type"
                  value={accountType}
                  onFocus={() => handleError("accountType", null)}
                  onChange={(e) => updateState({ accountType: e.target.value })}
                  helperText={error.accountType}
                  error={error.accountType ? true : false}
                >
                  <div className={classes.errorstyles}>{error.accountType}</div>
                  <MenuItem disabled value={null}>
                    -Select Account type-
                  </MenuItem>
                  <MenuItem value="saving">Saving</MenuItem>
                  <MenuItem value="current">Current</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item lg={3} sm={12} md={12} xs={12}>
              <TextField
                label="Enter IFSC Code"
                value={ifscCode}
                variant="outlined"
                fullWidth
                onChange={(e) => updateState({ ifscCode: e.target.value })}
                helperText={error.ifscCode}
                error={error.ifscCode ? true : false}
              />
            </Grid>

            <Grid item lg={4} sm={12} md={12} xs={12}>
              <TextField
                label="Account Holder Name"
                value={accountHolderName}
                variant="outlined"
                fullWidth
                onChange={(e) =>
                  updateState({ accountHolderName: e.target.value })
                }
                helperText={error.accountHolderName}
                error={error.accountHolderName ? true : false}
              />
            </Grid>
            <Grid item lg={4} sm={12} md={12} xs={12}>
              <TextField
                label="PAN card Number"
                value={panNumber}
                variant="outlined"
                fullWidth
                onChange={(e) => updateState({ panNumber: e.target.value })}
                helperText={error.panNumber}
                error={error.panNumber ? true : false}
              />
            </Grid>
            <Grid item lg={4} sm={12} md={12} xs={12}>
              <TextField
                type="number"
                label="Adhar card Number"
                inputMode="numeric"
                value={aadharNumber}
                variant="outlined"
                fullWidth
                onChange={(e) => updateState({ aadharNumber: e.target.value })}
                helperText={error.aadharNumber}
                error={error.aadharNumber ? true : false}
              />
            </Grid>
            <Grid item lg={4} sm={12} md={12} xs={12}>
              <TextField
                type="text"
                label="Educational Qualification"
                value={educationQualification}
                variant="outlined"
                fullWidth
                onChange={(e) =>
                  updateState({ educationQualification: e.target.value })
                }
                helperText={error.educationQualification}
                error={error.educationQualification ? true : false}
              />
            </Grid>
            <Grid item lg={4} sm={12} md={12} xs={12}>
              <TextField
                type="text"
                label="Astrological Qualification"
                value={astrologyQualification}
                variant="outlined"
                fullWidth
                onChange={(e) =>
                  updateState({ astrologyQualification: e.target.value })
                }
                helperText={error.astrologyQualification}
                error={error.astrologyQualification ? true : false}
              />
            </Grid>
           

            <Grid item lg={4} sm={12} md={12} xs={12}>
              <TextField
                type="number"
                label="Call Price"
                inputMode="numeric"
                value={callPrice}
                variant="outlined"
                fullWidth
                onChange={(e) => updateState({ callPrice: e.target.value })}
                helperText={error.callPrice}
                error={error.callPrice ? true : false}
              />
            </Grid>
            <Grid item lg={4} sm={12} md={12} xs={12}>
              <TextField
                type="number"
                label="Company Call Price"
                inputMode="numeric"
                value={companyCallPrice}
                variant="outlined"
                fullWidth
                onChange={(e) =>
                  updateState({ companyCallPrice: e.target.value })
                }
                helperText={error.companyCallPrice}
                error={error.companyCallPrice ? true : false}
              />
            </Grid>
            <Grid item lg={4} sm={12} md={12} xs={12}>
              <TextField
                type="number"
                label="Chat Price"
                inputMode="numeric"
                value={chatPrice}
                variant="outlined"
                fullWidth
                onChange={(e) => updateState({ chatPrice: e.target.value })}
                helperText={error.chatPrice}
                error={error.chatPrice ? true : false}
              />
            </Grid>
            <Grid item lg={4} sm={12} md={12} xs={12}>
              <TextField
                type="number"
                label="Company Chat Price"
                inputMode="numeric"
                value={companyChatPrice}
                variant="outlined"
                fullWidth
                onChange={(e) =>
                  updateState({ companyChatPrice: e.target.value })
                }
                helperText={error.companyChatPrice}
                error={error.companyChatPrice ? true : false}
              />
            </Grid>
            <Grid item lg={4} sm={12} md={12} xs={12}>
              <TextField
                type="number"
                label="Live Video Price"
                inputMode="numeric"
                value={liveVideoPrice}
                variant="outlined"
                fullWidth
                onChange={(e) =>
                  updateState({ liveVideoPrice: e.target.value })
                }
                helperText={error.liveVideoPrice}
                error={error.liveVideoPrice ? true : false}
              />
            </Grid>
            <Grid item lg={4} sm={12} md={12} xs={12}>
              <TextField
                type="number"
                label="Company Live Video Price"
                inputMode="numeric"
                value={companyLiveVideoPrice}
                variant="outlined"
                fullWidth
                onChange={(e) =>
                  updateState({ companyLiveVideoPrice: e.target.value })
                }
                helperText={error.companyLiveVideoPrice}
                error={error.companyLiveVideoPrice ? true : false}
              />
            </Grid>
            <Grid item lg={4} sm={12} md={12} xs={12}>
              <TextField
                type="number"
                label="Live Call Price"
                inputMode="numeric"
                value={liveCallPrice}
                variant="outlined"
                fullWidth
                onChange={(e) => updateState({ liveCallPrice: e.target.value })}
                helperText={error.liveCallPrice}
                error={error.liveCallPrice ? true : false}
              />
            </Grid>
            <Grid item lg={4} sm={12} md={12} xs={12}>
              <TextField
                type="number"
                label="Company Voice Price Live"
                inputMode="numeric"
                value={companyLiveCallPrice}
                variant="outlined"
                fullWidth
                onChange={(e) =>
                  updateState({ companyLiveCallPrice: e.target.value })
                }
                helperText={error.companyLiveCallPrice}
                error={error.companyLiveCallPrice ? true : false}
              />
            </Grid>
            <Grid item lg={4} sm={12} md={12} xs={12}>
             
             </Grid>

            <Grid
              item
              lg={6}
              sm={12}
              md={12}
              xs={12}
              className={classes.uploadContainer}
            >

                <Grid component="label" className={classes.uploadImageButton}>
                  Upload Gallery Images
                  <input
                    onChange={handleGallery}
                    hidden
                    accept="image/*"
                    type="file"
                    multiple
                  />
                </Grid>
           
              <div className={classes.errorStyle}>{error.gallery}</div>
            </Grid>

            <Grid item lg={6} sm={12} md={6} xs={12}>
            <FormControl component="fieldset">
        <FormLabel component="legend">Astrologer Type</FormLabel>
        <FormGroup aria-label="position" row>
          {astrologerTypeList &&
            astrologerTypeList.map((item) => (
              <div className={classes.chips} key={item}>
                <FormControlLabel
                  value={item}
                  className={classes.checkbox}
                  control={
                    <Checkbox
                      checked={states.astrologerType.includes(item)}
                      onChange={() => handleAstrologerType(item)}
                    />
                  }
                  label={item}
                  labelPlacement="end"
                />
              </div>
            ))}
        </FormGroup>
      </FormControl>
      {error.astrologerType && (
        <div className={classes.errorstyles}>{error.astrologerType}</div>
      )}
    </Grid>

            <Grid item lg={12} sm={12} md={12} xs={12}>
           {/* <Typography variant="h6" component="label">Gallery Image</Typography>  */}
            <Grid container direction="row" spacing={2} style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
              {galleryImage.map((imgSrc, index) => (
                <Grid item key={index} style={{ width: 'auto' }}>
                  <Avatar
                    src={imgSrc}
                    variant="square"
                    style={{ width: '100px', height: '100px' }}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
         
            <Grid item lg={12} sm={12} md={12} xs={12}>
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={4}
                label="About"
                value={about}
                variant="outlined"
                fullWidth
                onFocus={() => handleError("about", null)}
                onChange={(e) => updateState({ about: e.target.value })}
                helperText={error.about}
                error={error.about ? true : false}
              />
            </Grid>

            <Grid item lg={6} sm={12} md={12} xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Skills</FormLabel>
                <FormGroup aria-label="position" row>
                  {activeSkillsData &&
                    activeSkillsData.map((item) => {
                      return (
                        <div className={classes.chips}>
                          <FormControlLabel
                            value={item.title}
                            className={classes.checkbox}
                            control={
                              <Checkbox
                                checked={skills && skills.includes(item._id)}
                                onChange={() => handleSkills(item)}
                              />
                            }
                            label={item.title}
                            labelPlacement="end"
                          />
                        </div>
                      );
                    })}
                </FormGroup>
              </FormControl>
              {error.skills && (
                <div className={classes.errorstyles}>{error.skills}</div>
              )}
            </Grid>
            <Grid item lg={6} sm={12} md={12} xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Remedies</FormLabel>
                <FormGroup aria-label="position" row>
                  {activeRemediesData &&
                    activeRemediesData.map((item) => {
                      return (
                        <div key={item._id} className={classes.chips}>
                          <FormControlLabel
                            className={classes.checkbox}
                            control={
                              <Checkbox
                                checked={
                                  remedies && remedies.includes(item._id)
                                }
                                onChange={() => handleRemedies(item)}
                              />
                            }
                            label={item.title}
                            labelPlacement="end"
                          />
                        </div>
                      );
                    })}
                </FormGroup>
              </FormControl>
              {error.remedies && (
                <div className={classes.errorstyles}>{error.remedies}</div>
              )}
            </Grid>
            <Grid item lg={12} sm={12} md={12} xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Expertise</FormLabel>
                <FormGroup aria-label="position" row>
                  {activeExpertiseData &&
                    activeExpertiseData.map((item) => {
                      return (
                        <div className={classes.chips}>
                          <FormControlLabel
                            value={item.title}
                            className={classes.checkbox}
                            control={
                              <Checkbox
                                checked={
                                  expertise && expertise.includes(item._id)
                                }
                                onChange={() => handleExpertise(item)}
                              />
                            }
                            label={item.title}
                            labelPlacement="end"
                          />
                        </div>
                      );
                    })}
                </FormGroup>
              </FormControl>
              {error.expertise && (
                <div className={classes.errorstyles}>{error.expertise}</div>
              )}
            </Grid>
            <Grid item lg={6} sm={6} md={6} xs={6}>
              <input
                type="submit"
                value="Submit"
                className={classes.submitbutton}
              />
            </Grid>
            <Grid item lg={6} sm={6} md={6} xs={6}>
              <div className={classes.denyButton} onClick={() => handleReset()}>
                Reset
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </form>
   </>
  );
};

const mapStateToProps = (state) => ({
  activeSkillsData: state.skills.activeSkillsData,
  activeExpertiseData: state.experites.activeExpertiseData,
  activeRemediesData: state.remedies.activeRemediesData,
  countryData: state.setting.countryData,
  countryStateData: state.setting.countryStateData,
  stateCityData: state.setting.stateCityData,
  countryValueData: state.setting.countryValueData,
  isLoading: state.dashboard.isLoading,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

// const mapDispatchToProps = (dispatch) => ({
//   addAstrologer: (category) => dispatch(AstrologerActions.addAstrologer(category)),

// });

export default connect(mapStateToProps, mapDispatchToProps)(AddAstrologers);
