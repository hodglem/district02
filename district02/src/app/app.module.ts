import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// tslint:disable-next-line:max-line-length
import { MatButtonModule, MatToolbarModule, MatMenuModule, MatIconModule, MatCardModule, MatTableModule, MatSortModule, MatPaginatorModule, MatExpansionModule, MatTabsModule, MatFormFieldModule, MatSelectModule, MatSlider, MatSliderModule, MatInputModule, MatRadioModule, MatChipsModule } from '@angular/material';

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
import { AdminComponent } from './d02-components/admin-component/admin.component';

import { FormsModule } from '@angular/forms';
import 'hammerjs';
import { CityService } from './d02-services/city-service';
import { LocationService } from './d02-services/location-service';
import { OptionsService } from './d02-services/options-service';
import { NumberOnlyDirective } from './d02-directives/number-only.directive';
import { PostMeetingService } from './d02-services/post-meeting-service';
import { MeetingManagerComponent } from './d02-components/managers/meeting-manager/meeting-manager.component';
import { MeetingsTableComponent } from './d02-components/meetings-table-component/meetings-table.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomePageComponent,
    DesktopHeaderComponent,
    MobileHeaderComponent,
    MeetingsComponent,
    EventsComponent,
    AdminComponent,
    NumberOnlyDirective,
    MeetingManagerComponent,
    MeetingsTableComponent


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
    MatExpansionModule,
    MatTabsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSliderModule,
    MatInputModule,
    FormsModule,
    MatRadioModule,
    MatChipsModule,


    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC_5Cm5cGQ4iBbSMQAdDoknp1gvvLPiL8A'
    })
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    MeetingsService, CityService, LocationService, OptionsService, PostMeetingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
