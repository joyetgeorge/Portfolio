import styles from "../styles/navbar.module.css";

export default function NavBar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>joyetgeorge<span style={{color: "#EA0F1E"}}>.</span></div>
      <div className={styles.nav_items}>
        <a href="#Home">Home</a>
        <a href="#About">About</a>
        <a href="#Works">Works</a>
        <a href="#Blog">Blogs</a>
        <a href="#Contact">Contact</a>
      </div>
    </div>
  );
}
