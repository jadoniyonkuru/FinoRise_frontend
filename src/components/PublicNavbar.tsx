import { Link } from "react-router-dom";
import styles from "./public-navbar.module.css";

function FinoRiseLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="10" fill="#0ea5e9" />
      <g transform="translate(8,8)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
          fill="white"
        />
      </g>
    </svg>
  );
}

export default function PublicNavbar() {
  return (
    <nav className={styles.navbar}>
      <Link to="/account/login" className={styles.brand}>
        <FinoRiseLogo />
        <span className={styles.brandName}>FinoRise</span>
      </Link>
      <div className={styles.actions}>
        <Link to="/account/login" className={styles.login}>Login</Link>
        <Link to="/account/register" className={styles.signup}>Sign Up</Link>
      </div>
    </nav>
  );
}
