/*
 * Recipe data set is CC BY-SA 3.0 licensed from
 * https://www.kaggle.com/datasets/pes12017000148/food-ingredients-and-recipe-dataset-with-images
 * Data has been reformatted to json and truncated
 */
import recipes from "./recipes.json";

const jp = require("jsonpath");

export default (req, res) => {
  const match = jp.query(
    recipes,
    `$.recipes[?(@.title.toLowerCase().indexOf("${req.query.search.toLowerCase()}") != -1 || @.ingredients.toLowerCase().indexOf("${req.query.search.toLowerCase()}") != -1 || @.instructions.toLowerCase().indexOf("${req.query.search.toLowerCase()}") != -1)]`
  );
  res.status(200).json(match);
};
