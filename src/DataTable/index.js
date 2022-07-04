import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'antd';

const DataTable = () => {
    const [gridData, setGridData] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        loadData();
    }, []);
    const loadData = async () => {
        setLoading(true);
        const response = await axios.get("https://radiant-springs-14509.herokuapp.com/api/companies/6273d776ceafd0a37f529b83/brands");
        setGridData(response.data);
        setLoading(false);
    };
    console.log("gridData", gridData);

    const modifiedData = gridData.map(({ body, ...item }) => ({
        ...item,
        key: item.id,
        Comment: body,
    }));
    const columns = [
        {
            title: "ID",
            dataIndex:"id",


        },
        {
            title:"Name",
            dataIndex:"name",
            align:"center",
            editable: true,
        },
        {
            title:"Packsize",
            dataIndex:"packSize",
            align:"center",
            editable: true,
        },
        {
            title:"Actions",
            dataIndex:"actions",
            align:"center",
            editable: true,
        }
    ];
    console.log("modifiedData", modifiedData);
    
    return (
        <>
            <h2>Data Table</h2>
        </>
    );
};
export default DataTable;