import React, { useRef, useEffect, useState, useCallback } from 'react';
import html2canvas from 'html2canvas';
import dpTemplate from '../images/EFL6dp.jpg';
import DPCount from './DpCount';

const DPGenerator = ({
  name = '',
  uploadedImage,
  imageDetails,
  onDownloadComplete,
  onDelete,
}) => {
  const dpRef = useRef(null);
  
  const [incrementDpCount, setIncrementDpCount] = useState(null);

  // const fetchDpCount = async () => {
  //   try {
  //     const response = await fetch('https://bitooqoh-server.onrender.com/api/v1/user_dp'); // Corrected URL
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }
  //     const data = await response.json();

  //     // Extract the count from the response
  //     const dpCount = data.results;
  //     console.log('Fetched DP count:', dpCount); // Debugging log
  //     setDpCount(dpCount);
  //   } catch (error) {
  //     console.error('Failed to fetch DP count:', error);
  //   }
  // };

  // const incrementDpCount = async (name) => {
  //   try {
  //     const response = await fetch('https://bitooqoh-server.onrender.com/api/v1/user_dp', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ name }),
  //     });
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }
  //     const data = await response.json();

  //     // Extract the count from the response
  //     const dpCount = data.userDps.length;
  //     console.log('Incremented DP count:', dpCount); // Debugging log
  //     setDpCount(dpCount);
  //   } catch (error) {
  //     console.error('Failed to increment DP count:', error);
  //   }
  // };
 

  const drawDP = useCallback(() => {
    const canvas = dpRef.current;
    const ctx = canvas.getContext('2d');
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;


    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    const templateImg = new Image();
    templateImg.src = dpTemplate;
    templateImg.onload = () => {
      ctx.drawImage(templateImg, 0, 0, canvasWidth, canvasHeight);


      if (uploadedImage) {
        const img = new Image();
        img.src = uploadedImage;
        img.onload = () => {
          const imgX = 80;
          const imgY = 122;
          const imgWidth = 450;
          const imgHeight = 450;
          const borderRadius = 2;


          ctx.save();
          ctx.beginPath();
          ctx.moveTo(imgX + borderRadius, imgY);
          ctx.arcTo(imgX + imgWidth, imgY, imgX + imgWidth, imgY + imgHeight, borderRadius);
          ctx.arcTo(imgX + imgWidth, imgY + imgHeight, imgX, imgY + imgHeight, borderRadius);
          ctx.arcTo(imgX, imgY + imgHeight, imgX, imgY, borderRadius);
          ctx.arcTo(imgX, imgY, imgX + imgWidth, imgY, borderRadius);
          ctx.closePath();
          ctx.clip();
          ctx.drawImage(img, imgX, imgY, imgWidth, imgHeight);
          ctx.restore();


          
        };
      } else {
        
      }
    };
  }, [uploadedImage]);


  const capitalizeWords = (text) =>
    text
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');

  const capitalizedText = capitalizeWords(name);


 

  const handleDownload = () => {
    if (dpRef.current === null) {
      return;
    }

    html2canvas(dpRef.current, {
      scale: 2,
      useCORS: true,
    })
      .then((canvas) => {
        const dataUrl = canvas.toDataURL('image/png');


        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'edfl-dp.png';
        link.click();


        if (onDownloadComplete) {
          onDownloadComplete(dataUrl);
        }
        if (incrementDpCount) {
          console.log('Calling incrementDpCount',name);
          incrementDpCount(name); // Pass the name to increment function
        } else {
          console.error('incrementDpCount function not set');
        }
      })
      .catch((err) => {
        console.error('Failed to generate image:', err);
      });
  };

  useEffect(() => {
    console.log( 'im name',name);
    drawDP();
  }, [name, uploadedImage, drawDP]);

  return (
    <>
      <div className="p-6">
        <h2 className="text-[24px] leading-[29.06px] text-justify font-[500]">Create Personalized Flier</h2>
        <p className="text-sm font-[400] leading-[16.94px] text-[#788195]">
          Upload your preferred image, downlaod and share with your loved ones.
        </p>
        <canvas
          ref={dpRef}
          width={1080}
          height={1080}
          className="relative mt-4 w-full h-full lg:w-[1080px] lg:h-[1080px] overflow-hidden"
        />
        <div className='flex gap-4 justify-between border rounded-[10px] w-[350px] lg:w-[1000px] mt-8 items-center py-5 px-4 '>
          <div className='flex items-center gap-3 lg:gap-4'>
            <div>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="16" fill="#E7F6EC" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M16 23.5C20.1421 23.5 23.5 20.1421 23.5 16C23.5 11.8579 20.1421 8.5 16 8.5C11.8579 8.5 8.5 11.8579 8.5 16C8.5 20.1421 11.8579 23.5 16 23.5ZM19.0628 14.9479C19.4022 14.637 19.4254 14.1099 19.1145 13.7705C18.8037 13.4311 18.2766 13.4079 17.9372 13.7188L14.8604 16.5366L14.0628 15.8062C13.7234 15.4953 13.1963 15.5185 12.8855 15.8579C12.5746 16.1973 12.5978 16.7244 12.9372 17.0352L14.2976 18.2812C14.6161 18.5729 15.1047 18.5729 15.4233 18.2812L19.0628 14.9479Z" fill="#0F973D" />
              </svg>
            </div>

            <div className="">
              <h2 className='font-[500] text-[14px] leading-[20.3px] text-[#1d2739] '>Upload Successful</h2>
              <p className='font-[400] text-[#98A2B3] text-[11px] leading-[15.95px] '> <span>{imageDetails.name}</span>  | {imageDetails.size} KB | {imageDetails.date}</p>
            </div>
          </div>
          <div>
            <button
              onClick={onDelete}
              className=" w-5 h-5 "
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.91665 1.45833C7.57027 1.45833 7.26 1.6726 7.13733 1.99654L6.946 2.50177C6.53585 2.46079 6.15796 2.41988 5.85205 2.38554C5.62337 2.35986 5.43539 2.3379 5.30482 2.32239L5.15419 2.30431L5.10304 2.29806C4.64629 2.24151 4.22953 2.56584 4.17297 3.02258C4.11641 3.47933 4.44082 3.89545 4.89757 3.95201L4.95323 3.95882L5.10821 3.97742C5.24183 3.99329 5.43339 4.01567 5.66608 4.04179C6.13105 4.094 6.76213 4.1614 7.42425 4.22183C8.3174 4.30334 9.29642 4.37499 9.99999 4.37499C10.7036 4.37499 11.6826 4.30334 12.5757 4.22183C13.2378 4.1614 13.8689 4.094 14.3339 4.04179C14.5666 4.01567 14.7581 3.99329 14.8918 3.97742L15.0467 3.95882L15.1023 3.95203C15.559 3.89546 15.8836 3.47933 15.827 3.02258C15.7704 2.56584 15.3543 2.24142 14.8976 2.29798L14.8458 2.30431L14.6952 2.32239C14.5646 2.3379 14.3766 2.35986 14.1479 2.38554C13.842 2.41988 13.4641 2.46079 13.054 2.50177L12.8626 1.99654C12.74 1.6726 12.4297 1.45833 12.0833 1.45833H7.91665Z" fill="#98A2B3" />
                <path d="M9.16665 9.79166C9.16665 9.33142 8.79356 8.95833 8.33332 8.95833C7.87308 8.95833 7.49998 9.33142 7.49998 9.79166V13.9583C7.49998 14.4186 7.87308 14.7917 8.33332 14.7917C8.79356 14.7917 9.16665 14.4186 9.16665 13.9583V9.79166Z" fill="#98A2B3" />
                <path d="M11.6667 8.95833C12.1269 8.95833 12.5 9.33142 12.5 9.79166V13.9583C12.5 14.4186 12.1269 14.7917 11.6667 14.7917C11.2064 14.7917 10.8333 14.4186 10.8333 13.9583V9.79166C10.8333 9.33142 11.2064 8.95833 11.6667 8.95833Z" fill="#98A2B3" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.758 6.70879C15.8335 5.65149 14.922 4.80386 13.8861 4.92358C12.826 5.04608 11.1903 5.20833 9.99999 5.20833C8.8097 5.20833 7.17393 5.04608 6.11391 4.92358C5.07797 4.80386 4.16642 5.65149 4.24194 6.70879L4.95589 16.704C5.01001 17.4617 5.57437 18.1023 6.34886 18.2188C7.17936 18.3437 8.70327 18.5432 10.0009 18.5417C11.2827 18.5402 12.8128 18.3415 13.647 18.2178C14.4228 18.1027 14.99 17.4617 15.0442 16.7017L15.758 6.70879ZM14.0774 6.57922C14.0803 6.57889 14.0825 6.57909 14.0825 6.57909L14.0847 6.57959C14.0866 6.58023 14.0895 6.58175 14.0923 6.58447C14.0942 6.58627 14.0957 6.58847 14.0957 6.58847L14.0956 6.59005L13.3826 16.5721C12.557 16.6941 11.1421 16.8737 9.99902 16.875C8.84356 16.8763 7.43738 16.6965 6.6175 16.5738L5.90437 6.59005L5.90431 6.58847C5.90431 6.58847 5.90573 6.58627 5.90763 6.58447C5.9105 6.58175 5.91341 6.58023 5.91526 6.57959L5.91746 6.57909C5.91746 6.57909 5.91968 6.57889 5.92257 6.57922C6.98447 6.70195 8.70452 6.875 9.99999 6.875C11.2954 6.875 13.0155 6.70195 14.0774 6.57922Z" fill="#98A2B3" />
              </svg>

            </button>
          </div>
        </div>
      </div>
      <DPCount name={name} onIncrementReady={setIncrementDpCount} />
      <div className=' p-5 ml-3 mt-[64px] border shadow-md w-[350px] h-[93px] lg:h-[120px] lg:w-[1000px]'>
        <button
          onClick={handleDownload}
          className=" p-3 w-[320px] lg:w-[950px] rounded-[12px] bg-gradient-to-b from-[#198A4D] to-[#00C1FE] text-white"
        >
          Download Image
        </button>
      </div>
    </>
  );
};

export default DPGenerator;
