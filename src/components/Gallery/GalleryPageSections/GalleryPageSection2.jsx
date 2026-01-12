import React, { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { db } from "../../../firebase/firebase";
import {
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

const GalleryPageSection2 = () => {
  const [gallery, setGallery] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH IMAGES ---------------- */
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const q = query(
          collection(db, "gallery"),
          orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(q);
        const images = snapshot.docs.map(doc => doc.data().imageUrl);
        setGallery(images);
      } catch (error) {
        console.error("Error fetching gallery images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  /* ---------------- HANDLERS ---------------- */
  const handleImageClick = (index) => setCurrentIndex(index);
  const handleCloseModal = () => setCurrentIndex(null);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) =>
      prev > 0 ? prev - 1 : gallery.length - 1
    );
  }, [gallery.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) =>
      prev < gallery.length - 1 ? prev + 1 : 0
    );
  }, [gallery.length]);

  /* ---------------- TOUCH EVENTS ---------------- */
  const handleTouchStart = (e) =>
    setTouchStart(e.targetTouches[0].clientX);

  const handleTouchMove = (e) =>
    setTouchEnd(e.targetTouches[0].clientX);

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 150) handleNext();
    if (touchStart - touchEnd < -150) handlePrev();
  };

  /* ---------------- KEYBOARD EVENTS ---------------- */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (currentIndex === null) return;
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") handleCloseModal();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, handleNext, handlePrev]);

  /* ---------------- UI ---------------- */
  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading gallery...
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {gallery.map((image, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-lg cursor-pointer aspect-square"
            onClick={() => handleImageClick(index)}
          >
            <img
              src={image}
              alt={`Gallery image ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* ---------------- MODAL ---------------- */}
      {currentIndex !== null && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-5xl w-full h-full flex items-center justify-center">
            <img
              src={gallery[currentIndex]}
              alt="Selected"
              className="max-w-full max-h-full object-contain"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            />

            {/* Close */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black"
            >
              <X size={24} />
            </button>

            {/* Prev */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Next */}
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default GalleryPageSection2;
