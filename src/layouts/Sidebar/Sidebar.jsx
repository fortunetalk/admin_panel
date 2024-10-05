import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaLock,
  FaMoneyBill,
  FaSellcast,
  FaUser,
} from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { BiAbacus, BiUser, BiUserPlus } from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import logo_icon from "../../assets/images/logo_icon.png";
import SidebarMenu from "./SidebarMenu";
import "./sideBar.css";
import { connect } from "react-redux";


const routes = [
  {
    path: "/",
    name: "Dashboard",
    icon: <FaHome />,
  },
  {
    path: "/astrologers",
    name: "Astrologers",
    icon: <BiUser />,
    subRoutes: [
      {
        path: "/astrologers/AddAstrologers",
        name: "Add Astrologers",
        icon: <BiUserPlus />,
      },
      {
        path: "/astrologers/displayAstrologer",
        name: "List of Astrologers",
        icon: <BiUser />,
      },
      {
        path: "/astrologers/topAstrologers",
        name: "Top Astrologers",
        icon: <BiUser />,
      },
      {
        path: "/displayEnquiry",
        name: "Astrologers Enquiry",
        icon: <BiUser />,
      },
    ],
  },
  {
    path: "/fortune-store",
    name: "Fortune Store",
    icon: <BiAbacus />,
    subRoutes: [
      {
        path: "/fortune-store/product-category",
        name: "Product Category",
        icon: <BiAbacus />,
      },
      {
        path: "/fortune-store/product",
        name: "Product",
        icon: <BiAbacus />,
      },
      {
        path: "/fortune-store/pooja-category",
        name: "Pooja Category",
        icon: <BiAbacus />,
      },
      {
        path: "/fortune-store/pooja",
        name: "Pooja",
        icon: <BiAbacus />,
      },
    ],
  },
  {
    path: "/displayCustomer",
    name: "Customer",
    icon: <BiAbacus />,
  },
  {
    path: "/courses",
    name: "Courses",
    icon: <BiAbacus />,
    subRoutes: [
      {
        path: "/displayCourses",
        name: "Courses List",
        icon: <BiAbacus />,
      },
      {
        path: "/AddCourse",
        name: "Add Course",
        icon: <BiAbacus />,
      },
      {
        path: "/displayDemoClass",
        name: "Demo Class",
        icon: <BiAbacus />,
      },
      {
        path: "/displayLiveClass",
        name: "Live Class",
        icon: <BiAbacus />,
      },
      {
        path: "/mcqAnswerList",
        name: "Attempted MCQ's",
        icon: <BiAbacus />,
      },
      // {
      //   path: "/registerLiveClassHistory",
      //   name: "Register Live Class History",
      //   icon: <BiAbacus />,
      // },
    ],
  },
  {
    path: "/displayWorkshop",
    name: "Workshop",
    icon: <BiAbacus />,
  },
  {
    path: "/chat-support",
    name: "Chat Support",
    icon: <BiAbacus />,
    subRoutes: [
      {
        path: "/chat-support-astrologers",
        name: "Astrologers",
        icon: <BiAbacus />,
      },
      {
        path: "/chat-support-customers",
        name: "Customers",
        icon: <BiAbacus />,
      },
    ],
  },
  {
    path: "/wait-list",
    name: "Waiting List",
    icon: <BiAbacus />,
    subRoutes: [
      {
        path: "/display-wait-list",
        name: "Waiting List ",
        icon: <BiAbacus />,
      },
      {
        path: "/display-wait-list-history",
        name: "Waiting List History ",
        icon: <BiAbacus />,
      },
    ],
  },
  {
    path: "/recharge",
    name: "Recharge",
    icon: <BiAbacus />,
    subRoutes: [
      {
        path: "/rechargePlan",
        name: "Recharge Plan",
        icon: <BiAbacus />,
      },
      {
        path: "/displayRechargePlan",
        name: "Recharge History",
        icon: <BiAbacus />,
      },
      // {
      //   path: "/displayFirstRechargeOffer",
      //   name: "First Recharge Offer",
      //   icon: <BiAbacus />,
      // },
    ],
  },
  {
    path: "/history",
    name: "History",
    icon: <BiAbacus />,
    subRoutes: [
      {
        path: "/history/ChatHistory",
        name: "Chat History",
        icon: <BiAbacus />,
      },
      {
        path: "/history/CallHistory",
        name: "Call History",
        icon: <BiAbacus />,
      },
      {
        path: "/history/wallet-transaction",
        name: "Wallet Transaction",
        icon: <BiAbacus />,
      },
      {
        path: "/history/demoClassHistory",
        name: "Demo Class History",
        icon: <BiAbacus />,
      },
      {
        path: "/history/liveClassHistory",
        name: "Live Class History",
        icon: <BiAbacus />,
      },
      {
        path: "/history/liveCourseHistory",
        name: "Live Course History",
        icon: <BiAbacus />,
      },
      {
        path: "/history/UsersGiftHistory",
        name: "User's Gift History",
        icon: <BiAbacus />,
      },
      
    ],
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: <BiAbacus />,
    subRoutes: [
      {
        path: "/customerNotification",
        name: "Customer Notification",
        icon: <BiAbacus />,
      },
      {
        path: "/astrologerNotification",
        name: "Astrologer Notification",
        icon: <BiAbacus />,
      },
    ],
  },

  {
    path: "/liveStream",
    name: "Live Stream",
    icon: <BiAbacus />,
  },
  {
    path: "/displayRemedise",
    name: "Remedies",
    icon: <BiAbacus />,
  },
  {
    path: "/displayExpertise",
    name: "Expertise",
    icon: <BiAbacus />,

  },
  {
    path: "/displayReview",
    name: "Review",
    icon: <BiAbacus />,
    subRoutes: [
      {
        path: "/displayReview",
        name: "Customer Review",
        icon: <BiAbacus />,
      },
      // {
      //   path: "/appReviews",
      //   name: "App Review",
      //   icon: <BiAbacus />,
      // },
    ],
  },
  {
    path: "/displayGift",
    name: "Gift",
    icon: <BiAbacus />,
  },
  {
    path: "/call-discussion",
    name: "User Call Discussion",
    icon: <BiAbacus />,
  },
  
  {
    path: "/displayBlogCategory",
    name: "Blog Category",
    icon: <BiAbacus />,

  },
  {
    path: "/displayAstroblog",
    name: "Blog",
    icon: <BiAbacus />,
  },
  

  {
    path: "/displayAstrologerOffer",
    name: "Astrologer Offers",
    icon: <BiAbacus />,
  },
  {
    path: "/displayTestimonial",
    name: "Testimonial",
    icon: <BiAbacus />,
  },
  {
    path: "/banner",
    name: "Banner",
    icon: <BiAbacus />,
    subRoutes: [
      {
        path: "/displayAstrologerTrainingBanner",
        name: "Astrologer Training Banner",
        icon: <BiAbacus />,
      },
      {
        path: "/displayAstrologerBanner",
        name: "Astrologer Banner",
        icon: <BiAbacus />,
      },
      {
        path: "/displayCourseBanner",
        name: "Course Banner",
        icon: <BiAbacus />,
      },
      {
        path: "/displayRedirectBanner",
        name: "Redirect Banner",
        icon: <BiAbacus />,
      },
      {
        path: "/display-Call-Chat-Banner",
        name: "Call/Chat Banner",
        icon: <BiAbacus />,
      },
      {
        path: "/displayEcommerceBanner",
        name: "Ecommerce Banner",
        icon: <BiAbacus />,
      },
      {
        path: "/displayProductBanner",
        name: "Product Banner",
        icon: <BiAbacus />,
      },
      {
        path: "/displayPoojaBanner",
        name: "Pooja Banner",
        icon: <BiAbacus />,
      },

    ],
  },
  {
    path: "/pages",
    name: "Pages",
    icon: <BiAbacus />,
    subRoutes: [

      {
        path: "/displayTermsAndConditions",
        name: "Terms And Conditions",
        icon: <BiAbacus />,
      },
      {
        path: "/displayPrivacyPolicy",
        name: "Privacy Policy",
        icon: <BiAbacus />,
      },

    ],
  },
  {
    path: "/request",
    name: "Request",
    icon: <BiAbacus />,
    subRoutes: [
      {
        path: "/profileRequest",
        name: "Profile Reques",
        icon: <BiAbacus />,
      },
      {
        path: "/phoneRequest",
        name: "Phone Number Request",
        icon: <BiAbacus />,
      },
      {
        path: "/bankRequest",
        name: "Bank Request",
        icon: <BiAbacus />,
      },
      {
        path: "/galleryRequest",
        name: "Gallery Image Request",
        icon: <BiAbacus />,
      },
    ],
  },
  {
    path: "/reports",
    name: "Reports",
    icon: <BiAbacus />,
    subRoutes: [
      {
        path: "/receiptSummary",
        name: "Receipt Summary",
        icon: <BiAbacus />,
      },
      {
        path: "/saleSummary",
        name: "Sale Summary",
        icon: <BiAbacus />,
      },
    ],
  },
  {
    path: "/earning",
    name: "Admin Earning",
    icon: <BiAbacus />,
    subRoutes: [
      {
        path: "/earning",
        name: "Earnings",
        icon: <BiAbacus />,
      },
      {
        path: "/callEarning",
        name: "Call Earning",
        icon: <BiAbacus />,
      },
      {
        path: "/chatEarning",
        name: "Chat Earning",
        icon: <BiAbacus />,
      },
      {
        path: "/videoCallEarning",
        name: " Video Call Earning",
        icon: <BiAbacus />,
      },
    ],
  },
  {
    path: "/international",
    name: "International",
    icon: <BiAbacus />,
    subRoutes: [
      {
        path: "/international-prices",
        name: "International Prices",
        icon: <BiAbacus />,
      },
     
    ],
  },
  {
    path: "/setting",
    name: "Setting",
    icon: <BiUser />,
    subRoutes: [
      {
        path: "/setting/version-update",
        name: "Version Update",
        icon: <BiUserPlus />,
      },
      {
        path: "/setting/country",
        name: "Country",
        icon: <BiUserPlus />,
      },
      {
        path: "/setting/state",
        name: "State",
        icon: <BiUser />,
      },
      {
        path: "/setting/city",
        name: "City",
        icon: <BiUser />,
      },


    ],
  },

];



