/* global chrome */
import { useEffect, useState } from "react";
import Modal from "../src/components/Modal";
import VisitCompanyPageMessage from "./components/VisitCompanyPageMessage";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import VisitedPagesTable from "./components/VisitedPagesTable";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/records",
        element: <VisitedPagesTable />,
      },
      { path: "*", element: <Navigate to="/records" replace /> },
    ],
  },
]);
function App() {
  const [modalOpen, setModalOpen] = useState(true);
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");

  useEffect(() => {
    chrome.runtime?.onMessage.addListener((message, sender, sendResponse) => {
      if (message.type === "urlChange") {
        console.log("URL changed:", message.href);
      }
      if (message.type === "clean the storage") {
        chrome.storage?.local.clear(function () {
          console.log("Local storage cleared");
        });
      }
    });
    chrome.storage?.local.get("myKey", function (result) {
      let myValue = result.myKey;
      console.log("Retrieved value from Chrome storage:", myValue);
      if (myValue) {
        setTitle(myValue.textContent); 
        getDetails(myValue);
      }else{
        setIsLoading(false);
      }
      
    });
  }, []);

  const getDetails = async (heading) => {
    try {
      console.log("============>>>>", typeof heading, JSON.stringify(heading));

      const companyNameParts = heading.href.split(/\/company\//);

     const companyName = companyNameParts.length === 2 ? companyNameParts[1].split('/')[0] : null;

console.log(companyName); 
      const res = await fetch(
        `http://localhost:3008/getScrapedData?title=${encodeURIComponent(
          heading.textContent
        )}&companyName=${encodeURIComponent(companyName)}`
      );
      const result = await res.json();
      console.log("Fetched data:", result);
      setData(result);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="app">
      {data !== undefined ? (
        <>
          {modalOpen && (
            <Modal data={data} onClose={() => setModalOpen(false)} />
          )}
        </>
      ) : (
        <VisitCompanyPageMessage isLoading={isLoading}/>
      )}
    </div>
  );
}

export default App;
