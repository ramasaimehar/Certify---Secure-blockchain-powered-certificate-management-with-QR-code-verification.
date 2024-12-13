import React, { useState, useEffect, useContext } from 'react';
import { IoMenu, IoClose } from 'react-icons/io5';
import './Header.css';
import { MdAccountCircle } from "react-icons/md";
import logo from "../assets/logo.jpeg";

import { UserContext } from '../App';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollActive, setScrollActive] = useState(false);
  const [activeLink, setActiveLink] = useState('/'); 

  const { user, setUser } = useContext(UserContext);
  const { loginType } = useContext(UserContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    window.location.href = "/";
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setMenuOpen(false); 
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setScrollActive(true);
      } else {
        setScrollActive(false);
      }
      setMenuOpen(false);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = () => {
    window.location.href = `/profile/${user.email}`;
  };

  return (
    <main>
      <header className={scrollActive ? 'scrolled' : ''}>
        <a href="/" className="logo">
          <img className="logoimg"
            src={logo}
            alt="Logo"
          />
        </a>
        <div id="menu" onClick={toggleMenu}>
          {menuOpen ? <IoClose className="menu-icon" /> : <IoMenu className="menu-icon" />}
        </div>
        <nav className={`navbar ${menuOpen ? 'nav-toggle' : ''}`}>
          <ul>
            <li>
              <a
                href="/"
                className={activeLink === '/' ? 'active' : ''}
                onClick={() => handleLinkClick('/')}
              >
                Home
              </a>
            </li>

            {loginType === 'admin' && (
              <li>
                <a
                  href="/admin"
                  className={activeLink === '/admin' ? 'active' : ''}
                  onClick={() => handleLinkClick('/admin')}
                >
                  Admin
                </a>
              </li>
            )}

            <li>
              <a
                href="/Contactus"
                className={activeLink === '/Contactus' ? 'active' : ''}
                onClick={() => handleLinkClick('/Contactus')}
              >
                Contact us
              </a>
            </li>

            {user.email ? (
              <li className="user-menu">
                <a
                  style={{ fontSize: '25px', cursor: 'pointer' }}
                  onClick={toggleDropdown}
                >
                  <MdAccountCircle />
                  {user.username}
                </a>
                {dropdownOpen && (
                  <ul className="dropdown">
                    <li>
                      <a onClick={handleClick}>Profile</a>
                    </li>
                    <li>
                      <a onClick={handleLogout} style={{ cursor: 'pointer' }}>
                        Logout
                      </a>
                    </li>
                  </ul>
                )}
              </li>
            ) : (
              <li>
                <a
                  href="/Register"
                  className={activeLink === '/Register' ? 'active' : ''}
                  onClick={() => handleLinkClick('/Register')}
                >
                  Signup/Login
                </a>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </main>
  );
};

export default Header;
