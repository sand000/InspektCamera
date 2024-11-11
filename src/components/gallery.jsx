import React from "react";

function Gallery({ capturedImage }) {
  return (
    <div className="row pb-5" id="gallery">
      {capturedImage.map((src, index) => (
        <div className="col-12 col-md-6 col-lg-4 mb-4 gallery-item" key={index}>
          <img src={src} alt={"No Images"} />
        </div>
      ))}
    </div>
  );
}

export default Gallery;
