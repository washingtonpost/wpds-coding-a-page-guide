import {
  Button,
  Divider,
  Icon,
  styled,
  theme,
} from "@washingtonpost/wpds-ui-kit";
import { Close } from "@washingtonpost/wpds-assets";

const OverviewDetail = styled("div", {
  display: "flex",
});

const Overview = styled("div", {
  flex: "1",
});

const DetailContainer = styled("div", {
  display: "flex",
  position: "relative",
  variants: {
    layout: {
      column: {
        flex: "0 0 25%",
      },
      overlay: {
        backgroundColor: theme.colors.secondary,
        inset: 0,
        overflow: "auto",
        position: "fixed",
        zIndex: theme.zIndices.offer,
      },
    },
  },
});

const CloseButton = styled(Button, {
  position: "absolute",
  insetBlockStart: theme.space["050"],
  insetInlineEnd: theme.space["050"],
});

const StyledDivider = styled(Divider, {
  marginInline: theme.space["100"],
  paddingInlineStart: "1px",
  variants: {
    layout: {
      hidden: {
        display: "none",
      },
    },
  },
});

const Detail = ({ children, onClose, ...props }) => {
  if (!children) {
    return null;
  }

  return (
    <DetailContainer
      {...props}
      layout={{
        "@initial": "column",
        "@sm": "overlay",
      }}
    >
      <CloseButton variant="primary" icon="center" onClick={() => onClose()}>
        <Icon label="Close">
          <Close />
        </Icon>
      </CloseButton>
      <StyledDivider
        orientation="vertical"
        decorative
        layout={{
          "@sm": "hidden",
        }}
      />
      {children}
    </DetailContainer>
  );
};

export { OverviewDetail, Overview, Detail };
