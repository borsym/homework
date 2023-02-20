import React from 'react';
import logo from './logo.png';

function Navbar() {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-red-500 p-6">
      <div className="flex items-center flex-shrink-0 text-white">
        {/* <img src={logo} alt="Logo" className="h-8 w-8 mr-2" /> */}
        Pokemon
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <a
            href="#pokeapi"
            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-200 mr-4"
          >
            Documentation
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
