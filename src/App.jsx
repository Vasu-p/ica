import { useCallback, useMemo, useState } from "react";

import {
  FilterBar,
  FilterGroupItem,
  MultiComboBox,
  MultiComboBoxItem,
  Input,
  ShellBar,
  ShellBarItem,
  ThemeProvider,
  FlexBox,
  FlexBoxDirection,
} from "@ui5/webcomponents-react";

import "./App.css";

import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme";
import "@ui5/webcomponents-react/dist/Assets";

import { ApartmentList } from "./components/ApartmentList";
import { HelpDialog } from "./components/HelpDialog";

import "@ui5/webcomponents-icons/dist/sys-help";
import { useAvailableApartments } from "./hooks/useAvailableApartments";
import { useAllCommunities } from "./hooks/useAllCommunities";
import { cities } from "./data/cities";

function App() {
  // change theme to horizon
  setTheme("sap_horizon");

  const [showHelpDialog, setShowHelpDialog] = useState(false);
  const {
    availableApartments,
    fetchApartments,
    setNumBeds,
    setNumBaths,
    setMinArea,
    setMaxPrice,
    setCities,
    loading,
  } = useAvailableApartments();

  const { allCommunities } = useAllCommunities();

  const availableApartmentsWithCommunity = useMemo(() => {
    return availableApartments.map((apartment) => {
      const community = allCommunities.find(
        (community) => community.objectID === apartment.communityIDAEM
      );
      return {
        ...apartment,
        community,
      };
    });
  }, [availableApartments, allCommunities]);

  const handleCityChange = useCallback(
    (event) => {
      const selection = event.detail.items;
      setCities(selection.map((item) => item.text));
    },
    [setCities]
  );

  const handleNumBedChange = useCallback(
    (event) => {
      const selection = event.detail.items;
      setNumBeds(selection.map((item) => item.text));
    },
    [setNumBeds]
  );

  const handleNumBathChange = useCallback(
    (event) => {
      const selection = event.detail.items;
      setNumBaths(selection.map((item) => item.text));
    },
    [setNumBaths]
  );

  const handleMinAreaChange = useCallback(
    (event) => {
      setMinArea(event.target.value);
    },
    [setMinArea]
  );

  const handleMaxPriceChange = useCallback(
    (event) => {
      setMaxPrice(event.target.value);
    },
    [setMaxPrice]
  );

  return (
    <ThemeProvider>
      <FlexBox direction={FlexBoxDirection.Column} style={{ height: "100vh" }}>
        <ShellBar primaryTitle="Easy ICA" logo={<img src="/logo.png" alt="" />}>
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
        <FilterBar
          hideToolbar={true}
          hideFilterConfiguration={true}
          style={{ padding: "1rem" }}
          showGoOnFB={true}
          onGo={() => {
            fetchApartments();
          }}
        >
          <FilterGroupItem label="City">
            <MultiComboBox onSelectionChange={handleCityChange}>
              {cities.map((city) => (
                <MultiComboBoxItem key={city.cityName} text={city.cityName} />
              ))}
            </MultiComboBox>
          </FilterGroupItem>
          <FilterGroupItem label="Num Bed">
            <MultiComboBox onSelectionChange={handleNumBedChange}>
              <MultiComboBoxItem text="0" />
              <MultiComboBoxItem text="1" />
              <MultiComboBoxItem text="2" />
              <MultiComboBoxItem text="3" />
            </MultiComboBox>
          </FilterGroupItem>
          <FilterGroupItem label="Num Bath">
            <MultiComboBox onSelectionChange={handleNumBathChange}>
              <MultiComboBoxItem text="1" />
              <MultiComboBoxItem text="1.5" />
              <MultiComboBoxItem text="2" />
              <MultiComboBoxItem text="2.5" />
              <MultiComboBoxItem text="3" />
            </MultiComboBox>
          </FilterGroupItem>
          <FilterGroupItem label="Max Price">
            <Input onInput={handleMaxPriceChange} />
          </FilterGroupItem>
          <FilterGroupItem label="Min Area">
            <Input onInput={handleMinAreaChange} />
          </FilterGroupItem>
        </FilterBar>
        <ApartmentList
          availableApartments={availableApartmentsWithCommunity}
          loading={loading}
        />
      </FlexBox>
    </ThemeProvider>
  );
}

export default App;
