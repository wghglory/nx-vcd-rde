import { animate, animateChild, group, keyframes, query, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, EventEmitter, HostListener, Input, NgZone, OnInit, Optional, Output } from '@angular/core';
import {
  componentPrimaryEnterCurve,
  componentPrimaryEnterTiming,
  componentPrimaryLeaveCurve,
  componentPrimaryLeaveTiming,
  DISMISS_ICON_CURVE,
  DISMISS_ICON_DELAY,
  DISMISS_ICON_DURATION,
  GRADIENT_DELAY,
  GRADIENT_DURATION,
  GRADIENT_LEAVE_CURVE,
  linePrimaryEnterCurve,
  linePrimaryEnterDelay,
  linePrimaryEnterTiming,
  lineSecondaryEnterCurve,
  lineSecondaryEnterDelay,
  lineSecondaryEnterTiming,
  multiply,
} from '@seed/shared/styles';
import { VmwSegmentService, VmwSimpleTranslateService } from '@vmw/ngx-utils';
import { take, timer } from 'rxjs';

import { ToastType } from '../+state/toast.model';
import { TRANSLATIONS } from '../toast.l10n';

const AUTODISMISS_TIMEOUT_SECONDS = 6;
const TRACKED_TAG = {
  A: true,
  BUTTON: true,
};

@Component({
  selector: 'seed-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [
    trigger('launchToast', [
      transition(':enter', [
        // toast parent element animation
        group([
          style({
            transform: 'translateX(48px) scale(0, 1)',
          }),
          animate(
            `${multiply(componentPrimaryEnterTiming)}ms ${componentPrimaryEnterCurve}`,
            style({
              transform: 'translateX(0) scale(1, 1)',
            }),
          ),

          // use optional: true for if/else elements
          query('.checkmark', animateChild(), { optional: true }),
          query('#info-icon-dot', animateChild(), { optional: true }),
          query('#info-icon-line', animateChild(), { optional: true }),
          query('#warn-icon-dot', animateChild(), { optional: true }),
          query('#warn-icon-line', animateChild(), { optional: true }),
          query('#error-icon-dot', animateChild(), { optional: true }),
          query('#error-icon-line', animateChild(), { optional: true }),
          query('.gradient', animateChild()),
          query('.dismiss', animateChild(), { optional: true }),
        ]),
      ]),

      // START LEAVE ANIMATION
      // ':leave' is a default state for ngIf and ngFor, doesn't need to be predefined
      transition(
        ':leave',
        [
          group([
            style({
              transform: 'translateX(0px) scale(1, 1)',
              marginTop: '*',
            }),

            // use query self to be able to group the animation on the current element
            query(':self', [
              animate(
                `${multiply(componentPrimaryLeaveTiming)}ms ${componentPrimaryLeaveCurve}`,
                style({
                  transform: 'translateX(18px) scale(0, 1)',
                }),
              ),

              animate(
                `${multiply(componentPrimaryLeaveTiming)}ms ${componentPrimaryLeaveCurve}`,
                style({
                  marginTop: '-{{height}}px',
                }),
              ),
            ]),

            query('.toast-description, .toast-title, .icon, .button-container, .dismiss-bg, .dismiss, .toast-date', [
              animate(
                `${multiply(10)}ms`,
                style({
                  opacity: '0',
                }),
              ),
            ]),
          ]),
        ],
        {
          params: {
            height: 0,
          },
        },
      ),
      // end launchToast
    ]),

    // info icon animation
    trigger('infoLine', [
      transition('* => *', [
        animate(
          `${multiply(linePrimaryEnterTiming)}ms ${multiply(linePrimaryEnterDelay)}ms ${linePrimaryEnterCurve}`,
          keyframes([style({ strokeDashoffset: '16', offset: 0 }), style({ strokeDashoffset: '0', offset: 1.0 })]),
        ),
      ]),
    ]),
    trigger('infoDot', [
      transition('* => *', [
        style({
          transform: 'scale(0)',
        }),
        animate(
          `${multiply(lineSecondaryEnterTiming)}ms ${multiply(lineSecondaryEnterDelay)}ms ${lineSecondaryEnterCurve}`,
          style({
            transform: 'scale(1)',
          }),
        ),
      ]),
    ]),

    // error icon animation
    trigger('errorLine', [
      transition('* => *', [
        animate(
          `${multiply(linePrimaryEnterTiming)}ms ${multiply(linePrimaryEnterDelay)}ms ${linePrimaryEnterCurve}`,
          keyframes([style({ strokeDashoffset: '7.919999599456787', offset: 0 }), style({ strokeDashoffset: '0', offset: 1.0 })]),
        ),
      ]),
    ]),
    trigger('errorDot', [
      transition('* => *', [
        style({
          transform: 'scale(0)',
        }),
        animate(
          `${multiply(lineSecondaryEnterTiming)}ms ${multiply(lineSecondaryEnterDelay)}ms ${lineSecondaryEnterCurve}`,
          style({
            transform: 'scale(1)',
          }),
        ),
      ]),
    ]),

    //warning icon animation
    trigger('warnLine', [
      transition('* => *', [
        animate(
          `${multiply(linePrimaryEnterTiming)}ms ${multiply(linePrimaryEnterDelay)}ms ${linePrimaryEnterCurve}`,
          keyframes([style({ strokeDashoffset: '7.919999599456787', offset: 0 }), style({ strokeDashoffset: '0', offset: 1.0 })]),
        ),
      ]),
    ]),
    trigger('warnDot', [
      transition('* => *', [
        style({
          transform: 'scale(0)',
        }),
        animate(
          `${multiply(lineSecondaryEnterTiming)}ms ${multiply(lineSecondaryEnterDelay)}ms ${lineSecondaryEnterCurve}`,
          style({
            transform: 'scale(1)',
          }),
        ),
      ]),
    ]),

    // success icon animation
    trigger('checkmarkLine', [
      transition('* => *', [
        // css keyframe animation
        animate(
          `${multiply(linePrimaryEnterTiming)}ms ${multiply(linePrimaryEnterDelay)}ms ${linePrimaryEnterCurve}`,
          keyframes([style({ strokeDashoffset: '31.386688232421875', offset: 0 }), style({ strokeDashoffset: '0', offset: 1.0 })]),
        ),
      ]),
    ]),

    // moving the gradient offview
    trigger('gradientMove', [
      transition('* => *', [
        style({
          transform: 'scale(1, 1)',
        }),
        animate(
          `${multiply(GRADIENT_DURATION)}ms ${multiply(GRADIENT_DELAY)}ms ${GRADIENT_LEAVE_CURVE}`,
          style({
            transform: 'scale(0, 1)',
          }),
        ),
      ]),
    ]),

    // fade in the dismiss icon
    trigger('dismissIconVisible', [
      transition('* => *', [
        style({
          opacity: '0',
        }),
        animate(
          `${multiply(DISMISS_ICON_DURATION)}ms ${multiply(DISMISS_ICON_DELAY)}ms ${DISMISS_ICON_CURVE}`,
          style({
            opacity: '1',
          }),
        ),
      ]),
    ]),
  ],
})
export class ToastComponent implements OnInit {
  mouseover = false;
  focused = false;

