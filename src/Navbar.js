
import React from 'react';
import Button from "./components/Button"

const Navbar = ({ scroller }) => {
  return (
    <nav className="bg-ttb-glass rounded-[80px] h-[70px] my-4 px-3 flex justify-between items-center w-[95%] ">
      <div className="flex items-center px-6">
        <img src="/ttbm.svg" alt="TTBM Logo" className="w-[100px]" />
      </div>

      <div className="hidden md:flex items-center space-x-6 text-white w-[195px] h-[42px] justify-center  content-center">
        <a href="/" className="hover:text-gray-300 font-bold">Home</a>
        <a href="/" onClick={(e) => { e.preventDefault(); scroller() }} className="hover:text-gray-300 font-bold">Demo</a>
      </div>

      <Button text="Try for Free" scroller={scroller} />
    </nav>
  );
};

export default Navbar;
