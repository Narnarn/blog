import React, { useEffect, useState } from "react";
import { BiArrowFromBottom } from "react-icons/bi";

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  function toggleVisibility() {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);
  return (
    <div className="fixed bottom-6 right-2  ">
      <button
        type="button"
        onClick={scrollToTop}
        style={{ opacity: isVisible ? "100%" : 0 }}
        className="inline-flex items-center p-2  shadow-sm text-neutral-800 dark:text-gray-200 bg-green-800/10 transition-opacity hover:bg-slate-800 hover:text-white "
      >
        <BiArrowFromBottom className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
}

export default ScrollToTop;
