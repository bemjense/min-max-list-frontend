import React, { useState } from 'react';
import './ContextMenu.css';
import { FaFolderOpen } from "react-icons/fa6";

const ListInterface = ({currentList, setCurrentList, lists, setLists}) => {
    const [newListName, setNewListName] = useState("");

    const addList = () => {
        if (newListName.trim() !== "") {
            setLists([...lists, newListName]);
            setNewListName("");
        }
    };

    return (
        <div className="flex flex-col p-5">
            <div className="dropdown">
                <select
                    className="text-3xl text-white p-5 bg-yellow-900 hover:rounded-xl hover:bg-[#AFDD66] transition-all duration-300"
                    value={currentList}
                    onChange={(e) => setCurrentList(e.target.value)}
                >
                    {lists.map((list, index) => (
                        <option key={index} value={list}>
                            {list}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex mt-4">
                <input
                    type="text"
                    placeholder="Add new list"
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    className="p-2 text-lg"
                />
                <button onClick={addList} className="ml-2 p-2 bg-green-500 text-white">
                    Add
                </button>
            </div>
            <div className="text-3xl text-white flex p-5 bg-yellow-900 mt-4">
                <FaFolderOpen className="mr-3" /> {currentList}
            </div>
        </div>
    );
};

export default ListInterface;
