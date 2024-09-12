import { FormattedMessage } from 'react-intl';
import React from 'react';

export const NotificationType = {
  0: <FormattedMessage id="NTInformation" defaultMessage="* Information" />,
  1: <FormattedMessage id="NTNewFeatures" defaultMessage="* NewFeatures" />,
  2: <FormattedMessage id="NTDocumentError" defaultMessage="* DocumentError" />,
  3: <FormattedMessage id="NTFileRequest" defaultMessage="* FileRequest" />,
  4: <FormattedMessage id="NTSupport" defaultMessage="* Support" />,
  5: <FormattedMessage id="NTGeneral" defaultMessage="* General" />,
  6: <FormattedMessage id="NTNews" defaultMessage="* News" />,
  7: <FormattedMessage id="NTCards" defaultMessage="* Cards" />,
  8: <FormattedMessage id="NTSharedCalendar" defaultMessage="* SharedCalendar" />,
  9: <FormattedMessage id="NTContracts" defaultMessage="* Contracts" />,
  10: <FormattedMessage id="NTDocumentBox" defaultMessage="* DocumentBox" />,
  11: <FormattedMessage id="NTPasswordChange" defaultMessage="* PasswordChange" />,
  12: <FormattedMessage id="NTConditionRead" defaultMessage="* ConditionRead" />,
};

export const CountryColors = {
  AT: '#30D5C8',
  BE: '#009DE0',
  CZ: '#E2E2E2',
  DE: '#DB4444',
  DK: '#6441A5',
  FR: '#FFC034',
  HU: '#004E9E',
  IT: '#4797A9',
  LU: '#C37C9C',
  NL: '#D8DB44',
  PL: '#938754',
  PT: '#00A150',
  SI: '#EC7878',
  SK: '#8A088D',
  BG: '#000000',
  CY: '#8C97FB',
  ES: '#95CB6B',
  EE: '#707070',
  FI: '#9B1313',
  GR: '#D756DA',
  IE: '#1A6E5F',
  LV: '#987FC6',
  LT: '#84D3FF',
  MT: '#41CF0F',
  GB: '#074B60',
  RO: '#FF0000',
  SE: '#9FC285',
  HR: '#A5A5A5',
  LI: '#09AD86',
  MA: '#824D4C',
  RS: '#C9FF84',
};

export const NotificationPriority = {
  0: {
    label: <FormattedMessage id="NPNone" defaultMessage="* None" />,
    color: 'var(--main-text-color)',
    background: 'var(--notification-btn-backGround-color)',
  },
  1: {
    label: <FormattedMessage id="NPLow" defaultMessage="* Low" />,
    color: '#009DE0',
    background: 'rgba(0, 157, 224, 0.10)',
  },
  2: {
    label: <FormattedMessage id="NPMedium" defaultMessage="* Medium" />,
    color: '#FFC034',
    background: 'rgba(255, 192, 52, 0.20)',
  },
  3: {
    label: <FormattedMessage id="NPHigh" defaultMessage="* High" />,
    color: '#DB4444',
    background: 'rgba(255, 192, 52, 0.10)',
  },
};
