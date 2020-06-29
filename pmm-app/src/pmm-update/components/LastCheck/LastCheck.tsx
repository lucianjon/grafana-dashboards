import React, { FC } from 'react';
import { Button } from '@grafana/ui';

import { LastCheckProps } from 'pmm-update/types';
import * as styles from './LastCheck.styles';

export const LastCheck: FC<LastCheckProps> = ({ lastCheckDate, onCheckForUpdates }) => (
  <div className={styles.lastCheck}>
    <p>Last check: {lastCheckDate}</p>
    <Button variant="link" size="sm" onClick={onCheckForUpdates} icon={'fa fa-refresh' as any}></Button>
  </div>
);
