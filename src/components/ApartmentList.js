import { Button } from "@ui5/webcomponents-react";
import React from "react";

export function ApartmentList({ communities, onClose, ...otherProps }) {
  return (
    <div {...otherProps}>
      <Button onClick={onClose}>close</Button>
    </div>
  );
}
