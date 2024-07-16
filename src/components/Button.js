import React from 'react';

const Button = ({ text, ...props }) => {
    return (
        <div className={props.className} onClick={() => props.scroller()}>
            <button className="bg-ttb-violet text-white px-8 py-2 rounded-[70px] h-[50px] font-bold" >
                {text}
            </button></div>);
}

export default Button;