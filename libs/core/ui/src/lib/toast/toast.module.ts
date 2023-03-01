import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@seed/shared/module';
import { VmwSimpleTranslateModule } from '@vmw/ngx-utils';

import * as fromToast from './+state/toast.reducer';
import { ToastComponent } from './toast/toast.component';
import { ToastContainerComponent } from './toast-container/toast-container.component';
import { ToastHostComponent } from './toast-host.component';

@NgModule({
  imports: [SharedModule, VmwSimpleTranslateModule, StoreModule.forFeature(fromToast.TOASTS_FEATURE_KEY, fromToast.toastReducer)],
  exports: [ToastHostComponent],
  declarations: [ToastHostComponent, ToastContainerComponent, ToastComponent],
})
export class ToastModule {}
