
const TaskFilter = (
    {filterTaskCreatedTimeStamp, setFilterTaskCreatedTimeStamp}) => {



    if (!filterTaskCreatedTimeStamp) return null;


    return (


    

    <div className=' flex max-h-8 rounded-full bg-[#3aa7fa] mt-[0.2rem] p-[0.4rem] gap-1 motion-duration-500 motion-preset-blur-left'>
            <button 
                className="text-white text-[0.8rem] bg-transparent hover:text-gray-300 "
                onClick={() => setFilterTaskCreatedTimeStamp(null)}
                aria-label="Clear filter"
            >
                ✕
            </button>
        <div class=" text-white text-[0.8rem] text-left ">{filterTaskCreatedTimeStamp}</div>

    </div>
    )
};

export default TaskFilter;