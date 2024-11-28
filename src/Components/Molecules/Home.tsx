import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import "./dt.css";
import { GiClick } from "react-icons/gi";
import { IoLibrarySharp } from "react-icons/io5";
import { MdLocalLibrary } from "react-icons/md";
import { TbWorldUpload } from "react-icons/tb";
import { MdDeleteSweep } from "react-icons/md";
import AddBook from "./AddReviewForm";
import ViewBooks from "./ViewBook";
import UpdateBooks from "./UpdateBook";
import DeleteBooks from "./DeleteBooks";
import CardAtom from "../Atoms/CardAtom";
import { VscBlank } from "react-icons/vsc";


function Home() {
  // Set 'View Books' as the default popupOpen state
  const [popupOpen, setPopupOpen] = useState<string | null>("View Books");

  const togglePopup = (popupType: string) => {
    // Toggle the popup only if it's different from the current one
    if (popupType !== popupOpen) {
      setPopupOpen(popupType);
    }
  };

  const onAddBook = () => {
    // Set the popup to 'View Books' after adding a book
    setPopupOpen("View Books");
  };

  return (
    <main className={`main-container dark-mode : 'light-mode1'}`} style={{ background: "linear-gradient(135deg, #FFF8DE, #C5D3E8)" }}>
      <div>
        <h3 style={{ textAlign: "center", marginBottom: "30px",color:'black' ,fontSize:'30px', fontWeight:'bold'}}>
          Review Management System
        </h3>
      </div>
      <div className="main-cards">
      <CardAtom
          title="View Books"
          onClick={() => togglePopup("View Books")}
          IconComponent={IoLibrarySharp}
          IconComponent1={VscBlank}
        />
        <CardAtom
          title="Add Books"
          onClick={() => togglePopup("Add Books")}
          IconComponent={MdLocalLibrary}
          IconComponent1={GiClick}
        />
        <CardAtom
          title="Update Books"
          onClick={() => togglePopup("Update Books")}
          IconComponent={TbWorldUpload}
          IconComponent1={GiClick}
        />
        <CardAtom
          title="Delete Books"
          onClick={() => togglePopup("Delete Books")}
          IconComponent={MdDeleteSweep}
          IconComponent1={GiClick}
        />
      </div>
      {/* Render the appropriate popup based on the state */}
      {popupOpen === "Add Books" && <AddBook onAddBook={onAddBook} />}
      {popupOpen === "View Books" && <ViewBooks />}{" "}
      {/* Render the ViewBooks component*/}
      {popupOpen === "Update Books" && <UpdateBooks />}{" "}
      {/* Render the UpdateBooks component*/}
      {popupOpen === "Delete Books" && <DeleteBooks />}{" "}
      {/* Render the DeleteBooks component*/}
    </main>
  );
}

export default Home;
