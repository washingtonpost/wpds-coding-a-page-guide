import React from "react";
import { Button, Container, styled, theme } from "@washingtonpost/wpds-ui-kit";

const StyledContainer = styled(Container, {
  alignItems: "unset",
  backgroundColor: theme.colors["blue600"],
  gap: theme.space["100"],
  minHeight: "100vh",
  padding: theme.space["100"],
  "& > :nth-child(2)": {
    flex: 1,
  },
});

const Header = styled("header", {
  backgroundColor: theme.colors["blue400"],
  padding: theme.space["050"],
});

const OverviewDetail = styled("div", {
  display: "flex",
  gap: theme.space["100"],
});

const Overview = styled("div", {
  backgroundColor: theme.colors["blue400"],
  flex: "1",
  padding: theme.space["050"],
});

const Detail = styled("div", {
  backgroundColor: theme.colors["blue400"],
  padding: theme.space["050"],
  position: "relative",
  variants: {
    layout: {
      column: {
        flex: "0 0 25%",
      },
      overlay: {
        inset: 0,
        overflow: "auto",
        opacity: 0.75,
        position: "fixed",
        zIndex: theme.zIndices.offer,
      },
    },
  },
});

const ResponsiveGrid = styled("ul", {
  display: "grid",
  gap: theme.space["050"],
  listStyle: "none",
  marginBlock: theme.space["050"],
  paddingInlineStart: "0",
  variants: {
    layout: {
      twoColumn: {
        gridTemplateColumns: "repeat(2, minmax(50px, 1fr))",
      },
      fourColumn: {
        gridTemplateColumns: "repeat(4, minmax(50px, 1fr))",
      },
    },
  },
});

const ResponsiveGridItem = styled("li", {
  backgroundColor: theme.colors["blue300"],
  padding: theme.space["050"],
});

const CloseButton = styled(Button, {
  position: "absolute",
  insetBlockStart: theme.space["050"],
  insetInlineEnd: theme.space["050"],
});

export default function Home() {
  const [recipes] = React.useState(new Array(24).fill(""));
  const [selectedRecipe, setSelectedRecipe] = React.useState();

  function handleCloseClick() {
    setSelectedRecipe(undefined);
  }

  function handleRecipeClick(id) {
    setSelectedRecipe(id);
  }

  return (
    <StyledContainer>
      <Header>Header</Header>
      <OverviewDetail>
        <Overview>
          Overview
          <ResponsiveGrid
            layout={{
              "@initial": "fourColumn",
              "@sm": "twoColumn",
            }}
          >
            {recipes.map((recipe, index) => (
              <ResponsiveGridItem
                key={index}
                onClick={() => handleRecipeClick(index)}
              >
                {index}
              </ResponsiveGridItem>
            ))}
          </ResponsiveGrid>
        </Overview>
        {selectedRecipe !== undefined && (
          <Detail
            layout={{
              "@initial": "column",
              "@sm": "overlay",
            }}
          >
            Detail
            <br />
            {selectedRecipe}
            <CloseButton onClick={handleCloseClick}>Close</CloseButton>
          </Detail>
        )}
      </OverviewDetail>
    </StyledContainer>
  );
}
