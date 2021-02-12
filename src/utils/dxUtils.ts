/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Diagnosis } from '../types';

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing diagnosis name: ');
  }
  return name;
};

const parseCode = (code: any): string => {
  if (!code || !isString(code)) {
    throw new Error('Incorrect or missing diagnosis code ');
  }
  return code;
};

const parseLatin = (latin: any): string => {
  if (latin || isString(latin) || latin === undefined) {
    return latin as string;
  } else {
    throw new Error('Diagnosis latin entry must be string type ');
  }
};

export const toDiagnosis = (object: any | undefined): Diagnosis => {
  return {
    code: parseCode(object.code),
    name: parseName(object.name),
    latin: parseLatin(object.latin),
  };
};

export default toDiagnosis;
