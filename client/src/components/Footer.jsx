import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer id="register" className="set id just for remove warning error">
      <p>Copyright ⓒ {year} Hank Tsou</p>
    </footer>
  );
}

export default Footer;
