// DeleteWaterModal jsx
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteWaterEntry, fetchWaterData } from "../../redux/store";
// import { showNotification } from "../../redux/notificationActions";
import "./DeleteWaterModal.css";

const DeleteWaterModal = ({ isOpen, onClose, entryId }) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShowModal(true), 10);
    } else {
      setShowModal(false);
    }
  }, [isOpen]);

  const handleDelete = async () => {
    try {
      await dispatch(deleteWaterEntry(entryId));
      // dispatch(fetchWaterData());
      setShowModal(false);
      setTimeout(onClose, 300);
    } catch (error) {
      // dispatch(showNotification("Error deleting water entry"));
    }
  };

  if (!isOpen && !showModal) return null;

  return (
    <div className={`modal-overlay ${showModal ? "show" : ""}`}>
      <div className={`delete-modal ${showModal ? "show" : "hide"}`}>
          <h2 className="delete-modal-title">Delete entry</h2>
          <button className="delete-modal-close" onClick={onClose}>✖</button>
        <p className="delete-modal-content">
          Are you sure you want to delete the entry?
        </p>
        <div className="delete-modal-actions">
          <button className="delete-modal-btn confirm" onClick={handleDelete}>
            Delete
          </button>
          <button className="delete-modal-btn cancel" onClick={() => {
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

export default DeleteWaterModal;

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