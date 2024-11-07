import React, {useState,useRef,useEffect} from 'react';
import './TaskInput.css'
import { FaBell } from 'react-icons/fa';
import AirDatepicker from 'air-datepicker';

import 'air-datepicker/air-datepicker.css';
import localeEn from 'air-datepicker/locale/en';

const TaskInput = ({ newTask, setNewTask, onAddTask, alarmTime, setAlarmTime, newAlarmVisible, setNewAlarmVisible  }) => {
    const dateTimePickerRef = useRef(null);

    useEffect(() => {
        let dp;

        if (newAlarmVisible && dateTimePickerRef.current) {
            // Initialize AirDatepicker with a built-in position setting
            dp = new AirDatepicker(dateTimePickerRef.current, {
                timepicker: true,
                dateFormat: 'Y-m-d H:i',
                timeFormat: 'hh:mm aa',
                locale: localeEn,
                buttons: [
                    'clear',
                    {
                        content: 'Set Alarm',
                        onClick: (datepickerInstance) => {
                            const selectedDate = datepickerInstance.selectedDates[0];
                            if (selectedDate) {
                                setAlarmTime(selectedDate);
                                setNewAlarmVisible(false);
                            }
                        },
                    },
                ],
                position:"top right"
            });

            dp.show();
        }

        return () => {
            if (dp) dp.destroy();
        };
    }, [newAlarmVisible, setAlarmTime]);


    // render 
    return (
    
    
    

        <div className="bottom-0 left-0 right-0 absolute">
            <div className='flex m-5'>
                <button
                    className="alarm-toggle-button mr-3 ml-6 flex"
                    onClick={() => setNewAlarmVisible(!newAlarmVisible)}
                    title="Set an alarm"
                >
                    <FaBell style={{ color: newAlarmVisible ? 'blue' : 'white' }} />
                </button>
                {newAlarmVisible && (
                    <input
                        ref={dateTimePickerRef}
                        className="hidden-datepicker-input"
                        position= "bottom left"
                    />
                )}
                {alarmTime &&
                    <div className="alarm-time-display text-white flex">
                        Alarm set for: {alarmTime.toLocaleString()}
                    </div>}
            </div>

            <div className="border-[3px] border-white p-[16]  bg-[#161616] rounded-full mb-10 ">

                {/*Basic text input*/}
                <div className='flex'>
                <input className="bg-transparent text-white p-2 outline-none focus:outline-none w-full ml-5"
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            onAddTask();
                            setAlarmTime('');
                        }
                    }}
                    placeholder="Enter a Task . . ."
                />
                </div>
            </div>
        </div>
    );
};
export default TaskInput;