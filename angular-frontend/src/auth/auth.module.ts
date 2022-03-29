import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
@NgModule({
  imports: [ BrowserModule, 
            AuthRoutingModule 
        ],
  declarations:[
    RegisterComponent,
    LoginComponent
  ],
  exports: []
})
export class AuthModule { }