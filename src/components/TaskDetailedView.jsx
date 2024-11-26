import React, { useEffect, useState} from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function DetailedView({task}) {
    const [viewDetails, setViewDetails] = useState(null);
    useEffect(() => {
        setViewDetails(task);
    }, [task]);



    if (!viewDetails) return null;
    return (
        <div>
            <Popup
                open={viewDetails !== null}
                modal
                nested
                onClose={() => setViewDetails(null)}
            >
                {close => (
                    <div className='modal'>
                        <div className='content'>
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