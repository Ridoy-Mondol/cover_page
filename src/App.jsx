import React, { useState, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import ReactDOM from 'react-dom';
import { FiChevronDown } from 'react-icons/fi';
import { IoCloudDownload } from 'react-icons/io5';
import { FaGlobe, FaLinkedin, FaFacebook } from 'react-icons/fa';
import { AiFillCheckCircle } from 'react-icons/ai';
import template1 from './assets/template-1.png'
import { handlePreview } from './components/Preview';
import CoverPage from './components/CoverPage';
import './App.css'

const template = [
  {
    id: 1,
    img_src: template1,
  },
  {
    id: 2,
    img_src: template1,
  },
  {
    id: 3,
    img_src: template1,
  },
  {
    id: 4,
    img_src: template1,
  },
  {
    id: 5,
    img_src: template1,
  },
  {
    id: 6,
    img_src: template1,
  },
]
function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCourseOpen, setIsCourseOpen] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [assignment, setAssignment] = useState(1);
  const [labReport, setLabReport] = useState(0);
  const [id, setId] = useState(null);
  const childRef = useRef(null);
  const animation = useSpring({
    height: isOpen ? '21.5rem' : '0rem',
    opacity: isOpen ? 1 : 0,
    overflow: 'hidden',
    config: { duration: 300 },
  });

  const CourseAnimation = useSpring({
    height: isCourseOpen ? '26.7rem' : '0rem',
    opacity: isCourseOpen ? 1 : 0,
    overflow: 'hidden',
    config: { duration: 300 },
  });
  
  const showPreview = (id, img_src) => {
    setId(id);
    handlePreview(id, img_src);
  }

  const selectAssignment = () => {
    setAssignment(1);
    setLabReport(0);
  }
  const selectLabReport = () => {
    setAssignment(0);
    setLabReport(1);
  }

  const handleDownloadPDF = () => {
    const tempDiv = document.createElement('div');
    document.body.appendChild(tempDiv);
  
    ReactDOM.render(<CoverPage ref={childRef} />, tempDiv);
  
    html2canvas(tempDiv, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'pt', 'a4');
      const imgWidth = 190; 
      const pageHeight = pdf.internal.pageSize.height;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
  
      let position = 0;
  
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
  
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save('CoverPage.pdf');     
      document.body.removeChild(tempDiv);
    });
  };

  const handleSemesterSelect = (semester) => {
    setSelectedSemester(semester);
    setIsOpen(false);
  };

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    setIsCourseOpen(false); 
  };

  return (
    <div className="App bg-purple pt-[7rem] pb-[7rem]">
      <h1 className='text-[64px] text-center font-semibold'>
        <span className='text-lavender'>
          Cover Page
        </span>
         <span className='text-white'> Generator</span>
        </h1>
        <div className='w-[42rem] h-[4.75rem] mx-auto text-white text-[1.625rem] font-medium rounded-[1rem] overflow-hidden mt-[2.25rem] shadow-custom'>
        <button className={`w-[50%] h-[100%] ${assignment ? 'bg-lavender rounded-r-[1rem]' : 'bg-darkPurple'}`} onClick={selectAssignment}>Assignment</button>
        <button className={`w-[50%] h-[100%] ${labReport ? 'bg-lavender rounded-l-[1rem]' : 'bg-darkPurple'}`} onClick={selectLabReport}>Lab Report</button>
        </div>
        <form className='w-[42rem] mx-auto mt-[1.75rem]'>
          {/* roll input */}
          <input
            type="text"
            name="Roll"
            placeholder='Roll'
            className='w-[100%] h-[3.75rem] mx-auto text-white text-[1.625rem] font-medium rounded-[1rem] overflow-hidden bg-darkPurple placeholder:text-white pl-4'
          />

          {/* select semester*/}
          <div className='h-auto mt-4 bg-darkPurple rounded-[1rem]'>
          <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className='w-[100%] h-[3.75rem] text-white text-[1.625rem] font-medium rounded-[1rem] overflow-hidden bg-darkPurple placeholder:text-white px-4 text-start flex justify-between items-center'
          >
            {selectedSemester ||"Select Semester"}
            <FiChevronDown className={`transform ${isOpen ? 'rotate-180' : 'rotate-0'} transition-transform duration-300`} />
          </button>
          <animated.div style={animation} className="h-auto">
          <ul className='h-auto bg-darkPurple flex flex-col justify-between'>
            {['1st year odd', '1st year even', '2nd year odd', '2nd year even', '3rd year odd', '3rd year even', '4th year odd', '4th year even'].map((semester) => (
                <li
                  key={semester}
                  className={`text-white py-2 pl-4 border-y-[1px] border-white cursor-pointer ${semester === '4th year even' ? 'border-b-0' : ''}`}
                  onClick={() => handleSemesterSelect(semester)}
                >
                  {semester}
                </li>
              ))}
          </ul>
         </animated.div>
        </div>
        
        {/* select course */}
        <div className='h-auto mt-4 bg-darkPurple rounded-[1rem]'>
          <button
          type="button"
          onClick={() => setIsCourseOpen(!isCourseOpen)}
          className='w-[100%] h-[3.75rem] text-white text-[1.625rem] font-medium rounded-[1rem] overflow-hidden bg-darkPurple placeholder:text-white px-4 text-start flex justify-between items-center'
          >
            {selectedCourse ||"Select Course"}
            <FiChevronDown className={`transform ${isCourseOpen ? 'rotate-180' : 'rotate-0'} transition-transform duration-300`} />
          </button>
          <animated.div style={CourseAnimation} className="h-auto">
          <ul className='h-auto bg-darkPurple flex flex-col justify-between'>
            {['Course 1', 'Course 2', 'Course 3', 'Course 4', 'Course 5', 'Course 6', 'Course 7', 'Course 8', 'Course 9', 'Course 10'].map((course) => (
                <li
                  key={course}
                  className={`text-white py-2 pl-4 border-y-[1px] border-white cursor-pointer ${course === 'Course 10' ? 'border-b-0' : ''}`}
                  onClick={() => handleCourseSelect(course)}
                >
                  {course}
                </li>
              ))}
          </ul>
         </animated.div>
        </div>

        {/* roll input */}
        <input
            type="text"
            name="teacher"
            placeholder='Teacher’s Name'
            className='w-[100%] h-[3.75rem] mx-auto text-white text-[1.625rem] font-medium rounded-[1rem] overflow-hidden bg-darkPurple placeholder:text-white pl-4 mt-4'
          />
        </form>

        <h1 className='text-[64px] text-center font-semibold my-8'>
        <span className='text-lavender'>
           Select
        </span>
         <span className='text-white'> Design</span>
        </h1>

        {/* select design */}
        <div className='flex flex-wrap justify-between w-[80%] mx-auto'>
          {
            template.map((item) => {
              return (
                <div className='w-[30%] mb-12 relative' key={item.id}> 
                <img
                  src={item.img_src}
                  alt="template"
                  className='w-[100%] h-[auto] object-cover m-0'
                />
                <div 
                className={`absolute top-0 left-0 w-[100%] h-[100%] ${item.id === id ? 'bg-black bg-opacity-50' : 'bg-transparent'}`}
                onClick={() => showPreview(item.id, item.img_src)}
                >
                { 
                  item.id === id &&
                  <AiFillCheckCircle className="text-purple text-4xl mt-4 ml-4" />
                }
                </div>
                </div>
              )
            })
          }
        </div>

        {/* download button */}
        <div className='w-[100%] text-center mt-12 relative'>
        <button className='w-[36rem] h-[5.625rem] bg-lavender rounded-[1rem] text-white text-[1.625rem] font-medium' 
        onClick={handleDownloadPDF}>
          Download PDF
        </button>
        <IoCloudDownload className='absolute right-[31rem] top-1/2 transform -translate-y-1/2 text-darkPurple text-[2.625rem] font-medium' 
        onClick={handleDownloadPDF}
        />
        </div>
        
        {/* footer */}
        <footer className='text-lavender text-[1.625rem] font-medium mt-16'>
          <p className='text-center'>© 2024 All Rights Reserved</p>
          <div className='flex justify-center items-center gap-4 mt-4'>
          <div>
          <FaGlobe />
          </div>
          <div className='p-2 bg-lavende rounded-full'>
          <FaLinkedin className='text-lavender' />
          </div>
          <div>
          <FaFacebook />
          </div>
          </div>
        </footer>
    </div>
  )
}

export default App
