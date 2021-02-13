import { Field, Formik, Form } from 'formik';
import React from 'react';
import { Button, Grid } from 'semantic-ui-react';
import {
  DiagnosisSelection,
  NumberField,
  SelectField,
  TextField,
} from '../FormField';
import { useStateValue } from '../../state';
import {
  Diagnosis,
  NewEntries, 
  EntriesType,
} from '../../types';

type InitialValues = {
  type: 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare';
  description: string;
  specialist: string;
  date: string;
  healthCheckRating: number;
  discharge: {
    date: string;
    criteria: string;
  };
  employerName: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
};

interface AddEntryFormProps {
  onSubmit: (values: NewEntries) => void;
  onCancel: () => void;
}

export type entryTypeOption = {
  label: string;
  value: EntriesType;
};

export const entryTypeOptions: entryTypeOption[] = [
  { value: EntriesType.HealthCheck, label: 'Health Check' },
  { value: EntriesType.Hospital, label: 'Hospital' },
  {
    value: EntriesType.OccupationalHealthcare,
    label: 'Occupational Healthcare',
  },
];

const AddEntryForm: React.FC<AddEntryFormProps> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();

  const initialValues: InitialValues = {
    type: 'HealthCheck',
    description: '',
    specialist: '',
    date: new Date().toISOString().slice(0, 10),
    healthCheckRating: 0,
    discharge: {
      date: new Date().toISOString().split('T')[0],
      criteria: '',
    },
    employerName: '',
    diagnosisCodes: undefined,
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        try {
          onSubmit(values);
          actions.resetForm();
        } catch (e) {
          console.error('Add Entry form validation error', e.response.data);
        }
      }}
      validate={(values) => {
        const requiredError = 'Field is required';
        const errors: {
          [field: string]: string | { [field: string]: string };
        } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.type) {
          errors.type = requiredError;
        } else if (values.type === 'HealthCheck') {
          if (values.healthCheckRating > 3 || values.healthCheckRating < 0) {
            errors.healthCheckRating =
              'Choose Health Check Rating between 0 to 3, 0 being Healthy to 3 being at Critical Risk';
          }
        } else if (values.type === 'Hospital') {
          if (!values.discharge.date) {
            errors.discharge = {};
            errors.discharge.date = requiredError;
          }
          if (!values.discharge.criteria) {
            errors.discharge = {};
            errors.discharge.criteria = requiredError;
          }
        } else if (values.type === 'OccupationalHealthcare') {
          if (!values.employerName) {
            errors.employerName = requiredError;
          }
          if (!values?.sickLeave?.startDate !== !values?.sickLeave?.endDate) {
            errors.sickLeave = {};
            if (!values.sickLeave?.startDate) {
              errors.sickLeave.startDate =
                requiredError + 'if End Date is entered';
            } else {
              errors.sickLeave.endDate =
                requiredError + 'if Start Date is entered';
            }
          }
        }
        return errors;
      }}
    >
      {({ values, isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <SelectField name="type" label="Type" options={entryTypeOptions} />
            <Field
              label="Date"
              placeholder="Date"
              name="date"
              component={TextField}
              disabled={true}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
              required
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
              required
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            {String(values.type) === 'HealthCheck' ? (
              <Field
                label="Health Check Rating"
                name="healthCheckRating"
                value={values.healthCheckRating}
                component={NumberField}
                min={0}
                max={3}
                required
              />
            ) : null}
            {String(values.type) === 'Hospital' ? (
              <>
                 <Field
                  label="Date of discharge"
                  placeholder="Date of discharge"
                  name="discharge.date"
                  component={TextField}
                  required
                />
                <Field
                  label="Criteria of discharge"
                  placeholder="Criteria"
                  name="discharge.criteria"
                  component={TextField}
                  required
                />
              </>
            ) : null}
            {String(values.type) === 'OccupationalHealthcare' ? (
              <>
                <Field
                  label="Employer Name"
                  placeholder="Employer Name"
                  name="employerName"
                  component={TextField}
                  required
                />
                <Field
                  label="Sick Leave Start"
                  placeholder="Start Date"
                  name="sickLeave.startDate"
                  component={TextField}
                />
                <Field
                  label="Sick Leave End"
                  placeholder="End Date"
                  name="sickLeave.endDate"
                  component={TextField}
                />
              </>
            ) : null}
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
