import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ClarityIcons, storageIcon } from '@cds/core/icon';
import { SharedModule } from '@seed/shared/modules';

ClarityIcons.addIcons(storageIcon);

@Component({
  selector: 'seed-about-dialog',
  standalone: true,
  imports: [SharedModule],
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
