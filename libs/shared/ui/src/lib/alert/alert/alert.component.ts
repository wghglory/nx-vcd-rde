import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'seed-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
  @Input() type = 'danger';
  @Input() isSmall = false;
  @Input() error = { message: '' } as HttpErrorResponse;
}
