import React from "react";
import { globalStyles } from "@washingtonpost/wpds-ui-kit";

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    globalStyles();
  }, []);
  return <Component {...pageProps} />;
}

export default MyApp;
