import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchListData } from '../redux/listReducer';

const ListIndex = () => {

    const dispatch = useDispatch();

    const {data, loading, error} = useSelector((state) => state.listData);


    useEffect(() => {
        dispatch(fetchListData())
    }, [])

    console.log(data && data);

  return (
    <div>
      
    </div>
  )
}

export default ListIndex
