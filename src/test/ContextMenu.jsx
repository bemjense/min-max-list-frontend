import React from 'react';
import './ContextMenu.css'; // Import the CSS file

const ContextMenu = ({ top, left, onAction, isCompleted }) => (
    <div className="context-menu fade-in" style={{ position: 'absolute', top, left }}>
        <ul>
            <li onClick={() => onAction('edit')}>✏️ Edit</li>
            <li onClick={() => onAction('toggle')}>
                ✅ {isCompleted ? 'Undo Complete' : 'Mark as Complete'}
            </li>
            <li onClick={() => onAction('delete')}>🗑️ Delete</li>
        </ul>
    </div>
);
export default ContextMenu;