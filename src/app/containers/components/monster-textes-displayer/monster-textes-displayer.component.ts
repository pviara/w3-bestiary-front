import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { MonsterTextes } from 'src/app/models/monster/monster';

@Component({
  inputs: ['mousePosition'],
  selector: 'monster-textes-displayer',
  templateUrl: './monster-textes-displayer.component.html',
  styleUrls: ['./monster-textes-displayer.component.scss']
})
export class MonsterTextesDisplayerComponent implements AfterViewInit {
  mousePosition!: { x: number; y: number; };
  
  @Output()
  reportTextTypo = new EventEmitter<string>();
  
  @Input()
  textes!: MonsterTextes;

  private _selectedTypo!: string;
  
  @ViewChild('typoTooltip')
  private _typoTooltip!: ElementRef;
  
  constructor(private renderer: Renderer2) {}
  
  ngAfterViewInit() {
    document
      .body
      .addEventListener(
        'mousemove', 
        (mouseEvent: MouseEvent) => {
          this.mousePosition = {
            x: mouseEvent.clientX,
            y: mouseEvent.clientY
          };
        }
      );
  }
  
  handleSelection({ view }: MouseEvent) {
    this.setTooltipPosition(-4000, -4000);
    
    const selection = view?.getSelection();
    if (!selection || selection?.type !== 'Range') {
      return;
    }
    
    const { 
      anchorNode,
      anchorOffset,
      focusOffset,
      focusNode
    } = selection;
    if (!focusNode || !focusNode.nodeValue) {
      return;
    }

    const start = anchorOffset > focusOffset
      ? focusOffset
      : anchorOffset;
    
    const end = focusOffset > anchorOffset
      ? focusOffset
      : anchorOffset;
    const characters = Array.from(focusNode.nodeValue);
    const selected = characters
      .splice(
        start,
        end - start
      )
      .join('');
    if (!selected.trim()) {
      return;
    }

    // multi-paragraph selection
    if (
      !anchorNode
      ?.textContent
      ?.includes(selected)
    ) {
      return;
    }

    this.setTooltipPosition(this.mousePosition.x, this.mousePosition.y - 60);

    this._selectedTypo = selected;
  }

  onReportTextTypo() {
    if (!this._selectedTypo) {
      return;
    }

    this.reportTextTypo.emit(this._selectedTypo);
  }

  private setTooltipPosition(x: number, y: number) {
    this
      .renderer
      .setStyle(
        this._typoTooltip.nativeElement, 
        'left',
        `${x}px`
      );

    this
      .renderer
      .setStyle(
        this._typoTooltip.nativeElement, 
        'top',
        `${y}px`
      );
  }
}