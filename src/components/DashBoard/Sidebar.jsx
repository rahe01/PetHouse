import { useState } from "react";
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";

import { AiOutlineBars } from "react-icons/ai";
import { RiApps2AddFill } from "react-icons/ri";
import { RiFolderAddFill } from "react-icons/ri";
import { FaCodePullRequest } from "react-icons/fa6";
import { MdCreateNewFolder } from "react-icons/md";
import { SiAlchemy } from "react-icons/si";
import { FiUserCheck } from "react-icons/fi";

import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import MenuItem from "./MenuItem";

const Sidebar = () => {
  const { logOut } = useAuth();
  const [isActive, setActive] = useState(false);
  //   const [role, isLoading] = useRole();
  //   console.log(role, isLoading);
  //   const [toggle , setToggle] = useState(true);

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };

  //   const toggleHandler = () => {
  //     setToggle(!toggle);
  //   };
  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link to="/">
              <img
                // className='hidden md:block'
                src="https://i.ibb.co/JnV246Z/pet-food.png"
                alt="logo"
                width="100"
              />
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className="w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-rose-100 mx-auto">
              <Link to="/">
                <img
                  // className='hidden md:block'
                  src="https://i.ibb.co/JnV246Z/pet-food.png"
                  alt="logo"
                  width="100"
                  height="50"
                />
              </Link>
            </div>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            {/* Conditional toggle button here.. */}

            <nav>
              <MenuItem
                label="Add a pet"
                address="/dashboard"
                icon={RiApps2AddFill}
              ></MenuItem>
              <MenuItem
                label="My added pets"
                address="my-added-pet"
                icon={RiFolderAddFill}
              ></MenuItem>
              <MenuItem
                label="Adoption Request"
                address="adoption-request"
                icon={FaCodePullRequest}
              ></MenuItem>
              <MenuItem
                label="Create Donation Campaign"
                address="create-donation-campaign"
                icon={MdCreateNewFolder}
              ></MenuItem>

              <MenuItem
                label=" My Donation Campaigns"
                address="my-donation-campaign"
                icon={SiAlchemy}
              ></MenuItem>
              <MenuItem
                label="My Donations"
                address="my-donations"
                icon={FiUserCheck}
              ></MenuItem>
            </nav>
          </div>
        </div>

        <div>
          <hr />

          {/* Profile Menu */}
          <MenuItem
            label="Profile"
            address="/dashboard/profile"
            icon={FcSettings}
          ></MenuItem>

          <button
            onClick={logOut}
            className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform"
          >
            <GrLogout className="w-5 h-5" />

            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
