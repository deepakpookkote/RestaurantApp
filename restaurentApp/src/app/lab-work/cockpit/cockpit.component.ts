import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.scss']
})
export class CockpitComponent implements OnInit {

  @Output() serverCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  @Output('bpCreated') blueprintCreated = new EventEmitter<{bluePrintName: string, bluePrintContent: string}>();

  // newServerName = '';
  // newServerContent = '';

  @ViewChild('serverContentRef', {static: true}) serverContentInput: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  onAddServer(serverNameRef: HTMLInputElement) {
    this.serverCreated.emit({serverName: serverNameRef.value, serverContent: this.serverContentInput.nativeElement.value});
  }

  onAddBluePrint(serverNameRef: HTMLInputElement) {
    this.blueprintCreated.emit({bluePrintName: serverNameRef.value, bluePrintContent: this.serverContentInput.nativeElement.value});
  }

}
