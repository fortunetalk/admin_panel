import React, { useEffect, useState } from "react";
import { useStyles } from "../../assets/styles.js";
import Radio from "@material-ui/core/Radio";
import moment from "moment";
import RadioGroup from "@material-ui/core/RadioGroup";

import {
  Grid,
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
  Button,
  Modal,
  Box,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { useNavigate, useParams } from "react-router-dom";
import { Colors } from "../../assets/styles.js";
import logo_icon from "../../assets/images/logo_icon.png";

import { connect, useDispatch } from "react-redux";
import * as AstrologerActions from "../../redux/Actions/astrologerActions.js";
import {
  getAstrologer,
  setAllAstrologer,
} from "../../redux/Actions/astrologerActions.js";
import * as ExpertiesActions from "../../redux/Actions/expertiesActions.js";
import * as SkillActions from "../../redux/Actions/skillsActions.js";
import * as RemedyActions from "../../redux/Actions/remediesActions.js";
import * as LanguageActions from "../../redux/Actions/languageActions.js";
import Loader from "../../Components/loading/Loader.js";

const preferredDaysList = ["Mon", "Tues", "Wed", "Thu", "Fri", "Sat", "Sun"];
// const languageData = ["Hindi", "English"];

const optionsList = ["Consultation", "Teaching", "Pandit at Home", "All"];
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

export const EditAstrologer = ({
  activeSkillsData,
  activeExpertiseData,
  activeRemediesData,
  languageData,
  astrologerData,
  countryData,
  countryStateData,
  stateCityData,
  countryValueData,
}) => {
  var classes = useStyles();
  const { astrologerId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [galleryImages, setGalleryImages] = useState([]);
  const [open, setOpen] = useState(false);
  const [openExpertise, setOpenExpertise] = useState(false);
  const [openRemedies, setOpenRemedies] = useState(false);
  const [openCountry, setOpenCountry] = useState(false);
  const [openDays, setOpenDays] = useState(false);

  const backendGalleryImages = astrologerData?.galleryImage || [];

  const [state, setState] = useState({
    error: {},
    name: "",
    displayName: "",
    realName: "",
    email: "",
    phoneNumber: "",
    follower_count: "",
    currencyType: "",
    gender: "",
    password: "",
    dateOfBirth: "",
    experience: "",
    phoneCode: "",
    zipCode: "",
    startTime: "",
    endTime: "",
    rating: "",
    language: [],
    address: "",
    country: "",
    countryState: "",
    city: "",
    youtubeLink: "",
    currencyValue: "",
    bankName: "",
    bankAcountNumber: "",
    accountType: "",
    ifscCode: "",
    accountHolderName: "",
    panNumber: "",
    addharNumber: "",
    consultationPrice: "",
    callPrice: "",
    commissionCallPrice: "",
    chatPrice: "",
    commissionChatPrice: "",
    astrologerType: [],
    skills: [],
    remedies: [],
    offers: [],
    expertise: [],
    mainExpertise: [],
    shortBio: "",
    longBio: "",
    about: "",
    preferredDays: [],
    working: "No",
    educationQualification: "",
    followersValue: "",
    indiaDisplayPrice: "",
    displayPriceInternational: "",
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
    options: [],
  });

  useEffect(() => {
    if (astrologerId) {
      getAstrologer(astrologerId); 

    }
  }, [astrologerId]);



  useEffect(() => {
    if (astrologerData) {

      setState({
        ...astrologerData, 
        displayName:astrologerData?.displayName,
        name: astrologerData?.name,
        email: astrologerData?.email,
        phoneNumber: astrologerData?.phoneNumber,
        follower_count: astrologerData?.follower_count,
        currencyType: astrologerData?.currencyType,
        gender: astrologerData?.gender,
        password: astrologerData?.password,
        dateOfBirth: astrologerData?.dateOfBirth,
        experience: astrologerData?.experience,
        phoneCode: astrologerData?.phoneCode,
        zipCode: astrologerData?.zipCode,
        startTime: astrologerData?.startTime,
        endTime: astrologerData?.endTime,
        rating: astrologerData?.rating,
        language: astrologerData?.language,
        address: astrologerData?.address,
        country: astrologerData?.country,
        countryState: astrologerData?.countryState,
        city: astrologerData?.city,
        currencyValue: astrologerData?.currencyValue,
        bankName: astrologerData?.bankName,
        bankAcountNumber: astrologerData?.bankAcountNumber,
        accountType: astrologerData?.accountType,
        ifscCode: astrologerData?.ifscCode,
        accountHolderName: astrologerData?.accountHolderName,
        panNumber: astrologerData?.panNumber,
        addharNumber: astrologerData?.addharNumber,
        callPrice: astrologerData?.callPrice,
        chatPrice: astrologerData?.chatPrice,
        astrologerType: astrologerData?.astrologerType,
        about: astrologerData?.about,
        working: astrologerData?.working,
        educationQualification: astrologerData?.educationQualification,
        followersValue: astrologerData?.followersValue,
        astrologerCallPrice: astrologerData?.astrologerCallPrice,
        companyCallPrice: astrologerData?.companyCallPrice,
        astrologerChatPrice: astrologerData?.astrologerChatPrice,
        companyChatPrice: astrologerData?.companyChatPrice,
        liveVideoPrice: astrologerData?.liveVideoPrice,
        companyLiveVideoPrice: astrologerData?.companyLiveVideoPrice,
        liveCallPrice: astrologerData?.liveCallPrice,
        companyLiveCallPrice: astrologerData?.companyLiveCallPrice,
        astrologyQualification: astrologerData?.astrologyQualification,

      });
    }
  }, [astrologerData]); 
  
  
console.log(state)


  useEffect(() => {
    dispatch(SkillActions.getActiveSkillData());

    dispatch(ExpertiesActions.getActiveExpertiesData());
    dispatch(RemedyActions.getActiveRemediesData());
    dispatch(SettingActions.getCountries());
    dispatch(SettingActions.getCountryValue());
    if (astrologerData?.skillId) {
      updateState({ skills: astrologerData.skillId });
    }
    if (astrologerData?.expertiseId) {
      updateState({ expertise: astrologerData.expertiseId });
    }
    if (astrologerData?.remediesId) {
      updateState({ remedies: astrologerData.remediesId });
    }
  }, []);


  const [profilePhoto, setProfilePhoto] = useState({
    // file: logo_icon,
    file: astrologerData?.profileImage,
    bytes: "",
  });

  const [bankProof, setbankProof] = useState({
    file: astrologerData?.bankProofImage,
    bytes: "",
  });

  const [idProof, setidProof] = useState({
    file: astrologerData?.idProofImage,
    bytes: "",
  });

  const handleCountryValue = (item) => {
    if (countryValue.some((selectedItem) => selectedItem === item._id)) {
      let skilData = countryValue.filter(
        (countryValue) => countryValue !== item?._id
      );
      updateState({ countryValue: skilData });
    } else {
      updateState({ countryValue: [...countryValue, item?._id] });
    }
    handleError("countryValue", null);
  };

  const handleChange = (field) => (event) => {
    const { value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
    updateState({ [field]: value });
  };

  // console.log('data===>',astrologerData?.currencyValue)

  const handleRatingChange = (e) => {
    const newRating = e.target.value;
    if (isNaN(newRating) || newRating === "") {
      handleError("rating", "Please enter a valid number");
    } else {
      const parsedRating = parseFloat(newRating);
      if (parsedRating >= 0 && parsedRating <= 5) {
        handleError("rating", null);
        updateState({ rating: parsedRating });
      } else {
        handleError("rating", "Rating must be between 0 and 5");
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

  const handleRemedies = (item) => {
    if (remedies.some((selectedItem) => selectedItem === item._id)) {
      let remedyData = remedies.filter(
        (selectedItem) => selectedItem !== item._id
      );
      updateState({ remedies: remedyData });
    } else {
      updateState({ remedies: [...remedies, item?._id] });
    }
    handleError("remedies", null);
  };

  const handleExpertise = (item) => {
    if (expertise.some((selectedItem) => selectedItem === item._id)) {
      const expertiseData = expertise.filter(
        (selectedItem) => selectedItem !== item._id
      );
      updateState({ expertise: expertiseData });
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

  const handleOptions = (item) => {
    if (options.some((selectedItem) => selectedItem === item)) {
      const option = preferredDays.filter(
        (selectedItem) => selectedItem !== item
      );
      updateState({ options: option });
    } else {
      updateState({ options: [...options, item] });
    }
    handleError("options", null);
  };

  const handleProfile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setProfilePhoto({
        file: URL.createObjectURL(e.target.files[0]),
        bytes: e.target.files[0],
      });
      handleError("profilePhoto", null);
    }
  };

  const handleGallery = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      const newImages = filesArray.map((file) => ({
        file: URL.createObjectURL(file),
        bytes: file,
      }));
      setGalleryImages((prevImages) => [...prevImages, ...newImages]);
      handleError("gallery", null);
      handleError("bankProof", null);
    }
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
    }
  };

  const handleError = (field, message) => {
    updateState({ error: { ...error, [field]: message } });
  };

  const handleValidation = () => {
    var isValid = true;
    if (displayName.length == 0) {
      handleError("display name", "Display Name is required");
      isValid = false;
    } else if (realName.length == 0) {
      handleError("real name", "Real Name is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
    } else if (email.length == 0) {
      handleError("email", "Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      handleError("email", "invalid Email address");
      isValid = false;
    } else if (phoneNumber.length == 0) {
      handleError("phoneNumber", "phoneNumber Number is required");
      isValid = false;
    } else if (!/^[0-9]{10}$/.test(phoneNumber)) {
      handleError("phoneNumber", "Invalid phoneNumber Number");
      isValid = false;
    } else if (follower_count.length == 0) {
      handleError("follower_count", "Alternate phoneNumber Number is required");
      isValid = false;
    } else if (follower_count && !/^[0-9]{10}$/.test(follower_count)) {
      handleError("follower_count", "invalid Alternate phoneNumber Number");
      isValid = false;
    } else if (currencyType.length == 0) {
      handleError("currencyType", "currencyType is required");
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
    } else if (countryState.length == 0) {
      handleError("state", "State is required");
      isValid = false;
    } else if (city.length == 0) {
      handleError("city", "City is required");
      isValid = false;
    } else if (youtubeLink.length == 0) {
      handleError("youtubeLink", "youtubeLink is required");
      isValid = false;
    } else if (currencyValue.length == 0) {
      handleError("currencyValue", "currencyValue is required");
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
    } else if (startTime.length == 0) {
      handleError("startTime", "Start Time is required");
      isValid = false;
    } else if (endTime.length == 0) {
      handleError("endTime", "End Time is required");
      isValid = false;
    } else if (rating.length == 0) {
      handleError("rating", "Rating is required");
      isValid = false;
    } else if (!preferredDays || preferredDays.length === 0) {
      handleError("preferredDays", "Preferred Days is required");
      isValid = false;
    } else if (working !== "Yes" && working !== "No") {
      handleError("working", "Working must be either 'Yes' or 'No'");
      isValid = false;
    } else if (profilePhoto.bytes.length == 0) {
      handleError("profilePhoto", "Please Select a Profile Picutre");
      isValid = false;
    } else if (bankProof.bytes.length == 0) {
      handleError("bankProof", "Please Select a Bank Proof");
      isValid = false;
    } else if (idProof.bytes.length == 0) {
      handleError("idProof", "Please Select a Id Proof");
      isValid = false;
    } else if (bankAcountNumber.length == 0) {
      handleError("bankAcountNumber", "Bank Account Number is required");
      isValid = false;
    } else if (isNaN(bankAcountNumber) || bankAcountNumber <= 0) {
      handleError("bankAcountNumber", "Invalid Bank Account Number");
      isValid = false;
    } else if (bankName.length == 0) {
      handleError("bankName", "Bank Name is required");
      isValid = false;
    } else if (!accountType || accountType === "-Select Account Type-") {
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
    } else if (addharNumber.length == 0) {
      handleError("addharNumber", "Aadhar Number is required");
      isValid = false;
    } else if (consultationPrice.length == 0) {
      handleError("consultationPrice", "Consultation Price is required");
      isValid = false;
    } else if (callPrice.length == 0) {
      handleError("callPrice", "Call Price is required");
      isValid = false;
    } else if (commissionCallPrice.length == 0) {
      handleError("commissionCallPrice", "Commision Call Price is required");
      isValid = false;
    } else if (!chatPrice) {
      handleError("chatPrice", "Chat Price is required");
      isValid = false;
    } else if (!commissionChatPrice) {
      handleError("commissionChatPrice", "Commission Chat Price is required");
      isValid = false;
    } else if (callPrice.length == 0) {
      handleError("callPrice", "Call Price is required");
      isValid = false;
    } else if (shortBio.length == 0) {
      handleError("shortBio", "Short Bio is required");
      isValid = false;
    } else if (longBio.length == 0) {
      handleError("longBio", "Long Bio is required");
      isValid = false;
    } else if (skills.length == 0) {
      handleError("skills", "Skills is required");
      isValid = false;
    } else if (!remedies || remedies.length === 0) {
      handleError("remedies", "Please Select Remedies");
      isValid = false;
    } else if (!skills || skills.length === 0) {
      handleError("skills", "Please Select skills");
      isValid = false;
    } else if (!expertise || expertise.length === 0) {
      handleError("expertise", "Please Select expertise");
      isValid = false;
    } else if (!mainExpertise || mainExpertise.length === 0) {
      handleError("mainExpertise", "Please Select Main Expertise");
      isValid = false;
    } else if (!educationQualification || educationQualification.length === 0) {
      handleError(
        "educationQualification",
        "Please Select educational Qualification"
      );
      isValid = false;
    } else if (!followersValue || followersValue.length === 0) {
      handleError("followersValue", "Please Select followers Value");
      isValid = false;
    } else if (!indiaDisplayPrice || indiaDisplayPrice.length === 0) {
      handleError("indiaDisplayPrice", "Please Select India Display Price");
      isValid = false;
    } else if (
      !displayPriceInternational ||
      displayPriceInternational.length === 0
    ) {
      handleError(
        "displayPriceInternational",
        "Please Select Display Price International"
      );
      isValid = false;
    } else if (!astrologerCallPrice || astrologerCallPrice.length === 0) {
      handleError("astrologerCallPrice", "Please Select Astrologer Call Price");
      isValid = false;
    } else if (!companyCallPrice || companyCallPrice.length === 0) {
      handleError("companyCallPrice", "Please Select company Call price");
      isValid = false;
    } else if (!astrologerChatPrice || astrologerChatPrice.length === 0) {
      handleError("astrologerChatPrice", "Please Select Astrologer Chat Price");
      isValid = false;
    } else if (!companyChatPrice || companyChatPrice.length === 0) {
      handleError("companyChatPrice", "Please Select Company Chat Price");
      isValid = false;
    } else if (!liveVideoPrice || liveVideoPrice.length === 0) {
      handleError("liveVideoPrice", "Please Select Video Price Live");
      isValid = false;
    } else if (!companyLiveVideoPrice || companyLiveVideoPrice.length === 0) {
      handleError(
        "companyLiveVideoPrice",
        "Please Select Company Video Price Live"
      );
      isValid = false;
    } else if (!liveCallPrice || liveCallPrice.length === 0) {
      handleError("liveCallPrice", "Please Select Voice Price Live");
      isValid = false;
    } else if (!companyLiveCallPrice || companyLiveCallPrice.length === 0) {
      handleError(
        "companyLiveCallPrice",
        "Please Select Company Voice Price Live"
      );
      isValid = false;
    } else if (
      !astrologerCallPriceDollar ||
      astrologerCallPriceDollar.length === 0
    ) {
      handleError(
        "astrologerCallPriceDollar",
        "Please Select Astrologer Call Price Dollar"
      );
      isValid = false;
    } else if (
      !astrologerChatPriceDollar ||
      astrologerChatPriceDollar.length === 0
    ) {
      handleError(
        "astrologerChatPriceDollar",
        "Please Select Astrologer Chat Price Dollar"
      );
      isValid = false;
    } else if (!companyCallPriceDollar || companyCallPriceDollar.length === 0) {
      handleError(
        "companyCallPriceDollar",
        "Please Select Company Call Price Dollar"
      );
      isValid = false;
    } else if (!liveVideoPriceDollar || liveVideoPriceDollar.length === 0) {
      handleError(
        "liveVideoPriceDollar",
        "Please Select Video Price Live Dollar"
      );
      isValid = false;
    } else if (!companyChatPriceDollar || companyChatPriceDollar.length === 0) {
      handleError(
        "companyChatPriceDollar",
        "Please Select Company Chat Price Dollar"
      );
      isValid = false;
    } else if (!astrologyQualification || astrologyQualification.length === 0) {
      handleError(
        "astrologyQualification",
        "Please Select Astrological Qualification"
      );
      isValid = false;
    } else if (
      !companyLiveVideoPriceDollar ||
      companyLiveVideoPriceDollar.length === 0
    ) {
      handleError(
        "companyLiveVideoPriceDollar",
        "Please select company Video Price Live Dollar"
      );
      isValid = false;
    } else if (!liveCallPriceDollar || liveCallPriceDollar.length === 0) {
      handleError(
        "liveCallPriceDollar",
        "Please select Voice Price Live Dollar"
      );
      isValid = false;
    } else if (!gallery || gallery.length === 0) {
      handleError("gallery", "Please select gallery");
      isValid = false;
    } else if (!options || options.length === 0) {
      handleError("options", "Please select options");
      isValid = false;
    }

    // Validate if working is either "Yes" or "No"

    // Validate if startTime is before endTime
    else if (startTime && endTime) {
      const startDateTime = new Date(startTime);
      const endDateTime = new Date(endTime);

      if (!startTime) {
        handleError("startTime", "Start Time is Required");
      }
      if (startDateTime >= endDateTime) {
        handleError("endTime", "End Time must be after Start Time");
        isValid = false;
      }
    }
    return isValid;
  };

  const handleSubmit = async () => {
    try {
      const data = {
        astrologerId,
        displayName,
        name,
        email,
        password,
        phoneNumber,
        phoneCode,
        gender,
        dateOfBirth,
        experience,
        address,
        currencyType,
        currencyValue,
        country,
        state: countryState,
        city,
        zipCode,
        about,
        educationQualification,
        astrologyQualification,
        follower_count,
        rating,
        bankAcountNumber,
        bankName,
        accountType,
        ifscCode,
        accountHolderName,
        addharNumber,
        panNumber,
        chatPrice,
        companyChatPrice,
        callPrice,
        companyCallPrice,
        liveVideoPrice,
        companyLiveVideoPrice,
        liveCallPrice,
        companyLiveCallPrice,
        languages: language 
      };
  
      dispatch(
        AstrologerActions.updateAstrologerData(data)
      );
  
      console.log("Data submitted");
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleReset = () => {
    updateState({
      error: {},
      name: "",
      displayName: "",
      realName: "",
      email: "",
      phoneNumber: "",
      follower_count: "",
      currencyType: "",
      gender: "",
      password: "",
      dateOfBirth: "",
      experience: "",
      phoneCode: "",
      zipCode: "",
      startTime: "",
      endTime: "",
      rating: "",
      language: [],
      address: "",
      country: "",
      countryState: "",
      city: "",
      youtubeLink: "",
      currencyValue: "",
      bankName: "",
      bankAcountNumber: "",
      accountType: "",
      ifscCode: "",
      accountHolderName: "",
      panNumber: "",
      addharNumber: "",
      consultationPrice: "",
      callPrice: "",
      commissionCallPrice: "",
      chatPrice: "",
      commissionChatPrice: "",
      astrologerType: "",
      skills: [],
      remedies: [],
      expertise: [],
      mainExpertise: [],
      offers: [],
      shortBio: "",
      longBio: "",
      about: "",
      preferredDays: [],
      working: "No",
      educationQualification: "",
      followersValue: "",
      indiaDisplayPrice: "",
      displayPriceInternational: "",
      astrologerCallPrice: "",
      companyCallPrice: "",
      astrologerChatPrice: "",
      companyChatPrice: "",
      liveVideoPrice: "",
      companyLiveVideoPrice: "",
      liveCallPrice: "",
      companyLiveCallPrice: "",
      astrologerCallPriceDollar: "",
      astrologerChatPriceDollar: "",
      companyCallPriceDollar: "",
      liveVideoPriceDollar: "",
      companyChatPriceDollar: "",

      astrologyQualification: "",
      companyLiveVideoPriceDollar: "",
      liveCallPriceDollar: "",
      companyVoicepriceDollar: "",
      gallery: [],
      options: [],
    });

    setProfilePhoto({
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenExpertise = () => {
    setOpenExpertise(true);
  };

  const handleClickOpenRemedies = () => {
    setOpenRemedies(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };
  const handleCloseExpertiseDialog = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpenExpertise(false);
    }
  };
  const handleCloseRemediesDialog = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpenRemedies(false);
    }
  };

  const handleClickOpenCountry = () => {
    setOpenCountry(true);
  };

  const handleCloseCountry = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpenCountry(false);
    }
  };

  const handleUpdateCountry = () => {
    var formData = new FormData();
    formData.append("astrologerId", astrologerId);
    for (let i = 0; i < countryValue.length; i++) {
      formData.append(`allowedCountry[${i}]`, countryValue[i]);
    }
    dispatch(AstrologerActions.updateAstrologerAllowedCountry(formData));
    handleCloseCountry();
  };

  const handleUpdateSkills = () => {
    var formData = new FormData();
    formData.append("astrologerId", astrologerId);
    for (let i = 0; i < skills.length; i++) {
      formData.append(`skill[${i}]`, skills[i]);
    }
    dispatch(AstrologerActions.updateAstrologerSkill(formData));
    handleClose();
  };

  const handleUpdateExperties = () => {
    var formData = new FormData();
    formData.append("astrologerId", astrologerId);
    for (let i = 0; i < expertise.length; i++) {
      formData.append(`expertise[${i}]`, expertise[i]);
    }
    dispatch(AstrologerActions.updateAstrologerExperties(formData));
    handleCloseExpertiseDialog();
  };

  const handleUpdateRemedies = () => {
    var formData = new FormData();
    formData.append("astrologerId", astrologerId);
    for (let i = 0; i < remedies.length; i++) {
      formData.append(`remedies[${i}]`, remedies[i]);
    }
    dispatch(AstrologerActions.updateAstrologerRemedies(formData));
    handleCloseRemediesDialog();
  };

  const handleClickOpenDays = () => {
    setOpenDays(true);
  };

  const handleCloseDays = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpenDays(false);
    }
    
  };

  const handleUpdateDays = () => {

    var formData = new FormData();
    formData.append("astrologerId", astrologerId);
    for (let i = 0; i < preferredDays.length; i++) {
      formData.append(`preferredDays[${i}]`, preferredDays[i]);
    }
    dispatch(AstrologerActions.updateAstrologerPreferredDays(formData));
    setOpenDays(false);
  };

  const {
    error,
    name,
    displayName,
    realName,
    email,
    phoneNumber,
    follower_count,
    currencyType,
    gender,
    password,
    dateOfBirth,
    experience,
    phoneCode,
    zipCode,
    startTime,
    endTime,
    rating,
    language,
    country,
    countryState,
    city,
    currencyValue,
    bankName,
    bankAcountNumber,
    ifscCode,
    accountHolderName,
    accountType,
    addharNumber,
    about,
    youtubeLink,
    address,
    working,
    panNumber,
    preferredDays,

    skills,
    expertise,
    remedies,
    callPrice,
    chatPrice,
    educationQualification,

    companyCallPrice,
    companyChatPrice,
    liveVideoPrice,
    companyLiveVideoPrice,
    liveCallPrice,
    companyLiveCallPrice,

    astrologyQualification,
    options,
  } = state;

  return (
    <div className={classes.container}>
      {/* <Loader /> */}
      <div className={classes.box}>
        <Grid container spacing={2}>
          {astrologerInputsInfo()}
          <Grid item lg={4} sm={12} md={12} xs={12}>
      <FormControl component="fieldset">
        <FormLabel component="legend">Preferred Days</FormLabel>
        <FormGroup aria-label="position" row>
          {preferredDaysList &&
            preferredDaysList.map((item) => (
              <div className={classes.chips} key={item}>
                <FormControlLabel
                  value={item}
                  className={classes.checkbox}
                  control={
                    <Checkbox
                      checked={preferredDays && preferredDays.includes(item)}
                      onChange={() => handlePreferredDays(item)}
                    />
                  }
                  label={item}
                  labelPlacement="end"
                />
              </div>
            ))}
        </FormGroup>
      </FormControl>
      {error.preferredDays && (
        <div className={classes.errorstyles}>{error.preferredDays}</div>
      )}
      <Button
        variant="outlined"
        color="primary"
        className={classes.updateButton}
        onClick={handleClickOpenDays}
      >
        Update Preferred Days
      </Button>

      <Dialog open={openDays} onClose={handleCloseDays}>
        <DialogTitle>Update Preferred Days</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please update the preferred days below:
          </DialogContentText>
          <FormGroup aria-label="position" row>
            {preferredDaysList &&
              preferredDaysList.map((item) => (
                <div className={classes.chips} key={item}>
                  <FormControlLabel
                    value={item}
                    className={classes.checkbox}
                    control={
                      <Checkbox
                        checked={preferredDays && preferredDays.includes(item)}
                        onChange={() => handlePreferredDays(item)}
                      />
                    }
                    label={item}
                    labelPlacement="end"
                  />
                </div>
              ))}
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDays} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateDays} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
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
                value={working}
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



      <Grid item lg={12} sm={12} md={12} xs={12}>
      <FormControl component="fieldset">
        <FormLabel component="legend">Available Countries</FormLabel>
        <FormGroup aria-label="position" row>
          {countryValueData &&
            countryValueData.map((item) => (
              <div className={classes.chips} key={item._id}>
                <FormControlLabel
                  value={item.title}
                  className={classes.checkbox}
                  control={
                    <Checkbox
                      checked={countryValue && countryValue.includes(item._id)}
                      onChange={() => handleCountryValue(item)}
                    />
                  }
                  label={`${item.title} ${item.countryValue}X`}
                  labelPlacement="end"
                />
              </div>
            ))}
        </FormGroup>
      </FormControl>
      {error.countryValue && (
        <div className={classes.errorstyles}>{error.countryValue}</div>
      )}
      

      <Dialog open={openCountry} onClose={handleCloseCountry}>
        <DialogTitle>Update Available Countries</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please update the available countries below:
          </DialogContentText>
          <FormGroup aria-label="position" row>
            {countryValueData &&
              countryValueData.map((item) => (
                <div className={classes.chips} key={item._id}>
                  <FormControlLabel
                    value={item.title}
                    className={classes.checkbox}
                    control={
                      <Checkbox
                        checked={countryValue && countryValue.includes(item._id)}
                        onChange={() => handleCountryValue(item)}
                      />
                    }
                    label={`${item.title} ${item.countryValue}X`}
                    labelPlacement="end"
                  />
                </div>
              ))}
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCountry} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateCountry} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
    <Grid item lg={12} sm={12} md={12} xs={12}>
    <Button
        variant="outlined"
        color="primary"
        className={classes.updateButton}
        onClick={handleClickOpenCountry}
      >
        Update Available Countries
      </Button>
    </Grid>
          <Grid
            item
            lg={2}
            sm={2}
            md={2}
            xs={2}
            className={classes.uploadContainer}
          >
            <Grid
              component="label"
              onClick={handleProfile}
              className={classes.uploadImageButton}
            >
              Change Profile Photo
              <input
                onChange={handleProfile}
                hidden
                accept="image/*"
                type="file"
              />
            </Grid>
          </Grid>
          <Grid item lg={1} sm={1} md={1} xs={1}>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleUploadProfileImage}
            >
              Update Image
            </Button>
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
            lg={2}
            sm={2}
            md={2}
            xs={2}
            className={classes.uploadContainer}
          >
            <Grid
              component="label"
              onClick={handlebankProof}
              className={classes.uploadImageButton}
            >
              Change Bank Proof
              <input
                onChange={handlebankProof}
                hidden
                accept="image/*"
                type="file"
              />
            </Grid>
          </Grid>
          <Grid item lg={1} sm={1} md={1} xs={1}>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleUploadBankProofImage}
            >
              Update Image
            </Button>
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
              Change Id Proof
              <input
                onChange={handleidProof}
                hidden
                accept="image/*"
                type="file"
              />
            </Grid>
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
              value={bankAcountNumber}
              variant="outlined"
              fullWidth
              type="number"
              onFocus={() => handleError("bankAcountNumber", null)}
              onChange={(e) =>
                updateState({ bankAcountNumber: e.target.value })
              }
              helperText={error?.bankAcountNumber}
              error={error?.bankAcountNumber ? true : false}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item lg={3} sm={12} md={12} xs={12}>
            <TextField
              label="Enter Bank Name"
              value={bankName}
              variant="outlined"
              fullWidth
              onChange={(e) => updateState({ bankName: e.target.value })}
              helperText={error?.bankName}
              error={!!error?.bankName ? true : false}
              InputLabelProps={{ shrink: true }}
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
                helperText={error?.accountType}
                error={error?.accountType ? true : false}
                InputLabelProps={{ shrink: true }}
              >
                <div className={classes.errorstyles}>{error?.accountType}</div>
                <MenuItem value="">-Select Account type-</MenuItem>
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
              helperText={error?.ifscCode}
              error={error?.ifscCode ? true : false}
              InputLabelProps={{ shrink: true }}
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
              helperText={error?.accountHolderName}
              error={error?.accountHolderName ? true : false}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item lg={4} sm={12} md={12} xs={12}>
            <TextField
              label="PAN card Number"
              value={panNumber}
              variant="outlined"
              fullWidth
              onChange={(e) => updateState({ panNumber: e.target.value })}
              helperText={error?.panNumber}
              error={error?.panNumber ? true : false}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item lg={4} sm={12} md={12} xs={12}>
            <TextField
              type="number"
              label="Adhar card Number"
              inputMode="numeric"
              value={addharNumber}
              variant="outlined"
              fullWidth
              onChange={(e) => updateState({ addharNumber: e.target.value })}
              helperText={error?.addharNumber}
              error={error?.addharNumber ? true : false}
              InputLabelProps={{ shrink: true }}
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
              helperText={error?.educationQualification}
              error={error?.educationQualification ? true : false}
              InputLabelProps={{ shrink: true }}
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
              helperText={error?.astrologyQualification}
              error={error?.astrologyQualification ? true : false}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          {/* <Grid item lg={4} sm={12} md={12} xs={12}>
            <TextField
              label="Astrologer Type"
              value={astrologerType}
              variant="outlined"
              fullWidth
              onFocus={() => handleError("astrologerType", null)}
              onChange={(e) => updateState({ astrologerType: e.target.value })}
              helperText={error?.astrologerType}
              error={error?.astrologerType ? true : false}
              InputLabelProps={{ shrink: true }}
            />
          </Grid> */}

          <Grid item lg={4} sm={12} md={12} xs={12}>
            <TextField
              type="number"
              label="Call Price"
              inputMode="numeric"
              value={callPrice}
              variant="outlined"
              fullWidth
              onChange={(e) => updateState({ callPrice: e.target.value })}
              helperText={error?.callPrice}
              error={error?.callPrice ? true : false}
              InputLabelProps={{ shrink: true }}
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
              helperText={error?.companyCallPrice}
              error={error?.companyCallPrice ? true : false}
              InputLabelProps={{ shrink: true }}
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
              helperText={error?.chatPrice}
              error={error?.chatPrice ? true : false}
              InputLabelProps={{ shrink: true }}
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
              helperText={error?.companyChatPrice}
              error={error?.companyChatPrice ? true : false}
              InputLabelProps={{ shrink: true }}
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
              onChange={(e) => updateState({ liveVideoPrice: e.target.value })}
              helperText={error?.liveVideoPrice}
              error={error?.liveVideoPrice ? true : false}
              InputLabelProps={{ shrink: true }}
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
              helperText={error?.companyLiveVideoPrice}
              error={error?.companyLiveVideoPrice ? true : false}
              InputLabelProps={{ shrink: true }}
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
              helperText={error?.liveCallPrice}
              error={error?.liveCallPrice ? true : false}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item lg={4} sm={12} md={12} xs={12}>
            <TextField
              type="number"
              label="Company Live Call Price"
              inputMode="numeric"
              value={companyLiveCallPrice}
              variant="outlined"
              fullWidth
              onChange={(e) =>
                updateState({ companyLiveCallPrice: e.target.value })
              }
              helperText={error?.companyLiveCallPrice}
              error={error?.companyLiveCallPrice ? true : false}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item lg={6} sm={12} md={12} xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Options</FormLabel>
              <FormGroup aria-label="position" row>
                {optionsList &&
                  optionsList.map((item) => {
                    return (
                      <div className={classes.chips}>
                        <FormControlLabel
                          defaultValue={item}
                          className={classes.checkbox}
                          control={
                            <Checkbox
                              checked={options && options.includes(item)}
                              onChange={() => handleOptions(item)}
                            />
                          }
                          label={item}
                          labelPlacement="end"
                        />
                      </div>
                    );
                  })}
              </FormGroup>
            </FormControl>
         
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
              Change Gallery Images
              <input
                onChange={handleGallery}
                hidden
                accept="image/*"
                type="file"
                multiple
              />
            </Grid>
            <div
              className={classes.imagePreviewContainer}
              style={{ display: "flex" }}
            >
              {galleryImages.map((image, index) => (
                <img
                  key={index}
                  src={image.file}
                  alt={`Gallery ${index}`}
                  className={classes.previewImage}
                  style={{
                    height: "50px",
                    width: "50px",
                    objectFit: "cover",
                    margin: "5px",
                  }}
                />
              ))}
            </div>
          </Grid>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            {galleryImages.length === 0 && (
              <div
                className={classes.imagePreviewContainer}
                style={{ display: "flex", flexWrap: "wrap" }}
              >
                {backendGalleryImages.map((image, index) => (
                  <img
                    style={{
                      padding: "1rem",
                      height: "100px",
                      width: "100px",
                      objectFit: "cover",
                    }}
                    key={index}
                    src={image}
                    alt={`Gallery ${index}`}
                    className={classes.previewImage}
                  />
                ))}
              </div>
            )}
          </Grid>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            {/* <Button
              variant="outlined"
              color="primary"
              onClick={handleUploadGalleryImages}
            >
              Update Gallery Image
            </Button> */}
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
              helperText={error?.about}
              error={error?.about ? true : false}
              InputLabelProps={{ shrink: true }}
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
          
            <Button
              variant="outlined"
              color="primary"
              className={classes.updateButton}
              onClick={handleClickOpen}
            >
              Update Skills
            </Button>

            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Update Skills</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please update the skills below:
                </DialogContentText>
                <FormGroup aria-label="position" row>
                  {activeSkillsData &&
                    activeSkillsData.map((item) => (
                      <div className={classes.chips} key={item._id}>
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
                    ))}
                </FormGroup>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleUpdateSkills} color="primary">
                  Update
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
          <Grid item lg={6} sm={12} md={12} xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Remedies</FormLabel>
              <FormGroup aria-label="position" row>
                {activeRemediesData &&
                  activeRemediesData.map((item) => (
                    <div key={item._id} className={classes.chips}>
                      <FormControlLabel
                        value={item.title}
                        className={classes.checkbox}
                        control={
                          <Checkbox
                            checked={remedies && remedies.includes(item._id)}
                            onChange={() => handleRemedies(item)}
                          />
                        }
                        label={item.title}
                        labelPlacement="end"
                      />
                    </div>
                  ))}
              </FormGroup>
            </FormControl>
            
            <Button
              variant="outlined"
              color="primary"
              className={classes.updateButton}
              onClick={handleClickOpenRemedies}
            >
              Update Remedies
            </Button>

            <Dialog open={openRemedies} onClose={handleCloseRemediesDialog}>
              <DialogTitle>Update Remedies</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please update the remedies below:
                </DialogContentText>
                <FormGroup aria-label="position" row>
                  {activeRemediesData &&
                    activeRemediesData.map((item) => (
                      <div key={item._id} className={classes.chips}>
                        <FormControlLabel
                          value={item.title}
                          className={classes.checkbox}
                          control={
                            <Checkbox
                              checked={remedies && remedies.includes(item._id)}
                              onChange={() => handleRemedies(item)}
                            />
                          }
                          label={item.title}
                          labelPlacement="end"
                        />
                      </div>
                    ))}
                </FormGroup>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseRemediesDialog} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleUpdateRemedies} color="primary">
                  Update
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Expertise</FormLabel>
              <FormGroup aria-label="position" row>
                {activeExpertiseData &&
                  activeExpertiseData.map((item) => (
                    <div className={classes.chips} key={item._id}>
                      <FormControlLabel
                        value={item.title}
                        className={classes.checkbox}
                        control={
                          <Checkbox
                            checked={expertise && expertise.includes(item._id)}
                            onChange={() => handleExpertise(item)}
                          />
                        }
                        label={item.title}
                        labelPlacement="end"
                      />
                    </div>
                  ))}
              </FormGroup>
            </FormControl>
          
            <Button
              variant="outlined"
              color="primary"
              className={classes.updateButton}
              onClick={handleClickOpenExpertise}
            >
              Update Expertise
            </Button>

            <Dialog open={openExpertise} onClose={handleClose}>
              <DialogTitle>Update Expertise</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please update the expertise below:
                </DialogContentText>
                <FormGroup aria-label="position" row>
                  {activeExpertiseData &&
                    activeExpertiseData.map((item) => (
                      <div className={classes.chips} key={item._id}>
                        <FormControlLabel
                          value={item._id}
                          className={classes.checkbox}
                          control={
                            <Checkbox
                              checked={expertise && expertise.includes(item._id)}
                              onChange={() => handleExpertise(item)}
                            />
                          }
                          label={item.title}
                          labelPlacement="end"
                        />
                      </div>
                    ))}
                </FormGroup>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseExpertiseDialog} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleUpdateExperties} color="primary">
                  Update
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>


          <Grid item lg={6} sm={6} md={6} xs={6}>
            <div
              onClick={() => handleSubmit()}
              className={classes.submitbutton}
            >
              Submit
            </div>
          </Grid>
          <Grid item lg={6} sm={6} md={6} xs={6}>
            <div className={classes.denyButton} onClick={() => handleReset()}>
              Reset
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );

  function astrologerInputsInfo() {
    const get_date_value = () => {
      var currentDate = new Date();

      // Subtract 16 years from the current date
      var previous16YearsDate = new Date(currentDate);
      previous16YearsDate.setFullYear(currentDate.getFullYear() - 16);

      // Format the date as yyyy-mm-dd
      var formattedDate = previous16YearsDate.toISOString().split("T")[0];
      return formattedDate;
    };

    return (
      <>
        <Grid item lg={12} sm={12} md={12} xs={12}>
          <div className={classes.headingContainer}>
            <div className={classes.heading}>Edit Astrologer</div>
          </div>
        </Grid>
        <Grid item lg={4} sm={12} md={12} xs={12}>
          <TextField
            label="Display Name"
            defaultValue={astrologerData?.displayName || ""}
            variant="outlined"
            fullWidth
            error={!!error.displayName}
            onFocus={() => handleError("displayName", null)}
            onChange={(e) => updateState({ displayName: e.target.value })}

            helperText={error?.displayName}
            InputLabelProps={{ shrink: true }}
            value={displayName}
          />
        </Grid>
        <Grid item lg={4} sm={12} md={12} xs={12}>
          <TextField
            label="Name"
            value={name}
            variant="outlined"
            fullWidth
            onFocus={() => handleError("name", null)}
            onChange={(e) => updateState({ name: e.target.value })}
            helperText={error?.name}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item lg={4} sm={12} md={12} xs={12}>
          <TextField
            label="Enter Email"
            value={email}
            variant="outlined"
            fullWidth
            onFocus={() => handleError("email", null)}
            onChange={(e) => updateState({ email: e.target.value })}
            helperText={error?.email}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item lg={4} sm={12} md={12} xs={12}>
          <TextField
            label="Enter Phone Number"
            value={phoneNumber}
            variant="outlined"
            fullWidth
            type="number"
            helperText={error?.phoneNumber}
            onFocus={() => handleError("phoneNumber", null)}
            onChange={(e) => updateState({ phoneNumber: e.target.value })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item lg={4} md={12} sm={12} xs={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Currency Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Currency Type"
              value={currencyType}
              defaultValue={astrologerData?.currencyType}
              error={error.currencyType ? true : false}
              onFocus={() => handleError("currencyType", null)}
              onChange={(e) => updateState({ currencyType: e.target.value })}
            >
              <MenuItem value="">-Select currencyType-</MenuItem>
              <MenuItem value="INR">INR</MenuItem>
              <MenuItem value="USD">USD</MenuItem>
            </Select>
         
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
              onFocus={() => handleError("gender", null)}
              onChange={handleChange("gender")}
            >
              <MenuItem value="">-Select Gender-</MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          
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
            helperText={error?.password}
            InputLabelProps={{ shrink: true }}
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
            helperText={error?.dateOfBirth}
            error={error?.dateOfBirth ? true : false}
            InputLabelProps={{ shrink: true }}
          />
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
            error={error.experience ? true : false}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        {/* <Grid item lg={4} sm={12} md={12} xs={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Language</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="language"
              value={language}
              onChange={(e) => updateState({ language: e.target.value })}
              onFocus={() => handleError("language", null)}
              renderValue={(selected) => selected.join(", ")}
              error={!!error.language}
            >
              <MenuItem disabled defaultValue={null}>
                -Select Language-
              </MenuItem>
              {languages.map((item) => (
                <MenuItem key={item} value={item}>
                  <Checkbox checked={language.indexOf(item) > -1} />
                  <ListItemText primary={item} />
                </MenuItem>
              ))}
            </Select>
          
          </FormControl>
        
        </Grid> */}
  
        <Grid item lg={4} sm={12} md={12} xs={12}>
          <TextField
            label="Address"
            value={address}
            variant="outlined"
            fullWidth
            onFocus={() => handleError("address", null)}
            onChange={(e) => updateState({ address: e.target.value })}
            helperText={error?.address}
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
            <InputLabel id="demo-simple-select-label">State</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="State"
              value={countryState}
              onFocus={() => handleError("state", null)}
              onChange={(e) => updateState({ countryState: e.target.value })}
              error={!!error.countryState}
              disabled={!country}
            >
              <MenuItem>-Select your State-</MenuItem>
              <MenuItem value="Jammu & Kashmir">Jammu & Kashmir</MenuItem>
              <MenuItem value="Uttar Pradesh">Uttar Pradesh</MenuItem>
              <MenuItem value="UttraKhand">UttraKhand</MenuItem>
            </Select>
            
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
              disabled={!countryState}
            >
              <MenuItem value="">-Select your City-</MenuItem>
              <MenuItem value="Meerut">Meerut</MenuItem>
              <MenuItem value="Delhi">Delhi</MenuItem>
              <MenuItem value="Noida">Noida</MenuItem>
              {/* Add more cities as needed */}
            </Select>
          
          </FormControl>
        </Grid>

        <Grid item lg={4} sm={12} md={12} xs={12}>
          <TextField
            label="Currency Value"
            value={currencyValue}
            variant="outlined"
            type="text"
            fullWidth
            onChange={(e) => updateState({ currencyValue: e.target.value })}
            helperText={error?.currencyValue}
            error={error?.currencyValue ? true : false}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item lg={4} sm={12} md={12} xs={12}>
          <TextField
            label="Pin Code"
            value={zipCode}
            variant="outlined"
            type="text"
            fullWidth
            onFocus={() => handleError("zipCode", null)}
            onChange={(e) => updateState({ zipCode: e.target.value })}
            helperText={error?.zipCode}
            error={error?.zipCode ? true : false}
            InputLabelProps={{ shrink: true }}
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
            helperText={error?.phoneCode}
            error={error?.phoneCode ? true : false}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item lg={4} sm={12} md={12} xs={12}>
          <TextField
            type="number"
            label="Rating"
            value={rating}
            variant="outlined"
            fullWidth
            onFocus={() => handleError("rating", null)}
            onChange={handleRatingChange}
            helperText={error?.rating}
            error={error?.rating ? true : false}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item lg={4} sm={12} md={12} xs={12}>
          <TextField
            label="Followers Count"
            value={follower_count}
            variant="outlined"
            fullWidth
            helperText={error?.follower_count}
            error={error?.follower_count ? true : false}
            onFocus={() => handleError("follower_count", null)}
            onChange={(e) => updateState({ follower_count: e.target.value })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </>
    );
  }
};

const mapStateToProps = (state) => ({
  activeSkillsData: state.skills.activeSkillsData,
  activeExpertiseData: state.experites.activeExpertiseData,
  activeRemediesData: state.remedies.activeRemediesData,
  languageData: state.language.languageData,
  astrologerData: state.astrologer.astrologerData,
});

// const mapDispatchToProps = (dispatch) => ({ dispatch });

const mapDispatchToProps = (dispatch) => ({
  getAstrologer: (astrologerId) => dispatch(getAstrologer(astrologerId)),
});

// const mapDispatchToProps = (dispatch) => ({
//   getAstrologer: () => dispatch(getAstrologer()),
// });

export default connect(mapStateToProps, mapDispatchToProps)(EditAstrologer);
