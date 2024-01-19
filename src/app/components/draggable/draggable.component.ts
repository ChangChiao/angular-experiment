import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'angular-experiment-draggable',
  standalone: true,
  imports: [CommonModule, CdkDropList, CdkDrag],
  template: `<div class="example-container">
      <h2>To do</h2>

      <div
        cdkDropList
        #todoList="cdkDropList"
        [cdkDropListData]="todo"
        [cdkDropListConnectedTo]="[doneList]"
        class="example-list"
        (cdkDropListDropped)="drop($event)"
      >
        @for (item of todo; track item) {
        <div class="example-box" cdkDrag>{{ item }}</div>
        }
      </div>
    </div>

    <div class="example-container">
      <h2>Done</h2>

      <div
        cdkDropList
        #doneList="cdkDropList"
        [cdkDropListData]="done"
        [cdkDropListConnectedTo]="[todoList]"
        class="example-list"
        (cdkDropListDropped)="drop($event)"
      >
        @for (item of done; track item) {
        <div class="example-box" cdkDrag>{{ item }}</div>
        }
      </div>
    </div> `,
  styleUrl: './draggable.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DraggableComponent {
  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
