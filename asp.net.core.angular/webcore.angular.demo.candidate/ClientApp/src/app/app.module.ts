import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';

import { CandidateService } from './candidate/service/candidate.service';
import { CandidateModule } from './candidate/candidate.module';
import { ListComponent } from './candidate/component/list/list.component';
import { FormComponent } from './candidate/component/form/form.component';
import { AboutComponent } from './about/about.component';



@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    CandidateModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'about', component: AboutComponent },

      { path: 'candidate', component: ListComponent },
      { path: 'candidate/add/:id', component: FormComponent }
    ])
  ],
  providers: [CandidateService],
  bootstrap: [AppComponent]
})
export class AppModule { }