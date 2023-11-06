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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { AuthService } from './shared/services/auth.service';
import { DialogLoginComponent } from './shared/dialog-login/dialog-login.component';
import { FormLoginComponent } from './shared/form-login/form-login.component';

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
    DialogLoginComponent,
    FormLoginComponent
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
    FormsModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
