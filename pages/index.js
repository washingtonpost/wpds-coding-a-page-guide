import React from "react";
import { Container, styled, theme } from "@washingtonpost/wpds-ui-kit";

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

export default function Home() {
  return (
    <StyledContainer>
      <Header>Header</Header>
      <OverviewDetail>
        <Overview>Overview</Overview>
        <Detail
          layout={{
            "@initial": "column",
            "@sm": "overlay",
          }}
        >
          Detail
        </Detail>
      </OverviewDetail>
    </StyledContainer>
  );
}
