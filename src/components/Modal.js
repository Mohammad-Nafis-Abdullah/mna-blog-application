/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { ImCross } from 'react-icons/im';


let child, setModalChild;
let checkStatus, setCheckStatus;

/** Modal Component
 * 
 * Add the component at the root js file of the application;
 * 
 */
const Modal = () => {
    [child, setModalChild] = useState(<div />);
    [checkStatus, setCheckStatus] = useState(false)
    const topRef = useRef();

    useEffect(() => {
        topRef?.current?.scrollIntoView();
    }, [checkStatus]);

    return (
        <div className={`fixed top-0 bottom-0 right-0 left-0 bg-black/80 backdrop-blur-sm p-0 ${checkStatus ? 'block' : 'hidden'}`}>
            <button onClick={closeModal} className="bg-white flex justify-center items-center text-3xl font-bold text-red-500 h-8 w-8 rounded fixed right-[5%] top-5 cursor-pointer select-none p-1.5 z-[99]"><ImCross /></button>

            <div className='w-full overflow-auto h-screen'>
                <div ref={topRef} className='h-0 mb-16' />
                <div className='h-[calc(100%-4rem)] overflow-y-auto'>
                    {child}
                </div>
            </div>

        </div>
    );
};

/** For openning the modal, call the function: openModal()
 * 
 * Pass any message or component as a parameter of this function; this message or component will show in the modal;
 * 
 * Never use this function direct in button
    [ for example: <button onclick={openModal}></button> ];
    because event listener of the button pass the event parameter to the function, that will be occured an error;
 * 
 * The correct way is to write a funciton in the onclick event handler of the button and call opanModal function there
    [ for example: <button onclick={()=>{ openModal() } }></button> ];
*/
const openModal = (component = '') => {
    setModalChild(component);
    setCheckStatus(true);
}

/**
 * For closing the modal just call closeModal() function.
 */
const closeModal = () => {
    setCheckStatus(false);
    setModalChild(<div/>);
}

export default Modal;

export { openModal, closeModal };