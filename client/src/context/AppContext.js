import { createContext, useContext } from "react";
import { useState } from "react";

const AppContext = createContext(null);

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error("An error has occurred");
  }
  return context;
};

const AppContextProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (hike) => {
    const oldFaves = [...favorites];

    const newFaves = oldFaves.concat(hike);
    setFavorites(newFaves);
  };
  const removeFromFavorites = (id) => {
    const oldFaves = [...favorites];
    const newFaves = [...oldFaves.filter((hike) => hike.id !== id)];
    
    setFavorites(newFaves);
  };
  return (
    <AppContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
