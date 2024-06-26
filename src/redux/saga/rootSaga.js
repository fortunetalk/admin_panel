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
  ]);
}
