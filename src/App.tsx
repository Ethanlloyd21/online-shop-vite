import { useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import Home from "./screens/home/Home";
import {
  defaultDarkModeOverride,
  ThemeProvider,
  ColorMode,
} from "@aws-amplify/ui-react";

import "./App.css";

function App() {
  // const [count, setCount] = useState(0)

  const [colorMode, setColorMode] = useState<ColorMode>("dark");
  const theme = {
    name: "my-theme",
    overrides: [defaultDarkModeOverride],
  };

  return (
    <>
      <ThemeProvider theme={theme} colorMode={colorMode}>
        <Home />
      </ThemeProvider>

      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
     
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  );
}

export default App;
