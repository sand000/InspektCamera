/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import "../App.css";

const CaptureComponent = () => {
  const webcamRef = useRef(null);
  const [facingMode, setFacingMode] = useState("user");
  const [zoom, setZoom] = useState(1);
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [capturedImages, setCapturedImages] = useState([]);

  console.log("adasd", capturedImages);

  useEffect(() => {
    const savedImages =
      JSON.parse(localStorage.getItem("capturedImages")) || [];
    setCapturedImages(savedImages);
  }, []);

  useEffect(() => {
    if (capturedImages.length > 0) {
      localStorage.setItem("capturedImages", JSON.stringify(capturedImages));
    }
  }, [capturedImages]);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      setCapturedImages((prev) => [...prev, imageSrc]);
    }
  };

  const deleteImage = (index) => {
    const updatedImage = capturedImages.filter((_, i) => i !== index);
    setCapturedImages(updatedImage);
    localStorage.setItem("capturedImages", JSON.stringify(updatedImage));
  }
  const getAspectRatio = () => {
    if (aspectRatio === "16: 9") return { aspectRatio: "16/9" };
    if (aspectRatio === "4:3") return { aspectRatio: "4/3" };
    if (aspectRatio === "1: 1") return { aspectRatio: "1/1" };
    return {};
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          position: "relative",
          ...getAspectRatio(),
        }}
      >
        <div
          style={{
            transform: `scale(${zoom})`,
            overflow: "hidden",
            width: "100%",
            justifyContent: "center",
            ...getAspectRatio(),
          }}
        >
          <Webcam
            imageSmoothing={true}
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              facingMode: facingMode,
            }}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              ...getAspectRatio(),
            }}
          />
        </div>
      </div>
      <br />
      <div
        className="col-12 col-md-6 d-flex justify-content-center align-items-center"
        style={{ gap: "10px" }}
      >
        <div className="text-center mb-3">
          <button className="btn btn-primary" onClick={capture}>
            Capture Photo
          </button>
        </div>

        <div className="text-center mb-3">
          <button
            className="btn btn-secondary"
            onClick={() =>
              setFacingMode(facingMode === "user" ? "environment" : "user")
            }
          >
            Switch Camera
          </button>
        </div>

        <div className="w-100 d-flex justify-content-center align-items-center mb-3">
          <label className="me-2" style={{ fontWeight: "bold" }}>
            Zoom
          </label>
          <input
            className="form-range flex-grow-1"
            type="range"
            min="1"
            max="3"
            step="0.1"
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
          />
        </div>

        <div className="w-100 d-flex justify-content-center align-items-center mb-3">
          <label className="me-2" style={{ fontWeight: "bold" }}>
            Aspect Ratio
          </label>
          <select
            className="form-select w-auto"
            value={aspectRatio}
            onChange={(e) => setAspectRatio(e.target.value)}
          >
            <option value="16:9">16:9</option>
            <option value="4:3">4:3</option>
            <option value="1:1">1:1</option>
          </select>
        </div>
      </div>
      <br />
      <br />
      <label
        className="me-2"
        style={{ fontWeight: "bolder", fontSize: "30px", color: "Grey" }}
      >
        Gallery
      </label>
      <div className="row pb-5 ps-5 pe-5 pt-5" id="gallery">
        {capturedImages.length > 0 ? (
          capturedImages.map((src, index) => (
            <div
              className="col-12 col-md-6 col-lg-4 mb-4 gallery-item"
              key={index}
            >
              <img src={src} alt={"Captured Image"} />
              <button
                className="btn btn-danger position-relative top-0 end-0 m-2"
                onClick={() => deleteImage(index)}
                style={{ zIndex: 10 }}
              >
                <i className="fas fa-times"></i> {/* Cross Icon */}
              </button>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">No images captured yet.</div>
        )}
      </div>
    </div>
  );
};

export default CaptureComponent;