const inputAnimation = {
  hidden: {
    width: 0,
    padding: 0,
    transition: {
      duration: 0.2,
    },
  },
  show: {
    width: "140px",
    padding: "5px 15px",
    transition: {
      duration: 0.2,
    },
  },
};

const showAnimation = {
  hidden: {
    width: 0,
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
  show: {
    opacity: 1,
    width: "auto",
    transition: {
      duration: 0.5,
    },
  },
};

const SideBar = ({ children, dispatch, isSidebarOpen }) => {
  const [hiddenSidebarWidth, setHiddenSidebarWidth] = useState(0);
 

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 991) {
        setHiddenSidebarWidth(45);
      } else {
        setHiddenSidebarWidth(0);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth > 991) setHiddenSidebarWidth(45);
  //     else setHiddenSidebarWidth(0);
  //   };

  //   // Attach the event listener
  //   window.addEventListener("resize", handleResize);

  //   // Clean up the event listener on component unmount
  //   handleResize();
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  return (
    <>
      <motion.div
        animate={{
          width: isSidebarOpen ? "250px" : `${hiddenSidebarWidth}px`,
          transition: {
            duration: 0.5,
            type: "spring",
            damping: 10,
          },
        }}
        className={`sidebar`}
      >
        {isSidebarOpen ? (
          <div className="top_section">Fortune Talk</div>
        ) : (
          <div className="top_section">
            <img src={logo_icon} style={{ width: 30, height: 30 }} alt="logo" />
          </div>
        )}
        <section className="routes">
          {routes.map((route, index) => {
            if (route.subRoutes) {
              return (
                <SidebarMenu
                  route={route}
                  key={index}
                  showAnimation={showAnimation}
                />
              );
            }

            return (
              <div key={index} className="side_Bar">
                <NavLink
                  to={route.path}
                  className="link"
                  activeclassname="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isSidebarOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              </div>
            );
          })}
        </section>
      </motion.div>
    </>
  );
};

const mapStateToProps = state => ({
  isSidebarOpen: state.dashboard.isSidebarOpen
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
