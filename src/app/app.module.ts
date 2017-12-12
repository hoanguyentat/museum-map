import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';


import { AppComponent } from './app.component';
import { ViewInfoComponent } from './view-info/view-info.component';
import { MapInfoService } from './map-info.service';
import { SafeHtmlPipe } from './safe-html.pipe';
import { HomeComponent } from './home/home.component';
import { MapViewComponent } from './map-view/map-view.component';
import { AppRoutingModule } from './/app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    ViewInfoComponent,
    SafeHtmlPipe,
    HomeComponent,
    MapViewComponent
  ],
  imports: [
    BrowserModule,
    LeafletModule.forRoot(),
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    MapInfoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
