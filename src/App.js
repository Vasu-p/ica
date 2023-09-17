import { useCallback, useState } from "react";

import {
  FCLLayout,
  FlexibleColumnLayout,
  ShellBar,
  ShellBarItem,
  ThemeProvider,
} from "@ui5/webcomponents-react";

import "./App.css";

import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme";
import "@ui5/webcomponents-react/dist/Assets";

import { CommunityList } from "./components/CommunityList";
import { ApartmentList } from "./components/ApartmentList";

import "@ui5/webcomponents-icons/dist/sys-help";

function App() {
  // change theme to horizon
  setTheme("sap_horizon");
  const [layout, setLayout] = useState(FCLLayout.OneColumn);
  const [communitiesToShowDetails, setCommunitiesToShowDetails] = useState([]);

  const showApartmentDetails = useCallback((selectedCommunities) => {
    setCommunitiesToShowDetails(selectedCommunities);
    setLayout(FCLLayout.TwoColumnsMidExpanded);
  }, []);

  const handleApartmentListClose = useCallback(() => {
    setLayout(FCLLayout.OneColumn);
  }, []);

  return (
    <ThemeProvider>
      <ShellBar primaryTitle="Irvine Company Apartments">
        <ShellBarItem icon="sys-help" text="sys-help" />
      </ShellBar>
      <FlexibleColumnLayout
        startColumn={<CommunityList onShowDetails={showApartmentDetails} />}
        midColumn={
          <ApartmentList
            communities={communitiesToShowDetails}
            onClose={handleApartmentListClose}
          />
        }
        layout={layout}
      />
    </ThemeProvider>
  );
}

export default App;
