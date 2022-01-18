import React from "react";
import { useEffect, useContext } from "react";
import { Mycontext } from "../../Context/context";
import Styles from "./styles.module.css";
import Placeholder from "../Placeholder/Placeholder";

function Viewer() {
  const Autodesk = window.Autodesk;

  const { urn, setUrn, setLoading } = useContext(Mycontext);

  function getForgeToken(callback) {
    fetch("https://deign-automayion.herokuapp.com/api/forge/oauth/token").then(
      (res) => {
        res.json().then((data) => {
          callback(data.access_token, data.expires_in);
          urn ||
            fetch(
              `https://deign-automayion.herokuapp.com/api/forge/fileinitialize/revit_sample_file.rvt`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${data.access_token}`,
                },
              }
            )
              .then((res) => res.json())
              .then((data) => {
                setUrn(data.urn);
                setLoading(false);
              });
        });
      }
    );
  }

  function launchViewer(urn) {
    let options = {
      env: "AutodeskProduction",
      getAccessToken: getForgeToken,
    };
    Autodesk.Viewing.Initializer(options, () => {
      let viewer = new Autodesk.Viewing.GuiViewer3D(
        document.getElementById("init_div"),
        { extensions: ["Autodesk.DocumentBrowser"] }
      );
      let documentId = "urn:" + urn;

      urn && viewer.start();

      const viewer_start = function () {
        Autodesk.Viewing.Document.load(
          documentId,
          onDocumentLoadSuccess,
          onDocumentLoadFailure
        );
      };

      urn && viewer_start();

      function onDocumentLoadSuccess(doc) {
        setLoading(false);
        var viewables = doc.getRoot().getDefaultGeometry();
        viewer.loadDocumentNode(doc, viewables);
      }

      function onDocumentLoadFailure(viewerErrorCode, viewerErrorMsg) {
        console.error(
          "onDocumentLoadFailure() - errorCode:" +
            viewerErrorCode +
            "\n- errorMessage:" +
            viewerErrorMsg
        );
        if (viewerErrorCode === 9) {
          // viewer.finish();
          // viewer = null;
          // Autodesk.Viewing.shutdown();
          setLoading(true);
          setTimeout(() => {
            viewer_start();
          }, 15000);
        }
      }
    });
  }

  useEffect(() => {
    launchViewer(urn);
  }, [urn]);

  if (!urn) return <Placeholder />;

  return <div id="init_div" className={Styles.init_div}></div>;
}

export default Viewer;
