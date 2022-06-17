import React from "react";
import useSWR from "swr";
import {
  Button,
  Container,
  InputText,
  styled,
  theme,
} from "@washingtonpost/wpds-ui-kit";
import { useDebounce } from "../hooks/use-debounce";

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

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
  const [searchText, setSearchText] = React.useState("");
  const debouncedSearchText = useDebounce(searchText, 275);

  const { data: recipes = [] } = useSWR(
    () => `/api/recipes?search=${debouncedSearchText}`,
    fetcher
  );

  const [selectedRecipe, setSelectedRecipe] = React.useState();

  function handleSearchChange(event) {
    setSearchText(event.target.value);
  }

  function handleCloseClick() {
    setSelectedRecipe(undefined);
  }

  function handleRecipeClick(id) {
    const selected = recipes.find((recipe) => recipe.id === id);
    setSelectedRecipe(selected);
  }

  return (
    <StyledContainer>
      <Header>
        Recipe Search{" "}
        <InputText
          type="search"
          label="Search"
          name="search-input"
          id="search-input"
          value={searchText}
          onChange={handleSearchChange}
        />
      </Header>
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
                key={recipe.title}
                onClick={() => handleRecipeClick(recipe.id)}
              >
                {recipe.title}
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
            {selectedRecipe.title}
            <CloseButton onClick={handleCloseClick}>Close</CloseButton>
          </Detail>
        )}
      </OverviewDetail>
    </StyledContainer>
  );
}
