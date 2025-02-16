import React from "react";
import { BiNotification, BiSearch } from "react-icons/bi";
import "../../../Styles/contentheader.css";

const ContentHeader = () => {
  return (
    <div className="content--header">
      <h1 className="header--title">Matches</h1>
      <div className="header--activity">
        <div className="search--box">
          <input type="text" placeholder="Search for other people..." />
          <BiSearch className="icon" />
        </div>
      </div> 
    </div>
  );
};

export default ContentHeader;
