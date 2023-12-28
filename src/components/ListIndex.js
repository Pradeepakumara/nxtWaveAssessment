import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListData } from "../redux/listReducer";
import DisplayList from "./DisplayList";
import { Spinner } from "react-bootstrap";
import Mainpage from "./Mainpage";

const ListIndex = () => {
  const dispatch = useDispatch();

  const { data, loading } = useSelector((state) => state.listData);

  useEffect(() => {
    dispatch(fetchListData());
  }, []);

  return (
    <div>
      {data && <Mainpage />}
      {loading && (
        <div className="overlay">
          <Spinner variant="primary" />
        </div>
      )}
    </div>
  );
};

export default ListIndex;
