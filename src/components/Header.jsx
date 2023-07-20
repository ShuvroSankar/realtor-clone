import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
export default function Header() {
  const [pageState, setPageState] = useState("Sign in");
  const location = useLocation();
  const navigation = useNavigate();
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setPageState("Profile");
      } else {
        setPageState("Sign in");
      }
    });
  }, [auth]);
  function pathMatchRoute(route) {
    if (route === location.pathname) {
      return true;
    }
  }
  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-40 ">
      <header className="flex justify-between items-center px-3 max-w-6xl mx-auto ">
        <div className="">
          <img
            src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
            alt="logo"
            className="h-5 cursor-pointer"
            onClick={() => navigation("/")}
          />
        </div>
        <div className="">
          <ul className="flex space-x-10">
            <li
              className={`cursor-pointer py-2 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                pathMatchRoute("/") ? "text-red-300 border-b-red-500" : ""
              }`}
              onClick={() => navigation("/")}
            >
              Home
            </li>
            <li
              className={`cursor-pointer py-2 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                pathMatchRoute("/offers") ? "text-red-300 border-b-red-500" : ""
              }`}
              onClick={() => navigation("/offers")}
            >
              Offers
            </li>
            <li
              className={`cursor-pointer py-2 text-sm font-semibold text-gray-400 border-b-[3px]border-b-transparent   ${
                pathMatchRoute("/sign-in") || pathMatchRoute("/profile")
                  ? "text-red-300 border-b-red-500 "
                  : ""
              } `}
              onClick={() => navigation("/profile")}
            >
              {pageState}
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}
