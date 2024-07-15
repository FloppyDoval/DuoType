import * as React from "react";
import { ThemeProvider } from "web-ui";
import { Button } from "web-ui/juicy";

import styles from "components/App.module.scss";
import imageFavicon from "images/favicon.ico";

const App = () => {
  React.useEffect(() => {
    // This is how to obtain the URL to an image.
    // console.log(imageFavicon);

    // Appease linter
    void imageFavicon;
  });
  return (
    <ThemeProvider theme="light">
      {({ style }) => (
        <div className={styles["app-padded"]} style={style}>
          Hello, world!
          <Button>Click me</Button>
        </div>
      )}
    </ThemeProvider>
  );
};

export default App;
