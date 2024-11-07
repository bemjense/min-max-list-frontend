import React from 'react';
import './ContextMenu.css'; // Import the CSS file

import { FaBell} from 'react-icons/fa';
import { FaRegTrashCan } from "react-icons/fa6";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { FaEdit} from 'react-icons/fa';
import { HiMiniTrash } from "react-icons/hi2";
import { RiMarkPenFill } from "react-icons/ri";

const ContextMenu = ({ top, left, onAction, isCompleted }) => (
    <div className="context-menu fade-in" style={{ position: 'absolute', top, left }}>
        <ul>
            <li onClick={() => onAction('edit')}>️
                <FaEdit className='mr-2'/>
                
                Edit</li>
            <li onClick={() => onAction('toggle')}>
                <RiMarkPenFill className = 'mr-2'/>
                {isCompleted ? 'Unmark' : 'Mark'}
            </li>

            <li onClick={() => onAction('delete')}>
                <HiMiniTrash className = 'mr-2'/> Delete
            </li>

            <li onClick={() => onAction('alarm')}>
                <FaBell className = 'mr-2'/> Alarm
            </li>
        </ul>
    </div>
);
export default ContextMenu;