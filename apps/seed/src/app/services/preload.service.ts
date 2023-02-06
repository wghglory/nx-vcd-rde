import { Injectable } from '@angular/core';
import { ClrCommonStringsService } from '@clr/angular';
import { AuthGuard } from '@seed/shared/services';
import { L10nService } from '@vmw/ngx-vip';

@Injectable({
  providedIn: 'root',
})
export class PreloadService {
  constructor(
    private clrCommonStrings: ClrCommonStringsService,
    private l10nService: L10nService,
    // private featureFlagsService: FeatureFlagsService,
    private authGuard: AuthGuard,
  ) {}

  public async initialize(): Promise<void> {
    this.clrCommonStrings.localize(this.getLocalizedClrCommonStrings());
  }

  private getLocalizedClrCommonStrings() {
    return {
      info: this.l10nService.getMessage('common.info'),
      warning: this.l10nService.getMessage('common.warning'),
      success: this.l10nService.getMessage('common.success'),
      danger: this.l10nService.getMessage('common.error'),
      close: this.l10nService.getMessage('common.close'),
      expand: this.l10nService.getMessage('clarity-common-strings.expand'),
      collapse: this.l10nService.getMessage('clarity-common-strings.collapse'),
      open: this.l10nService.getMessage('clarity-common-strings.open'),
      show: this.l10nService.getMessage('clarity-common-strings.show'),
      hide: this.l10nService.getMessage('clarity-common-strings.hide'),
      more: this.l10nService.getMessage('clarity-common-strings.more'),
      select: this.l10nService.getMessage('clarity-common-strings.select'),
      selectAll: this.l10nService.getMessage('clarity-common-strings.select-all'),
      previous: this.l10nService.getMessage('clarity-common-strings.previous'),
      next: this.l10nService.getMessage('clarity-common-strings.next'),
      current: this.l10nService.getMessage('clarity-common-strings.current'),
      pickColumns: this.l10nService.getMessage('clarity-common-strings.pick-columns'),
      showColumns: this.l10nService.getMessage('clarity-common-strings.show-columns'),
      sortColumn: this.l10nService.getMessage('clarity-common-strings.sort-column'),
      firstPage: this.l10nService.getMessage('clarity-common-strings.first-page'),
      lastPage: this.l10nService.getMessage('clarity-common-strings.last-page'),
      nextPage: this.l10nService.getMessage('clarity-common-strings.next-page'),
      previousPage: this.l10nService.getMessage('clarity-common-strings.previous-page'),
      currentPage: this.l10nService.getMessage('clarity-common-strings.current-page'),
      totalPages: this.l10nService.getMessage('clarity-common-strings.total-pages'),
      filterItems: this.l10nService.getMessage('clarity-common-strings.filter-items'),
      minValue: this.l10nService.getMessage('clarity-common-strings.min-value'),
      maxValue: this.l10nService.getMessage('clarity-common-strings.max-value'),
      showColumnsMenuDescription: this.l10nService.getMessage('clarity-common-strings.show-columns-menu-description'),
      allColumnsSelected: this.l10nService.getMessage('clarity-common-strings.all-columns-selected'),
      loading: this.l10nService.getMessage('clarity-common-strings.loading'),
      singleActionableAriaLabel: this.l10nService.getMessage('clarity-common-strings.available-actions'),
      alertCloseButtonAriaLabel: this.l10nService.getMessage('clarity-common-strings.close'),
      signpostToggle: this.l10nService.getMessage('clarity-common-strings.signpost-toggle'),

      // timeline
      timelineStepNotStarted: this.l10nService.getMessage('clarity-common-strings.not-started'),
      timelineStepCurrent: this.l10nService.getMessage('clarity-common-strings.current'),
      timelineStepProcessing: this.l10nService.getMessage('clarity-common-strings.in-progress'),
      timelineStepSuccess: this.l10nService.getMessage('clarity-common-strings.completed'),
      timelineStepError: this.l10nService.getMessage('clarity-common-strings.error'),

      // Vertical Nav
      verticalNavGroupToggle: this.l10nService.getMessage('clarity-common-strings.vertical-nav-group-toggle'),
      detailExpandableAriaLabel: this.l10nService.getMessage('clarity-common-strings.toggle-more-row-content'),
      singleSelectionAriaLabel: this.l10nService.getMessage('clarity-common-strings.select'),

      datepickerToggle: this.l10nService.getMessage('clarity-common-strings.datepickerToggle'),
      datepickerPreviousMonth: this.l10nService.getMessage('clarity-common-strings.datepickerPreviousMonth'),
      datepickerCurrentMonth: this.l10nService.getMessage('clarity-common-strings.datepickerCurrentMonth'),
      datepickerNextMonth: this.l10nService.getMessage('clarity-common-strings.datepickerNextMonth'),
      datepickerPreviousDecade: this.l10nService.getMessage('clarity-common-strings.datepickerPreviousDecade'),
      datepickerNextDecade: this.l10nService.getMessage('clarity-common-strings.datepickerNextDecade'),
      datepickerCurrentDecade: this.l10nService.getMessage('clarity-common-strings.datepickerCurrentDecade'),
      datepickerSelectMonthText: this.l10nService.getMessage('clarity-common-strings.datepickerSelectMonthText'),
      datepickerSelectYearText: this.l10nService.getMessage('clarity-common-strings.datepickerSelectYearText'),

      daypickerSRCurrentMonthPhrase: this.l10nService.getMessage('clarity-common-strings.day-picker-sr-current-month-phrase'),
      daypickerSRCurrentYearPhrase: this.l10nService.getMessage('clarity-common-strings.day-picker-sr-current-year-phrase'),
      daypickerSRCurrentDecadePhrase: this.l10nService.getMessage('clarity-common-strings.day-picker-sr-current-decade-phrase'),
      stackViewChanged: this.l10nService.getMessage('clarity-common-strings.stack-view-changed'),

      // dategrid
      dategridExpandableBeginningOf: this.l10nService.getMessage('clarity-common-strings.datagrid-expandable-beginning-of'),
      dategridExpandableEndOf: this.l10nService.getMessage('clarity-common-strings.datagrid-expandable-end-of'),
      dategridExpandableRowContent: this.l10nService.getMessage('clarity-common-strings.datagrid-expandable-row-content'),
      dategridExpandableRowsHelperText: this.l10nService.getMessage('clarity-common-strings.datagrid-expandable-row-helper-text'),

      modalContentStart: this.l10nService.getMessage('clarity-common-strings.modal-content-start'),
      modalContentEnd: this.l10nService.getMessage('clarity-common-strings.modal-content-end'),
      signpostClose: this.l10nService.getMessage('clarity-common-strings.signpost-close'),
      detailPaneStart: this.l10nService.getMessage('clarity-common-strings.detail-pane-start'),
      detailPaneEnd: this.l10nService.getMessage('clarity-common-strings.detail-pane-end'),
      verticalNavToggle: this.l10nService.getMessage('clarity-common-strings.vertical-nav-toggle'),

      // Combobox
      comboboxDelete: this.l10nService.getMessage('clarity-common-strings.comboboxDelete'),
      comboboxSelection: this.l10nService.getMessage('clarity-common-strings.comboboxSelection'),
      comboboxSelected: this.l10nService.getMessage('clarity-common-strings.comboboxSelected'),
      comboboxOpen: this.l10nService.getMessage('clarity-common-strings.comboboxOpen'),
      comboboxNoResults: this.l10nService.getMessage('common.no-result'),
      comboboxSearching: this.l10nService.getMessage('common.searching'),
    };
  }
}

export function bootstrapFactory(preloadService: PreloadService) {
  return async () => {
    await preloadService.initialize();
  };
}
