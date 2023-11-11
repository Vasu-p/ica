import { useState } from "react";
import {
  Button,
  ResponsivePopover,
  ButtonDesign,
} from "@ui5/webcomponents-react";
import { PiggyBankFill } from "react-bootstrap-icons";

export const SupportButton = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  return (
    <>
      <ResponsivePopover
        open={isPopoverOpen}
        opener="openSupportButton"
        onAfterClose={() => {
          setIsPopoverOpen(false);
        }}
      >
        <h4 style={{ padding: "0", margin: "0", marginBottom: "5px" }}>
          Show your love with a dollar!
        </h4>
        <h4 style={{ padding: "0", margin: "0", marginBottom: "10px" }}>
          Your small contribution goes a long way!
        </h4>
        <img src="/venmo_qr.jpg" height={"158"} width={"209"} />
      </ResponsivePopover>
      <Button
        id={"openSupportButton"}
        design={ButtonDesign.Transparent}
        style={{
          height: "fit-content",
          width: "fit-content",
          position: "fixed",
          bottom: "15px",
          right: "15px",
        }}
        onClick={() => {
          setIsPopoverOpen(true);
        }}
      >
        <PiggyBankFill size={50} style={{ padding: "5px" }} />
      </Button>
    </>
  );
};
