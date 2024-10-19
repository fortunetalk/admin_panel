import "./App.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

import Dashboard from "./pages/dashboard/Dashboard";
import PrivateRoute from "./utils/PrivateRoute";
import DisplaySkills from "./pages/skills/DisplaySkills";
import AddSkills from "./pages/skills/AddSkills";
import AddSubSkills from "./pages/subSkills/AddSubSkills";
import DisplaySubSkills from "./pages/subSkills/DisplaySubSkills";
import Login from "./pages/login/Login";
import AddRechargePlans from "./pages/recharge/AddRechargePlans";
import DisplayRechargePlans from "./pages/recharge/DisplayRechargePlans";
import DisplayFirstRechargeOffer from "./pages/recharge/DisplayFirstRechargeOffer";
import AddFirstRechargeOffer from "./pages/recharge/AddFirstRechargeOffer";

import AddRemedies from "./pages/remedies/AddRemedies";
import DisplayRemedies from "./pages/remedies/DisplayRemedies";
import DisplayExpertise from "./pages/expertise/DisplayExpertise";
import AddExpertise from "./pages/expertise/AddExpertise";
import DisplayCustomer from "./pages/customer/DisplayCustomer";
import AddCustomer from "./pages/customer/AddCustomer";
import DisplayReview from "./pages/review/DisplayReview";
import AddReview from "./pages/review/AddReview";
import DisplayMessage from "./pages/message/DisplayMessage";
import AddMessage from "./pages/message/AddMessage";
import DisplayAstrologer from "./pages/astrologer/DisplayAstrologer";
import AddAstrologers from "./pages/astrologer/AddAstrologers";
import DisplayEnquiry from "./pages/astrologer/DisplayEnquiry";
import AddEnquiry from "./pages/astrologer/AddEnquiry";
import ChatHistory from "./pages/history/ChatHistory";
import CallHistory from "./pages/history/CallHistory";
import UsersGiftHistory from "./pages/history/UsersGiftHistory";
import RechargeHistory from "./pages/history/RechargeHistory";
import LiveStream from "./pages/livestream/DisplayLiveStream";
import DisplayUser from "./pages/user/DisplayUser";
import AddUser from "./pages/user/AddUser";
import DisplayGift from "./pages/gift/DisplayGift";
import AddGift from "./pages/gift/AddGift";
import DisplayAstroblog from "./pages/astroblog/DisplayAstroblog";
import AddAstroblog from "./pages/astroblog/AddAstroblog";
import AddAppverstion from "./pages/appverstion/AddAppverstion";

import DisplayFaq from "./pages/pages/DisplayFaq";
import AddFaq from "./pages/pages/AddFaq";
import TermsAndConditions from "./pages/pages/TermsAndConditions";
import PrivacyPolicy from "./pages/pages/PrivacyPolicy";
import DisplayTestimonials from "./pages/pages/DisplayTestmonials";
import AddTestmonials from "./pages/pages/AddTestimonials";
import DisplayOurAstrologers from "./pages/pages/DisplayOurAstrologers";
import AddOurAstrologers from "./pages/pages/AddOurAstrologers";
import DisplayHowToUseVideos from "./pages/pages/DisplayHowToUseVideos";
import AddHowToUseVideo from "./pages/pages/AddHowToUseVideo";
import DisplayHowToUse from "./pages/pages/DisplayHowToUse";
import AddHowToUse from "./pages/pages/AddHowToUse";
import AdminEarning from "./pages/reports/AdminEarning";
import ReceiptSummary from "./pages/reports/ReceiptSummary";
import SaleSummary from "./pages/reports/SaleSummary";
import EditAstrologer from "./pages/astrologer/EditAstrologer";
import Try from "../src/pages/try/Try";
import GooglePlacesAutocomplete from "../src/pages/try/Try";
import DisplayCustomerOrderHistory from "./pages/customer/DisplayCustomerOrderHistory";
import DisplayCustomerPaymentHistory from "./pages/customer/DisplayCustomerPaymentHisotry";
import AppReviews from "./pages/review/AppReviews";
import CustomerNotification from "./pages/notification/CustomerNotification";
import AstrologerNotification from "./pages/notification/AstrologerNotification";
import ChatSummary from "./pages/history/ChatSummary";
import TopAstrologers from "./pages/astrologer/TopAstrologers";

