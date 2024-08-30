import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { RoutingModule } from "./app.routing";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { APP_BASE_HREF } from "@angular/common";
import { CommonModule } from "@angular/common";
import { DraggableItemComponent } from "./draggable-item/draggable-item.component";
import { DropZoneComponent } from "./drop-zone/drop-zone.component";
import { MatDialogModule } from "@angular/material/dialog";
import { AppComponent } from "./app.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AuthGuard } from "./_auth/guards/auth.guard";
import { TokenIntercept } from "./_auth/tokenintercept";
import { LoginComponent } from "./login/login.component";

//import { LogoutComponent } from './logout/logout.component';

import { AuthService } from "./_auth/services/auth.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,

    //LogoutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    CommonModule,
    RoutingModule,
    ReactiveFormsModule,

    FormsModule,
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: "/" },
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenIntercept,
      multi: true,
    },
    AuthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
