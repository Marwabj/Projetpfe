import { Component } from '@angular/core';
import { EmtConfig, EmtData, NgxEditableMaterialTableComponent } from 'ngx-editable-material-table';
import { CommonModule } from '@angular/common';

// Optional, static typing of column names
const columns = ['position', 'name', 'weight', 'symbol'] as const;
type ColumnName = typeof columns[number];

@Component({
	selector: 'app-root',
	template: `
    <ngx-editable-material-table
      [data]="data"
      [displayedColumns]="displayedColumns"
      [config]="config"
    ></ngx-editable-material-table>
  `,
	standalone: true,
	imports: [NgxEditableMaterialTableComponent, CommonModule]
})
export class TableCreationPopupComponent {
	data: EmtData<ColumnName>[] = [
		{ position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
		{ position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
		{ position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
		{ position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
		{ position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
		{ position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
		{ position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
		{ position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
		{ position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
		{ position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
	];
	displayedColumns = ['position', 'name', 'weight', 'symbol'];
	config: EmtConfig = {
		// Column definition
		columns: {
			position: { name: 'Position' },
			name: { name: 'Name' },
			weight: { name: 'Weight', editable: false },
			symbol: { name: 'Symbol', editable: false }
		},
		// Callbacks
		beforeChange: (changes) => {
			console.log('beforeChange', changes);
			if (changes.updated.length && changes.updated[0].value === 'a') {
				// Modify before changes are applied
				changes.updated[0].value = 'abc';
			}

			if (changes.updated.length && changes.updated[0].value === 'b') {
				// Prevent changes to this value
				return null;
			}

			return changes;
		},
		afterChanged: (changes) => {
			console.log('afterChanged', changes);
		}
	};
}

// import { CommonModule } from "@angular/common";
// import { Component, Inject, inject } from "@angular/core";
// import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
// import { FormJsonCreator } from "../services/formjsoncreator.service";
// import { FormcontrolNameGenerator } from "../services/formcontrolnamegenerator.service";
// import { OptionsInterface } from "../interfaces/options.interface";


// @Component({
// 	standalone: true,
// 	imports: [CommonModule, MatDialogModule, ReactiveFormsModule,],
// 	selector: "fb-table-popup",
// 	templateUrl: "./table-creation-popup.component.html",
// })
// export class TableCreationPopupComponent {
// 	public dialogRef = inject(MatDialogRef<TableCreationPopupComponent>);
// 	private jsonStorage = inject(FormJsonCreator);
// 	private nameGenerator = inject(FormcontrolNameGenerator);

// 	label: string = "";
// 	value: string = "";
// 	requiredField: boolean = false;
// 	numberOfOptions: number | undefined;
// 	optionsEntry: OptionsInterface[] = [];
// 	optionSelect: boolean = false;
// 	enableSubmit: boolean = false;
// 	constructor(@Inject(MAT_DIALOG_DATA) public data: { class: string, rowId?: number, columnId?: number }) { }


// 	public placeholder: string = "";
// 	public class: string = this.data.class as string;
// 	public type: string = "text";
// 	public ValidationAdd: string = "No";
// 	public showNumOfVals: boolean = false;
// 	public numberOfValidation: number = 0;
// 	public validatorSelector: boolean = false;
// 	tableForm = new FormGroup({
// 		header: new FormControl('', [Validators.required]),
// 		numberOfRows: new FormControl(0, [Validators.required]),
// 		numberOfColumns: new FormControl(0, [Validators.required]),
// 		rows: new FormArray([]),
// 		requiredField: new FormControl(false)
// 	});

// 	get rows(): FormArray {
// 		return this.tableForm.get('rows') as FormArray;
// 	}

// 	onNumberOfRowsChange(): void {
// 		const numRows = this.tableForm.get('numberOfRows')?.value || 0;
// 		this.updateRows(numRows);
// 	}

// 	onNumberOfColumnsChange(): void {
// 		const numCols = this.tableForm.get('numberOfColumns')?.value || 0;
// 		this.updateColumns(numCols);
// 	}

// 	private updateRows(numRows: number): void {
// 		const currentRows = this.rows.controls.length;
// 		if (numRows > currentRows) {
// 			for (let i = currentRows; i < numRows; i++) {
// 				const columns = new FormArray([]);
// 				this.rows.push(columns);
// 			}
// 		} else if (numRows < currentRows) {
// 			for (let i = currentRows; i > numRows; i--) {
// 				this.rows.removeAt(i - 1);
// 			}
// 		}
// 	}

// 	private updateColumns(numCols: number): void {
// 		this.rows.controls.forEach(row => {
// 			const currentCols = (row as FormArray).controls.length;
// 			if (numCols > currentCols) {
// 				for (let i = currentCols; i < numCols; i++) {
// 					(row as FormArray).push(new FormControl(''));
// 				}
// 			} else if (numCols < currentCols) {
// 				for (let i = currentCols; i > numCols; i--) {
// 					(row as FormArray).removeAt(i - 1);
// 				}
// 			}
// 		});
// 	}

// 	onSubmit(): void {
// 		if (this.tableForm.valid) {
// 			this.dialogRef.close(this.tableForm.value);
// 		}
// 	}
// }
