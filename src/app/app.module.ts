import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';


import { AppComponent } from './app.component';
import { ViewInfoComponent } from './view-info/view-info.component';
import { MapInfoService } from './map-info.service';
import { SafeHtmlPipe } from './safe-html.pipe';


@NgModule({
  declarations: [
    AppComponent,
    ViewInfoComponent,
    SafeHtmlPipe
  ],
  imports: [
    BrowserModule,
    LeafletModule.forRoot(),
    HttpClientModule
  ],
  providers: [
    MapInfoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
