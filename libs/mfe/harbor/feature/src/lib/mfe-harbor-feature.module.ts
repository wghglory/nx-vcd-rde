import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PageContainerComponent, SharedUiModule } from '@seed/shared/ui';

import { GreetComponent } from './greet/greet.component';
import { HomeComponent } from './home/home.component';
import { routes } from './lib.routes';

@NgModule({
  imports: [SharedUiModule, RouterModule.forChild(routes), PageContainerComponent, ReactiveFormsModule],
  declarations: [HomeComponent, GreetComponent],
})
export class MfeHarborFeatureModule {}
