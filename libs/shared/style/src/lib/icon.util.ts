/* istanbul ignore file */
import {
  angleIcon,
  blockIcon,
  cloneIcon,
  cogIcon,
  containerVolumeIcon,
  dashboardIcon,
  errorStandardIcon,
  exclamationCircleIcon,
  exclamationTriangleIcon,
  homeIcon,
  infoStandardIcon,
  namespaceIcon,
  networkGlobeIcon,
  nodesIcon,
  organizationIcon,
  pencilIcon,
  plusIcon,
  podIcon,
  searchIcon,
  storageIcon,
  successStandardIcon,
  timesIcon,
  unknownStatusIcon,
  usersIcon,
  vmBugIcon,
  vmIcon,
  warningStandardIcon,
} from '@cds/core/icon';

/**
 * A list of the common Clarity icons that are predefined in the application.
 *
 * Other icons need to be explicitly loaded in your service module with `ClarityIcons.addIcons(...)`.
 *
 * @usage
 *    <cds-icon shape="block" size="20"></cds-icon>
 *    <cds-icon shape="angle" direction="down"></cds-icon>
 *    <cds-icon shape="container-volume"></cds-icon>
 *    <cds-icon shape="error-standard" status="danger" [attr.solid]="solidIcon"></cds-icon>
 *    <cds-icon shape="exclamation-circle"></cds-icon>
 *    <cds-icon shape="exclamation-triangle"></cds-icon>
 *    <cds-icon shape="namespace"></cds-icon> Create
 *    <cds-icon shape="network-globe"></cds-icon>
 *    <cds-icon shape="nodes"></cds-icon>
 *    <cds-icon shape="plus"></cds-icon> Create
 *    <cds-icon shape="success-standard"></cds-icon>
 *    <cds-icon shape="times"></cds-icon> Delete
 *    <cds-icon shape="unknown-status"></cds-icon>
 *    <cds-icon shape="vm-bug" style="color: white"></cds-icon>
 *    <cds-icon shape="vm"></cds-icon>
 *    <cds-icon shape="warning-standard" size="md" status="warning"></cds-icon>
 */
export const COMMON_ICONS = [
  blockIcon,
  angleIcon, // AKA 'caret'
  cloneIcon, // Used for snapshots
  containerVolumeIcon,
  errorStandardIcon,
  exclamationCircleIcon,
  exclamationTriangleIcon,
  namespaceIcon,
  networkGlobeIcon,
  nodesIcon, // TKC
  pencilIcon, // Edit
  podIcon, // POD
  plusIcon, // Create
  searchIcon, // Grid Filter
  successStandardIcon,
  timesIcon, // Delete
  unknownStatusIcon,
  vmBugIcon, // VMware
  vmIcon,
  warningStandardIcon,
  storageIcon,
  cogIcon,
  infoStandardIcon,
  homeIcon,
  usersIcon,
  dashboardIcon,
  organizationIcon,
];

export const DEFAULT_ICON_SIZE = 16;
