import { Link } from "react-router";
import FinoRiseLogo from "@/components/FinoRiseLogo";
import styles from "./public-navbar.module.css";

export default function PublicNavbar() {
  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.brand}>
        <FinoRiseLogo size={32} />
        <span className={styles.brandName}>FinoRise</span>
      </Link>
      <div className={styles.actions}>
        <Link to="/auth/login" className={styles.login}>Login</Link>
        <Link to="/auth/register" className={styles.signup}>Sign Up</Link>
      </div>
    </nav>
  );
}
