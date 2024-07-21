import styles from "../css/banner.module.css";
export default function BannerText() {
  return (
    <div className={styles.bannerText}>
      <h1 className={styles.title}>
        AgriCamer, <br />
        <span>savourez le continent</span>
      </h1>
      <p>
        Découvrez la richesse de nos terres. Des produits agricoles frais et
        authentiques cultivés avec passion pour votre bien-être et respect de la
        nature. Savourez des produits directement du champ à votre table
      </p>
      <div className={styles.bannerLinks}>
        <a href="#produits">nos produits</a>
        <a href="#inscription">
          inscription
          <i className="bi-box-arrow-in-right ml-2"></i>
        </a>
      </div>
    </div>
  );
}
