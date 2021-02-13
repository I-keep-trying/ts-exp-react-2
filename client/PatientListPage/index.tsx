import React from 'react';
import axios from 'axios';
import { Container, Table, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { PatientFormValues } from '../components/AddPatientModal/AddPatientForm';
import AddPatientModal from '../components/AddPatientModal';
import { Patient } from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue, addPatient } from '../state';

const PatientListPage: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewPatient = async (values: PatientFormValues) => {
    try {
      const { data: newPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients`,
        values
      );
      dispatch(addPatient(newPatient));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  return (
    <div className="App">
      <Container as={'h2'} textAlign="left">
        Patient list
      </Container>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Gender</Table.HeaderCell>
            <Table.HeaderCell>Occupation</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {Object.values(patients).map((patient: Patient) => {
            return (
              <Table.Row key={patient.id}>
                <Table.Cell>
                  <Link to={`/patients/${patient.id}`}>
                    {patient.name}
                  </Link>
                </Table.Cell>
                <Table.Cell>{patient.gender}</Table.Cell>
                <Table.Cell>{patient.occupation}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
      <AddPatientModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatient}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Patient</Button>
    </div>
  );
};

export default PatientListPage;
