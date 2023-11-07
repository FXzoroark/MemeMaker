import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule} from '@angular/material/select'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon';

import { NgxMoveableModule } from 'ngx-moveable';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DragboxComponent } from './shared/dragbox/dragbox.component';
import { MemesComponent } from './memes/memes.component';
import { DialogSelectTemplateComponent } from './shared/dialog-select-template/dialog-select-template.component';
import { DialogMemeComponent } from './shared/dialog-meme/dialog-meme.component';
import { FormMemeComponent } from './shared/form-meme/form-meme.component';
import { FormSelectTemplateComponent } from './shared/form-select-template/form-select-template.component';
import { CardComponent } from './shared/card/card.component';
import { UpdateComponent } from './update/update.component';
import { FormUploadTemplateComponent } from './shared/form-upload-template/form-upload-template.component';
import { FileDragAndDropDirective } from './shared/directives/file-drag-and-drop.directive';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { MAT_COLOR_FORMATS, NGX_MAT_COLOR_FORMATS, NgxMatColorPickerModule } from '@angular-material-components/color-picker';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DragboxComponent,
    MemesComponent,
    DialogSelectTemplateComponent,
    DialogMemeComponent,
    FormMemeComponent,
    FormSelectTemplateComponent,
    CardComponent,
    UpdateComponent,
    FormUploadTemplateComponent,
    FileDragAndDropDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    NgxMoveableModule,
    NgxMatFileInputModule,
    NgxMatColorPickerModule
  ],
  providers: [
    {provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
