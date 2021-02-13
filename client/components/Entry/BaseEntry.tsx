import React, { FC } from 'react';
import {
  Label,
  List,
} from 'semantic-ui-react';
import { Entry } from '../../types';


export const BaseEntry: FC<{ entry: Entry }> = ({ entry }) => {
  return (
    <div key={entry.id}>
      <List.Item>
        <Label basic horizontal>
          Description
        </Label>
        {entry.description}
      </List.Item>
      <List.Item>
        <Label basic horizontal>
          Specialist
        </Label>
        {entry.specialist}
      </List.Item>
    </div>
  );
};
