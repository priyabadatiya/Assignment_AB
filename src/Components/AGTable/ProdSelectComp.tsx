import React, { Component, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

interface MyProps {
  message: string;
}

interface MyState {
  txt: string;
}

const rowData = [
  { id: 11, name: "m11", mrp: 100 },
  { id: 22, name: "m22", mrp: 200 },
  { id: 33, name: "m33", mrp: 300 }
];

const columnDefs = [
  {
    field: "name",
    width: 100
  },
  {
    field: "mrp",
    width: 100
  }
];

//export default class ProdSelect extends Component<MyProps, MyState> {
const PurchaseFormSub: React.FC<MyProps> = () => {
  const txtInput = useRef<any>(null);
  const gridApi = useRef<any>(null);
  const columnApi = useRef<any>(null);
  const [txt, setTxt] = useState("");

  function getValue() {
    const selectedRow = gridApi.current.getSelectedRows()[0];
    if (selectedRow) {
      return selectedRow;
    }
  }

  function isPopup() {
    return true;
  }

  function afterGuiAttached(): void {
    txtInput.current.focus();
  }

  function onGridReady(params: any) {
    gridApi.current = params.api;
    columnApi.current = params.columnApi;
  }

  const txtOnChange = (e: any) => {
    setTxt(e.target.value);
  };

  const searchKeyDown = (e: any) => {
    if (e.keyCode === 40) {
      e.stopPropagation();
      e.preventDefault();
      gridApi.current.ensureIndexVisible(0);

      const firstCol = columnApi.current.getAllDisplayedColumns()[0];
      gridApi.current.ensureColumnVisible(firstCol);
      gridApi.current.setFocusedCell(0, firstCol);

      const firstRow = gridApi.current.getDisplayedRowAtIndex(0);
      if (firstRow) {
        firstRow.setSelected(true);
      }
      /*this.gridApi.forEachNode(function (node: any) {
        if (node.rowIndex === 0) {
          node.setSelected(true);
        }
      });*/
    }
  };

  const navigateToNextCell = (params: any) => {
    var previousCell = params.previousCellPosition;
    var suggestedNextCell = params.nextCellPosition;

    var KEY_UP = 38;
    var KEY_DOWN = 40;
    var KEY_LEFT = 37;
    var KEY_RIGHT = 39;

    switch (params.key) {
      case KEY_DOWN:
        previousCell = params.previousCellPosition;
        // set selected cell on current cell + 1
        gridApi.current.forEachNode(function (node: any) {
          if (previousCell.rowIndex + 1 === node.rowIndex) {
            node.setSelected(true);
          }
        });
        return suggestedNextCell;
      case KEY_UP:
        previousCell = params.previousCellPosition;
        // set selected cell on current cell - 1
        gridApi.current.forEachNode(function (node: any) {
          if (previousCell.rowIndex - 1 === node.rowIndex) {
            node.setSelected(true);
          }
        });
        return suggestedNextCell;
      case KEY_LEFT:
      case KEY_RIGHT:
        return suggestedNextCell;
      default:
      //throw "this will never happen, navigation is always one of the 4 keys above";
    }
  };

  const getRowNodeId = (data: any) => {
    return data.id;
  };

  return (
    <>
      <input
        ref={txtInput}
        type="text"
        onKeyDown={searchKeyDown}
        onChange={txtOnChange}
      />
      <div className="ag-theme-alpine" style={{ height: 200, width: 300 }}>
        <AgGridReact
          onGridReady={onGridReady}
          getRowNodeId={getRowNodeId}
          columnDefs={columnDefs}
          rowData={rowData}
          navigateToNextCell={navigateToNextCell}
          rowSelection="single"
        />
      </div>
    </>
  );
};

export default PurchaseFormSub;
