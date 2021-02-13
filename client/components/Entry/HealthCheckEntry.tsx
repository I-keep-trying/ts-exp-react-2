import React, { FC } from 'react';
import { Table } from 'semantic-ui-react';
import { HealthCheckEntry } from '../../types';
import HealthRatingBar from '../HealthRatingBar';

export const HealthEntry: FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  if (entry.type === 'HealthCheck') {
    return (
      <Table.Row>
        <Table.Cell>Health Status Description</Table.Cell>
        <Table.Cell className="word-break">
          <HealthRatingBar
            rating={entry.healthCheckRating}
            showText={true}
            showRating={false}
          />
        </Table.Cell>
      </Table.Row>
    );
  }
  return null;
};
