/* eslint-disable no-unused-vars */
import { Link, Navigate } from "react-router-dom";
import styles from "../css/nav.module.css";
import { useStateContext } from "../../contexts/ContextProvider";
import { useEffect } from "react";

export default function Nav() {
  const { theme, setTheme, token, user, setUser } = useStateContext();

  useEffect(()=>{
    const storedString = localStorage.getItem('USER');
    if(storedString) {
      const retrievedUser = JSON.parse(storedString);
      setUser(retrievedUser)
    }
  }, []);

  const onThemeIconChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };


  return (
    <div className={styles.colorNav}>
      <div className={styles.header}>
        <Link to="/" className={styles.logo}>
          <img src="images/17.png" alt="" />
        </Link>
        <nav className={styles.navItems}>
          <ol>
            <li>
              <Link to="/accueil">accueil</Link>
            </li>
            <li>
              <a href="#produits"> nos produits</a>
            </li>
            <li>
              <a href="#about">services</a>
            </li>
            <li>
              <a href="#contact">nous contacter</a>
            </li>
          </ol>
        </nav>

        <div className={styles.rightSideBar}>

          <span onClick={() => onThemeIconChange()}>
            {theme === "light" ? (
              <img src="images/icons/43.svg" alt="" />
            ) : (
              <img src="images/icons/42.svg" alt="" />
            )}
          </span>
          <Link to="/">
            <img src="images/icons/35.svg" alt="ajouter au panier" />
          </Link>

        </div>
      </div>

      <div className={styles.sideBarMenu}>
        <div>
          <Link to="/accueil">
            <img src="images/17.png" alt="" width="70" className="m-2" />
          </Link>
        </div>
        <div className="main-header navbar-expand p-0">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <span
                className="nav-link"
                data-widget="control-sidebar"
                data-controlsidebar-slide="true"
                href="#"
                role="button"
              >
                <img src="images/icons/31.svg" alt="" />
              </span>
            </li>
          </ul>
        </div>
        <aside
          className={
            theme === "light"
              ? "control-sidebar  monAsideDark"
              : "control-sidebar monAsideLight"
          }
        >
          <div>
            <span onClick={() => onThemeIconChange()}>
              {theme === "light" ? (
                <img src="images/icons/43.svg" alt="" />
              ) : (
                <img src="images/icons/42.svg" alt="" />
              )}
            </span>
            <Link to="/basket" className="aside-btn">
              <img src="images/icons/35.svg" alt="ajouter au panier" />
            </Link>
          </div>
          <div>
            <Link to="/accueil">accueil</Link>
            <a href="#produits">produits</a>
            <a href="#about">services</a>
            <a href="#contact">contact</a>
          </div>
        </aside>
      </div>
    </div>
  );
}
