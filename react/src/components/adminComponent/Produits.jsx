import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios";
import { useEffect, useState } from "react";

export default function Products() {
  const { user, product, setProduct } = useStateContext();
  // eslint-disable-next-line no-unused-vars
  const [errors, setErrors] = useState({ __html: "" });
  const [itemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const fetchProducts = (pageNumber) => {
      setErrors({ __html: "" });
      axiosClient
        .get(
          `/user-products/${user.id}?page=${pageNumber}&itemsPerPage=${itemsPerPage}`
        )
        .then(({ data }) => {
          console.log(data.product);
          setProduct(data.product);
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, user.id]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  return (
    <>
      {product.data === undefined ? (
        "no product available"
      ) : (
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
                      currentPage === Math.ceil(product.total / itemsPerPage)
                    }
                  >
                    next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* {errors && <p> error fetching products: {errors.message}</p>} */}
    </>
  );
}
