/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

export default function Navbar() {
  function scrollToGallery() {
    const gallerySection = document.getElementById("gallery");
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-light custom-navbar">
        <div className="container">
          <a className="navbar-brand custom-navbar-brand" href="/">
            Seu's Camera
          </a>
          <button
            className="btn btn-primary custom-button"
            onClick={scrollToGallery}
          >
            Gallery
          </button>
        </div>
      </nav>
    </>
  );
}
