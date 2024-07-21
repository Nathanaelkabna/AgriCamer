/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";


export default function ProduitItem({ image }) {
  return (
    <div>
      <img src={image} alt="" />{" "}
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic inventore
        minus aperiam voluptatum. Nemo voluptatibus ipsa beatae laboriosam
        culpa? Cumque voluptatibus ab dignissimos veniam laudantium saepe
        obcaecati deleniti illo officia!
      </p>
      <div>
        <Link to="">
          voir plus...
        </Link>
      </div>
    </div>
  );
}
