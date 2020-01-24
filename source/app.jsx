import React from "react";
import ReactDOM from "react-dom";
import App from "Page/index";
import BasePage from "Component/BasePage"

console.log("HERE!");
ReactDOM.render((
      <BasePage>
        <App />
      </BasePage>
), document.body);
