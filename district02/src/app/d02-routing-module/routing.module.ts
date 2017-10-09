import { RouterModule } from '@angular/router';
import { HomePageComponent } from '../d02-components/home-page-component/home-page.component';
import { NgModule } from '@angular/core';



const appRoutes = [
    { path: '', redirectTo: 'home', pathMatch : 'full'},
    {path: 'home', component: HomePageComponent },
    {path: 'aa_dev', component: HomePageComponent }
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
