/* eslint-disable no-unused-vars */
import styles from "./css/defaultLayout.module.css";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import { Navigate, Outlet } from "react-router-dom";
import Nav from "./userComponent/Nav.jsx";
import Footer from "./userComponent/Footer.jsx";
import axiosClient from "../axios.jsx";
export default function DefaultLayout() {
  const { theme } = useStateContext();
  const {user, token,  setUser, setToken} = useStateContext()
//   if(!token){
//     return <Navigate to="/" />
// }
//   const onSubmit = (e) => {
//       e.preventDefault();
//       axiosClient
//         .post("/logout")
//         .then(() => {
//           setUser({});
//           setToken(null);
//         })
//         .catch((err) => {
//           const response = err.response;
//           if (response && response.status === 422) {
//             console.log(response.data.errors);
//           }
//         });
  
//     };
  return (
    <div className={theme === "light" ? styles.lightTheme : styles.darkTheme}>
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
}
