import { useState } from "react";
import useRatings from "../hooks/useRatings";
import useTranslation from "../intl/useTranslation";

const { Rate, Button } = require("antd");

const Rating = ({ recipeID, defaultValue = 0 }) => {
  const [value, setValue] = useState(defaultValue);
  const { rate } = useRatings(recipeID);
  const { t } = useTranslation();

  return (
    <>
      <Rate defaultValue={value} onChange={(v) => setValue(v)} />
      <Button type="primary" shape="round" onClick={() => rate(value)}>
        {t("送信")}
      </Button>
    </>
  );
};

export default Rating;
