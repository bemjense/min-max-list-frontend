import React from 'react';
import './ContextMenu.css'; // Import the CSS file


import { FaFolderOpen } from "react-icons/fa6";



const ListInterface = ({currentList}) => (
    <div className='flex flex-col'>
        <div class="text-3xl text-white flex"><FaFolderOpen className='mr-3'/>List [1] go here</div>
        <div class="text-3xl text-white flex"><FaFolderOpen className='mr-3'/>List [2] go here</div>
        <div class="text-3xl text-white flex"><FaFolderOpen className='mr-3'/>{currentList}</div>
    </div>
);
export default ListInterface;