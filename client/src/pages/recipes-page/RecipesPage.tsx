import { useCallback, useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import flatMap from "lodash/flatMap";
import useGetRandomRecipes from "queries/useGetRandomRecipes";
import { Filters } from "components/filters/Filters";
import { Label } from "components/UI/Texts";
import useWindowDimensions from "hooks/useWindowDimensions";
import { Header } from "./Header";
import { Recipes } from "./Recipes";
import { isEmpty } from "lodash";

const BodyContainer = styled.div({
  display: "flex",
  minHeight: "90vh",
});

const Cards = styled.div({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  overflow: "scroll",
});

const RecipesPage = () => {
  const [filters, setFilters] = useState({
    caloriesCount: 0,
    cookingTime: 0,
    tags: {},
    query: "",
  });
  const [isMobileView] = useWindowDimensions();

  const createFilters = useCallback(
    (value: any, label: string) => {
      setFilters((prevFilters) => ({ ...prevFilters, [label]: value }));
    },
    [setFilters]
  );

  // const handleScroll = useCallback(() => {
  //   const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  //   if (
  //     scrollTop + clientHeight >= scrollHeight &&
  //     hasNextPage &&
  //     !isFetchingNextPage
  //   ) {
  //     fetchNextPage();
  //   }
  // }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // useEffect(() => {
  //   document.addEventListener("scroll", handleScroll);

  //   return () => {
  //     document.removeEventListener("scroll", handleScroll);
  //   };
  // }, [handleScroll]);

  if (isMobileView) {
    return (
      <div>
        <Header />
        <Filters
          createFilters={createFilters}
          isMobileView={isMobileView}
          filters={filters}
          sticky
        />
      </div>
    );
  }

  return (
    <>
      <Header />
      <BodyContainer>
        <Filters createFilters={createFilters} filters={filters} sticky />
        <Cards></Cards>
      </BodyContainer>
    </>
  );
};

export default RecipesPage;
