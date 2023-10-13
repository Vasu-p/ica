import { useCallback, useState } from "react";

import {
  FCLLayout,
  FlexBox,
  FlexBoxDirection,
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
import { HelpDialog } from "./components/HelpDialog";

import "@ui5/webcomponents-icons/dist/sys-help";

function App() {
  // change theme to horizon
  setTheme("sap_horizon");
  const [layout, setLayout] = useState(FCLLayout.OneColumn);
  const [communitiesToShowDetails, setCommunitiesToShowDetails] = useState([]);
  const [showHelpDialog, setShowHelpDialog] = useState(false);

  const showApartmentDetails = useCallback((selectedCommunities) => {
    setCommunitiesToShowDetails(selectedCommunities);
    setLayout(FCLLayout.TwoColumnsMidExpanded);
  }, []);

  const handleApartmentListClose = useCallback(() => {
    setLayout(FCLLayout.OneColumn);
  }, []);

  return (
    <ThemeProvider>
      <ShellBar
        primaryTitle="Irvine Company Apartments"
        logo={<img src="/logo.png" alt="" />}
      >
        <ShellBarItem
          icon="sys-help"
          text="sys-help"
          onClick={() => setShowHelpDialog(true)}
        />
      </ShellBar>
      <HelpDialog
        open={showHelpDialog}
        onClose={() => setShowHelpDialog(false)}
      />
      <ApartmentList
        communities={communitiesToShowDetails}
        onClose={handleApartmentListClose}
      />
    </ThemeProvider>
  );
}

export default App;
