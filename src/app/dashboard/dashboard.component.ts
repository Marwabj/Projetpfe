import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
//import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Preview } from "../preview/preview.component";
import { FormJsonCreator } from "../services/formjsoncreator.service";
import { FormcontrolInterface } from "../interfaces/formcontrol.interface";
import { DraggableItemComponent } from "../draggable-item/draggable-item.component";
import { DropZoneComponent } from "../drop-zone/drop-zone.component";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [
    CommonModule,
    //MatDialogModule,
    MatIconModule,
    DraggableItemComponent,
    DropZoneComponent,
    Preview,
  ],
  templateUrl: "./dashboard.component.html",
  styles: [
    `
      .scroll {
        overflow-x: hidden;
        overflow-y: scroll;
      }
      .drop-zone {
        border: 2px dashed #ccc;
        padding: 2%;
      }
    `,
  ],
})
export class DashboardComponent implements OnInit {
  constructor() {}
  //dialog = inject(MatDialog);
  jsonCreated = inject(FormJsonCreator);
  jsonFormat: FormcontrolInterface[] = [];
  draggableItems: { label: string; type: string; icon: string }[] = [
    { label: "Input Field", type: "text", icon: "text_fields" },
    { label: "Text Area", type: "textarea", icon: "text_format" },
    { label: "Select Box", type: "select", icon: "arrow_drop_down_circle" },
    { label: "Check Box", type: "checkbox", icon: "check_box" },
    { label: "Radio Button", type: "radio", icon: "radio_button_checked" },
    { label: "File Upload", type: "fileupload", icon: "cloud_upload" },
    { label: "Tableau", type: "Tableau", icon: "table_chart" },
  ];

  public ngOnInit(): void {
    this.viewJson();
  }

  onClickPreview(): void {
    // this.dialog.open(Preview, {
    //   width: '65%'
    // });
  }

  viewJson(): void {
    this.jsonFormat = this.jsonCreated.getAllFields();
    // ajouter le code pour enregistrer le json dans la base de données
    // this.http.post(environment['apiBaseUrl'] + '/api/survey/add', this.jsonFormat)
  }
}
