import styles from "../css/accueil.module.css";
import AboutUs from "./AboutUs";
import Banner from "./Banner";
import BannerImage from "./BannerImage";
import BannerText from "./BannerText";
import Contact from "./Contact";
import Mobile from "./Mobile";
import Produits from "./NosProduits";
// import ProduitItem from "./ProduitItem.jsx";
export default function Acceuil() {
  return (
    <>
      <div className={styles.welcomePage}>
        <Banner image={<BannerImage />} text={<BannerText />} />
      </div>

      <Produits />

      <Mobile />

      <AboutUs />

      <Contact />

      {/* 
      
      



      <section className={styles.farmers}>
        <div>
          <h1>S&apos;inscrire en tant que agriculteur ?</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus
            possimus obcaecati eum iure id hic odit earum. Explicabo earum ea
            praesentium quibusdam dignissimos aspernatur nihil, error quidem
            repudiandae! Pariatur, cumque! Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, sapiente. Itaque explicabo sint quas non ullam dolorem placeat eveniet dolore veritatis provident tempora dignissimos amet ab, facilis earum eaque modi?
          </p>
          <Link to='/agriculteurs' className={styles.plus}>comment ca marche ?</Link>
        </div>
        <img src="AgriCamerImg/24.jpg" alt="" />
      </section> */}

      {/* <section className={styles.deliveryMens}>
        <div>
          <h1>Gerer votre ferme ?</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus
            possimus obcaecati eum iure id hic odit earum. Explicabo earum ea
            praesentium quibusdam dignissimos aspernatur nihil, error quidem
            repudiandae! Pariatur, cumque!
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur in quasi distinctio magni dicta. Dicta dolorum animi odit consequuntur, aperiam ad repellendus nulla, enim necessitatibus tempora, provident nobis quas ipsum.
          </p>
          <Link>comment ca marche ?</Link>
        </div>
        <img src="AgriCamerImg/24.jpg" alt="" />
      </section> */}
    </>
  );
}
