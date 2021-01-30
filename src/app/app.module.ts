import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { InterfaceManagingService } from './interface-managing.service';
import { RegisterLoginComponent } from './register-login/register-login.component';
import { FooterComponent } from './footer/footer.component';
import { EditorComponent } from './editor/editor.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResizableModule } from 'angular-resizable-element';
import { ManipulationService } from './manipulation.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    RegisterLoginComponent,
    FooterComponent,
    EditorComponent,
    PageNotFoundComponent,
    ForgetPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatTooltipModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    MatCheckboxModule,
    DragDropModule,
    MatSliderModule,
    FormsModule,
    ResizableModule
  ],
  providers: [
    InterfaceManagingService,
    ManipulationService,
    { provide : LocationStrategy , useClass : HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
