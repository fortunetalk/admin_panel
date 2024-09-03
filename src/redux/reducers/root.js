import { combineReducers } from "redux";
// import {CLEAN_STORE} from '../actionTypes/userActionTypes';
import dashboard from "./dashboard";
import review from "./review";
import customer from "./customer";
import astrologer from "./astrologer";
import experites from "./experties";
import skills from "./skills";
import remedies from "./remedies";
import redirectBanner from "./redirectBanner";
import notification from './notification'
import history from "./history";
import reports from "./reports";
import language from './language';
import recharge from "./recharge";
import productCategory from "./productCategory";
import poojaCategory from "./poojaCategory";
import blogCategory from "./blogCategory";
import blog from "./blog";
import setting from "./setting";
import product from "./product";
import pooja from "./pooja";
import course from "./course";
import courseBanner from "./courseBanner";
import ecommerceBanner from './ecommerceBanner'
import productBanner from './productBanner'
import poojaBanner from './poojaBanner'
import callChatBanner from "./callChatBanner";
import testimonial from './testimonial'
import demoClass from "./demoClass";
import liveClass from "./liveClass";
import scheduleLiveClass from "./scheduleLiveClass";
import workshop from "./workshop";
import mcq from "./mcq";
import gift from "./gift";
import privacyPolicy from "./privacyPolicy";
import admin from './admin';
import request from "./request";
import astrologerBanner from "./astrologerBanner";
import termsAndCondition from "./termsAndCondition";
import liveStream from "./livestream";
import rechargeHistory from "./rechargeHistory";
import astrologerTrainingBanner from "./astrologerTrainingBanner";
import offers from "./offers";

const rootReducer = combineReducers({
  admin,
  dashboard,
  review,
  customer,
  astrologer,
  experites,
  skills,
  remedies,
  redirectBanner,
  notification,
  history,
  reports,
  language,
  recharge,
  productCategory,
  product,
  poojaCategory,
  pooja,
  blogCategory,
  blog,
  setting,
  course,
  courseBanner,
  ecommerceBanner,
  productBanner,
  poojaBanner,
  callChatBanner,
  astrologerBanner,
  testimonial,
  demoClass,
  liveClass,
  scheduleLiveClass,
  workshop,
  mcq,
  gift,
  privacyPolicy,
  request,
  termsAndCondition,
  liveStream,
  rechargeHistory,
  astrologerTrainingBanner,
  offers,
});

// const appReducer = (state, action) => {
//   if (action.type == CLEAN_STORE) {
//     state = undefined; 
//   }
//   return rootReducer(state, action);
// };

export default rootReducer;
