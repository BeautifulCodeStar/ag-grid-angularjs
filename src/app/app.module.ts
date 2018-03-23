import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular/main';
import { AppComponent } from './app.component';
import { MyGridApplicationComponent } from './my-grid-application/my-grid-application.component';
import { RedComponentComponent } from './red-component/red-component.component';
import { SecondGridApplicationComponent } from './second-grid-application/second-grid-application.component';
import { HomeComponent } from './home/home.component';
import { ThirdGridApplicationComponent } from './third-grid-application/third-grid-application.component';
import { ForthGridApplicationComponent } from './forth-grid-application/forth-grid-application.component';
import { FifthGridApplicationComponent } from './fifth-grid-application/fifth-grid-application.component';
import { SixthGridApplicationComponent } from './sixth-grid-application/sixth-grid-application.component';

@NgModule({
  declarations: [
    AppComponent,
    MyGridApplicationComponent,
    RedComponentComponent,
    SecondGridApplicationComponent,
    HomeComponent,
    ThirdGridApplicationComponent,
    ForthGridApplicationComponent,
    FifthGridApplicationComponent,
    SixthGridApplicationComponent,
  ],
  imports: [
    BrowserModule,
     AgGridModule.withComponents(
      [
        RedComponentComponent,
        MyGridApplicationComponent,
        SecondGridApplicationComponent,
        ThirdGridApplicationComponent,
        ForthGridApplicationComponent,
        FifthGridApplicationComponent,
        SixthGridApplicationComponent
      ]
        )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
