
import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-ttb-glass  rounded-[80px] left-[100px] top-[40px]  h-[90px]  mt-1 px-8 flex justify-between items-center w-[100%]">
      <div className="flex items-center space-x-4">
        <img src="/ttbm.svg"  alt="TTBM Logo"  className="h-[45px] w-[118px]  " />
      </div>
      <div className="hidden md:flex items-center space-x-6 text-white w-[195px] h-[42px] top-[84px] justify-center  content-center left-[766px]">
        <a href="/" className="hover:text-gray-300">Home</a>
        <a href="/demo" className="hover:text-gray-300">Demo</a>
      </div>
      <button className="bg-ttb-violet text-white px-4 py-2 rounded-[70px] w-[200px] h-[70px] left-[1389px] top-[67px] p-[18px,28px,18px,28px] gap-10px" >
        Try for free
      </button>
    </nav>
  );
};

export default Navbar;
