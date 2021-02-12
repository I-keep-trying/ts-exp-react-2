/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Patient,
  SecurePatient,
  NewPatient,
  NewOccupationalHealthcareEntry,
  NewHealthCheckEntry,
  NewHospitalEntry,
  Diagnosis,
} from '../types';
import patients from '../data/typedPatients';
import diagnoses from '../data/typedDiagnoses';
import { nanoid } from 'nanoid';

export const getPatients = (): Patient[] => patients;

export const getDiagnoses = (): Diagnosis[] => diagnoses;

export const getSecurePatient = (): SecurePatient[] =>
  getPatients().map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));

export const getPatientDetail = (): Patient[] =>
  getPatients().map(
    ({ id, name, dateOfBirth, gender, occupation, entries, ssn }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
      ssn,
    })
  );

export const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: nanoid(),
    entries: [],
    ...patient,
  };
  patients.push(newPatient);
  return newPatient;
};

export const findById = (id: string): Patient | undefined => {
  return getPatients().find((patient) => patient.id === id);
};

export const addEntry = (
  id: string,
  entry: NewHospitalEntry | NewOccupationalHealthcareEntry | NewHealthCheckEntry
): Patient | undefined => {
  const patient: Patient | undefined = findById(id);
  //console.log('...entry', entry);
  const newEntry = {
    id: nanoid(),
    ...entry,
  };
  console.log('newEntry', newEntry);
  patient?.entries?.push(newEntry);
  return patient;
};
