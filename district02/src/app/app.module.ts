import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatToolbarModule, MatMenuModule, MatIconModule, MatCardModule, MatTableModule, MatSortModule, MatPaginatorModule } from '@angular/material';

import { AppComponent } from './app.component';
import { RoutingModule } from './d02-routing-module/routing.module';
import { HeaderComponent } from './d02-components/header-component/header.component';
import { HomePageComponent } from './d02-components/home-page-component/home-page.component';
import { DesktopHeaderComponent } from './d02-components/header-component/desktop-header/desktop-header.component';
import { MobileHeaderComponent } from './d02-components/header-component/mobile-header/mobile-header.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { MeetingsComponent } from './d02-components/meetings-component/meetings.component';

import { HttpClientModule } from '@angular/common/http';
import { MeetingsService } from './d02-services/meetings-service';
import { EventsComponent } from './d02-components/events-component/events.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomePageComponent,
    DesktopHeaderComponent,
    MobileHeaderComponent,
    MeetingsComponent,
    EventsComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatTableModule,
    RoutingModule,
    MatIconModule,
    MatCardModule,
    FlexLayoutModule,
    HttpClientModule,
    MatSortModule,
    MatPaginatorModule,
    AgmCoreModule.forRoot({
      apiKey : 'AIzaSyC_5Cm5cGQ4iBbSMQAdDoknp1gvvLPiL8A'
    })
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    MeetingsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
