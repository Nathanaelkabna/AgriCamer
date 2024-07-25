/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../axios";
import { useStateContext } from "../../contexts/ContextProvider";

export default function Admin() {
  const { user } = useStateContext();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({ __html: "" });
  useEffect(() => {
    setTimeout(() => {
      fetchProducts();
    }, 250);
    const fetchProducts = () => {
      setErrors({ __html: "" });
      axiosClient
        .get(`/userProducts/${user.id}`)
        .then(({ data }) => {
          setProducts(data.product.data);
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

        axiosClient
        .get(`/categories`)
        .then(({ data }) => {
          setCategories(data.category.data);
        })
    };
  }, [user.id]);
  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <div className="col-xxl-4 col-xl-12">
            <div className="card info-card customers-card">
              <div className="card-body">
                <h5 className="card-title">Total produits</h5>

                <div className="d-flex align-items-center">
                  <div className="mx-3 card-icon rounded-circle d-flex align-items-center justify-content-center">
                    <i className="bi bi-cart"></i>
                  </div>
                  <div className="">
                    <h6>{products.length}</h6>
                    <Link to="/admin/products" className="small">
                      aller vers vos produits
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xxl-4 col-xl-12">
            <div className="card info-card customers-card">
              <div className="card-body d-flex justify-content-end">
                <h5 className="card-title">category</h5>

                <div className="d-flex align-items-center">
                  <div className="mx-3 card-icon rounded-circle d-flex align-items-center justify-content-center">
                    <i className="bi bi-cart"></i>
                  </div>
                  <div className="">
                    <h6>{categories.length}</h6>
                    <Link to="#" className="small">
                      aller vers nos categories
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xxl-4 col-xl-12">
            <div className="card info-card customers-card">
              <div className="card-body">
                <h5 className="card-title">produits vendus</h5>

                <div className="d-flex align-items-center">
                  <div className="mx-3 card-icon rounded-circle d-flex align-items-center justify-content-center">
                    <i className="bi bi-cart"></i>
                  </div>
                  <div className="">
                    <h6>{products.filter(product => product.status != 0).length}</h6>
                    <a href="#" className="small">
                      historique des ventes
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="card recent-sales overflow-auto">
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
                    <h5 className="card-title">Add a new product</h5>

                    <table className="table table-borderless datatable">
                      <thead>
                        <tr>
                          <th scope="col">id</th>
                          <th scope="col">nom</th>
                          <th scope="col">description</th>
                          <th scope="col">prix</th>
                          <th scope="col">Statut</th>
                          <th scope="col">Modifier</th>
                          <th scope="col">Supprimer</th>
                        </tr>
                      </thead>
                      <tbody>
                        {product.data.map((prod) => (
                          <tr key={prod.id}>
                            <th>
                              <a href="#">{prod.id}</a>
                            </th>
                            <td>{prod.product_name}</td>
                            <td>
                              <a href="#" className="text-secondary">
                                {prod.description.slice(0, 50)}...
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
                              <a href="#" className="text-info">
                                modifier
                              </a>
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

                    <div>
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        previous
                      </button>
                      <button
                        className="nav nav-links"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={
                          currentPage ===
                          Math.ceil(product.total / itemsPerPage)
                        }
                      >
                        next
                      </button>
                    </div>
                  </div>
                </div> */}
        </div>
      </div>
    </>
  );
}
