import React from "react";

const VisitCompanyPageMessage = (props) => {

  const {isLoading} = props;
  return (
    <div className="visit-company-page-message">
      {isLoading ? (
        <div className="spinner">
        </div>
      ) : (
        <p>Please visit a company page to view details.</p>
      )}
    </div>
  );
};

export default VisitCompanyPageMessage;