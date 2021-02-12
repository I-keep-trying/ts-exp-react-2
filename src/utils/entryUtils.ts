/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  NewHospitalEntry,
  NewOccupationalHealthcareEntry,
  NewHealthCheckEntry,
  HealthCheckRating,
  Discharge,
  SickLeave,
  //  Diagnosis,
} from '../types';
//import toDiagnosis from './dxUtils';

const isString = (text: any | undefined): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseDescription = (description: any | undefined): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description: ');
  }
  return description;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any | undefined): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect of missing date: ');
  }
  return date;
};

const parseSpecialist = (specialist: any | undefined): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist: ');
  }
  return specialist;
};

const parseHospitalType = (type: any | undefined): 'Hospital' => {
  if (type !== 'Hospital') {
    throw new Error('Incorrect or missing hospital type: ');
  }
  return type as 'Hospital';
};

const parseOccupationalHealthcareType = (
  type: any | undefined
): 'OccupationalHealthcare' => {
  if (type !== 'OccupationalHealthcare') {
    throw new Error('Incorrect or missing occupational healthcare type: ');
  }
  return type as 'OccupationalHealthcare';
};

const parseHealthyCheckType = (type: any | undefined): 'HealthCheck' => {
  if (type !== 'HealthCheck') {
    throw new Error('Incorrect or missing healthy check type: ');
  }
  return type as 'HealthCheck';
};

const parseDischarge = (discharge: any | undefined): Discharge => {
  if (
    !discharge.date ||
    !isString(discharge.date) ||
    !isDate(discharge.date) ||
    !discharge.criteria ||
    !isString(discharge.criteria)
  ) {
    throw new Error('Incorrect or missing discharge: ');
  }
  return discharge as Discharge;
};

const parseSickLeave = (sickLeave: any | undefined): SickLeave => {
  if (
    !sickLeave.startDate ||
    !isString(sickLeave.startDate) ||
    !isDate(sickLeave.startDate) ||
    !sickLeave.endDate ||
    !isString(sickLeave.endDate || !isDate(sickLeave.endDate))
  ) {
    throw new Error('Incorrect or missing sickLeave: ');
  }
  return sickLeave as SickLeave;
};

const parseEmployerName = (employerName: any | undefined): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error('Incorrect or missing employer name: ');
  }
  return employerName;
};

const isHealthCheckRating = (
  param: any | undefined
): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (
  healthCheckRating: any | undefined
): HealthCheckRating => {
  if (!isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect or missing health check rating ');
  }
  return healthCheckRating;
};

const parseDiagnosis = (diagnosisCodes: any[] | undefined[]): string[] => {
  if (!Array.isArray(diagnosisCodes)) {
    throw new Error('Diagnosis must be an array ');
  }
  return diagnosisCodes as string[];
};

export const toNewHospitalEntry = (
  object: any | undefined
): NewHospitalEntry => {
  return {
    type: parseHospitalType(object.type),
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    diagnosisCodes: parseDiagnosis(object.diagnosisCodes),
    discharge: parseDischarge(object.discharge),
  };
};

export const toNewOccupationalHealthcareEntry = (
  object: any | undefined
): NewOccupationalHealthcareEntry => {
  return {
    type: parseOccupationalHealthcareType(object.type),
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    diagnosisCodes: parseDiagnosis(object.diagnosisCodes),
    employerName: parseEmployerName(object.employerName),
    sickLeave: parseSickLeave(object.sickLeave),
  };
};

export const toNewHealthCheckEntry = (
  object: any | undefined
): NewHealthCheckEntry => {
  return {
    type: parseHealthyCheckType(object.type),
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    diagnosisCodes: parseDiagnosis(object.diagnosisCodes),
    healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
  };
};
