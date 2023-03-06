import AGTable from "Components/AGTable";

export default function AGDemo() {
    return (
        <AGTable
            rowData={[
                { isActive: true, mrp: 35000, qty: 5 },
                { isActive: false, mrp: 32000, qty: 55 },
                { isActive: true, mrp: 72000, qty: 555 }
            ]} columnDefs={[
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
            ]} />
    );
}
