import React, { useState, useContext } from "react";
import { Mycontext } from "../../Context/context";
import Styles from "./styles.module.css";
import { Button } from "react-bootstrap";
import InputsChange from "./content/InputsChange";
import Projects from "./content/Projects";
import io from "socket.io-client";
import backIcon from "../../Static/Images/backIcon.png";

const Sidebar = () => {
  const [bool, setBool] = useState(true);
  const [inputState, setInputState] = useState({});
  const { setUrn, setLoading, loading } = useContext(Mycontext);
  const [connectionId, setConnectionId] = useState("");
  const [socket, setSocket] = useState("");

  console.log("id", connectionId);
  console.log("socket", socket);

  const handleChange = (e) => {
    setInputState({ ...inputState, [e.target.name]: e.target.value });
  };

  function startWorkitem() {
    startConnection(function (connectionId) {
      var formData = new FormData();
      console.log("connectionId", connectionId);
      inputState.browerConnectionId = connectionId;
      console.log("inputState", inputState);
      formData.append("data", JSON.stringify(inputState));
      fetch(
        "https://deign-automayion.herokuapp.com/api/forge/designautomation/workitems/revit_sample_file.rvt",
        {
          method: "POST",
          body: formData,
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.urn) {
            setUrn(data.urn);
            setLoading(false);
          }
        });
    });
  }

  function startConnection(onReady) {
    setLoading(true);
    if (socket && socket.connected) {
      if (onReady) onReady(connectionId);
      return;
    }

    const connection = io.connect("https://deign-automayion.herokuapp.com", {
      transports: ["websocket"],
    });
    setSocket(connection);
    connection.on("connect", function () {
      onReady(connection.id);
      setConnectionId(connection.id);
    });
    connection.on("downloadReport", function (url) {
      console.log('<a href="' + url + '">Download report file here</a>');
    });

    connection.on("onComplete", function (message) {
      console.log("message socket", message);
      console.log("connection", connection);
      if (message.urn) {
        setTimeout(() => {
          setUrn(message.urn);
          setLoading(false);
        }, 25000);
      }
    });
  }

  return (
    <div className={Styles.sidebar}>
      <div className={Styles.nav}>
        {bool ? (
          <Button
            variant="secondary"
            size="sm"
            className={Styles.backIcon}
            onClick={() => setBool(!bool)}
          >
            Projects
          </Button>
        ) : (
          <button
            className={Styles.backIcon}
            onClick={() => setBool(!bool)}
            style={{ background: "unset" }}
          >
            <img src={backIcon} alt="" />
          </button>
        )}
      </div>
      <div className={Styles.content}>
        {bool ? (
          <InputsChange
            handleChange={handleChange}
            startWorkitem={startWorkitem}
            loading={loading}
          />
        ) : (
          <Projects />
        )}
      </div>
    </div>
  );
};

export default Sidebar;
