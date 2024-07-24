import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios";

export default function ProductDetails() {
  const { id } = useParams();
  const { user } = useStateContext();

  const [errors, setErrors] = useState({ __html: "" });
  // // eslint-disable-next-line no-unused-vars
  const [selectedImage, setSelectedImage] = useState(null);

  const [categories, setCategories] = useState([]);
  const [aProduct, setAProduct] = useState([]);
  const [productName, setProductName] = useState(aProduct.product_name);
  const [description, setDescription] = useState(aProduct.description);
  const [pricePerUnit, setPricePerUnit] = useState(aProduct.price_per_unit);
  const formData = new FormData();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = () => {
      setErrors({ __html: "" });
      axiosClient
        .get(`/categories`)
        .then(({ data }) => {
          setCategories(data.category.data);
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
        .get(`/products/${id}`)
        .then(({ data }) => {
          setAProduct(data.product);
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
    fetchData();
  }, []);

  const [previewImage, setPreviewImage] = useState();
  const onFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = () => {
    setErrors({ __html: "" });
    formData.append("image", selectedImage);
    formData.append("product_name", productNameRef.current.value);
    formData.append("description", descriptionRef.current.value);
    formData.append("category_id", categoryRef.current.value);
    formData.append("farmer_id", user.id);
    formData.append("price_per_unit", pricePerUnitRef.current.value);

    axiosClient
      .put(`/products/${id}`, formData, { headers: "multipart/form-data" })
      .then(() => {
        setPreviewImage(null);
        setSelectedImage(null);
      })
      .catch((error) => {
        if (error.response) {
          const finalErrors = Object.values(error.response.data.errors).reduce(
            (accum, next) => [...accum, ...next],
            []
          );
          console.log(finalErrors);
          setErrors({ __html: finalErrors.join("<br>") });
        }
        console.error(error);
      });

    navigate("/admin/products");
  };

  console.log(productName)

  return (
    <>
      <form action="" method="post" onSubmit={onSubmit}>
        {errors.__html && (
          <div
            className="alert alert-danger"
            dangerouslySetInnerHTML={errors}
          ></div>
        )}
        <div className="row">
          <h2 className="">modifier le produit</h2>
          <div className="col-4 text-dark d-flex flex-column">
            <div>
              <label htmlFor="">selectionner une image</label>
              {aProduct.image && !previewImage ? (
                <img
                src={`http://127.0.0.1:8000/storage/${aProduct.image}`}
                  alt="selected image"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    flex: "1",
                    borderRadius: "5px",
                  }}
                />
              ) : (
                <img
                  src={previewImage}
                  alt="selected image"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    flex: "1",
                    borderRadius: "5px",
                  }}
                />
              )}
            </div>
            <input
              className="form-control"
              type="file"
              name="image"
              onChange={onFileChange}
            />
          </div>
          <div className="col-8">
            <div className="form-group">
              <label htmlFor="product_name">nom du produit</label>
              <input
                type="text"
                className="form-control"
                name="product_name"
                id="product_name"
                value = {aProduct.product_name}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div className="row">
              <div className="col-6 form-group">
                <label htmlFor="price_per_unit">prix unitaire</label>
                <input
                  type="number"
                  className="form-control"
                  name="price_per_unit"
                  id="price_per_unit"
                />
              </div>
              <div className="col-6 form-group">
                <label htmlFor="category">categorie</label>
                <select
                  name="category_id"
                  className="form-select"
                  id="category"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">description</label>
              <textarea
                type="text"
                className="form-control"
                name="description"
                id="description"
                cols="10"
                rows="5"
              ></textarea>
            </div>
            <div className="form-group my-2">
              <button
                type="submit"
                className="btn btn-block btn-lg btn-success w-100 text-black"
              >
                ajouter
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
