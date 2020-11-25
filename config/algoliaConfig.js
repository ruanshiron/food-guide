import algoliasearch from "algoliasearch";

var client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY
);
const searchIndex = client.initIndex("food_guide");
export default searchIndex;
