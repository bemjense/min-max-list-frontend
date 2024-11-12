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
        <div className="flex flex-col p-5 text-white  font-semibold text-2xl">

            <div>
                {lists.map((list) => (
                    list !== 'Tasks' && (
                        <div className='flex'>
                            <FaFolderOpen className="mr-3 mt-[5px]" />
                            <button onClick={() => setCurrentList(list)}>{list}</button>
                        </div>
                    )
                ))}
                {/*Ensure that main list is bottom*/}
                <div className='flex'>
                    <FaFolderOpen className="mr-3 mt-[5px]" />
                    <button onClick={() => setCurrentList("Tasks")}>Tasks</button>
                </div>
            </div>



            <div className="text-3xl text-white flex p-5 bg-yellow-900 mt-4">
                <FaFolderOpen className="mr-3" /> {currentList}
            </div>

            <div className="flex mt-4 text-black">
                <input
                    type="text"
                    placeholder="Add new list"
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    className="p-2 text-lg"
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            addList()
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default ListInterface;
