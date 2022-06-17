import React from "react";
import { CSSTransition } from "react-transition-group";
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
  overflow: "hidden",
  padding: "1px",
});

const Overview = styled("div", {
  flex: "1",
});

const DetailContainer = styled("div", {
  display: "flex",
  position: "relative",
  transition: "unset",
  "&.wprs-enter": {
    opacity: 0,
  },
  "&.wprs-enter-active": {
    opacity: 1,
    transition: theme.transitions.allFast,
  },
  "&.wprs-exit": {
    opacity: 1,
  },
  "&.wprs-exit-active": {
    opacity: 0,
    transition: theme.transitions.allFast,
  },
  variants: {
    layout: {
      column: {
        flex: "0 0 25%",
        "&.wprs-enter": {
          marginInlineEnd: `-25%`,
        },
        "&.wprs-enter-active": {
          marginInlineEnd: "0%",
        },
        "&.wprs-exit": {
          marginInlineEnd: "0%",
        },
        "&.wprs-exit-active": {
          marginInlineEnd: `-25%`,
        },
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
  insetBlockStart: "$050",
  insetInlineEnd: "$050",
});

const StyledDivider = styled(Divider, {
  marginInline: "$100",
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
  const [showDetail, setShowDetail] = React.useState(false);
  const prevChild = React.useRef();

  React.useEffect(() => {
    if (children) {
      setShowDetail(true);
      prevChild.current = React.Children.only(React.cloneElement(children));
    } else {
      setShowDetail(false);
    }
  }, [children]);

  return (
    <CSSTransition
      in={showDetail}
      classNames="wprs"
      timeout={{
        enter: 200,
        exit: 200,
      }}
      mountOnEnter
      unmountOnExit
    >
      <DetailContainer
        {...props}
        layout={{
          "@notSm": "column",
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
        {children || prevChild.current}
      </DetailContainer>
    </CSSTransition>
  );
};

export { OverviewDetail, Overview, Detail };
