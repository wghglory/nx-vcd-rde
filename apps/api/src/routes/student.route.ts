import { Student } from '@seed/feature/student/model';
import express from 'express';

import { createStudent, students } from '../data/student.data';
import { addItemToList, removeItemFromList } from '../utils/entity';
import { handlePagedRequest } from '../utils/pagination';

export const studentRouter = express.Router();

studentRouter.get('/', (req, res) => {
  handlePagedRequest(req, res, students);
});

studentRouter.get('/:id', (req, res) => {
  const id = req.params.id;
  const found = students.values.find(p => p.id === id);

  if (found) {
    return res.send(found);
  }
  return res.status(404).send({ message: 'not found' });
});

studentRouter.post('/', (req, res) => {
  const { lastName, firstName, age }: Student = req.body;

  const student = createStudent({ lastName, firstName, age, state: 'success' });

  addItemToList(student, students);

  return res.send(student);
});

studentRouter.patch('/:id', (req, res) => {
  const { firstName, lastName, age }: Student = req.body;
  const id = req.params.id;
  const found = students.values.find(p => p.id === id);

  if (found) {
    found.name = `${firstName} ${lastName}`;
    found.entity.firstName = firstName;
    found.entity.lastName = lastName;
    found.entity.age = age;
    found.entity.lastModifiedDate = new Date();
    res.send(found);
  } else {
    res.status(404).send({ message: 'not found' });
  }
});

studentRouter.delete('/:id', (req, res) => {
  const id = req.params.id;
  const index = students.values.findIndex(p => p.id === id);

  if (index > -1) {
    removeItemFromList(id, students);
    return res.status(204).send();
  }
  return res.status(404).send({ message: 'not found' });
});
