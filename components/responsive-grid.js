import { styled } from "@washingtonpost/wpds-ui-kit";

const Grid = styled("ul", {
  display: "grid",
  gap: "$050",
  listStyle: "none",
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

const ResponsiveGrid = ({ children, ...props }) => {
  return (
    <Grid
      {...props}
      layout={{
        "@initial": "fourColumn",
        "@sm": "twoColumn",
      }}
    >
      {children}
    </Grid>
  );
};

const ResponsiveGridItem = styled("li", {});

export { ResponsiveGrid, ResponsiveGridItem };
