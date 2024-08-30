import { Component, Input } from "@angular/core";
import { MatIconModule } from '@angular/material/icon';

@Component({
    standalone: true,
    selector: 'fb-draggable-item',
    imports: [MatIconModule],
    template: `
  <li class="nav-item">
        <div
        class="draggable-item"
        draggable="true"
        (dragstart)="dragStart($event)">
        <mat-icon>{{icon}}</mat-icon>        
        {{label}}
    </div>
  </li>
    `,
    styles: [`.draggable-item {
        cursor: move;
    }`]
})
export class DraggableItemComponent {
    @Input() label: string = "";
    @Input() type: string = "";
    @Input() icon: string = "";
    dragStart(event: DragEvent): void {
        event.dataTransfer?.setData("text/plain", JSON.stringify({ label: this.label }));
    }
}