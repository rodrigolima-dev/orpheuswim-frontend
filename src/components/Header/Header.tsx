import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosCall } from "react-icons/io";
import './Header.css';

export default function Header() {
    return(
        <div className="header-content">
            <div className="call">
                <IoIosCall />
                <h3>+55 21 983103439</h3>
            </div>
            <div className="location">
                <FaLocationDot />
                <h3>Rio de Janeiro - RJ</h3>
            </div>
      </div>
    );
}