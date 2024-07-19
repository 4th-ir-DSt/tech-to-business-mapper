import React, { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import Button from './components/Button';
import { FaPaperclip, FaHeart } from 'react-icons/fa6';
import { Spinner, Autocomplete, AutocompleteItem } from '@nextui-org/react';
import SuggestionChart from './components/SuggestionChart';
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios';

const MainContent = () => {
  const [options, setOptions] = useState([]);
  const [animal, setAnimal] = useState([{ label: "dog", value: "dog" }, { label: "cat", value: "cat" }]);
  const [dataElements, setDataElements] = useState([]);
  const [showChart, setShowChart] = useState(false);
  const [resolvedSuggestions, setResolvedSuggestions] = useState([]);
  const [bottomText, setBottomText] = useState(<div className='w-[300px] mt-4 justify-center text-center'>Start by creating or uploading some business terms</div>);
  const demoRef = useRef(null);
  const { promiseInProgress } = usePromiseTracker();

  const [businessTerm, setBusinessTerm] = useState('');

  const getDataElements = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/data-elements")

      let temp = []
      response.data.forEach((element) => { temp.push(element) })
      setDataElements(temp)

    } catch (error) {
      setBottomText(<div className='w-[300px] mt-4 justify-center text-center text-red-500'>Error Fetching Data</div>);
    }
  }

  const submitCSV = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('csvfile', file);

      try {
        const response = await axios.post('http://localhost:8000/api/v1/business-terms/csvfile', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (response.status === 202) {

          const response2 = await axios.get("http://localhost:8000/api/v1/business-terms")
          let temp = []
          response2.data.forEach((element) => {
            temp.push(element)
          })
          setOptions(temp)
        }
      } catch (error) {
        setBottomText(<div className='w-[300px] mt-4 justify-center text-center text-red-500'>Error Uploading File</div>);
      }
    }
  };

  const createNewBusinessTerm = async () => {

    const newTerm = {
      "uid": parseInt(uuidv4().slice(0, 8), 16) & 0xFFFFFFFF,
      "name": businessTerm,
      "type": "",
      "description": "",
      "data_elements": []
    }

    try {
      const response = await axios.post('http://localhost:8000/api/v1/business-terms/business-term', newTerm, {
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (response.status === 201) {

        let temp = [...options]
        temp.push(response.data)
        setOptions(temp)
        setBusinessTerm("")
      }
    } catch (error) {
      setBottomText(<div className='w-[300px] mt-4 justify-center text-center text-red-500'>Error Creating Business Term</div>);
    }
  }

  const getSuggestions = async (termId) => {
    console.log(termId)
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/business-terms/${termId}/suggestions`);
      if (response.status === 200) {

        let temp = []

        response.data.forEach((element) => {
          dataElements.forEach((e) => {
            if (element.uid === e.uid) {
              e["score"] = element.score * 100
              temp.push(e)
            }
          })
        })
        setResolvedSuggestions(temp)
        setShowChart(true)

      }
    } catch (error) {
      setBottomText(<div className='w-[300px] mt-4 justify-center text-center text-red-500'>Error Fetching Suggestions</div>);
    }
  }

  const scrollToDemo = () => {
    demoRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    if (dataElements.length < 1) {
      trackPromise(getDataElements())
    }
  }, [dataElements])

  return (
    <div className="bg-custom-bg bg-cover bg-center min-h-screen flex flex-col items-center text-white">
      <div className='h-screen flex flex-col w-full items-center'>
        <Navbar scroller={scrollToDemo} />

        <header className="text-center items-center h-[calc(100%-200px)] flex flex-col py-[5%] justify-around">
          <div className='m-6'>
            <h1 className="text-4xl font-bold m-2">Elevate Your Business with TTBM</h1>
            <p className="mt-2">From Vision to Technology</p>
          </div>
          <p className="mt-4 max-w-2xl mx-auto">
            Introducing TTBM, the Tech-to-Business Mapper that transforms your business requirements into cutting-edge technological solutions. Harness the power of AI/ML to seamlessly map your needs to the right technology, ensuring efficiency and innovation.
          </p>
          <Button text={"Get Started Today"} className="m-8" scroller={scrollToDemo} />
        </header>
      </div>

      <div className='h-screen items-center flex flex-col' ref={demoRef}>
        <div className='flex justify-center items-center h-full'>
          <section className="h-fit bg-[#401040] rounded-lg p-8 flex flex-col md:flex-row items-center justify-between max-w-4xl  container">
            <div className="flex flex-col space-y-4 w-full md:w-1/2">
              <h2 className="text-xl">Find out which tech concepts or terms are in line with your business</h2>

              <div className="mb-4 flex flex-col">
                <label className="text-white">Business Term</label>
                <div className='flex flex-row w-full'>
                  <input type="text" value={businessTerm} onChange={(e) => setBusinessTerm(e.target.value)} placeholder='Enter Business Term' className="w-[70%] px-4 py-3 rounded-l-[50px] border-solid border-2 border-white-500 bg-[#401040] text-white focus:outline-none mt-2" />


                  <button onClick={() => {

                    trackPromise(
                      createNewBusinessTerm()
                    )

                  }}
                    className='bg-ttb-violet items-center justify-center flex py-2 rounded-r-[50px] font-medium cursor-pointer p-2 bg-[#401040] text-white mt-2 border-white-500 border-2 w-[30%]'>Create</button>
                </div>
              </div>
              <div className='items-center justify-center text-center font-medium text-gray-400'>OR</div>

              <div className="flex flex-col">
                <label className="bg-ttb-violet items-center justify-center flex py-2 rounded-[70px] h-[50px] font-medium cursor-pointer w-full p-2 gap-4 bg-[#401040] text-white mt-2" for="business_terms"> <FaPaperclip />Upload Business Terms CSV File</label>
                <input id='business_terms' type="file" className="opacity-0 absolute z-[-1]"

                  onChange={(e) => { trackPromise(submitCSV(e)) }}

                />
                <a href='/' className="text-sm text-blue-800">CSV Data Format *</a>
              </div>

              <div className="mb-4">
                {/* <select onChange={(e) => {

                  const terms = options.filter((option) => option.name === e.target.value)
                  if (terms.length === 0) { setShowChart(false); return }
                  trackPromise(
                    getSuggestions(terms[0].uid)
                  )
                }} className="w-full py-3 px-4 h-[50px] rounded-[50px] bg-[#401040] border-solid border-2 border-white-500 text-white">
                  <option key={"placeholder"} value={""}>Select Business Term</option>
                  {options.map((option, index) => (
                    <option key={index} value={option.name}>{option.name}</option>
                  ))}
                </select> */}
                <Autocomplete variant="bordered"

                  onSelectionChange={(key) => {
                    const terms = options.filter((option) => option.name === key)
                    if (terms.length === 0) { setShowChart(false); return }
                    trackPromise(
                      getSuggestions(terms[0].uid)
                    )
                  }}

                  defaultItems={options}
                  radius='full'
                  label="Select Business Term"
                  labelPlacement='outside'
                  className="w-full bg-[#401040] text-white"
                  listboxProps={{
                    itemClasses: {
                      base: "text-white",
                    },
                  }}
                  inputProps={{
                    classNames: {
                      inputWrapper: "h-[50px] group-data-[focus=true]:border-white-500 data-[hover=true]:border-white-500",
                      label: "text-white text-md data-[focus=true]:text-white group-data-[filled-within=true]:text-white",
                      input: "text-md"
                    }
                  }}
                  classNames={{
                    popoverContent: "bg-[#401040]",
                    listbox: "text-white",
                    selectorButton: "text-white",
                  }}
                >
                  {options.map((a) => (
                    <AutocompleteItem key={a.name} value={a.uid}>
                      {a.name}
                    </AutocompleteItem>
                  ))}
                </Autocomplete>
              </div>
            </div>

            <div className="hidden md:block border-gray-400 h-60 w-0 border-1 mx-5 rounded-full" ></div>


            {!showChart && !promiseInProgress && (
              <div className="flex flex-col items-center justify-center w-full md:w-1/2 mt-8 md:mt-0">
                <img src="/Group.svg" className="w-[250px] " alt="vector" />

                {bottomText}
              </div>)}

            {showChart && !promiseInProgress && (
              <SuggestionChart data={resolvedSuggestions} />
            )}

            {promiseInProgress && (<Spinner className='w-[400px]' />)}


          </section>
        </div>
        <div className='sticky bottom-0 flex flex-row items-center justify-center text-center'>Made with <FaHeart className='mx-2 text-red-500' /> by <span className='mx-2 font-medium'>ENF</span></div>
      </div>
    </div>
  );
};

export default MainContent;
