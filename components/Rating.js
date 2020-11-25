import { useState } from "react";
import useRatings from "../hooks/useRatings";

const { Rate, Button } = require("antd");

const Rating = ({ recipeID, defaultValue = 0 }) => {
  const [value, setValue] = useState(defaultValue);
  const { rate } = useRatings(recipeID);
  return (
    <>
      <Rate defaultValue={value} onChange={(v) => setValue(v)} />
      <Button type="primary" shape="round" onClick={() => rate(value)}>
        送信
      </Button>
    </>
  );
};

export default Rating;
