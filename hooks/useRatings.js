import { useEffect, useState } from "react";
import { database } from "../config/firebaseConfig";

export default function useRatings(id) {
  const [ratings, setRatings] = useState([]);
  const [average, setAverage] = useState(0);

  const fetchRatingsById = async (id) => {
    const ref = database.collection("recipes").doc(id).collection("ratings");
    const collection = await ref.get();
    setRatings(
      collection.docs.map((doc) => {
        return doc.data();
      })
    );
    if (collection.docs.length <= 0) return;
    setAverage(
      collection.docs
        .map((doc) => doc.data().point)
        .reduce((a, v, i) => (a * i + v) / (i + 1))
    );
  };

  const rate = async (point) => {
    const ref = database.collection("recipes").doc(id).collection("ratings");
    let r = await ref.add({
      point: point,
      created_at: Date.now(),
    });
    console.log(r.id);
  };

  useEffect(() => fetchRatingsById(id), [id]);

  return { ratings, average, rate };
}
