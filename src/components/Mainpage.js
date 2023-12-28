import React from "react";
import { Button, Container, Row } from "react-bootstrap";
import DisplayList from "./DisplayList";
import { useDispatch, useSelector } from "react-redux";
import {
  setAlert,
  setMode,
  setNewList,
  setTempData,
} from "../redux/listReducer";
import TempList from "./TempList";

const Mainpage = () => {
  const { mode, selected, data, tempData, alert, newList } = useSelector(
    (state) => state.listData
  );
  const dispatch = useDispatch();
  const handleCreate = () => {
    if (selected.length !== 2) {
      dispatch(
        setAlert("You should exactly select two lists to create a new list.")
      );
    } else {
      dispatch(setMode("insert"));
      let tmpData = {
        ...data,
        [Object.keys(data).length + 1]: [],
      };
      dispatch(setNewList((Object.keys(data).length + 1).toString()));
      dispatch(setTempData(tmpData));
      dispatch(setAlert(null));
    }
  };

  return (
    <Container>
      <h3 className="text-center fw-bolder mb-4">List Creation</h3>

      {mode === "read" && (
        <div className="d-flex align-items-center justify-content-center">
          <Button variant="primary mb-4" onClick={handleCreate}>
            Create a new list
          </Button>
        </div>
      )}

      {alert && <h6 className="text-center text-danger mb-3">{alert}</h6>}
      <>
        {mode === "read"
          ? data && <DisplayList data={data} />
          : tempData &&
            mode &&
            newList &&
            selected.length && <TempList tmpData={tempData} />}
      </>
    </Container>
  );
};

export default Mainpage;
