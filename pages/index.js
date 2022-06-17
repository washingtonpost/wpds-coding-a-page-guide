import React from "react";
import { Container, styled, theme } from "@washingtonpost/wpds-ui-kit";

const StyledContainer = styled(Container, {
  backgroundColor: theme.colors["blue600"],
  minHeight: "100vh",
});

export default function Home() {
  return <StyledContainer>Container</StyledContainer>;
}
