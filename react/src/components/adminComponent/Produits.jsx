import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductDetails from "./ProductDetails";

export default function Products() {
  const { user } = useStateContext();
  // eslint-disable-next-line no-unused-vars
  const [errors, setErrors] = useState({ __html: "" });
  const [itemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate()



  useEffect(() => {
    
    const fetchProducts = (pageNumber) => {
      setErrors({ __html: "" });
      axiosClient
        .get(
          `/userProducts/${user.id}?page=${pageNumber}&itemsPerPage=${itemsPerPage}`
        )
        .then(({ data }) => {
          setProducts(data.product);
        })
        .catch((error) => {
          if (error.response) {
            const finalErrors = Object.values(
              error.response.data.errors
            ).reduce((accum, next) => [...accum, ...next], []);
            console.log(finalErrors);
            setErrors({ __html: finalErrors.join("<br>") });
          }
          console.error(error);
        });
    };
    fetchProducts(currentPage);
  }, [currentPage, user.id]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const isEmpty = (array) => {
    return Array.isArray(array) && array.length === 0;
  };

  const seeProduct = (e, id) => {
    e.preventDefault()
    console.log(id)
    navigate(`/admin/products/${id}`);
    
  }
  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <div className="card recent-sales overflow-auto">
            <div className="filter">
              <a className="icon" href="#" data-bs-toggle="dropdown">
                <i className="bi bi-three-dots"></i>
              </a>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                <li className="dropdown-header text-start">
                  <h6>Filter by</h6>
                </li>

                <li>
                  <a className="dropdown-item" href="#">
                    a-z
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    prices
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    latest product
                  </a>
                </li>
              </ul>
            </div>

            <div className="card-body">
              <Link to="/admin/createProduct" className="btn btn-outline-success" type="button">
                Ajouter un nouveau produit
              </Link>

              {isEmpty(products) ? (
                <div>aucun produit</div>
              ) : (
                <>
                  <table className="table table-borderless datatable text-center align-content-center">
                    <thead>
                      <tr>
                        <th scope="col">id</th>
                        <th scope="col">image</th>
                        <th scope="col">nom</th>
                        <th scope="col">description</th>
                        <th scope="col">prix</th>
                        <th scope="col">Statut</th>
                        <th scope="col">Modifier</th>
                        <th scope="col">Supprimer</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.data.map((prod, index) => (
                        <tr key={prod.id}>
                          <th>
                            <a href="#">{index + 1}</a>
                          </th>
                          <td>
                            <img
                              src={`http://127.0.0.1:8000/storage/${prod.image}`}
                              alt=""
                              height="60"
                            />
                          </td>
                          <td>{prod.product_name}</td>
                          <td>
                            <a href="#" className="text-secondary">
                              {prod.description.slice(0, 70)}...
                            </a>
                          </td>
                          <td>
                            {prod.price_per_unit} {prod.unit}
                          </td>
                          <td>
                            <span className="badge bg-warning text-dark">
                              {prod.stauts ? "sold" : "not sold"}
                            </span>
                          </td>
                          <td>
                            <button  type="submit" className="text-info" onClick={(e) => seeProduct(e, prod.id)}>
                              modifier
                            </button>
                          </td>
                          <td>
                            <a href="#" className="text-danger">
                              supprimer
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="d-flex">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="btn btn-primary mx-2"
                    >
                      previous
                    </button>
                    <button
                      className="btn btn-primary mx-2"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={
                        currentPage === Math.ceil(products.total / itemsPerPage)
                      }
                    >
                      next
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* {errors && <p> error fetching products: {errors.message}</p>} */}
    </>
  );
}
