import Form from "react-bootstrap/Form";
import { useContext } from "react";
import NotesContext from "../context/NotesContext";

function DarkMode() {
  const { isToggled, setIsToggled } = useContext(NotesContext);
  return (
    <Form>
      <Form.Check
        type="switch"
        id="custom-switch"
        checked={isToggled}
        onChange={() => setIsToggled(!isToggled)}
      />
    </Form>
  );
}

export default DarkMode;
