import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

const MainContent = () => {
  const [options, setOptions] = useState([]);

 
  useEffect(() => {

    const fetchedOptions = [
      'Term 1',
      'Term 2',
      'Term 3',
      'Term 4',
    ];
    setOptions(fetchedOptions);
  }, []);

  return (
    <div className="bg-custom-bg bg-cover bg-center min-h-screen flex flex-col items-center text-white">
      <Navbar />

      <header className="text-center mt-16">
        <h1 className="text-4xl font-bold">Elevate Your Business with TTBM</h1>
        <p className="mt-2">From Vision to Technology</p>
        <p className="mt-4 max-w-2xl mx-auto">
          Introducing TTBM, the Tech-to-Business Mapper that transforms your business requirements into cutting-edge technological solutions. Harness the power of AI/ML to seamlessly map your needs to the right technology, ensuring efficiency and innovation.
        </p>
        <button className="mt-6 bg-ttb-violet text-white px-6 py-3 rounded-full">
          Get Started Today!
        </button>
      </header>

      <section className="mt-16 bg-[#401040] rounded-lg p-8 flex flex-col md:flex-row items-center justify-between max-w-4xl w-full h-[300px]">
        <div className="flex flex-col space-y-4 w-full md:w-1/2">
          <h2 className="text-xl">Find out which tech concepts or terms are in line with your business</h2>
          
          <div className="mb-4">
            <label className="text-white">Upload CSV File</label>
            <input type="file" className="w-full p-2 rounded-[50px] border-solid border-2 border-white-500 bg-[#401040] text-white focus:outline-none mt-2" />
            <small className="text-gray-300">CSV Data Format *</small>
          </div>
          
          <div className="mb-4">
            <select className="w-full p-2 rounded-[50px] bg-[#401040] border-solid border-2 border-white-500 text-white focus:outline-none">
              <option>Select Business Term</option>
              {options.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="fixed left-1/2 w-0.5 h-[194px] ml-9 bg-gray-600"></div>

        <div className="flex items-center justify-center w-full md:w-1/2 mt-8 md:mt-0">
          <img src="/illustration.png" alt="Illustration" className="h-48" />
        </div>
      </section>
    </div>
  );
};

export default MainContent;
