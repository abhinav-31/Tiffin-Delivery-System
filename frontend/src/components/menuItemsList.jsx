import { useEffect, useState } from "react";
import { getProperties } from "../services/menuItems";
import { toast } from "react-toastify";
import MenuItems from "./menuItems";

function MenuItemsList() {
  const [menuItemsList, setMenuItemsList] = useState([]);

  const loadProperties = async () => {
    const result = await getProperties();
    if (result["status"] === "success") {
      setMenuItemsList(result["data"]);
    } else {
      toast.error(result["error"]);
    }
  };

  useEffect(() => {
    loadProperties();
  }, []);

  return (
    <div>
      {menuItemsList.map((menuItems) => {
        return <MenuItems menuItems={menuItems} />;
      })}
    </div>
  );
}

export default MenuItemsList;
