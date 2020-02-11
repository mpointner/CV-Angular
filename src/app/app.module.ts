import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {EditableFieldComponent} from "./editable-field/editable-field.component";
import {ItemComponent} from "./item/item.component";
import {CategoryComponent} from './category/category.component';
import {HttpClientModule} from "@angular/common/http";
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {DragDropModule} from '@angular/cdk/drag-drop';
import {HeadComponent} from './head/head.component';
import {IconNamePipe} from './icon-name.pipe';
import { MainComponent } from './main/main.component';
import { LanguageComponent } from './language/language.component';

@NgModule({
  declarations: [
    AppComponent,
    EditableFieldComponent,
    ItemComponent,
    CategoryComponent,
    HeadComponent,
    IconNamePipe,
    MainComponent,
    LanguageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    // Add an icon to the library for convenient access in other components
    library.add(fas);
  }
}
