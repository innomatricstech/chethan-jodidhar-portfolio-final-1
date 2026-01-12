import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase/firebase";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home_Banner_Section = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH BANNERS ================= */
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        // 🔥 NO orderBy → NO index error
        const q = query(
          collection(db, "banners"),
          where("isActive", "==", true)
        );

        const snapshot = await getDocs(q);
        let data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Sort safely on client
        data.sort((a, b) => {
          if (!a.createdAt || !b.createdAt) return 0;
          return b.createdAt.seconds - a.createdAt.seconds;
        });

        setSlides(data);
      } catch (err) {
        console.error("Firestore Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  /* ================= ARROWS ================= */
  const PrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute top-1/2 left-4 z-30 -translate-y-1/2 bg-black/40 hover:bg-purple-600 text-white p-3 rounded-full"
    >
      <FaChevronLeft size={20} />
    </button>
  );

  const NextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute top-1/2 right-4 z-30 -translate-y-1/2 bg-black/40 hover:bg-purple-600 text-white p-3 rounded-full"
    >
      <FaChevronRight size={20} />
    </button>
  );

  /* ================= SLIDER SETTINGS ================= */
  const settings = {
    dots: true,
    infinite: slides.length > 1,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: { arrows: false },
      },
    ],
  };

  if (loading) {
    return (
      <div className="h-[70vh] flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-purple-500" />
      </div>
    );
  }

  if (slides.length === 0) {
    return (
      <section className="h-[70vh] bg-gray-900 flex items-center justify-center text-center">
        <div className="text-white">
          <h1 className="text-4xl font-bold">Chethan Jodidhar</h1>
          <p className="text-gray-400 mt-2">Director • Cinematographer</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full overflow-hidden bg-black">
      <Slider {...settings}>
        {slides.map(item => (
          <div key={item.id}>
            <div className="relative h-[60vh] md:h-[85vh]">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${item.imageUrl})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
              </div>

              <div className="relative z-10 h-full flex items-center container mx-auto px-6 md:px-12">
                <div className="max-w-2xl text-white">
                  <h2 className="text-4xl md:text-7xl font-bold mb-4">
                    {item.title || "Chethan Jodidhar"}
                  </h2>
                  <p className="text-lg md:text-2xl text-gray-200 mb-8">
                    {item.subtitle || "Director • Cinematographer"}
                  </p>
                  <div className="flex gap-4">
                    <button className="bg-purple-600 px-8 py-3 rounded-md">
                      View Projects
                    </button>
                    <button className="border border-white px-8 py-3 rounded-md">
                      Contact
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Home_Banner_Section;
