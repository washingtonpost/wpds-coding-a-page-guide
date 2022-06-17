import { styled, theme } from "@washingtonpost/wpds-ui-kit";

const Container = styled("div", {
  color: theme.colors.primary,
  padding: theme.space["100"],
});

const HeaderImage = styled("img", {
  display: "block",
  width: "100%",
});

const MainHeading = styled("h2", {
  marginBlockEnd: theme.space["050"],
  fontFamily: theme.fonts.subhead,
});

const SectionHeading = styled("h3", {
  marginBlockEnd: theme.space["050"],
  fontFamily: theme.fonts.subhead,
  fontSize: theme.fontSizes["087"],
  textTransform: "uppercase",
});

const IngredientList = styled("ul", {
  marginBlockEnd: theme.space["050"],
  paddingInlineStart: theme.space["100"],
  fontFamily: theme.fonts.body,
});

const Directions = styled("p", {
  fontFamily: theme.fonts.body,
});

const Recipe = ({ content }) => {
  return (
    <div>
      <HeaderImage src={`/img/${content.image}.jpg`} alt="" />
      <Container>
        <MainHeading>{content.title}</MainHeading>
        <SectionHeading>Ingredients</SectionHeading>
        <IngredientList>
          {content.ingredients
            .substring(2, content.ingredients.length - 2)
            .split("', '")
            .map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
        </IngredientList>
        <SectionHeading>Directions</SectionHeading>
        <Directions>{content.instructions}</Directions>
      </Container>
    </div>
  );
};

export { Recipe };
