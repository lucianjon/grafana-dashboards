import React, { useCallback, useLayoutEffect, useRef, useState, FC } from 'react';
import { ClipboardButton, Icon } from '@grafana/ui';
import { Modal } from '@grafana/ui';

import { Messages } from './ProgressModal.messages';
import * as styles from './ProgressModal.styles';
import { CenteredButton, ProgressModalHeader } from 'pmm-update/components';
import { useClickOutside } from 'pmm-update/hooks';
import { ProgressModalProps } from 'pmm-update/types';

export const ProgressModal: FC<ProgressModalProps> = ({
  version,
  errorMessage = '',
  isOpen = false,
  isUpdated = false,
  output = '',
  updateFailed = false,
}) => {
  const outputRef = useRef<HTMLPreElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [isOutputShown, setIsOutputShown] = useState(true);

  useClickOutside(modalRef, () => {
    if (isUpdated) {
      location.reload(true);
    }
  });

  useLayoutEffect(() => {
    // scroll update status to the end.
    const interval = setInterval(() => outputRef.current?.scrollIntoView(false), 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleToggleShowOutput = () => {
    setIsOutputShown(isOutputShown => !isOutputShown);
  };

  const reloadAfterUpdate = () => {
    location.reload(true);
  };

  const copyToClipboard = useCallback(() => outputRef.current?.textContent ?? '', [outputRef]);

  const chevronIcon = isOutputShown ? 'chevron-down' : 'chevron-up';

  // TODO (nicolalamacchia): componentize this further
  return (
    <Modal title="" isOpen={isOpen}>
      <div ref={modalRef} className={styles.modal} role="document">
        <ProgressModalHeader isUpdated={isUpdated} updateFailed={updateFailed} errorMessage={errorMessage} />
        {!isUpdated ? (
          <div className={styles.outputContent}>
            <div className={styles.outputHeader}>
              <Icon
                className={styles.outputVisibilityToggle}
                data-qa="modal-chevron-icon"
                name={chevronIcon as any}
                onClick={handleToggleShowOutput}
              />
              <span>Log</span>
              <ClipboardButton
                getText={copyToClipboard}
                className={styles.clipboardButton}
                variant="secondary"
                size="sm"
              >
                {Messages.copyToClipboard}
              </ClipboardButton>
            </div>
            {isOutputShown && (
              <div className={styles.output}>
                <pre data-qa="modal-output-pre" ref={outputRef}>
                  {output}
                </pre>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className={styles.successNote}>
              <h6 data-qa="modal-update-success-text">
                {Messages.updateSuccessNotice} {version}
              </h6>
            </div>
            <CenteredButton data-qa="modal-close" variant="primary" onClick={reloadAfterUpdate}>
              Close
            </CenteredButton>
          </>
        )}
      </div>
      <div className={styles.backdrop}></div>
    </Modal>
  );
};
