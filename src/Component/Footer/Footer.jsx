import React, { Component } from "react";
import "./Footer.css";

export default class Footer extends Component {
  render() {
    return (
      <div className="footerComponent">
        <div className="footerContainer">
          <div>
            Developed by <u>JULIUS GUEVARRA</u>
          </div>
          <div className="footerMiddle">
            <p>
              <img
                src="https://salinaka-ecommerce.web.app/images/logo-full.059e10fa5fedbfb65165e7565ed3936f.png"
                alt=""
              />
            </p>
            <p>&copy; 2013</p>
          </div>
          <div>
            Fork this project <u>HERE</u>
          </div>
        </div>
      </div>
    );
  }
}
