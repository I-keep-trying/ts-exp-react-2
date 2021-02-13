import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddEntryForm from './AddEntryForm';
import { NewEntries } from '../../types';

interface AddEntryProps {
  modalOpen: boolean;
  onSubmit: (values: NewEntries) => Promise<void>;
  onClose: () => void;
  error?: string;
}

export const AddEntry = ({
  modalOpen,
  onSubmit,
  onClose,
  error,
}: AddEntryProps) => {
  return (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a new entry</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        <AddEntryForm onSubmit={onSubmit} onCancel={onClose} />
      </Modal.Content>
    </Modal>
  );
};
