import { styled, theme } from "@washingtonpost/wpds-ui-kit";

const PageHeading = styled("h1", {
  color: theme.colors.primary,
  fontFamily: theme.fonts.headline,
  fontSize: theme.fontSizes["300"],
  marginBlockEnd: theme.space["100"],
});

export { PageHeading };
