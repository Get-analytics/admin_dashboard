import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // To extract path parameters
import "./dashboard.css";
import Notch from "./components/notch";
import Metrics from "./components/Metrics";
import HeatmapCard from "./components/HeatmapCard";
import Mostviewedpage from "./components/InnerComponents/Mostviewedpage";
import TrafficSource from "./components/map";
import Timespend from "./components/InnerComponents/Timespend";
import Session from "./components/InnerComponents/session";
import Device from "./components/InnerComponents/device";
import { useRecordContext } from "../context/RecordContext"; // For context
import VideoWithAdvancedFeatures from "./components/Videoview";

const Dashboard = () => {
  const { category, analyticsId } = useParams(); // Extract category and analyticsId from the URL path
  const { record, saveRecord } = useRecordContext(); // Get current record and saveRecord from context
  const [activeMatrix, setActiveMatrix] = useState("default"); //active matrix

  // Effect to save the record if it hasn't been set yet
  useEffect(() => {
    console.log(record, "record");

    // Only save if record is not already set in the context
    if (record == null && category && analyticsId) {
      const newRecord = {
        category: category, // Use the category from the URL
        uuid: analyticsId, // Use analyticsId as uuid
        url: window.location.pathname, // Save the current URL
        token: "someTokenStringHere", // Set your token here, or get it dynamically
      };

      // Save the extracted record in context
      saveRecord(newRecord);
    }
  }, [category, analyticsId, record, saveRecord]); // Trigger when category or analyticsId changes

  // Dynamically render content based on category
  const renderMainContent = () => {
    const { category } = record || {};

    if (activeMatrix === "Total Sessions") {
      return (
        <div className="main-content">
          <div className="heatmap-section">
            <Session />
          </div>
          <div className="right-section">
            <TrafficSource />
          </div>
        </div>
      );
    } else if (activeMatrix === "Time Spent") {
      return (
        <div className="main-content">
          <div className="heatmap-section">
            <Timespend />
          </div>
          <div className="right-section">
            <Device />
          </div>
        </div>
      );
    } else {
      return (
        <div className="main-content">
          <div className="heatmap-section">
            {/* Render components dynamically based on category */}
            {category?.toLowerCase() === "web" ? (
              <HeatmapCard />
            ) : category?.toLowerCase() === "pdf" || category?.toLowerCase() === "docx" ? (
              <Mostviewedpage />
            ) : category?.toLowerCase() === "video" ? (
              <VideoWithAdvancedFeatures />
            ) : (
              <div>No valid category found</div>
            )}
          </div>
          <div className="right-section">
            <TrafficSource />
          </div>
        </div>
      );
    }
  };

  return (
    <div className="dashboard-container">
      <Notch />
      <div className="top-metrics">
        <Metrics setActiveMatrix={setActiveMatrix} activeMatrix={activeMatrix} />
      </div>
      {renderMainContent()}
    </div>
  );
};

export default Dashboard;
