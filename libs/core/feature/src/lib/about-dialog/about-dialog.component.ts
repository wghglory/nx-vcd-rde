import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { VIPModule } from '@vmw/ngx-vip';

@Component({
  selector: 'seed-about-dialog',
  standalone: true,
  imports: [ClarityModule, CommonModule, VIPModule],
  templateUrl: './about-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutDialogComponent {
  licenseYear = process.env['NX_LICENSE_YEAR'];
  appVersion = process.env['NX_APP_VERSION'];
  appName = process.env['NX_APP_NAME'];
  buildDate = process.env['NX_BUILD_DATE'];

  @Input() activeElement: HTMLAnchorElement | undefined;
  @Input() dialogOpen = false;
  @Output() dialogOpenChange = new EventEmitter();

  cancel() {
    this.dialogOpenChange.emit();

    setTimeout(() => {
      this.activeElement?.focus();
    }, 200);
  }
}
