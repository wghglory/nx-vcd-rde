import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppHomeComponent } from './../pages/app-home/app-home.component';
import { RemoteEntryComponent } from './entry.component';
import { remoteRoutes } from './entry.routes';

@NgModule({
  declarations: [RemoteEntryComponent, AppHomeComponent],
  imports: [CommonModule, RouterModule.forChild(remoteRoutes)],
  providers: [],
})
export class RemoteEntryModule {}
