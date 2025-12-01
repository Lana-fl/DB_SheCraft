import React from "react";
import '../styles/footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-about">
        <h3>About SheCraft</h3>
        <p>
          SheCraft specializes in bespoke necklaces, rings, bracelets, and
          earrings, crafted to reflect your story, style, and legacy.
        </p>
      </div>

      <div className="footer-contact">
        <h3>Contact</h3>
        <p>
          Phone: <a href="tel:+96171234567">+961 71 234 567</a>
        </p>
        <p>
          Email: <a href="mailto:info@shecraft.com">info@shecraft.com</a>
        </p>
      </div>
    </footer>
  );
}
