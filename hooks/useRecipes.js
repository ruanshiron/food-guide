import { useEffect, useState } from "react";
import { database, storage } from "../config/firebaseConfig";

const storageRef = storage.ref();

export default function useRecipes(litmited = 6) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => getData(), []);

  async function getData() {
    const ref = database.collection("recipes").orderBy("title").limit(litmited);
    const docs = await ref.get();
    docs.forEach(async (doc) => {
      let image_url = await storageRef
        .child(`recipes/${doc.data().image}`)
        .getDownloadURL();
      let recipe = {
        id: doc.id,
        src: image_url,
        ...doc.data(),
      };
      setRecipes((recipes) => [...recipes, recipe]);
    });
    setLoading(false);
  }

  const more = () => getData();

  return {
    recipes,
    loading,
    more,
  };
}
