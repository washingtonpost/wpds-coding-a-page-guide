import { Button, Icon, styled, theme } from "@washingtonpost/wpds-ui-kit";
import { Like, LikeSolid } from "@washingtonpost/wpds-assets";
import { useLocalStorage } from "../hooks/use-local-storage";

const Card = styled("div", {
  display: "grid",
  gridTemplateAreas: `"img img"
                      "title fav"`,
  gridTemplateColumns: `1fr ${theme.space["200"]}`,
  gridTemplateRows: "auto",
  alignItems: "center",
  position: "relative",
  gap: theme.space["025"],
});

const Image = styled("img", {
  display: "block",
  gridArea: "img",
  width: "100%",
});

const Title = styled("span", {
  fontFamily: theme.fonts.subhead,
  fontWeight: theme.fontWeights.bold,
  color: theme.colors.primary,
  paddingInlineStart: theme.space["025"],
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  gridArea: "title",
});

const TransparentButton = styled("button", {
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
  position: "absolute",
  inset: 0,
  zIndex: 1,
  "&:focus": {
    outline: "1px solid $signal",
  },
});

const FavoriteButton = styled(Button, {
  gridArea: "fav",
  position: "relative",
  zIndex: 2,
  "& *": {
    pointerEvents: "none",
  },
});

const RecipeCard = ({ content, onClick }) => {
  const [isFavorite, setIsFavorite] = useLocalStorage(
    `recipeFavorite${content.id}`,
    false
  );

  function handleFavoriteClick(event) {
    setIsFavorite((prevFavorite) => !prevFavorite);
  }

  return (
    <Card>
      <TransparentButton
        onClick={onClick}
        title={`See the full recipe for ${content.title}`}
      />
      <Image src={`/img/${content.image}.jpg`} alt="" />
      <Title title={content.title}>{content.title}</Title>
      <FavoriteButton
        variant="primary"
        isOutline
        css={{ border: "none" }}
        icon="center"
        onClick={handleFavoriteClick}
      >
        {isFavorite ? (
          <Icon
            size="100"
            fill={theme.colors.red200}
            label="Remove from favorites"
          >
            <LikeSolid />
          </Icon>
        ) : (
          <Icon size="100" label="Add to favorites">
            <Like />
          </Icon>
        )}
      </FavoriteButton>
    </Card>
  );
};

export { RecipeCard };
