import React from "react";
import "../../../Styles/content.css";
//import ContentHeader from "./ContentHeader";
import Matches from "./Matches";


const Content = () => {
    return(
        
        <div className="content">
        <ContentHeader/>
        <Matches/>
        </div>
        

    );
};

export default Content;