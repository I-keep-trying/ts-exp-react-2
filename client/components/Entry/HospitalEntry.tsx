import React, { FC } from 'react';
import { Table } from 'semantic-ui-react';
import { HospitalEntry } from '../../types';

const HospitalEntry1: FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
      <Table.Row>
        <Table.Cell>Discharge</Table.Cell>

        <Table.Cell className="word-break">
          {entry.discharge.date}
          <br />
          {entry.discharge.criteria}
        </Table.Cell>
      </Table.Row>
  );
};

export default HospitalEntry1;
