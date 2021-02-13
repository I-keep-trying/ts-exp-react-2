import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Divider,
  Header,
  Icon,
  List,
  Label,
  Segment,
  Menu,
} from 'semantic-ui-react';
import { AddEntry } from '../components/AddEntry/index';
import { EntryDetails } from '../components/Entry/Entries';
import HealthRatingBar from '../components/HealthRatingBar';
import { apiBaseUrl } from '../constants';
import { useStateValue, addPatient, addEntry } from '../state';
import { NewEntries, Patient } from '../types';

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const [activeItem, setActiveItem] = React.useState<string | undefined>(
    'entries'
  );

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
    setActiveItem('entries');
  };

  useEffect(() => {
    const fetchPatient = async () => {
      if (patients[id]?.entries) {
        return patients[id];
      } else {
        try {
          const { data: patientFromApi } = await axios.get(
            `${apiBaseUrl}/patients/${id}`
          );
          dispatch(addPatient(patientFromApi));
        } catch (e) {
          console.log(e);
        }
      }
    };
    fetchPatient();
  }, [dispatch, id, patients]);

  const submitNewEntry = async (values: NewEntries) => {
    try {
      const { data: submittedEntry } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(submittedEntry));
      closeModal();
      setActiveItem('entries');
    } catch (e) {
      console.error('New Entry Error: ', e);
    }
  };

  return patients[id] ? (
    <Container>
      <Segment attached="top">
        <Header size="large">
          {patients[id]?.name}
          <Icon
            style={{ verticalAlign: 'inherit' }}
            className={
              patients[id]?.gender !== 'other'
                ? patients[id]?.gender === 'male'
                  ? 'mars huge icon'
                  : 'venus huge icon'
                : 'other gender huge icon'
            }
          />
        </Header>
        <Divider />
        <Label.Group size="small">
          <List size="tiny" divided verticalAlign="middle">
            {patients[id]?.entries?.length > 0 ? (
              patients[id]?.entries.map((entry) => {
                if (entry?.type === 'HealthCheck') {
                  return (
                    <List.Item key={entry.id}>
                      <Label basic horizontal>
                        Health Status {entry.date}
                      </Label>
                      <HealthRatingBar
                        key={entry.id}
                        rating={entry.healthCheckRating}
                        showText={false}
                        showRating={true}
                      />
                    </List.Item>
                  );
                }
                return null;
              })
            ) : (
              <></>
            )}
            <List.Item>
              <Label basic horizontal>
                GENDER
              </Label>
              {patients[id].gender}
            </List.Item>
            <List.Item>
              <Label basic horizontal>
                SSN
              </Label>
              {patients[id].ssn}
            </List.Item>
            <List.Item>
              <Label basic horizontal>
                OCCUPATION
              </Label>
              {patients[id].occupation}
            </List.Item>
            <List.Item>
              <Label basic horizontal>
                D.O.B.
              </Label>
              {patients[id].dateOfBirth}{' '}
            </List.Item>
          </List>
        </Label.Group>
      </Segment>
      <Menu pointing attached="bottom" tabular>
        <Menu.Item
          name="entries"
          active={activeItem === 'entries'}
          onClick={() => setActiveItem('entries')}
        />
        <Menu.Item
          name="add entry"
          onClick={() => {
            setActiveItem('add entry');
            openModal();
          }}
        />
      </Menu>
      <AddEntry
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />{' '}
      <EntryDetails />
      <Divider hidden />
    </Container>
  ) : (
    <></>
  );
};

export default PatientPage;