  @Input() type?: ToastType = ToastType.SUCCESS;
  @Input() primaryButtonText? = '';
  @Input() secondaryButtonText?: string;
  @Input() dismissible? = true;
  @Input() timeoutSeconds?: number = AUTODISMISS_TIMEOUT_SECONDS;

  @Output() dismissed = new EventEmitter();
  @Output() primaryButtonClick = new EventEmitter();
  @Output() secondaryButtonClick = new EventEmitter();

  disableAutoDismiss = false;
  height = 0;
  animate = true;

  constructor(
    private element: ElementRef,
    private ngZone: NgZone,
    public translateService: VmwSimpleTranslateService,
    @Optional() private segmentService: VmwSegmentService,
  ) {
    this.translateService.loadTranslationsForComponent('toast', TRANSLATIONS);
  }

  ngOnInit() {
    this.setUpTimer();
  }

  @HostListener('click', ['$event'])
  trackClicks(event: any) {
    if (!this.segmentService) {
      return;
    }

    this.segmentService.trackEvent('NGX_Toast_Clicked');

    const tag = event.target.tagName as keyof typeof TRACKED_TAG;
    if (TRACKED_TAG[tag]) {
      this.segmentService.trackEvent('NGX_Toast_Button_Or_Link_Clicked', {
        tagClicked: event.target.tagName,
      });
    }
  }

  mouseOver(over: boolean) {
    // If the user moves their mouse over the snack, disable auto-dismiss
    this.disableAutoDismiss = over;
  }

  focus(focused: boolean) {
    this.disableAutoDismiss = focused;
  }

  get loaded() {
    return {
      value: this.animate,
      params: {
        height: this.element.nativeElement.clientHeight,
      },
    };
  }

  dismiss() {
    this.animate = false;

    // before we tell the app to remove the toast, give the leave animation
    // some time to run...
    timer(multiply(componentPrimaryLeaveTiming + 200))
      .pipe(take(1))
      .subscribe(() => {
        this.dismissed.emit();
      });
  }

  private setUpTimer() {
    if (this.timeoutSeconds === undefined) return;

    if (this.timeoutSeconds > 0) {
      this.ngZone.runOutsideAngular(() => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        timer(this.timeoutSeconds! * multiply(1000))
          .pipe(take(1))
          .subscribe(() => {
            this.ngZone.run(() => {
              if (this.disableAutoDismiss) {
                this.setUpTimer();
                return;
              }
              this.dismiss();
            });
          });
      });
    }
  }
}
