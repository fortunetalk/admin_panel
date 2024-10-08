import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";
import { connect, useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import * as Actions from "../../redux/Actions/dashboardActions";

const menuAnimation = {
  hidden: {
    opacity: 0,
    height: 0,
    padding: 0,
    transition: { duration: 0.3, when: "afterChildren" },
  },
  show: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
      when: "beforeChildren",
    },
  },
};
const menuItemAnimation = {
  hidden: (i) => ({
    padding: 0,
    x: "-100%",
    transition: {
      duration: (i + 1) * 0.1,
    },
  }),
  show: (i) => ({
    x: 0,
    transition: {
      duration: (i + 1) * 0.1,
    },
  }),
};

// const SidebarMenu = ({ route, showAnimation, dispatch, isSidebarOpen }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//     dispatch(Actions.setIsSidebarOpne(true));
//   };

//   useEffect(() => {
//     if (!isSidebarOpen) {
//       setIsMenuOpen(false);
//     }
//   }, [isSidebarOpen]);
//   return (
//     <>
//       <div className="menu" onClick={toggleMenu}>
//         <div className="menu_item">
//           <div className="icon">{route.icon}</div>
//           <AnimatePresence>
//             {isSidebarOpen && (
//               <motion.div
//                 variants={showAnimation}
//                 initial="hidden"
//                 animate="show"
//                 exit="hidden"
//                 className="link_text"
//               >
//                 {route.name}
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//         {isSidebarOpen && (
//           <motion.div
//             animate={
//               isMenuOpen
//                 ? {
//                     rotate: -90,
//                   }
//                 : { rotate: 0 }
//             }
//           >
//             <FaAngleDown />
//           </motion.div>
//         )}
//       </div>{" "}
//       <AnimatePresence>
//         {isMenuOpen && (
//           <motion.div
//             variants={menuAnimation}
//             initial="hidden"
//             animate="show"
//             exit="hidden"
//             className="menu_container"
//           >
//             {route.subRoutes.map((subRoute, i) => (
//               <motion.div variants={menuItemAnimation} key={i} custom={i}>
//                 <NavLink to={subRoute.path} className="link">
//                   <div className="icon">{subRoute.icon}</div>
//                   <motion.div className="link_text">{subRoute.name}</motion.div>
//                 </NavLink>
//               </motion.div>
//             ))}
//           </motion.div>
//         )}{" "}
//       </AnimatePresence>
//     </>
//   );
// };

const SidebarMenu = ({ route, showAnimation, dispatch, isSidebarOpen, isActive }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActivePath = (path) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    dispatch(Actions.setIsSidebarOpne(true));
  };

  useEffect(() => {
    if (!isSidebarOpen) {
      setIsMenuOpen(false);
    }
  }, [isSidebarOpen]);

  const menuIsActive = isActive || route.subRoutes.some(subRoute => 
    location.pathname.startsWith(subRoute.path)
  );

  return (
    <>
      <div
        className={`menu ${menuIsActive ? 'active' : ''}`}
        onClick={toggleMenu}
      >
        <div className="menu_item">
          <div className="icon">{route.icon}</div>
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.div
                variants={showAnimation}
                initial="hidden"
                animate="show"
                exit="hidden"
                className={`link_text ${menuIsActive ? 'active' : ''}`}
              >
                {route.name}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {isSidebarOpen && (
          <motion.div
            animate={
              isMenuOpen
                ? { rotate: -90 }
                : { rotate: 0 }
            }
          >
            <FaAngleDown />
          </motion.div>
        )}
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuAnimation}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="menu_container"
          >
            {route.subRoutes.map((subRoute, i) => (
              <motion.div
                variants={menuItemAnimation}
                key={i}
                custom={i}
              >
                <NavLink
                  to={subRoute.path}
                  className={`link ${isActivePath(subRoute.path) ? 'active' : ''}`}
                >
                  <div className="icon">{subRoute.icon}</div>
                  <motion.div className="link_text">
                    {subRoute.name}
                  </motion.div>
                </NavLink>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};


const mapStateToProps = (state) => ({
  isSidebarOpen: state.dashboard.isSidebarOpen,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(SidebarMenu);
