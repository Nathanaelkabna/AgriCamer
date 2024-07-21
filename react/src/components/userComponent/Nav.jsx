/* eslint-disable no-unused-vars */
import { Link, NavLink, Navigate } from "react-router-dom";
import styles from "../css/nav.module.css";
import { useStateContext } from "../../contexts/ContextProvider";
import { useEffect } from "react";

export default function Nav() {
  const { theme, setTheme, token, user, setUser, path } = useStateContext();

  useEffect(()=>{
    const storedString = localStorage.getItem('USER');
    if(storedString) {
      const retrievedUser = JSON.parse(storedString);
      setUser(retrievedUser)
    }
  }, []);

  const onThemeIconChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
    console.log(localStorage);
  };

  const isActive = () => {};

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
          {token ? (
            <div className={styles.profile}>
              <a
                className="nav-link nav-profile d-flex align-items-center h-50"
                href="#"
                data-bs-toggle="dropdown"
              >
                <img
                  src={path}
                  alt=""
                  width="50"
                  className="rounded-pill"
                  
                />
                <span className="d-none d-md-block dropdown-toggle ps-2">
                  {user.name}
                </span>
              </a>

              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li className="dropdown-header">
                  <h6>{user.address}</h6>
                  <span>{user.role}</span>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <Link
                    className="dropdown-item d-flex align-items-center text-dark"
                    to="/admin"
                  >
                    <i className="bi-box-arrow-in-up-right"></i>
                    <span className="text-dark">administration</span>
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            ""
          )}

          <span onClick={() => onThemeIconChange()}>
            {theme === "light" ? (
              <img src="images/icons/43.svg" alt="" />
            ) : (
              <img src="images/icons/42.svg" alt="" />
            )}
          </span>
          <Link to="/">
            <img src="images/icons/35.svg" alt="ajouter au panier" />
            <span>Ajouter au panier</span>
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
              <span>Ajouter au panier</span>
            </Link>
          </div>
          <div>
            <Link to="/accueil">accueil</Link>
            <Link to="/produits">produits</Link>
            <Link to="/a-propos">services</Link>
            <Link to="/contact">contact</Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
