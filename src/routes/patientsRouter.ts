/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';
import {
  addPatient,
  getSecurePatient,
  // getPatientDetail,
  findById,
  addEntry,
} from '../services/patientService';
import { toNewPatient } from '../utils/patientUtils';
import {
  toNewHealthCheckEntry,
  toNewHospitalEntry,
  toNewOccupationalHealthcareEntry,
} from '../utils/entryUtils';
const router = express.Router();

router.get('/', (_req, res) => {
  res.send(getSecurePatient());
});

router.get('/:id', (req, res) => {
  try {
    // res.send(getPatientDetail());
    res.send(findById(req.params.id));
  } catch (e) {
    if (e instanceof Error) {
      res.status(404).send({ error: e.message });
    }
  }
});

router.get('/:id/entries', (req, res) => {
  try {
    const patient = findById(req.params.id);
    res.send(patient?.entries);
  } catch (e) {
    if (e instanceof Error) {
      res.status(404).send({ error: e.message });
    }
  }
});

router.post('/', (req, res) => {
  try {
    const newPatientRecord = toNewPatient(req.body);
    const addedRecord = addPatient(newPatientRecord);
    res.json(addedRecord);
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
});

router.post('/:id/entries', (req, res) => {
  //console.log('req.body', req.body);
  try {
    if (req.body.type === 'HealthCheck') {
      const entry = toNewHealthCheckEntry(req.body);
      const addedRecord = addEntry(req.params.id, entry);
      res.json(addedRecord);
    } else if (req.body.type === 'Hospital') {
      const entry = toNewHospitalEntry(req.body);
      console.log('req.body', entry);
      const addedRecord = addEntry(req.params.id, entry);
      res.json(addedRecord);
    } else if (req.body.type === 'OccupationalHealthcare') {
      const entry = toNewOccupationalHealthcareEntry(req.body);
      const addedRecord = addEntry(req.params.id, entry);
      res.json(addedRecord);
    } else {
      res.status(400).send('Type of entry was not received.');
    }
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
});

export default router;
