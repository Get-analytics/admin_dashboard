import React from "react";
import { motion } from "framer-motion";
import { Upload, Link, Filter, Settings, User } from "lucide-react"; // Import User Icon
import "./notch.css"; // Importing styles

export default function Notch() {
  return (
    <motion.div
      initial={{ scaleX: 0.6, scaleY: 0.6, opacity: 0, borderRadius: "50px" }}
      animate={{ scaleX: 1, scaleY: 1, opacity: 1, borderRadius: "164px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="notch-container"
    >
      {/* Replace image with User Icon */}
      <motion.div
        className="avatar-wrapper"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
      >
        <User size={10} strokeWidth={2} className="avatar"  style={ { color: '#6C4E2A'}}/>
      </motion.div>
      
      <div className="divider-notch"></div>
      <div className="icons">
        {[Upload, Link, Filter, Settings].map((Icon, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 + index * 0.1 }}
            whileHover={{ scale: 1.1 }}
            className="icon-wrapper"
          >
            <Icon size={22} strokeWidth={2} className="notch-icon" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
