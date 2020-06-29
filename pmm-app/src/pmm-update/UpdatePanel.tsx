import React, { useEffect, useState, FC, MouseEvent } from 'react';
import { Button } from '@grafana/ui';

import { AvailableUpdate, CurrentVersion, InfoBox, LastCheck, ProgressModal } from 'pmm-update/components';
import { useVersionDetails, usePerformUpdate } from 'pmm-update/hooks';

import * as styles from './UpdatePanel.styles';

export const UpdatePanel: FC<{}> = () => {
  const [forceUpdate, setForceUpdate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [
    { installedVersionDetails, lastCheckDate, nextVersionDetails, isUpdateAvailable },
    fetchVersionErrorMessage,
    isLoading,
    isDefaultView,
    getCurrentVersionDetails,
  ] = useVersionDetails();
  const [output, updateErrorMessage, isUpdated, updateFailed, launchUpdate] = usePerformUpdate();

  const handleCheckForUpdates = (e: MouseEvent) => {
    if (e.altKey) {
      setForceUpdate(true);
    }
    getCurrentVersionDetails(true);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setErrorMessage('');
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [fetchVersionErrorMessage, updateErrorMessage]);

  useEffect(() => {
    setErrorMessage(updateErrorMessage);
  }, [updateErrorMessage]);

  useEffect(() => {
    setErrorMessage(fetchVersionErrorMessage);
  }, [fetchVersionErrorMessage]);

  const handleUpdate = () => {
    setShowModal(true);
    launchUpdate();
  };

  return (
    <>
      <div className={styles.panel}>
        <CurrentVersion installedVersionDetails={installedVersionDetails} />
        {isUpdateAvailable && !isDefaultView ? (
          <AvailableUpdate nextVersionDetails={nextVersionDetails} />
        ) : null}
        {isDefaultView && <InfoBox />}
        {!isUpdateAvailable && !isDefaultView && !forceUpdate ? <InfoBox upToDate /> : null}
        {isUpdateAvailable || forceUpdate ? (
          <div className={styles.launchUpdateButtonWrapper}>
            <Button onClick={handleUpdate} icon={'fa fa-download' as any} variant="secondary">
              Update to {nextVersionDetails?.nextVersion}
            </Button>
          </div>
        ) : null}
        <LastCheck
          onCheckForUpdates={handleCheckForUpdates}
          lastCheckDate={lastCheckDate}
          isLoading={isLoading}
        />
      </div>
      <ProgressModal
        errorMessage={errorMessage}
        isOpen={showModal}
        isUpdated={isUpdated}
        output={output}
        updateFailed={updateFailed}
        version={installedVersionDetails?.installedVersion}
      />
    </>
  );
};
