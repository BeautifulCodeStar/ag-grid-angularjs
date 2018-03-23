import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {GridOptions, ColumnApi, GridApi} from 'ag-grid';

@Component({
  selector: 'app-sixth-grid-application',
  templateUrl: './sixth-grid-application.component.html',
  styleUrls: ['./sixth-grid-application.component.css']
})
export class SixthGridApplicationComponent implements OnInit {

  @Output() fireFirst = new EventEmitter<boolean>();
    private gridOptions: GridOptions;
    private defaultColDef;
    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;
    private rowData: any[];
    private headerCells = [
      'number', 'amount', 'extraCmd', 'extraAmount'
    ];
    private secondFlag: Boolean = false;

    constructor() {
      this.gridOptions = <GridOptions>{};
      this.gridOptions.columnDefs = [
        {
            headerName: 'Number',
            field: 'number',
            valueParser : this.numberValueParser,
            width: 100,
            cellStyle: {color: 'white', 'background-color': '#ce17c2'}
        },
        {
            headerName: 'Amount',
            field: 'amount',
            valueParser : this.numberValueParser,
            width: 100
        },
        {
            headerName: 'ExtraCMD',
            field: 'extraCmd',
            width: 100,
        },
        {
            headerName: 'Extra Amount',
            field: 'extraAmount',
            valueParser : this.numberValueParser,
            width: 120
        }
      ];
      this.gridOptions.rowData = [
        {number: 0,  amount: 0, extraCmd: 0, extraAmount: 0},
      ];
      const $this = this;
      this.defaultColDef = {
        type : 'number',
        editable : true,
        suppressKeyboardEvent : function (event) {
          if (event.editing) {
            const key = event.event.key;
            const keyCode = event.event.keyCode;
            const rowIndex = event.node.rowIndex;
            const colKey = event.colDef.field;
            const currentIndex = $this.headerCells.indexOf(colKey);
            const currentValue = $this.gridOptions.rowData[rowIndex][colKey];
            if (keyCode === 13) { // Enter
              if (currentIndex !== 0 && currentIndex !== 2) {
                if ($this.gridOptions.rowData.length - 1 === rowIndex) {
                  const data = {number: 0, amount: 0, extraCmd: '', extraAmount: 0};
                  $this.gridOptions.rowData.push(data);
                  $this.gridApi.updateRowData({add: [data]});
                }
                $this.onBtStartEditing(rowIndex + 1, $this.headerCells[0], 46, null, null, rowIndex, colKey);
              } else {
                $this.onBtStartEditing(rowIndex, $this.headerCells[currentIndex + 1], 46, null, null, rowIndex, colKey);
              }
              return true;
            } else if (keyCode === 111) { // Slash move focus to the next table
              $this.gridApi.stopEditing();
              $this.fireFirst.emit(true);
              return true;
            } else if ((keyCode === 106 || keyCode === 110) && currentIndex === 1) { // * or .
              // $this.gridOptions.rowData[rowIndex][colKey] = 0;
              // $this.gridApi.redrawRows();
              $this.onBtStartEditing(rowIndex, $this.headerCells[currentIndex + 1], null);
              return true;
            }
          }
        },
        cellClass: "align-right"
      };
    }

    ngOnInit() {
    }

    onReady(event) {
      this.gridApi = event.api;
      this.gridColumnApi = event.columnApi;
      this.gridApi.sizeColumnsToFit();
    }
    numberValueParser(params) {
      if (params.newValue.indexOf('/') !== -1) {
        params.newValue = params.newValue.replace('/', '');
      }
      if (params.newValue.indexOf('*') !== -1) {
        params.newValue = params.newValue.replace('*', '');
      }
      if (params.newValue.indexOf('.') !== -1) {
        params.newValue = params.newValue.replace('.', '');
      }
      if (params.newValue.toString().length > 2) {
        return Number(params.newValue.toString().substr(0, 2));
      }
      console.log('newValue:', params.newValue);
      return Number(params.newValue);
    }

    cellValueChanged(event) {
      // console.log(event)
    }

    onFocus(event) {
      if (event.rowIndex) {
        const rowIndex = event.rowIndex;
        const headerName = event.column.colDef.headerName;
        const field = event.column.colDef.field;
        this.gridApi.startEditingCell({rowIndex: rowIndex, colKey: field, rowPinned: null, keyPress: 46});
      }
    }

    onBtStartEditing(rowIndex, colKey, key, char = null, pinned = null, realRowIndex = null, realColkey = null) {
      this
      .gridApi
      .setFocusedCell(rowIndex, colKey, '');
      this
      .gridApi
      .startEditingCell({rowIndex: rowIndex, colKey: colKey, rowPinned: pinned, keyPress: key, charPress: char});
      if (realRowIndex && realColkey) {
        const preValue = this.gridOptions.rowData[realRowIndex][realColkey];
        if (preValue === 0) {
          this.gridOptions.rowData[realRowIndex][realColkey] = this.gridOptions.rowData[realRowIndex - 1][realColkey];
        }
        this.gridApi.redrawRows();
      }
      return true;
    }

    setFocus(event) {
      this.gridOptions.rowData[0]['number'] = 0;
      this.gridApi.redrawRows();
      this
        .gridApi
        .startEditingCell({rowIndex: 0, colKey: 'number', rowPinned: null, keyPress: 46, charPress: ''});
    }

}
