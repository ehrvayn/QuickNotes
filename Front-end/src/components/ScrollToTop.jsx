import { useState, useEffect } from "react";

function ScrollToTop() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const mainContent = document.querySelector(".main-content");
      const modalBody = document.querySelector(".view-body");
      
      const mainScroll = mainContent?.scrollTop || 0;
      const modalScroll = modalBody?.scrollTop || 0;
      
      if (mainScroll > 70 || modalScroll > 70) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    const interval = setInterval(() => {
      const mainContent = document.querySelector(".main-content");
      const modalBody = document.querySelector(".view-body");

      if (mainContent) {
        mainContent.removeEventListener("scroll", handleScroll);
        mainContent.addEventListener("scroll", handleScroll);
      }
      if (modalBody) {
        modalBody.removeEventListener("scroll", handleScroll);
        modalBody.addEventListener("scroll", handleScroll);
      }
    }, 500);

    return () => {
      clearInterval(interval);
      const mainContent = document.querySelector(".main-content");
      const modalBody = document.querySelector(".view-body");
      
      if (mainContent) {
        mainContent.removeEventListener("scroll", handleScroll);
      }
      if (modalBody) {
        modalBody.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const scrollToTop = () => {
    const mainContent = document.querySelector(".main-content");
    const modalBody = document.querySelector(".view-body");
    
    if (mainContent) {
      mainContent.scrollTo({ top: 0, behavior: "smooth" });
    }
    if (modalBody) {
      modalBody.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <button
      className={`scroll-to-top ${showButton ? "show" : ""}`}
      onClick={scrollToTop}
    >
      <i className="bi bi-arrow-up"></i>
    </button>
  );
}

export default ScrollToTop;