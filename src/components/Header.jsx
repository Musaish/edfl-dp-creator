import React from 'react';
import bitLogo from '../images/bit-logo.png'


const Header = () => (
  <header className=" px-6 pt-6">
    <div className="logo flex justify-start items-start w-[75px] h-[75px] ">
      <img src={bitLogo} alt="BIT-Logo" />
    </div>
  </header>
);

export default Header;
