import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SalesPersonListComponent } from './sales-person-list/sales-person-list.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    SalesPersonListComponent
  ],
    imports: [
        BrowserModule,
        CommonModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
