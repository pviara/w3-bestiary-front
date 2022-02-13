import { Component, ElementRef, Input, TemplateRef, ViewChild } from '@angular/core';
import { MonsterTextes } from 'src/app/models/monster/monster';

@Component({
  inputs: ['mousePosition'],
  selector: 'monster-textes-displayer',
  templateUrl: './monster-textes-displayer.component.html',
  styleUrls: ['./monster-textes-displayer.component.scss']
})
export class MonsterTextesDisplayerComponent {
  isTypoTooltipDisplayed = false;

  mousePosition!: { x: number; y: number; };
  
  @Input()
  textes!: MonsterTextes;

  @ViewChild('author')
  private _author!: ElementRef;

  @ViewChild('description')
  private _description!: ElementRef;

  @ViewChild('quoteText')
  private _quoteText!: ElementRef;
  
  ngAfterViewInit() {
    console.log(this._author.nativeElement.innerText);
    console.log(this._description.nativeElement.innerText);
    console.log(this._quoteText.nativeElement.innerText);

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
    this.isTypoTooltipDisplayed = false;

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

    console.log(selection);
    
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

    this.isTypoTooltipDisplayed = true;

    console.log(selected, this.mousePosition);
  }
}