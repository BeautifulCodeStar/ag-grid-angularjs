import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {GridOptions, ColumnApi, GridApi} from 'ag-grid';
import {RedComponentComponent} from '../red-component/red-component.component';

@Component({
  selector: 'app-fifth-grid-application',
  templateUrl: './fifth-grid-application.component.html',
  styleUrls: ['./fifth-grid-application.component.css']
})
export class FifthGridApplicationComponent implements OnInit {

  @Output() fireSixth = new EventEmitter<boolean>();
     gridOptions: GridOptions;
    defaultColDef;
     gridApi: GridApi;
     gridColumnApi: ColumnApi;
     rowData: any[];
     headerCells = [
      'number', 'amount', 'extraCmd', 'extraAmount'
    ];
     secondFlag: Boolean = false;

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
            width: 100
        }
      ];
      this.gridOptions.rowData = [
        {number: 5,  amount: 10, extraCmd: 21, extraAmount: 33},
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
            console.log(key, keyCode);
            if (keyCode === 13) { // Enter
              if (currentIndex !== 0 && currentIndex !== 2) {
                if ($this.gridOptions.rowData.length - 1 === rowIndex) {
                  const data = {number: '', amount: '', extraCmd: '', extraAmount: ''};
                  $this.gridOptions.rowData.push(data);
                  $this.gridApi.updateRowData({add: [data]});
                }
                $this.onBtStartEditing(rowIndex + 1, $this.headerCells[0], 46, null, null, null, rowIndex, colKey);
              } else {
                $this.onBtStartEditing(rowIndex, $this.headerCells[currentIndex + 1], 46, null, null, null, rowIndex, colKey);
              }
              return true;
            } else if (keyCode === 111 || keyCode === 191) { // Slash move focus to the next table
              $this.gridApi.stopEditing();
              $this.fireSixth.emit(true);
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
      if (!isNaN(params.newValue)) {
        if (params.newValue.toString().length > 2) {
          return params.newValue.toString().substr(0, 2);
        }
        return params.newValue;
      } else {
        return '';
      }
    }

    onFocus(event) {
      if (event.rowIndex) {
        const rowIndex = event.rowIndex;
        const headerName = event.column.colDef.headerName;
        const field = event.column.colDef.field;
        this.gridApi.startEditingCell({rowIndex: rowIndex, colKey: field, rowPinned: null});
      }
    }

    onBtStartEditing(rowIndex, colKey, key = null, char = null, pinned = null, type = null, realRowIndex = null, realColkey = null) {
      this
      .gridApi
      .setFocusedCell(rowIndex, colKey, '');
      this
      .gridApi
      .startEditingCell({rowIndex: rowIndex, colKey: colKey, rowPinned: pinned, keyPress: key, charPress: char});
      if (realRowIndex && realColkey && !type) {
        const preValue = this.gridOptions.rowData[realRowIndex][realColkey];
        console.log('Prevalue:', preValue)
        if (preValue === '') {
          this.gridOptions.rowData[realRowIndex][realColkey] = this.gridOptions.rowData[realRowIndex - 1][realColkey];
        }
        this.gridApi.redrawRows();
      }
      if (type) {
        this.gridOptions.rowData[realRowIndex]['extraCmd'] = type;
        this.gridApi.redrawRows();
        const that = this;
        setTimeout(() => {
          that
          .gridApi
          .startEditingCell({rowIndex: rowIndex, colKey: colKey, keyPress: 46});
        }, 50);
      }
      return true;
    }

    keyUp(event) {
      const current = this.gridApi.getEditingCells();
      console.log(current);
      if (current && current.length > 0) {
        const rowIndex = current[0]['rowIndex'];
        const colKey = current[0]['column']['colId'];
        const keyCode = event.keyCode;
        const currentIndex = this.headerCells.indexOf(colKey);
        if (keyCode === 37 && !(rowIndex === 0 && colKey === 'number')) { // for left key
          if (rowIndex !== 0 && colKey === 'number') {
            this
          .onBtStartEditing(rowIndex - 1, this.headerCells[3]);
          } else {
            this
            .onBtStartEditing(rowIndex, this.headerCells[currentIndex - 1]);
          }
        } else if (keyCode === 38 && rowIndex !== 0) { // for up key
          this
          .onBtStartEditing(rowIndex - 1, colKey);
        } else if (keyCode === 39) { // for right key
          if (this.gridOptions.rowData.length - 1 <= rowIndex && colKey === 'amount') {
            return false;
          } else if (colKey === 'amount') {
            this
            .onBtStartEditing(rowIndex + 1, this.headerCells[0]);
            return true;
          }
          this
          .onBtStartEditing(rowIndex, this.headerCells[currentIndex + 1]);
        } else if (keyCode === 40) { // for down key
          if (this.gridOptions.rowData.length - 1 <= rowIndex) {
            return false;
          }
          this
          .onBtStartEditing(rowIndex + 1, colKey);
        }
      }
    }

    setFocus(event) {
      let rowIndex = this.gridOptions.rowData.length;
      const row = this.gridApi.getDisplayedRowAtIndex(rowIndex - 1);
      if (row && row.data.number !== "") {
        const data = {number: '', amount: '', extraCmd: '', extraAmount: ''};
        this.gridOptions.rowData.push(data);
        this.gridApi.updateRowData({add: [data]});
      }
      rowIndex = this.gridOptions.rowData.length - 1;
      this
        .gridApi
        .startEditingCell({rowIndex: rowIndex, colKey: 'number', rowPinned: null, keyPress: 46, charPress: ''});
      this.gridApi.redrawRows();
      const that = this;
        setTimeout(() => {
          that
          .gridApi
          .startEditingCell({rowIndex: rowIndex, colKey: 'number', keyPress: 46});
        }, 50);
    }

}
