import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { db } from "../firebase";
import { FaShare } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { FaParking } from "react-icons/fa";
import { FaChair } from "react-icons/fa";

// import Swiper core and required modules
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectFade,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
export default function Listing() {
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);
  //   SwiperCore.use([Autoplay, Navigation, Pagination]);
  useEffect(() => {
    async function fetchListing() {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
      }
    }
    fetchListing();
  }, [params.listingId]);
  if (loading) {
    return <Spinner />;
  }
  return (
    <main>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y, EffectFade]}
        // spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ type: "progressbar" }}
        // scrollbar={{ draggable: true }}
        effect="fade"
        autoplay={{ delay: 1000 }}
      >
        {listing.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full overflow-hidden h-[300px]"
              style={{
                background: `url(${listing.imgUrls[index]}) center no-repeat`,
                backgroundSize: "cover",
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className="fixed top-[13%] right-[3%] z-10 bg-white cursor-pointer border-2 border-gray-400 rounded-full w-12 h-12 flex justify-center items-center"
        onClick={() => {
          try {
            navigator.clipboard.writeText(window.location.href);
            setShareLinkCopied(true);
            setTimeout(() => {
              setShareLinkCopied(false);
            }, 2000);
          } catch (error) {
            console.error("Failed to copy URL to clipboard:", error);
          }
        }}
      >
        <FaShare className="text-lg text-slate-600" />
      </div>
      {shareLinkCopied && (
        <p className="fixed top-[25%] right-[5%] z-10 bg-white border-2 border-gray-400 rounded-md p-2 font-semibold">
          Link copied
        </p>
      )}
      <div className="m-4 flex flex-col md:flex-row max-w-6xl lg:mx-auto p-4 rounded-lg  shadow-lg bg-white lg:space-x-5">
        <div className=" w-full h-[200px] lg-[400px]">
          <p className="text-2xl font-bold mb-3 text-blue-900">
            {listing.name} - $
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            ${listing.type === "rent" ? "/ month" : ""}
          </p>
          <p className="flex  items-center mt-6 mb-3 font-semibold ">
            <FaMapMarkerAlt className="text-green-700" />
            {listing.address}
          </p>
          <div className="flex justify-start items-center space-x-4 w-[75%">
            <p className="bg-red-700 w-full max-w-[200px] text-center text-white rounded-md shadow-md font-samibold p-1 ">
              {listing.type === "rent" ? "Rent" : "Sale"}
            </p>
            {listing.offer && (
              <p className="bg-green-800 w-full max-w-[200px] text-center text-white rounded-md shadow-md font-samibold p-1 ">
                ${+listing.regularPrice - +listing.discountedPrice} discount
              </p>
            )}
          </div>
          <p className="mt-3 mb-3">
            <span className="font-semibold">Description - </span>
            {listing.description}
          </p>
          <ul className="flex items-center space-x-2 sm:space-x-10 font-semibold text-sm ">
            <li className="flex items-center whitespace-nowrap">
              <FaBed className="text-lg mr-1" />
              {listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bedroom"}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaBath className="text-lg mr-1" />
              {listing.bathrooms > 1
                ? `${listing.bathrooms} Baths`
                : "1 Bedroom"}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaParking className="text-lg mr-1" />
              {listing.parking ? `Parking spot` : "No parking"}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaChair className="text-lg mr-1" />
              {listing.furnished ? `Furnished` : "Not furnished"}
            </li>
          </ul>
        </div>
        <div className="bg-blue-300 w-full h-[200px] lg-[400px] overflow-x-hidden"></div>
      </div>
    </main>
  );
}
