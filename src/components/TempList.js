import React from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setData,
  setMode,
  setSelected,
  setTempData,
} from "../redux/listReducer";

const TempList = ({ tmpData }) => {
  const { selected, data, newList } = useSelector((state) => state.listData);
  const dispatch = useDispatch();

  let newData = Object.entries(tmpData).sort((a, b) => a[0] - b[0]);

  const handleCancel = () => {
    dispatch(setMode("read"));
  };
  const handleUpdate = () => {
    let modData = { ...data, ...tmpData };
    dispatch(setData(modData));
    dispatch(setMode("read"));
    dispatch(setSelected([]))
  };

  const handlePositioning = () => {
    let checkedLists = [...selected];
    let beforeTarget = newData.filter((item) => item[0] <= checkedLists[0]);
    let afterTarget = newData.filter((item) => item[0] === checkedLists[1]);
    let afterTargetEntries = newData.filter(
      (item) => ![...checkedLists, newList, ...beforeTarget.map(ob=>ob[0])].includes(item[0])
    );
    let target = { [newList]: tmpData[newList] };
    return [
      ...beforeTarget,
      ...Object.entries(target),
      ...afterTarget,
      ...afterTargetEntries,
    ];
  };

  const handleMoveTiles = (type, id) => {
    let obj = {
      "p1-t": function () {
        let filteredData = tmpData[selected[0]].reduce(
          (acc, cum) => {
            return cum.id === id
              ? { ...acc, tData: [cum] }
              : { ...acc, p1Data: [...acc["p1Data"], cum] };
          },
          { p1Data: [], tData: [] }
        );
        let tData = [...tmpData[newList], ...filteredData.tData];
        dispatch(
          setTempData({
            ...tmpData,
            [selected[0]]: filteredData.p1Data,
            [newList]: tData,
          })
        );
      },
      "t-p1": function () {
        let filteredData = tmpData[newList].reduce(
          (acc, cum) => {
            return cum.id === id
              ? { ...acc, p1Data: [cum] }
              : { ...acc, tData: [...acc["tData"], cum] };
          },
          { p1Data: [], tData: [] }
        );
        let p1Data = [...tmpData[selected[0]], ...filteredData.p1Data];
        dispatch(
          setTempData({
            ...tmpData,
            [selected[0]]: p1Data,
            [newList]: filteredData.tData,
          })
        );
      },
      "p2-t": function () {
        let filteredData = tmpData[selected[1]].reduce(
          (acc, cum) => {
            return cum.id === id
              ? { ...acc, tData: [cum] }
              : { ...acc, p2Data: [...acc["p2Data"], cum] };
          },
          { p2Data: [], tData: [] }
        );
        let tData = [...tmpData[newList], ...filteredData.tData];
        dispatch(
          setTempData({
            ...tmpData,
            [selected[1]]: filteredData.p2Data,
            [newList]: tData,
          })
        );
      },
      "t-p2": function () {
        let filteredData = tmpData[newList].reduce(
          (acc, cum) => {
            return cum.id === id
              ? { ...acc, p2Data: [cum] }
              : { ...acc, tData: [...acc["tData"], cum] };
          },
          { p2Data: [], tData: [] }
        );
        let p2Data = [...tmpData[selected[1]], ...filteredData.p2Data];
        dispatch(
          setTempData({
            ...tmpData,
            [selected[1]]: p2Data,
            [newList]: filteredData.tData,
          })
        );
      },
    };

    obj[type]();
  };

  return (
    <>
      <div className="d-flex align-items-center gap-2 list-wrap">
        {newData.length && (
          <>
            {handlePositioning().map(([key, value]) => (
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
                    <p className="m-0">List {key}</p>
                  </div>

                  {value.map((item) => (
                    <Card key={item.id} className="mt-2 mb-2">
                      <CardBody>
                        {" "}
                        <h6 className="fw-bolder">{item.name}</h6>
                        <p>{item.description} </p>
                        <p className="w-100 d-flex align-items-center justify-content-between m-0 p-0 navigation-btns">
                          {key === newList && (
                            <>
                              <p
                                className="btn btn-secondary"
                                onClick={() => handleMoveTiles("t-p1", item.id)}
                              >
                                {"<"}
                              </p>
                              <p
                                className="btn btn-secondary"
                                onClick={() => handleMoveTiles("t-p2", item.id)}
                              >
                                {">"}
                              </p>
                            </>
                          )}
                          {key === selected[0] && (
                            <>
                              <p></p>
                              <p
                                className="btn btn-secondary"
                                onClick={() => handleMoveTiles("p1-t", item.id)}
                              >
                                {">"}
                              </p>
                            </>
                          )}
                          {key === selected[1] && (
                            <>
                              <p
                                className="btn btn-secondary"
                                onClick={() => handleMoveTiles("p2-t", item.id)}
                              >
                                {"<"}
                              </p>
                              <p></p>
                            </>
                          )}
                        </p>
                      </CardBody>
                    </Card>
                  ))}
                </Col>
              </Col>
            ))}
          </>
        )}
      </div>
      <div className="d-flex w-100 align-items-center justify-content-center gap-3 mb-3 flex-wrap">
        <Button
          variant="danger"
          style={{ minWidth: "200px" }}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          style={{ minWidth: "200px" }}
          onClick={handleUpdate}
        >
          Update
        </Button>
      </div>
    </>
  );
};

export default TempList;
