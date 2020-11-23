import { Card } from "antd";
import { useRouter } from "next/router";

const RecipeCard = ({ data }) => {
  const router = useRouter();

  const handleRecipeClick = (e, i) => {
    router.push(`/recipes/${i}`);
  };
  return (
    <Card
      style={{ marginBottom: 16 }}
      hoverable
      cover={
        <img
          width={"100%"}
          height={200}
          style={{ objectFit: "cover" }}
          src={data.src}
        />
      }
      onClick={(e) => handleRecipeClick(e, data.id)}
    >
      <Card.Meta title={data.title} />
    </Card>
  );
};

export default RecipeCard;
