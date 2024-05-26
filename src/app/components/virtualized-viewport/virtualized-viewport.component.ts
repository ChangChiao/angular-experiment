import {
  CdkVirtualScrollViewport,
  ScrollingModule,
} from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

interface ListRange {
  start: number;
  end: number;
}

@Component({
  selector: 'angular-experiment-virtualized-viewport',
  standalone: true,
  imports: [CommonModule, ScrollingModule],
  template: `
    <cdk-virtual-scroll-viewport [itemSize]="itemSize">
      <ng-container *cdkVirtualFor="let item of virtualItems"></ng-container>
      <ng-content></ng-content>
    </cdk-virtual-scroll-viewport>
  `,
  styleUrl: './virtualized-viewport.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VirtualizedViewportComponent implements OnInit, OnChanges {
  @Input() totalItems: number = 0;
  @Input() itemSize: number = 0;
  @Output() itemsRangeChange = new EventEmitter<ListRange>();

  @ViewChild(CdkVirtualScrollViewport, { static: true })
  cdkViewport: CdkVirtualScrollViewport | undefined;

  virtualItems: undefined[] = [];

  constructor() {}

  ngOnInit() {
    this.cdkViewport?.renderedRangeStream.subscribe((range: ListRange) => {
      this.itemsRangeChange.emit(range);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['totalItems']) {
      this.virtualItems = Array.from({ length: this.totalItems });
      this.cdkViewport?.checkViewportSize();
    }
  }
}
