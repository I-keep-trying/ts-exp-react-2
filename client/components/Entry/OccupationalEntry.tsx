import React, { FC } from 'react';
import { Table } from 'semantic-ui-react';
import { OccupationalHealthCareEntry } from '../../types';

const OccupationalEntry: FC<{ entry: OccupationalHealthCareEntry }> = ({
  entry,
}) => {
  return (
    <>
      <Table.Row>
        <Table.Cell> Employment</Table.Cell>
        <Table.Cell className="word-break">{entry.employerName}</Table.Cell>
      </Table.Row>
      {entry.sickLeave ? (
        <Table.Row>
          <Table.Cell> Sick Leave</Table.Cell>
          <Table.Cell className="word-break">
            {entry.sickLeave.startDate} {' <to> '} {entry.sickLeave.endDate}
          </Table.Cell>
        </Table.Row>
      ) : (
        <></>
      )}
    </>
  );
};

export default OccupationalEntry;
