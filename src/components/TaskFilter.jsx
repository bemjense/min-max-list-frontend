import { MdRemoveCircle } from "react-icons/md";
import { FaXmark  } from "react-icons/fa6";
const TaskFilter = (
    {filterTaskCreatedTimeStamp, setFilterTaskCreatedTimeStamp}) => {



    if (!filterTaskCreatedTimeStamp) return null;


    return (


    
        <button
            className="text-white text-[0.8rem] bg-transparent hover:text-gray-300 "
            onClick={() => setFilterTaskCreatedTimeStamp(null)}
            aria-label="Clear filter"
        >

            <div className=' flex items-center  max-h-8 rounded-full bg-[#3aa7fa] mt-[0.2rem] p-[0.4rem] gap-1 motion-duration-500 motion-preset-blur-left'>
                <FaXmark  className = "mt-[1px]"/>
                <div class=" text-white text-[0.8rem] text-left ">{filterTaskCreatedTimeStamp}</div>
            </div>
        </button>
    )
};

export default TaskFilter;