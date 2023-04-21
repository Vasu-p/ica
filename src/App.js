import { useCallback, useState } from "react";

import {
  FCLLayout,
  FlexibleColumnLayout,
  ShellBar,
  ThemeProvider,
} from "@ui5/webcomponents-react";

import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme";
import "@ui5/webcomponents-react/dist/Assets";

import { CommunityList } from "./components/CommunityList";
import { ApartmentList } from "./components/ApartmentList";

function App() {
  // change theme to horizon
  setTheme("sap_horizon");
  const [layout, setLayout] = useState(FCLLayout.OneColumn);

  const showApartmentDetails = useCallback(() => {}, []);

  return (
    <ThemeProvider>
      <ShellBar primaryTitle="Irvine Company Apartments" />
      <FlexibleColumnLayout
        startColumn={<CommunityList onShowDetails={showApartmentDetails} />}
        midColumn={<ApartmentList communities={[]} />}
        layout={layout}
      />
    </ThemeProvider>
  );
}

export default App;
