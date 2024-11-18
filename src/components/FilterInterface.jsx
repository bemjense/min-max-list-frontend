import React, { useState } from 'react';

const FilterInterface = ({ 
    handleSetFilterTaskDueDate,
    handleSetFilterTaskTimeStamp
}) => {
    const [date, setDate] = useState(null);
    

    return (

                    <div className='flex-col'>

                        <div className = "button goes here">












                        </div>















                    <div class="flex transition-all duration-300 hover:bg-[#3AA7FA]"
                        onClick={() => {
                            const today = new Date();
                            const formattedDate = today.toLocaleDateString('en-CA');
                            handleSetFilterTaskDueDate(formattedDate);
                        }}
                    >
                        <img src="/assets/star.svg" className="ml-5 mr-1" width="30" height="30" />
                        <div className="flex flex-col text-white font-medium text-2xl">
                            <div className='flex flex-col'>
                                <div
                                    className='flex  p-[6px] cursor-pointer'
                                >
                                    <span>Due Today</span>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="flex transition-all duration-300 hover:bg-[#3AA7FA]"
                        onClick={() => {
                            const today = new Date();
                            const formattedDate = today.toLocaleDateString('en-CA');
                            handleSetFilterTaskTimeStamp(formattedDate);
                        }}
                    >
                        <img src="/assets/star.svg" className="ml-5 mr-1" width="30" height="30" />
                        <div className="flex flex-col text-white font-medium text-2xl">
                            <div className='flex flex-col'>
                                <div
                                    className='flex  p-[6px] cursor-pointer'
                                >
                                    <span>Created Today</span>
                                </div>
                            </div>

                        </div>
                    </div>
                    </div>
    );
};

export default FilterInterface;