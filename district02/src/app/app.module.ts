import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatToolbarModule, MatMenuModule, MatIconModule, MatCardModule } from '@angular/material';

import { AppComponent } from './app.component';
import { RoutingModule } from './d02-routing-module/routing.module';
import { HeaderComponent } from './d02-components/header-component/header.component';
import { HomePageComponent } from './d02-components/home-page-component/home-page.component';
import { DesktopHeaderComponent } from './d02-components/header-component/desktop-header/desktop-header.component';
import { MobileHeaderComponent } from './d02-components/header-component/mobile-header/mobile-header.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomePageComponent,
    DesktopHeaderComponent,
    MobileHeaderComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    RoutingModule,
    MatIconModule,
    MatCardModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
