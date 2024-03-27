import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faGlobe, faTags, faUser,faLocationDot,faChartLine, faPersonShelter } from "@fortawesome/free-solid-svg-icons";

const Modal = ({ onClose, data }) => {
  const modalRef = useRef(null);

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const hasData = data && Object.keys(data).length > 0;

  const excludedKeys = [
    "updatedAt",
    "createdAt",
    "_id",
    "ImgSrc",
    "Title",
    "AboutUs",
    "__v",
  ];

  // Mapping keys to FontAwesome icons
  const iconMap = {
    "Specialties": faTags,
    "Website": faGlobe,
    "Company size":faUser,
    "Headquarters":faLocationDot,
    "Founded":faChartLine,
    "Type":faPersonShelter
  };

  return (
    <div className="modal-container" onClick={handleOutsideClick}>
      <div className="modal-content" ref={modalRef}>
        {hasData && (
          <div className="company-details">
            <div className="company-info">
              <img
                src={data.ImgSrc}
                alt="Company Logo"
                className="company-logo"
              />
            </div>
            <div className="company-info">
              <h1 className="company-title">{data.Title}</h1>
              <p className="company-about">{data.AboutUs}</p>
              <div className="company-metadata">
                {Object.entries(data)
                  .filter(([key]) => !excludedKeys.includes(key))
                  .map(([key, value]) => (
                    <div key={key} className={`metadata-item ${key === "Specialties" ? "customAlignCenter" : ""}`}>
                      <div className="metadata-conatiner">
                        <span className="metadata-label">
                          <FontAwesomeIcon icon={iconMap[key] || faBuilding} /> {/* Default icon for unknown keys */}
                          &nbsp; {key}
                        </span>
                      </div>
                      {key === "Specialties" ? (
                        <div className="specialities-container">
                          {value &&
                            value.split(",").slice(0,3).map((speciality, index) => (
                              <span key={index} className="metadata-value">
                                {speciality}
                              </span>
                            ))}
                        </div>
                      ) : key === "Website" ? (
                        <a href={value} target="_blank">
                          <span className="metadata-value">{value}</span>
                        </a>
                      ) : value ? (
                        <span className="metadata-value">{value}</span>
                      ) : null}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
