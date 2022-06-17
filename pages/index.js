import React from "react";
import Head from "next/head";
import useSWR from "swr";
import { Container, InputText, styled } from "@washingtonpost/wpds-ui-kit";
import { Header } from "../components/header";
import { PageHeading } from "../components/page-heading";
import {
  OverviewDetail,
  Overview,
  Detail,
} from "../components/overview-detail";
import {
  ResponsiveGrid,
  ResponsiveGridItem,
} from "../components/responsive-grid";
import { RecipeCard } from "../components/recipe-card";
import { Recipe } from "../components/recipe";
import { useDebounce } from "../hooks/use-debounce";

const StyledContainer = styled(Container, {
  alignItems: "unset",
  minHeight: "100vh",
  "& > :nth-child(2)": {
    flex: 1,
  },
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

  function handleCloseClick() {
    setSelectedRecipe(undefined);
  }

  function handleRecipeClick(id) {
    const selected = recipes.find((recipe) => recipe.id === id);
    setSelectedRecipe(selected);
  }

  function handleSearchChange(event) {
    setSearchText(event.target.value);
  }

  return (
    <StyledContainer>
      <Head>
        <title>Recipe Search</title>
      </Head>
      <Header>
        <PageHeading>Recipe Search</PageHeading>
        <InputText
          type="search"
          label="Search"
          name="search-input"
          id="search-input"
          value={searchText}
          onChange={handleSearchChange}
        />
      </Header>
      <OverviewDetail role="main">
        <Overview>
          <ResponsiveGrid>
            {recipes.map((recipe, index) => (
              <ResponsiveGridItem key={recipe.id}>
                <RecipeCard
                  onClick={() => handleRecipeClick(recipe.id)}
                  content={recipe}
                />
              </ResponsiveGridItem>
            ))}
          </ResponsiveGrid>
        </Overview>
        <Detail onClose={handleCloseClick}>
          {selectedRecipe !== undefined && <Recipe content={selectedRecipe} />}
        </Detail>
      </OverviewDetail>
    </StyledContainer>
  );
}
