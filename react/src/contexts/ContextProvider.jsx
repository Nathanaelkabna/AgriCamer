/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
const StateContext = createContext({
  user: {},
  token: null,
  product: [],
  path: null,
  setUser: () => {},
  setToken: () => {},
  setTheme: () => {},
  setPath: () => {},
});

export const ContextProvider = ({ children }) => {
  const [product, setProduct] = useState([]);
  const [user, _setUser] = useState(localStorage.getItem('USER') || {});
  const [theme, _setTheme] = useState(localStorage.getItem('THEME') || 'light');
  const [token, _setToken] = useState(localStorage.getItem("TOKEN"));
  const [path, _setPath] = useState(localStorage.getItem('IMAGE_PATH') || '');

  const setPath = (path) => {
    localStorage.setItem('IMAGE_PATH', path);
    _setPath(path);
  }



  const setUser = (user) => {
    localStorage.setItem('USER', JSON.stringify(user));
    _setUser(user)
  }

  const setTheme = (theme) => {
    localStorage.setItem('THEME', theme);
    _setTheme(theme)
  }

  const setToken = (token) => {
    if(token){
      localStorage.setItem("TOKEN", token)
    }else{
      localStorage.removeItem("TOKEN");
    }
    
    _setToken(token);

  };
  return (
    <StateContext.Provider
      value={{
        user,
        token,
        product,
        path,
        setUser,
        setToken,
        setProduct,
        setPath,
        theme,
        setTheme,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);