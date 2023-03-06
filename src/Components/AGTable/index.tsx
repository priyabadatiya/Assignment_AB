import { AgGridReact } from "ag-grid-react";


import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { CellValueChangedEvent, ValueGetterParams } from "ag-grid-community";
import { Checkbox } from "@pankod/refine-antd";
const SampleCellRenderer = (props: any) => {
    return <>{props.value} </>;
};
function handleChange(value: any) {
    console.log(`Selected: ${value}`);
}
const SelectCellRenderer = (params: any) => {
    return <Checkbox value={params.value} onChange={handleChange} />
}

const defaultColDef = {
    editable: true,
    sortable: false,
    enableCellChangeFlash: true,
    //flex: 1,
    //minWidth: 30,
    filter: false,
    resizable: true
};

const frameworkComponents = {
    sampleCellRenderer: SampleCellRenderer,
    selectCellRenderer: SelectCellRenderer

};



const cellValueChanged = (e: CellValueChangedEvent) => {
    if (e.colDef.field === "medicine") {
        const rowNode = e.node;
        if (e.data.medicine && e.data.medicine.mrp) {
            rowNode.setDataValue("mrp", e.data.medicine.mrp);
        }
    }
};

export default function AGTable({ rowData = [
    { isActive: true, mrp: 35000, qty: 5 },
    { isActive: false, mrp: 32000, qty: 55 },
    { isActive: true, mrp: 72000, qty: 555 }
], columnDefs = [
    {
        field: "isActive",
        editable: false,
        width: 100,
        cellRenderer: "selectCellRenderer",
        rowDrag: true
    },

    {
        field: "mrp",
        cellRenderer: "sampleCellRenderer",
        editable: true,
        width: 100,
    },
    {
        field: "qty",
        editable: true,
        width: 70,
    },
    {
        field: "amount",
        editable: false,
        width: 110,
        valueGetter: "data.qty * data.mrp",
    }
] }) {
    return (
        <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
            <AgGridReact
                columnDefs={columnDefs}
                rowData={rowData}
                rowDragManaged={true}
                defaultColDef={defaultColDef}
                frameworkComponents={frameworkComponents}
                onCellValueChanged={cellValueChanged}
            />
        </div>
    );
}
