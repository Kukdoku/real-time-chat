import React from "react";
import "./Navbar.css";

function Navbar({ username }) {
  return (
    <div className="navbar">
      <div className="navbar__title">
        <img
          className="navbar__logo"
          src="https://images.vexels.com/media/users/3/189873/isolated/lists/7d1de56c1fc5a56f72f541190e837d4f-sexy-angel-silhouette.png"
          alt="https://www.pngitem.com/pimgs/m/464-4649712_sexy-woman-silhouette-logo-hd-png-download.png"
        />
        <h2> Hot Room💗</h2>
      </div>
      <h2>
        Hello!! <small style={{ color: "orange" }}> {username} ❣️</small>
      </h2>
    </div>
  );
}

export default Navbar;
