import { AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { MonsterTextes } from 'src/app/models/monster/monster';

@Component({
  inputs: ['mousePosition'],
  selector: 'monster-textes-displayer',
  templateUrl: './monster-textes-displayer.component.html',
  styleUrls: ['./monster-textes-displayer.component.scss']
})
export class MonsterTextesDisplayerComponent implements AfterViewInit {
  mousePosition!: { x: number; y: number; };
  
  @Input()
  textes!: MonsterTextes;

  @ViewChild('typoTooltip')
  private typoTooltip!: ElementRef;
  
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
  }

  private setTooltipPosition(x: number, y: number) {
    this
      .renderer
      .setStyle(
        this.typoTooltip.nativeElement, 
        'left',
        `${x}px`
      );

    this
      .renderer
      .setStyle(
        this.typoTooltip.nativeElement, 
        'top',
        `${y}px`
      );
  }
}