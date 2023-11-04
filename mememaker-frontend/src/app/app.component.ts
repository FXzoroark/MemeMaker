import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mememaker-frontend';

  constructor(private _matIconRegistry: MatIconRegistry, private _domSanitizer: DomSanitizer){
    this._matIconRegistry.addSvgIcon('icon-delete', this._domSanitizer.bypassSecurityTrustResourceUrl('/assets/icon-delete.svg'));
    this._matIconRegistry.addSvgIcon('icon-edit', this._domSanitizer.bypassSecurityTrustResourceUrl('/assets/icon-edit.svg'));
    this._matIconRegistry.addSvgIcon('icon-download', this._domSanitizer.bypassSecurityTrustResourceUrl('/assets/icon-download.svg'))
  }
}
