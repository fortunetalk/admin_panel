import { all } from "redux-saga/effects";
import reviewSaga from "./reviewSaga";
import customerSaga from "./customerSaga";
import astrologerSaga from "./astrologerSaga";
import expertiesSaga from "./expertiesSaga";
import skillsSaga from "./skillsSaga";
import remediesSaga from "./remediesSaga";
import bannerSaga from "./redirectBannerSaga";
import notificationSaga from "./notificationSaga";
import historySaga from "./historySaga";
import dashboardSaga from "./dashboardSaga";
import reportSaga from "./reportsSaga";
import languageSaga from "./languageSaga";
import rechargeSaga from "./rechargeSaga";
import productCategorySaga from "./productCategorySaga";
import poojaCategorySaga from "./poojaCategorySaga";
import blogCategorySaga from "./blogCategorySaga";
import blogSaga from "./blogSaga";
import settingSaga from "./settingSaga";
import productSaga from "./productSaga";
import poojaSaga from "./poojaSaga";
import courseSaga from "./courseSaga";
import courseBannerSaga from "./courseBannerSaga";
import ecommerceBannerSaga from "./ecommerceBannerSaga";
import productBannerSaga from "./productBannerSaga";
import poojaBannerSaga from "./poojaBannerSaga";
import callChatBannerSaga from "./callChatBannerSaga";
import testimonialSaga from "./testimonialSaga";
import demoClassSaga from "./demoClassSaga";
import liveClassSaga from "./liveClassSaga";
import scheduleLiveClassSaga from "./scheduleLiveClassSaga";
import workshopSaga from "./workshopSaga";
import mcqSaga from "./mcqSaga";
import giftSaga from "./giftSaga";
import privacyPolicySaga from "./privacyPolicySaga";

import adminLogin from './adminSaga';
import requestSaga from "./requestSaga";
import astrologerBannerSaga from "./astrologerBannerSaga";
import termsAndConditionSaga from "./termsAndConditionSaga";
import liveStreamSaga from "./liveStreamSaga";
import rechargeHistorySaga from "./rechargeHistorySaga";
import astrologerTrainingBannerSaga from "./astrologerTrainingBannerSaga";
import offerSaga from "./offerSaga";
import callDiscussionSaga from "./callDiscussionSaga";
import chatSupportSaga from "./chatSupportSaga";


export default function* rootSaga() {
  yield all([
    reviewSaga(),
    customerSaga(),
    astrologerSaga(),
    expertiesSaga(),
    skillsSaga(),
    remediesSaga(),
    bannerSaga(),
    notificationSaga(),
    historySaga(),
    dashboardSaga(),
    reportSaga(),
    languageSaga(),
    rechargeSaga(),
    productCategorySaga(),
    productSaga(),
    poojaCategorySaga(),
    poojaSaga(),
    blogCategorySaga(),
    blogSaga(),
    settingSaga(),
    courseBannerSaga(),
    courseSaga(),
    ecommerceBannerSaga(),
    productBannerSaga(),
    poojaBannerSaga(),
    callChatBannerSaga(),
    testimonialSaga(),
    demoClassSaga(),
    liveClassSaga(),
    scheduleLiveClassSaga(),
    workshopSaga(),
    mcqSaga(),
    giftSaga(),
    privacyPolicySaga(),
    adminLogin(),
    requestSaga(),
    astrologerBannerSaga(),
    termsAndConditionSaga(),
    liveStreamSaga(),
    rechargeHistorySaga(),
    astrologerTrainingBannerSaga(),
    offerSaga(),
    callDiscussionSaga(),
    chatSupportSaga()
  ]);
}
