/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Diagnosis } from '../types';
import diagnosisRecords from '../data/typedDiagnoses';

export const getDiagnoses = (): Diagnosis[] => diagnosisRecords;

export const addDiagnosis = (): Diagnosis[] => {
  return [];
};
