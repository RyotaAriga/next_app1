import Link from 'next/link';
import { useEffect, useState } from "react"
import styles from '@/styles/Header.module.css'; // 必要に応じてスタイリングを調整してください
const Header = () => {
  const [darkTheme, setDarkTheme] = useState(undefined)

  const handleToggle = (e) =>{
    setDarkTheme(e.target.checked)
  }

  useEffect(() => {
    if(darkTheme !== undefined){
      if(darkTheme) {
        document.documentElement.setAttribute("data-theme", "dark")
        window.localStorage.setItem("theme", "dark")
      }else{
        document.documentElement.removeAttribute("data-theme")
        window.localStorage.setItem("theme", "light")
      }
    }
  }, [darkTheme])
  
  return (
    <header className={styles.headerContainer}>
     <Link href="/">
        <div className={styles.logo}>Next&Rails_App</div> {/* ロゴのテキストやスタイリングはお好みで */}
      </Link>
      <nav className={styles.navContainer}>
      <form action="#">
        <label className="switch">
          <input
            type="checkbox" 
            checked={darkTheme}
            onChange={handleToggle}
          />
          <span className="slider"></span>
        </label>
      </form>

        <Link href="/about">
        <div className={styles.navLink}>About</div>
        </Link>
        <Link href="/contact">
          <div className={styles.navLink}>Contact</div>
        </Link>
        <Link href="/login">
          <div className={styles.navLink}>Login</div>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
