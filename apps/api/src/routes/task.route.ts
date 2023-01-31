import { faker } from '@faker-js/faker';
import express from 'express';

import { task } from '../data/task.data';

export const taskRouter = express.Router();

/**
 * Get task by id after calling a behavior invocation
 */
taskRouter.get('/:id', (req, res) => {
  const id = req.params.id;
  const status = <'success' | 'error'>req.query.status;
  const message = <string | undefined>req.query.message;

  const entityId = req.query.entityId as string;

  switch (id) {
    case 'create-project-task':
      res.send(task({ id, status, errorMessage: 'The project already exists.' }));
      break;
    case 'delete-project-task':
      res.send(task({ id, status, errorMessage: 'The project does not exists.' }));
      break;
    // case 'listRepos':
    //   const repos = allRepositories[projectName];
    //   res.send(task({id, status, resultContent: JSON.stringify(repos)}));
    //   break;
    // case 'list-artifacts-task':
    //   const repositoryName = req.query.repositoryName as string;
    //   const artifacts = allArtifacts[`${projectName}/${repositoryName}`];
    //   res.send(task({id, status, resultContent: JSON.stringify(artifacts), errorMessage: message}));
    //   break;
    case 'publish-project-task':
      res.send(task({ id, status, errorMessage: message }));
      break;
    default:
      res.send(task({ id, status, entityId }));
      // res.status(400).json({message: 'Failed to get data from vcd task'});
      break;
  }
});
