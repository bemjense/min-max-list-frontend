import React, { useEffect, useState} from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './TaskDetailedView.css';

export default function DetailedView({task}) {
    const [viewDetails, setViewDetails] = useState(null);
    useEffect(() => {
        setViewDetails(task);
    }, [task]);



    if (!viewDetails) return null;
    return (
        <div className='font-display bg-black'>
            <Popup
                open={viewDetails !== null}
                modal
                nested
                onClose={() => setViewDetails(null)}
            >
                {close => (
                    <div>
                        <div>
                            Task Details: {task.task_desc}

                        </div>
                        <div>
                            <button onClick={() => close()}>
                                Close modal
                            </button>
                        </div>
                    </div>
                )}
            </Popup>

        </div>
    )
};