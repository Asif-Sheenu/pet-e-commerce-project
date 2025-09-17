import { FaFacebookF, FaInstagram, FaGithub, FaYoutube } from 'react-icons/fa';
import { BsTwitterX } from 'react-icons/bs';
import React from 'react';

const Footer = () => {
  const links = ['About', 'Blog', 'Jobs', 'Press', 'Accessibility', 'Partners'];

  return (
    <footer className="bg-black py-20 text-white">
      <div className="w-20xl mx-auto px-4">
        <nav className="flex justify-center space-x-6 mb-4">
          {links.map((link) => (
            <a key={link} href="#" className="hover:text-gray-900">
              {link}
            </a>
          ))}
        </nav>
        <div className="flex justify-center space-x-6 mb-4">
          <a href="#" className="hover:text-gray-900">

          </a>
          <a href="#" className="hover:text-gray-900">

          </a>
          <a href="#" className="hover:text-gray-900">

          </a>
          <a href="#" className="hover:text-gray-900">

          </a>
          <a href="#" className="hover:text-gray-900">

          </a>
        </div>
        <p className="text-center text-sm">
          © 2024 Your Company, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;