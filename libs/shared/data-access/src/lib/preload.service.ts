import { Injectable } from '@angular/core';
import { ClrCommonStringsService } from '@clr/angular';
import { L10nService } from '@vmw/ngx-vip';

import { AuthGuard } from './auth.guard';

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
      selectAll: this.l10nService.getMessage('clarity-common-strings.selectAll'),
      previous: this.l10nService.getMessage('clarity-common-strings.previous'),
      next: this.l10nService.getMessage('clarity-common-strings.next'),
      current: this.l10nService.getMessage('clarity-common-strings.current'),
      pickColumns: this.l10nService.getMessage('clarity-common-strings.pickColumns'),
      showColumns: this.l10nService.getMessage('clarity-common-strings.showColumns'),
      sortColumn: this.l10nService.getMessage('clarity-common-strings.sortColumn'),
      firstPage: this.l10nService.getMessage('clarity-common-strings.firstPage'),
      lastPage: this.l10nService.getMessage('clarity-common-strings.lastPage'),
      nextPage: this.l10nService.getMessage('clarity-common-strings.nextPage'),
      previousPage: this.l10nService.getMessage('clarity-common-strings.previousPage'),
      currentPage: this.l10nService.getMessage('clarity-common-strings.currentPage'),
      totalPages: this.l10nService.getMessage('clarity-common-strings.totalPages'),
      filterItems: this.l10nService.getMessage('clarity-common-strings.filterItems'),
      minValue: this.l10nService.getMessage('clarity-common-strings.minValue'),
      maxValue: this.l10nService.getMessage('clarity-common-strings.maxValue'),
      modalContentStart: this.l10nService.getMessage('clarity-common-strings.modalContentStart'),
      modalContentEnd: this.l10nService.getMessage('clarity-common-strings.modalContentEnd'),
      showColumnsMenuDescription: this.l10nService.getMessage('clarity-common-strings.showColumnsMenuDescription'),
      allColumnsSelected: this.l10nService.getMessage('clarity-common-strings.allColumnsSelected'),
      signpostToggle: this.l10nService.getMessage('clarity-common-strings.signpostToggle'),
      signpostClose: this.l10nService.getMessage('clarity-common-strings.signpostClose'),
      loading: this.l10nService.getMessage('clarity-common-strings.loading'),
      // Datagrid
      detailPaneStart: this.l10nService.getMessage('clarity-common-strings.detailPaneStart'),
      detailPaneEnd: this.l10nService.getMessage('clarity-common-strings.detailPaneEnd'),
      singleSelectionAriaLabel: this.l10nService.getMessage('clarity-common-strings.singleSelectionAriaLabel'),
      singleActionableAriaLabel: this.l10nService.getMessage('clarity-common-strings.singleActionableAriaLabel'),
      detailExpandableAriaLabel: this.l10nService.getMessage('clarity-common-strings.detailExpandableAriaLabel'),
      datagridFilterAriaLabel: this.l10nService.getMessage('clarity-common-strings.datagridFilterAriaLabel'),
      datagridFilterDialogAriaLabel: this.l10nService.getMessage('clarity-common-strings.datagridFilterDialogAriaLabel'),
      columnSeparatorAriaLabel: this.l10nService.getMessage('clarity-common-strings.columnSeparatorAriaLabel'),
      columnSeparatorDescription: this.l10nService.getMessage('clarity-common-strings.columnSeparatorDescription'),
      // Alert
      alertCloseButtonAriaLabel: this.l10nService.getMessage('clarity-common-strings.alertCloseButtonAriaLabel'),
      // Date Picker
      datepickerDialogLabel: this.l10nService.getMessage('clarity-common-strings.datepickerDialogLabel'),
      datepickerToggle: this.l10nService.getMessage('clarity-common-strings.datepickerToggle'),
      datepickerToggleChooseDateLabel: this.l10nService.getMessage('clarity-common-strings.datepickerToggleChooseDateLabel'),
      datepickerToggleChangeDateLabel: this.l10nService.getMessage('clarity-common-strings.datepickerToggleChangeDateLabel'),
      datepickerPreviousMonth: this.l10nService.getMessage('clarity-common-strings.datepickerPreviousMonth'),
      datepickerCurrentMonth: this.l10nService.getMessage('clarity-common-strings.datepickerCurrentMonth'),
      datepickerNextMonth: this.l10nService.getMessage('clarity-common-strings.datepickerNextMonth'),
      datepickerPreviousDecade: this.l10nService.getMessage('clarity-common-strings.datepickerPreviousDecade'),
      datepickerNextDecade: this.l10nService.getMessage('clarity-common-strings.datepickerNextDecade'),
      datepickerCurrentDecade: this.l10nService.getMessage('clarity-common-strings.datepickerCurrentDecade'),
      datepickerSelectMonthText: this.l10nService.getMessage('clarity-common-strings.datepickerSelectMonthText'),
      datepickerSelectYearText: this.l10nService.getMessage('clarity-common-strings.datepickerSelectYearText'),
      datepickerSelectedLabel: this.l10nService.getMessage('clarity-common-strings.datepickerSelectedLabel'),
      // Stack View
      stackViewChanged: this.l10nService.getMessage('clarity-common-strings.stackViewChanged'),
      // Responsive Nav
      responsiveNavToggleOpen: this.l10nService.getMessage('clarity-common-strings.responsiveNavToggleOpen'),
      responsiveNavToggleClose: this.l10nService.getMessage('clarity-common-strings.responsiveNavToggleClose'),
      responsiveNavOverflowOpen: this.l10nService.getMessage('clarity-common-strings.responsiveNavOverflowOpen'),
      responsiveNavOverflowClose: this.l10nService.getMessage('clarity-common-strings.responsiveNavOverflowClose'),
      //Vertical Nav
      verticalNavGroupToggle: this.l10nService.getMessage('clarity-common-strings.verticalNavGroupToggle'),
      verticalNavToggle: this.l10nService.getMessage('clarity-common-strings.verticalNavToggle'),
      // Timeline steps
      timelineStepNotStarted: this.l10nService.getMessage('clarity-common-strings.timelineStepNotStarted'),
      timelineStepCurrent: this.l10nService.getMessage('clarity-common-strings.timelineStepCurrent'),
      timelineStepSuccess: this.l10nService.getMessage('clarity-common-strings.timelineStepSuccess'),
      timelineStepError: this.l10nService.getMessage('clarity-common-strings.timelineStepError'),
      timelineStepProcessing: this.l10nService.getMessage('clarity-common-strings.timelineStepProcessing'),
      // Combobox
      comboboxDelete: this.l10nService.getMessage('clarity-common-strings.comboboxDelete'),
      comboboxSearching: this.l10nService.getMessage('clarity-common-strings.comboboxSearching'),
      comboboxSelection: this.l10nService.getMessage('clarity-common-strings.comboboxSelection'),
      comboboxSelected: this.l10nService.getMessage('clarity-common-strings.comboboxSelected'),
      comboboxNoResults: this.l10nService.getMessage('clarity-common-strings.comboboxNoResults'),
      comboboxOpen: this.l10nService.getMessage('clarity-common-strings.comboboxOpen'),
      // Datagrid expandable rows
      datagridExpandableBeginningOf: this.l10nService.getMessage('clarity-common-strings.datagridExpandableBeginningOf'),
      datagridExpandableEndOf: this.l10nService.getMessage('clarity-common-strings.datagridExpandableEndOf'),
      datagridExpandableRowContent: this.l10nService.getMessage('clarity-common-strings.datagridExpandableRowContent'),
      datagridExpandableRowsHelperText: this.l10nService.getMessage('clarity-common-strings.datagridExpandableRowsHelperText'),
      // Wizard
      wizardStepSuccess: this.l10nService.getMessage('clarity-common-strings.wizardStepSuccess'),
      wizardStepError: this.l10nService.getMessage('clarity-common-strings.wizardStepError'),

      passwordHide: this.l10nService.getMessage('clarity-common-strings.passwordHide'),
      passwordShow: this.l10nService.getMessage('clarity-common-strings.passwordShow'),

      selectedRows: this.l10nService.getMessage('clarity-common-strings.selectedRows'),
    };
  }
}

export function bootstrapFactory(preloadService: PreloadService) {
  return async () => {
    await preloadService.initialize();
  };
}
