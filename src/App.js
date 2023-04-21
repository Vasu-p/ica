import { ShellBar, ThemeProvider } from "@ui5/webcomponents-react";
import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme";
import "@ui5/webcomponents-react/dist/Assets";

import { CommunityList } from "./components/CommunityList";

function App() {
  // change theme to horizon
  setTheme("sap_horizon");

  return (
    <ThemeProvider>
      <ShellBar primaryTitle="Irvine Company Apartments" />
      <CommunityList />
    </ThemeProvider>
  );
}

export default App;
