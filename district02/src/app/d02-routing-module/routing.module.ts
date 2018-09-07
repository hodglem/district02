import { RouterModule } from '@angular/router';
import { HomePageComponent } from '../d02-components/home-page-component/home-page.component';
import { NgModule } from '@angular/core';
import { MeetingsComponent } from '../d02-components/meetings-component/meetings.component';
import { EventsComponent } from '../d02-components/events-component/events.component';
import { AdminComponent } from '../d02-components/admin-component/admin.component';



const appRoutes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomePageComponent },
    { path: 'aa_dev', component: HomePageComponent },
    { path: 'meetings', component: MeetingsComponent },
    { path: 'events', component: EventsComponent },
    { path: 'admin', component : AdminComponent}

];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            { enableTracing: true }
        )
    ],
    exports: [
        RouterModule
    ]
})

export class RoutingModule { }
