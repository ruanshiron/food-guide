import { useEffect, useState } from "react";
import searchIndex from "../config/algoliaConfig";
import { database, storage } from "../config/firebaseConfig";

const storageRef = storage.ref();

export default function useRecipes(option = "query", limited = 6, q = "") {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => (option == "search" ? search(q) : getData(limited)), [q]);

  async function getData() {
    setLoading(true);
    const ref = database.collection("recipes").orderBy("title").limit(limited);
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

  async function search(keyword = "") {
    setLoading(true);
    let results = await searchIndex.search(keyword, {
      hitsPerPage: 10,
      page: 0,
    });
    setRecipes([]);
    results.hits.forEach(async (doc) => {
      let image_url = await storageRef
        .child(`recipes/${doc.image}`)
        .getDownloadURL();
      let recipe = {
        id: doc.id,
        src: image_url,
        ...doc,
      };
      setRecipes((recipes) => [...recipes, recipe]);
    });
    // console.log(results.hits);
    setLoading(false);
  }

  const more = () => getData();

  return {
    recipes,
    loading,
    more,
  };
}
