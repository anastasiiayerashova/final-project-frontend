import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/store";
import "./LogOutModal.css";

const LogOutModal = ({ isOpen, onClose }) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShowModal(true), 10);
    } else {
      setShowModal(false);
    }
  }, [isOpen]);

  const handleLogout = () => {
    dispatch(logoutUser());
    setShowModal(false);
    setTimeout(onClose, 300);
  };

  if (!isOpen && !showModal) return null;

  return (
    <div className={`modal-overlay ${showModal ? "show" : ""}`}>
      <div className={`logout-modal ${showModal ? "show" : "hide"}`}>
        <div className="logout-modal-header">
          <h2 className="logout-modal-title">Log out</h2>
          <button className="logout-modal-close" onClick={onClose}>✖</button>
        </div>
        <p className="logout-modal-content">
          Do you really want to leave?
        </p>
        <div className="logout-modal-actions">
          <button className="logout-modal-btn confirm" onClick={handleLogout}>
            Log out
          </button>
          <button className="logout-modal-btn cancel" onClick={() => {
            setShowModal(false);
            setTimeout(onClose, 300);
          }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogOutModal;


// Example to Launch in MainApp


// import React, { useState } from "react";
// import DeleteWaterModal from "./DeleteWaterModal/DeleteWaterModal.jsx";
// import LogOutModal from "./LogOutModal/LogOutModal.jsx";
// import "./App.css"

// function App() {
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [showLogoutModal, setShowLogoutModal] = useState(false);

//   return (
//     <div className="app-container">
//       <div className="modal-wrapper">
//         <h1>Modal Test</h1>

//         <button className="test-delete-btn" onClick={() => setShowDeleteModal(true)}>
//           Test Delete Modal
//         </button>
//         <button className="test-logout-btn" onClick={() => setShowLogoutModal(true)}>
//           Test Logout Modal
//         </button>
//       </div>

//       <DeleteWaterModal
//         isOpen={showDeleteModal}
//         onClose={() => setShowDeleteModal(false)}
//         entryId={1}
//       />

//       <LogOutModal
//         isOpen={showLogoutModal}
//         onClose={() => setShowLogoutModal(false)}
//       />
//     </div>
//   );
// }


// export default App;


// Additional Styles

// .app-container {
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   height: 100vh;
//   text-align: center;
//   background-color: #f8f9fa;
// }

// .modal-wrapper {
//   background: white;
//   padding: 30px;
//   border-radius: 10px;
//   box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
//   border: 1px solid #ddd;
//   text-align: center;
//   min-width: 300px;
// }


// Example Store

// import { configureStore, createSlice } from "@reduxjs/toolkit";

// const waterSlice = createSlice({
//   name: "water",
//   initialState: { entries: [{ id: 1, amount: 250 }] },
//   reducers: {
//     deleteWaterEntry: (state, action) => {
//       state.entries = state.entries.filter(
//         (entry) => entry.id !== action.payload
//       );
//     },
//   },
// });

// const authSlice = createSlice({
//   name: "auth",
//   initialState: { isAuthenticated: true },
//   reducers: {
//     logoutUser: (state) => {
//       state.isAuthenticated = false;
//     },
//   },
// });

// export const { deleteWaterEntry } = waterSlice.actions;
// export const { logoutUser } = authSlice.actions;

// export const store = configureStore({
//   reducer: {
//     water: waterSlice.reducer,
//     auth: authSlice.reducer,
//   },
// });