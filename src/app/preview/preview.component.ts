import { CommonModule } from "@angular/common";
import { Component, inject, ElementRef, ViewChild } from "@angular/core";
import { FormcontrolInterface } from "../interfaces/formcontrol.interface";
import { ValidatorInterface } from "../interfaces/validator.interface";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { FormJsonCreator } from "../services/formjsoncreator.service";
//import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatIconModule } from '@angular/material/icon';
import { CheckboxOptionsInterface } from "../interfaces/checkbox.interface";

@Component({
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, //MatDialogModule,
        MatIconModule],
    selector: 'fb-preview',
    templateUrl: './preview.component.html',
    styleUrls: ['./preview.component.css']
})

export class Preview {
    @ViewChild('preview', { static: true }) preview: ElementRef;

    downloadPreview() {
        const htmlContent = `
      <html>
      <head>
        <style>
          /* Add your inlined styles here */
          h1 {
            color: blue;
          }
          p {
            font-size: 16px;
          }
          button {
            margin-top: 20px;
          }
        </style>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      </head>
      <body>
        ${this.preview.nativeElement.innerHTML}
        <script>
          function onSubmit() {
            alert('This is a JavaScript alert from the preview!');
          }
        </script>
      </body>
      </html>
    `;
        this.downloadFile(htmlContent, 'preview.html', 'text/html');
    }

    private downloadFile(content: string, fileName: string, contentType: string) {
        const blob = new Blob([content], { type: contentType });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a); // Append anchor to the body
        a.click();
        document.body.removeChild(a); // Remove anchor from the body
        window.URL.revokeObjectURL(url);
    }
    fb = inject(FormBuilder);
    formJson = inject(FormJsonCreator);
    //public dialogRef = inject(MatDialogRef<Preview>);
    form: FormcontrolInterface[];
    formSavedValues: any = [];
    constructor() {
        this.form = this.formJson.getAllFields();
    }
    dynamicForm: FormGroup = this.fb.group({}, { updateOn: 'submit' });
    public ngOnInit(): void {
        let formGroup: any = {};

        this.form.forEach((control: FormcontrolInterface) => {
            let controlValidators: any = [];
            if (control.validators) {
                control.validators.forEach((val: ValidatorInterface) => {
                    if (val.validationName === 'required') controlValidators.push(Validators.required);
                    if (val.validationName === 'email') controlValidators.push(Validators.email);
                    if (val.validationName === 'maxlength') controlValidators.push(Validators.maxLength(val.maxLength as number));
                    if (val.validationName === 'minlength') controlValidators.push(Validators.minLength(val.minLength as number));
                    if (val.validationName === 'pattern') controlValidators.push(Validators.pattern(val.pattern as string));
                })
            }
            if (control.type !== 'checkbox' && control.type !== 'layout') formGroup[control.name] = new FormControl(control.value ? control.value : '', controlValidators);
            else if (control.type === 'checkbox') {
                formGroup[control.name] = this.createCheckboxForm(control.checkboxOptions as CheckboxOptionsInterface[]);
            }
            this.formSavedValues.push({ type: control.type, question: control.name, fields: formGroup[control.name].value });
        });
        this.dynamicForm = this.fb.group(formGroup);
    }

    private createCheckboxForm(options: CheckboxOptionsInterface[]) {
        const group: any = {};
        options.forEach(option => {
            group[option.value] = new FormControl(false);
        });
        return this.fb.group(group);
    }

    onSubmit(): void {
        //console.log(this.dynamicForm);
        //this.dialogRef.close();
    }

    onReset(): void {
        this.dynamicForm.reset();
    }

    getValidationError(control: FormcontrolInterface): string {
        const myFormControl = this.dynamicForm.get(control.name);
        let errorMessage: string = ''
        control.validators?.forEach((val) => {
            if (myFormControl?.hasError(val.validationName as string)) {
                errorMessage = val.message as string;
            }
        });
        return errorMessage;
    }

    saveForm(): void {
        console.log(this.form.values);
    }
}
