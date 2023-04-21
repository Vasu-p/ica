import { ShellBar, ThemeProvider } from "@ui5/webcomponents-react";
import { CommunityList } from "./components/CommunityList";

function App() {
  return (
    <ThemeProvider>
      <ShellBar primaryTitle="Irvine Company Apartments" />
      <CommunityList />
    </ThemeProvider>
  );
}

export default App;
