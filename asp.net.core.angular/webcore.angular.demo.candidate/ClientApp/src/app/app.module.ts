import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';

import { CandidateService } from './candidate/service/candidate.service';
import { CandidateModule } from './candidate/candidate.module';
import { ListComponent } from './candidate/component/list/list.component';
import { FormComponent } from './candidate/component/form/form.component';
import { AboutComponent } from './about/about.component';
import { DetailsComponent } from './candidate/component/details/details.component';
import { UploadimgService } from './candidate/service/uploadimg.service';

import { UserModule } from './user/user.module';
import { IdentityComponent } from './user/component/identity/identity.component';
import { GuardService } from './user/service/guard.service';
import { IdentityService } from './user/service/identity.service';
import { AccountService } from './user/service/account.service';
import { AccountFormComponent } from './user/component/form/form.component';
import { AuthInterceptorService } from './user/service/interceptor.service';
import { MessageService } from './home/component/message/message.service';
import { MessageComponent } from './home/component/message/message.component';

@NgModule({
  declarations: [
    MessageComponent,
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CandidateModule,
    UserModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'about', component: AboutComponent },

      { path: 'candidate', component: ListComponent, canActivate: [GuardService]  },
      { path: 'candidate/add', component: FormComponent},
      { path: 'candidate/add/:id', component: FormComponent },
      { path: 'candidate/edit/:id', component: FormComponent },
      { path: 'candidate/details/:id', component: DetailsComponent },

      { path: 'user/identity/login', component: IdentityComponent },
      { path: 'user/account/register', component: AccountFormComponent }
    ])
  ],
  providers: [
    MessageService,
    CandidateService,
    UploadimgService,
    GuardService,
    IdentityService,
    AccountService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
