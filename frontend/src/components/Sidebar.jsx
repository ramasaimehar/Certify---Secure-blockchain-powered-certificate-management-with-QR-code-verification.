import React from  'react'
import { useNavigate } from 'react-router-dom';
import "./Sidebar.css";
import Tables from './Tables';
import Admintable from './data-table.jsx/Admintable';
import Usertable from './data-table.jsx/Userstable';
import { useState } from 'react';

const Sidebar = () => {

    const navigate = useNavigate();
    const [index, setIndex] = useState(0);

    const table = [
        <Tables />,
        <Admintable/>,
        <Usertable/>
    ]

    return (
        <div className='sidebar-main'>
            <div className="sidebar">
                <span onClick={() => navigate("/")}>Home</span>
                <span onClick={() => setIndex(0)}>certificate data</span>
                <span onClick={() => setIndex(1)}>admindata</span>
                <span onClick={() => setIndex(2)}>userdata</span>
            </div>
            {table[index]}

        </div>
    )
}

export default Sidebar