import React from 'react';
import './ContextMenu.css'; // Import the CSS file


import { FaFolderOpen } from "react-icons/fa6";



const ListInterface = ({currentList}) => (
    <div className='flex flex-col'>
        <div class="text-3xl text-white flex p-5 bg-yellow-900 hover:rounded-xl hover:bg-[#AFDD66] transition-all duration-300"><FaFolderOpen className='mr-3'/>List [1] go here</div>
        <div class="text-3xl text-white flex p-5 bg-yellow-900"><FaFolderOpen className='mr-3'/>List [2] go here</div>
        <div class="text-3xl text-white flex p-5 bg-yellow-900"><FaFolderOpen className='mr-3'/>{currentList}</div>
    </div>
);
export default ListInterface;