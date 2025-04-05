import React, { useState } from 'react';
import Header from './components/Header';
import UploadForm from './components/UploadForm';
import Generator from './components/Generator';

import './App.css';
import dpTemplate from './EFL6.jpg';


const App = () => {
  const [name, setName] = useState('');
  const [generatedImage, setGeneratedImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isGenerated, setIsGenerated] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false); 
  const [imageDetails, setImageDetails] = useState({});

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const fileDetails = {
          name: file.name, 
          size: (file.size / 1024).toFixed(2), 
          date: new Date().toLocaleDateString(),
        };
        setUploadedImage(reader.result);
        setImageDetails(fileDetails);
        setUploadSuccess(true); 
        setIsGenerated(false); 
        setDownloadComplete(false); 

      };
      reader.readAsDataURL(file);
    }
  };
  const handleGenerate = () => {
    setIsGenerated(true); 
    setDownloadComplete(false); 
  };
  const resetPage = () => {
    setIsGenerated(false);
    setName(''); 
    setUploadedImage(null); 
    setUploadSuccess(false); 
    setDownloadComplete(false); 
    
  };

  const handleDownloadComplete = (generatedImg) => {
    setGeneratedImage(generatedImg);
    setDownloadComplete(true); 
    setUploadSuccess(false); 
  };



  return (
    <>
    <Header />
   
    <div className="App flex flex-col gap-5  lg:max-w-3xl ">
      
     
      <div>
        {!uploadSuccess && !isGenerated && !downloadComplete && (
          <section className="bg-white px-6 ">
            <h2 className="text-[24px] leading-[29.06px] text-justify font-[500] ">Create Personalized Flier</h2>
            <p className="text-sm font-[400] leading-[16.94px] text-[#788195]">
              Upload your preferred image, downlaod and share with your loved ones.
            </p>
            <img className='w-full h-full lg:w-[1080px] lg:h-[1080px] mt-6 ' src={dpTemplate} alt="mte-dp" />
            <UploadForm
            name={name}
              onFileChange={handleFileChange}
            />
          </section>
        )}
      </div>
      <div>
        {uploadSuccess && !isGenerated && !downloadComplete && (
          <div className="">
            <Generator
              
              uploadedImage={uploadedImage}
              imageDetails={imageDetails} 
              onGenerate={handleGenerate} 
              onDownloadComplete={handleDownloadComplete}
              onDelete={resetPage} 
            />

          </div>
        )}
      </div>

      <div>
        {downloadComplete && (
          <div className="">
            <div className='p-6'>
              
              {generatedImage && (
                <img
                  src={generatedImage}  
                  alt="Generated DP"
                  className="w-full h-full lg:w-[1080px] lg:h-[1080px] object-cove "
                />
              )}
              <div className=' p-6'>
                <h1 className="text-[24px] font-[500] leading-[29.06px] ">Download Complete!</h1>
                <p className='font-[400] text-[14px] leading-[16.94px] text-[#788195] '>You can view the image in your gallery and don’t forget to share.</p>
              </div>
              </div>
              <div className='mt-[64px] border items-center shadow-md w-[440px] h-[93px] lg:h-[120px] lg:w-[950px]'>

                <button
                  onClick={resetPage}
                  className="mt-[18px] mx-4 p-3 w-[350px] lg:w-[950px] rounded-[12px] bg-gradient-to-b from-[#198A4D] to-[#00C1FE] text-white"
                >
                  Create Another
                </button>
              </div>
            
          </div>
        )}
      </div>

    {!downloadComplete && !uploadSuccess && (
         <div className=' mt-[64px] border shadow-md w-full h-[93px] lg:h-[120px] lg:w-[1000px]'>
         <button
           
           className="disabled mt-[18px] mx-6 p-3 w-[340px] lg:w-[1000px] rounded-[12px] bg-gradient-to-b from-[#198a4e93] to-[#00c3fe94] text-white"
         >
           Download Image
         </button>
       </div>
      )}

    </div>
    </>
  );
};

export default App;

