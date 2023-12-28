import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setSelected } from "../redux/listReducer";

const DisplayList = ({ data }) => {
  const { selected } = useSelector((state) => state.listData);
  const dispatch = useDispatch();

  let newData = Object.entries(data).sort((a, b) => a[0] - b[0]);



  const handleCheckChange = (key) => {
    if (selected.includes(key)) {
      let modSelected = selected.filter((item) => item !== key);
      modSelected.sort((a, b) => Number(a) - Number(b))
      dispatch(setSelected(modSelected));
    } else {
      let modSelected = [...selected, key];
      modSelected.sort((a, b) => Number(a) - Number(b))

      dispatch(setSelected(modSelected));
    }
  };
  return (
    <div className="d-flex align-items-center gap-2 list-wrap">
      {newData.length && (
        <>
          {newData.map(([key, value]) => (
            <Col
              className="list-div"
              xl="2"
              lg="2"
              md="4"
              sm="4"
              xs="6"
              key={key}
            >
              <Col className="w-100">
                <div className="d-flex align-items-center justify-content-center gap-2 mt-2">
                  <input
                    type="checkbox"
                    checked={selected.includes(key)}
                    onChange={() => handleCheckChange(key)}
                  ></input>
                  <p className="m-0">List {key}</p>
                </div>

                {value.map((item) => (
                  <Card key={item.id} className="mt-2 mb-2">
                    <CardBody>
                      {" "}
                      <h6 className="fw-bolder">{item.name}</h6>
                      <p>{item.description} </p>
                    </CardBody>
                  </Card>
                ))}
              </Col>
            </Col>
          ))}
        </>
      )}
    </div>
  );
};

export default DisplayList;
