import { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios";
import { Link, useNavigate } from "react-router-dom";

export default function Basket() {
  const { user } = useStateContext();
  // eslint-disable-next-line no-unused-vars
  const [errors, setErrors] = useState({ __html: "" });
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = () => {
      setErrors({ __html: "" });
      axiosClient
        .get(`/orders/${user.id}`)
        .then(({ data }) => {
          setOrders(data.order);
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
        .get(`/products`)
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
    };
    fetchProducts();
  }, [user.id]);

  const deleteCart = (e) => {
    e.preventDefault()

    setErrors({ __html: "" });
    axiosClient
      .delete(`/orders/${user.id}`)
      .then(() => {
        navigate(0)
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

  }
  return (
    <div className="container my-3">
      
      <div className="card-body">
      <Link to="/nos-produits" className="btn btn-outline-primary">retour au marché</Link>
        <h1 className="">
          panier de Mr/Mme{" "}
          <b className="text-danger">
            <i>{user.name}</i>
          </b>
        </h1>
        <ol className="list-group list-group-numbered">
        {products.filter(product => product.id == orders.product_id)}
          {products.map((prod) => (
            orders.map((ord) => (
              prod.id == ord.product_id ? 
              <li key={ord.id}  className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                <div className="fw-bold">{prod.product_name} </div>
                <span className="badge bg-primary rounded-pill">{prod.price_per_unit} {""} {prod.unit}</span>
                </div>
              </li> : ''
            ))
            
          ))}
          
        </ol>
        <div className="card-footer">
          <button type="button" className="btn btn-success py-2 mx-2">
            confirmer l&apos;achat
          </button>
          <button type="button" className="btn btn-danger py-2 mx-2" onClick={(e)=>deleteCart(e)}>
            vider le panier
          </button>
        </div>
      </div>
    </div>
  );
}