import DisplayBlogCategory from "./pages/blogCategory/DisplayBlogCategory";
import AddBlogCategory from "./pages/blogCategory/AddBlogCategory";
import Country from "./pages/setting/country/DisplayCountry";
import AddCountry from "./pages/setting/country/AddCountry";
import State from "./pages/setting/state/DisplayState";
import AddState from "./pages/setting/state/AddState";
import City from "./pages/setting/city/DisplayCity";
import AddCity from "./pages/setting/city/AddCity";
import FilteredCountryList from "./pages/setting/country/FilteredCountryList";
import AddCourseBanner from "./pages/banner/AddCourseBanner";
import DisplayCourseBanner from "./pages/banner/DisplayCourseBanner";
import AddRedirectBanner from './pages/banner/AddRedirectBanner';
import DisplayRedirectBanner from './pages/banner/DisplayRedirectBanner';
import AddCallChatBanner from './pages/banner/AddCallChatBanner';
import DisplayCallChatBanner from './pages/banner/DisplayCallChatBanner';
import AddEcommerceBanner from './pages/banner/AddEcommerceBanner';
import DisplayEcommerceBanner from './pages/banner/DisplayEcommerceBanner';
import AddProductBanner from './pages/banner/AddProductBanner';
import DisplayProductBanner from './pages/banner/DisplayProductBanner';
import AddPoojaCategoryBanner from './pages/banner/AddPoojaCategoryBanner';
import DisplayPoojaBanner from './pages/banner/DisplayPoojaBanner';
import DisplayProductCategory from "./pages/fortuneStore/DisplayProductCategory";
import CreateProductCategory from "./pages/fortuneStore/CreateProductCategory";
import DisplayPoojaCategory from "./pages/fortuneStore/DisplayPoojaCategory";
import CreatePoojaCategory from "./pages/fortuneStore/CreatePoojaCategory";
import DisplayProduct from "./pages/fortuneStore/DisplayProduct";
import CreateProduct from "./pages/fortuneStore/CreateProduct";
import CreatePooja from "./pages/fortuneStore/CreatePooja";
import DisplayPooja from "./pages/fortuneStore/DisplayPooja";
import AddPoojaBanner from "./pages/banner/AddPoojaBanner";
import DisplayTestimonial from "./pages/testimonial/DisplayTestimonial";
import AddTestimonial from "./pages/testimonial/AddTestimonial";
import DisplayCourses from "./pages/courses/DisplayCourses";
import AddCourses from "./pages/courses/AddCourses";
import DisplayDemoClass from "./pages/courses/DisplayDemoClass";
import AddDemoClass from "./pages/courses/AddDemoClass";
import DisplayLiveClass from "./pages/courses/DisplayLiveClass";
import AddLiveClass from "./pages/courses/AddLiveClass";
import LiveClassList from "./pages/courses/LiveClassList";
import AddClass from "./pages/courses/AddClass";
import DisplayWorkshop from "./pages/workshop/DisplayWorkshop";
import AddWorkshop from "./pages/workshop/AddWorkshop";
import DisplayMCQ from "./pages/courses/DisplayMCQ";
import AddMCQ from "./pages/courses/AddMCQ";
import AddCustomerNotification from "./pages/notification/AddCustomerNotification";
import AddAstrologerNotification from "./pages/notification/AddAstrologerNotification";
import AddPrivacyPolicy from "./pages/pages/AddPrivacyPolicy";
import ProfileRequest from "./pages/request/ProfileRequest";
import PhoneRequest from "./pages/request/PhoneRequest";
import BankRequest from "./pages/request/BankRequest";
import GalleryRequest from "./pages/request/GalleryRequest";
import AddAstrologerBanner from "./pages/banner/AddAstrologerBanner";
import DisplayAstrologerBanner from "./pages/banner/DisplayAstrologerBanner";
import AddTermsAndCondition from "./pages/pages/AddTermsAndCondition";
import RechargePlan from "./pages/recharge/RechargePlan";
import AddAstrologerTrainingBanner from "./pages/banner/AddAstrologerTrainingBanner";
import DisplayAstrologerTrainingBanner from "./pages/banner/DisplayAstrologerTrainingBanner";
import DemoClassHistory from "./pages/history/DemoClassHistory";
import LiveClassHistory from "./pages/history/LiveClassHistory";
import DisplayLiveCourseHistory from "./pages/history/DisplayLiveCourseHistory";
import RegisterLiveClassHistory from "./pages/courses/RegisterLiveClassHistory";
import FullChatHistory from "./pages/history/FullChatHistory";
import MCQAnswerList from "./pages/courses/MCQAnswerList";
import AddRechargeByAdmin from "./pages/customer/AddRechargeByAdmin";
import CustomerRechargeHistory from "./pages/customer/CustomerRechargeHistory";
import VideoEarning from "./pages/adminEarning/videoEarning";
import CallEarning from "./pages/adminEarning/callEarning";
import ChatEarning from "./pages/adminEarning/chatEarning";
import DisplayAstrologerOffers from "./pages/astrologerOffers/DisplayAstrologerOffers";
import AddAstrologersOffers from "./pages/astrologerOffers/AddAstrologersOffers";
import AstrologerChatSupport from "./pages/chatSupport/AstrologerChatSupport";
import CustomerChatSupport from "./pages/chatSupport/CustomerChatSupport";
import VersionUpdate from "./pages/setting/versionUpdate/VersionUpdate";
import AddCallDiscussion from "./pages/callDiscussion/AddCallDiscussion";
import DisplayCallDiscussion from "./pages/callDiscussion/DisplayCallDiscussion";
import AddRechargeHistory from "./pages/recharge/AddRechargeHistory";
import WaitingList from "./pages/waitingList/WaitingList";
import WaitingListHistory from "./pages/waitingList/WaitingListHistory";
import Earning from "./pages/adminEarning/earning";
import InternationalPricing from "./pages/international/pricing/InternationalPricing";
import AddInternationalPricing from "./pages/international/pricing/AddInternationalPricing";
import AddSubAdmin from "./pages/subAdmin/AddSubAdmin";
import DisplaySubAdmin from "./pages/subAdmin/DisplaySubAdmin";
import ViewSubAdmin from "./pages/subAdmin/ViewSubAdmin";
import EditSubAdmin from "./pages/subAdmin/EditSubAdmin";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<PrivateRoute />}>
          <Route index element={<Dashboard />} />
          <Route path="*" element={<> Not Ready</>} />
          <Route path="/add-sub-admin" element={<AddSubAdmin />} />
          <Route path="/display-sub-admin" element={<DisplaySubAdmin />} />
          <Route path="/view-sub-admin/:_id" element={<ViewSubAdmin />} />
          <Route path="/edit-sub-admin/:_id" element={<EditSubAdmin />} />
          <Route path="/addSkills" element={<AddSkills />} />
          <Route path="/displaySkills" element={<DisplaySkills />} />
          <Route path="/addSubSkills" element={<AddSubSkills />} />
          <Route path="/displaySubSkills" element={<DisplaySubSkills />} />
          <Route path="/rechargePlan" element={<RechargePlan/>} />
          <Route path="/addRechargePlan" element={<AddRechargePlans />} />
          <Route path="/rechargeByAdmin" element={<AddRechargeByAdmin/>} />
          <Route path="/customerRechargeHistory" element={<CustomerRechargeHistory/>} />
          <Route path="/addRechargeHistory" element={<AddRechargeHistory/>} />
          <Route
            path="/displayRechargePlan"
            element={<DisplayRechargePlans />}
          />
          <Route
            path="/displayFirstRechargeOffer"
            element={<DisplayFirstRechargeOffer />}
          />
          <Route
            path="/addFirstRechargeOffer"
            element={<AddFirstRechargeOffer />}
          />
        
          <Route path="/displayRemedise" element={<DisplayRemedies />} />
          <Route path="/AddRemedies" element={<AddRemedies />} />
          <Route path="/displayExpertise" element={<DisplayExpertise />} />
          <Route path="/AddExpertise" element={<AddExpertise />} />

          <Route path="/displayCustomer" element={<DisplayCustomer />} />
          <Route
            path="/displayCustomerOrderHistory"
            element={<DisplayCustomerOrderHistory />}
          />
          <Route
            path="/displayCustomerPaymentHistory"
            element={<DisplayCustomerPaymentHistory />}
          />
          <Route path="/AddCustomer" element={<AddCustomer />} />
          <Route path="/displayReview" element={<DisplayReview />} />
          <Route path="/appReviews" element={<AppReviews />} />
          <Route path="/AddReview" element={<AddReview />} />
          <Route path="displaymessage" element={<DisplayMessage />} />
          <Route path="AddMessage" element={<AddMessage />} />
          <Route
            path="/astrologers/topAstrologers"
            element={<TopAstrologers />}
          />
          <Route
            path="/astrologers/displayAstrologer"
            element={<DisplayAstrologer />}
          />
          <Route
            path="/astrologers/AddAstrologers"
            element={<AddAstrologers />}
          />
          <Route path="/editAstrologer/:astrologerId" element={<EditAstrologer />} />
          <Route path="/displayEnquiry" element={<DisplayEnquiry />} />
          <Route path="/AddEnquiry" element={<AddEnquiry />} />
          <Route path="/history/ChatHistory" element={<ChatHistory />} />
          <Route path="/history/fullChatHistory/:customerId" element={<FullChatHistory/>} />
          <Route path="/history/CallHistory" element={<CallHistory />} />
          <Route path="/history/demoClassHistory" element={<DemoClassHistory/>} />
          <Route path="/history/liveClassHistory" element={<LiveClassHistory/>} />
          <Route path="/history/liveCourseHistory" element={<DisplayLiveCourseHistory/>} />
          <Route path="/history/UsersGiftHistory" element={<UsersGiftHistory />} />
          <Route path="/history/wallet-transaction" element={<RechargeHistory />} />
          <Route path="/liveStream" element={<LiveStream />} />
          <Route path="/displayUser" element={<DisplayUser />} />
          <Route path="/AddUser" element={<AddUser />} />
          <Route path="/displayGift" element={<DisplayGift />} />
          <Route path="/AddGift" element={<AddGift />} />
          <Route path="/call-discussion" element={<DisplayCallDiscussion />} />
          <Route path="/add-call-discussion" element={<AddCallDiscussion />} />

          <Route path="/displayAstrologerOffer" element={<DisplayAstrologerOffers />} />

          <Route path="/addAstrologerOffer" element={<AddAstrologersOffers />} />


          <Route path="/displayAstroblog" element={<DisplayAstroblog />} />
          <Route path="/AddAstroblog" element={<AddAstroblog />} />
          <Route path="/appVersion" element={<AddAppverstion />} />

          <Route path="/displayFaq" element={<DisplayFaq />} />
          <Route path="/AddFaq" element={<AddFaq />} />
          <Route
            path="/displayTermsAndConditions"
            element={<TermsAndConditions />}
          />
          <Route path="/addTermsAndCondition" element={<AddTermsAndCondition/>} />
          <Route path="/displayPrivacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/addPrivacyPolicy" element={<AddPrivacyPolicy/>} />
          <Route
            path="/displayTestimonials"
            element={<DisplayTestimonials />}
          />
          <Route path="/AddTestmonials" element={<AddTestmonials />} />
          <Route
            path="/displayOurAstrologers"
            element={<DisplayOurAstrologers />}
          />
          <Route path="/AddOurAstrologers" element={<AddOurAstrologers />} />
          <Route
            path="/displayHowToUseVideos"
            element={<DisplayHowToUseVideos />}
          />
          <Route path="/AddHowToUseVideo" element={<AddHowToUseVideo />} />
          <Route path="/displayHowToUse" element={<DisplayHowToUse />} />
          <Route path="/AddHowToUse" element={<AddHowToUse />} />

          <Route path="/adminEarning" element={<AdminEarning />} />
          <Route path="/earning" element={<Earning />} />
          <Route path="/callEarning" element={<CallEarning />} />
          <Route path="/chatEarning" element={<ChatEarning />} />
          <Route path="/videoCallEarning" element={<VideoEarning />} />


          <Route path="/receiptSummary" element={<ReceiptSummary />} />
          <Route path="/saleSummary" element={<SaleSummary />} />

          <Route path="/setting/version-update" element={<VersionUpdate/>}/>
          <Route path="/setting/country" element={<Country/>}/>
          <Route path="/setting/country/:countryId" element={<FilteredCountryList/>}/>
          <Route path="/add-country" element={<AddCountry/>}/>
        <Route path="/setting/state" element={<State/>}/>
        <Route path="/add-state" element={<AddState/>}/>
        <Route path="/add-city" element={<AddCity/>}/>

        <Route path="/setting/city" element={<City/>}/>

        <Route path="/fortune-store/product-category" element={<DisplayProductCategory />} />
        <Route path="/fortune-store/create-product-category" element={<CreateProductCategory />}/>
        <Route path="/fortune-store/pooja-category" element={<DisplayPoojaCategory />} />
        <Route path="/fortune-store/create-pooja-category" element={<CreatePoojaCategory />}/>
        <Route path="/fortune-store/product" element={<DisplayProduct/>} />
        <Route path="/fortune-store/pooja" element={<DisplayPooja/>} />
        <Route path="/fortune-store/create-product" element={<CreateProduct/>} />
        <Route path="/fortune-store/create-pooja" element={<CreatePooja/>} />


          <Route
            path="/displayBlogCategory"
            element={<DisplayBlogCategory />}
          />
          <Route path="/addBlogCategory" element={<AddBlogCategory />} />

          {/* --------Banner----------- */}
          <Route path="/addCourseBanner" element={<AddCourseBanner/>} />
          <Route path="/displayCourseBanner" element={<DisplayCourseBanner/>} />
          <Route path="/addRedirectBanner" element={<AddRedirectBanner/>} />
          <Route path="/displayRedirectBanner" element={<DisplayRedirectBanner/>} />
          <Route path="/addCallChatBanner" element={<AddCallChatBanner/>} />
          <Route path="/display-Call-Chat-Banner" element={<DisplayCallChatBanner/>} />
          <Route path="/addEcommerceBanner" element={<AddEcommerceBanner/>} />
          <Route path="/displayEcommerceBanner" element={<DisplayEcommerceBanner/>} />
          <Route path="/addProductBanner" element={<AddProductBanner/>} />
          <Route path="/addPoojaBanner" element={<AddPoojaBanner/>} />
          <Route path="/displayProductBanner" element={<DisplayProductBanner/>} />
          <Route path="/addPoojaCategoryBanner" element={<AddPoojaCategoryBanner/>} />
          <Route path="/displayPoojaBanner" element={<DisplayPoojaBanner/>} />
          <Route path="/addAstrologerBanner" element={<AddAstrologerBanner/>} />
          <Route path="/displayAstrologerBanner" element={<DisplayAstrologerBanner/>} />
          <Route path="/addAstrologerTrainingBanner" element={<AddAstrologerTrainingBanner/>} />
          <Route path="/displayAstrologerTrainingBanner" element={<DisplayAstrologerTrainingBanner/>} />

          <Route path="/displayTestimonial" element={<DisplayTestimonial/>} />
          <Route path="/addTestimonial" element={<AddTestimonial/>} />

          <Route path="/displayCourses" element={<DisplayCourses/>} />
          <Route path="/addCourse" element={<AddCourses/>} />
          <Route path="/displayDemoClass" element={<DisplayDemoClass/>} />
          <Route path="/scheduleDemoClass" element={<AddDemoClass/>} />
          <Route path="/displayLiveClass" element={<DisplayLiveClass/>} />
          <Route path="/scheduleLiveClass" element={<AddLiveClass/>} />
          <Route path="/liveClassList/:liveClassId" element={<LiveClassList/>} />
          <Route path="/addClass/:liveClassId" element={<AddClass/>} />
          <Route path="/mcqList/:liveClassId" element={<DisplayMCQ/>} />
          <Route path="/addMCQ/:liveClassId" element={<AddMCQ/>} />
          <Route path="/mcqAnswerList" element={<MCQAnswerList/>} />



          <Route path="/displayWorkshop" element={<DisplayWorkshop/>} />
          <Route path="/addWorkshop" element={<AddWorkshop/>} />

          {/* Chat Support */}
          <Route path="/chat-support-astrologers" element={<AstrologerChatSupport/>} />
          <Route path="/chat-support-customers" element={<CustomerChatSupport/>} />


          {/* Waiting List */}
          <Route path="/display-wait-list" element={<WaitingList/>} />
          <Route path="/display-wait-list-history" element={<WaitingListHistory/>} />


          <Route
            path="/customerNotification"
            element={<CustomerNotification />}
          />
          <Route
            path="/addCustomerNotification"
            element={<AddCustomerNotification/>}
          />
          <Route
            path="/addAstrologerNotification"
            element={<AddAstrologerNotification/>}
          />
          <Route
            path="/astrologerNotification"
            element={<AstrologerNotification />}
          />

          {/* Request */}
          <Route path="/profileRequest" element={<ProfileRequest/>} />
          <Route path="/phoneRequest" element={<PhoneRequest/>} />
          <Route path="/bankRequest" element={<BankRequest/>} />
          <Route path="/galleryRequest" element={<GalleryRequest/>} />
        
          <Route path="chatSummary" element={<ChatSummary />} />

         {/* International  Pages */}
         <Route path="/international-prices" element={<InternationalPricing />} />
         <Route path="/add-international-prices" element={<AddInternationalPricing />} />

        </Route>
        <Route path="/login" element={<Login />} />
       
        
      </Routes>
    </Router>
  );
}

export default App;
