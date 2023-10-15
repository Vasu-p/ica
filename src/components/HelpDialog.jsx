import { Dialog, Bar, Button, BarDesign } from "@ui5/webcomponents-react";

export const HelpDialog = ({ open, onClose }) => {
  return (
    <Dialog
      open={open}
      footer={
        <Bar
          endContent={<Button onClick={onClose}>Close</Button>}
          design={BarDesign.Footer}
        />
      }
      style={{ width: "500px" }}
      stretch={false}
      onAfterClose={onClose}
    >
      <h3>Usage Tips</h3>
      <p>
        <ul>
          <li>Use Filters to narrow down the choices</li>
          <li>Click on table header to sort/filter</li>
          <li>
            Community amenities can be filtered by using comma separated values.
            <ul>
              <li>
                E.g. To search for communities which have hardwood floor and are
                dog friendly, type this in Amenities filter
                <pre>hardwood,dog</pre>
              </li>
            </ul>
          </li>
        </ul>
      </p>
    </Dialog>
  );
};
