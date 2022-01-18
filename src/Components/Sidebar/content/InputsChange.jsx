import React from "react";
import Styles from "../styles.module.css";
import { InputGroup, FormControl, Button } from "react-bootstrap";

const InputsChange = ({ handleChange, startWorkitem, loading }) => {
  return (
    <div>
      <InputGroup className="m-3" size="sm">
        <InputGroup.Text id="basic-addon1" style={{ width: "60px" }}>
          width:
        </InputGroup.Text>
        <FormControl name="width" onChange={handleChange} type="number" />
      </InputGroup>
      <InputGroup className="m-3" size="sm">
        <InputGroup.Text id="basic-addon1" style={{ width: "60px" }}>
          heigth:
        </InputGroup.Text>
        <FormControl name="height" onChange={handleChange} type="number" />
      </InputGroup>
      <Button
        disabled={loading}
        variant="dark"
        style={{
          left: "20px",
          position: "absolute",
          width: "300px",
          bottom: "20px",
          backgroundColor: "black",
        }}
        onClick={startWorkitem}
      >
        Send
      </Button>
    </div>
  );
};

export default InputsChange;
