import React from "react";
import Alert from "./Alert";
import AlertContext from "./AlertContext";

function Content() {
  return (
    <AlertContext.Consumer>
      {alert => (
        <div className="text-center">
          <button onClick={() => alert.onClick("success", true)} className="btn btn-success mx-3">
            Success
          </button>
          <button onClick={() => alert.onClick("warning", true)} className="btn btn-warning mx-3">
            Warning
          </button>
          <button onClick={() => alert.onClick("danger", true)} className="btn btn-danger mx-3">
            Danger
          </button>
          <Alert style={{ opacity: alert.display ? 1 : 0 }} type={alert.theme}>
            You pressed a {alert.theme} button!
          </Alert>
        </div>
      )}
    </AlertContext.Consumer>
  );
}

export default Content;
