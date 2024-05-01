import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";
import "./Home.css"; // Import custom CSS for styling

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch(
          "https://evans-mern-real-estate.onrender.com/api/listing/get?offer=true&limit=4"
        );
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);

  return (
    <div className="home-container">
      <div className="top-side">
        <h1 className="title">
          Find your next <span className="highlight">perfect</span>
          <br />
          place with ease
        </h1>
        <div className="description">
          Property Lord is the coolest and perfect place you can think of.
          <br />
          We have a wide and diverse range of properties for you to choose from.
        </div>
        <Link to={"/search"} className="cta-link">
          Let's get started now
        </Link>
      </div>

      <Swiper navigation className="swiper-container">
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing, index) => (
            <SwiperSlide key={listing._id || index}>
              <div
                className="swiper-slide"
                style={{
                  backgroundImage: `url(${listing.imageUrls[0]})`,
                }}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      <div className="listings-container">
        {offerListings && offerListings.length > 0 && (
          <div className="listing-section">
            <h2 className="section-title">Recent offers</h2>
            <Link to={"/search?offer=true"} className="view-more-link">
              Show more offers
            </Link>
            <div className="listing-items">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className="listing-section">
            <h2 className="section-title">Recent places for rent</h2>
            <Link to={"/search?type=rent"} className="view-more-link">
              Show more places for rent
            </Link>
            <div className="listing-items">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className="listing-section">
            <h2 className="section-title">Recent places for sale</h2>
            <Link to={"/search?type=sale"} className="view-more-link">
              Show more places for sale
            </Link>
            <div className="listing-items">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
