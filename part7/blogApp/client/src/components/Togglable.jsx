import { useState } from "react";
import { Button } from "@mui/material";

const Togglable = ({ children, toggleText, hideText, asTable = false }) => {
  const [toggledOn, setToggleOn] = useState(false);

  const button = (
    <Button variant="contained" onClick={() => setToggleOn(!toggledOn)}>
      {toggledOn ? hideText : toggleText}
    </Button>
  );
  return (
    <>
      {asTable ? (
        <tr>
          <td>{button}</td>
        </tr>
      ) : (
        button
      )}
      {toggledOn && children}
    </>
  );
};

export default Togglable;
