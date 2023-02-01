---
to: routes/<%=entityType%>.route.ts
---
import express from 'express';

import { <%=entityType%>Behaviors, <%=h.inflection.pluralize(entityType)%> } from '../data/<%=entityType%>.data';
import { addItemToList, removeItemFromList } from '../utils/entity';
import { handlePagedRequest } from '../utils/pagination';

export const <%=entityType%>Router = express.Router();

/**
 * Get <%=entityType%> list
 */
<%=entityType%>Router.get('/entities/types/vmware/container<%=h.capitalize(entityType)%>/1.0.0', (req, res) => {
  handlePagedRequest(req, res, <%=h.inflection.pluralize(entityType)%>);
  // res.send(<%=h.inflection.pluralize(entityType)%>);
  // res.status(400).json({message: 'Failed to get RDE <%=entityType%> list'});
});

/**
 * Get single <%=entityType%> by id
 * entityId example:  urn:vcloud:entity:vmware:container<%=h.capitalize(entityType)%>:e08c0e87-27ab-441e-b14b-c7c0bc7b66ff
 */
<%=entityType%>Router.get('/entities/:entityId(*container<%=h.capitalize(entityType)%>*)', (req, res) => {
  const id = req.params.entityId;
  const <%=entityType%> = <%=h.inflection.pluralize(entityType)%>.values.find(<%=entityType%> => <%=entityType%>.id === id);

  if (<%=entityType%>) {
    return res.send(<%=entityType%>);
  }
  return res.status(404).json({message: 'Failed to get RDE <%=entityType%> entity'});
});

/**
 * Get <%=entityType%> behaviors
 * entityType example:  urn:vcloud:interface:vmware:container<%=h.capitalize(entityType)%>:1.0.0
 */
<%=entityType%>Router.get('/interfaces/:entityType(*container<%=h.capitalize(entityType)%>*)/behaviors', (req, res) => {
  res.send(<%=entityType%>Behaviors);
  // res.status(400).json({message: 'Failed to get <%=entityType%> behaviors'});
});

/**
 * Create vcd task template
 * Response header LOCATION is the task URL, which should be called periodically to get vcd task results
 * entityId example:  urn:vcloud:entity:vmware:container<%=h.capitalize(entityType)%>:e08c0e87-27ab-441e-b14b-c7c0bc7b66ff
 * behaviorId example:  urn:vcloud:behavior-interface:behaviorName:vmware:container<%=h.capitalize(entityType)%>:1.0.0
 */
<%=entityType%>Router.post('/entities/:entityId(*container<%=h.capitalize(entityType)%>*)/behaviors/:behaviorId(*behaviorName*)/invocations', (req, res) => {
  const behaviorId: string = req.params.behaviorId;
  const entityId: string = req.params.entityId;
  const <%=entityType%> = <%=h.inflection.pluralize(entityType)%>.values.find(<%=entityType%> => <%=entityType%>.id === entityId);
  if (<%=entityType%> === undefined) {
    return res.status(400).json({message: `Failed to get <%=entityType%> with entityId: ${entityId}`});
  }

  // res.set('Access-Control-Expose-Headers', 'LOCATION');
  res.setHeader('LOCATION', '/api/task/behaviorName/success');
  // res.setHeader('LOCATION', '/api/task/behaviorName/error');

  res.status(202).json();
  // res.status(400).json({message: 'Failed to create vcd task'});
});


/**
 * Tenant create a <%=entityType%>
 * entityType example: urn:vcloud:type:vmware:container<%=h.capitalize(entityType)%>:1.0.0
 */
<%=entityType%>Router.post('/entityTypes/:entityType(*container<%=h.capitalize(entityType)%>*)', (req, res) => {
  const { name, entity } = req.body;

  const existed<%=h.capitalize(entityType)%> = <%=h.inflection.pluralize(entityType)%>.values.find(
    <%=entityType%> => <%=entityType%>.name === name,
  );

  res.setHeader(
    'LOCATION',
    '/api/task/create-<%=entityType%>-task?status=error&message=The namespace(project) is not exist or no access to it in the request.',
  );
  res.status(202).json();
  // res.status(400).json({message: 'Failed to create RDE project entity'});
});

/**
 * Tenant delete a <%=entityType%>
 */
<%=entityType%>Router.delete('/entities/:entityId(*container<%=h.capitalize(entityType)%>*)', (req, res) => {
  const entityId: string = req.params.entityId;

  const index = <%=h.inflection.pluralize(entityType)%>.values.findIndex(<%=entityType%> => <%=entityType%>.id === entityId);

  if (index > -1) {
    removeItemFromList(entityId, <%=h.inflection.pluralize(entityType)%>);
    res.setHeader('LOCATION', '/api/task/delete-<%=entityType%>-task?status=success');
    res.status(202).json();
  } else {
    res.status(403).json({
      minorErrorCode: 'ACCESS_TO_RESOURCE_IS_FORBIDDEN',
      message: 'This operation is denied.',
      stackTrace: null,
    });
  }
});

/**
 * Tenant update a <%=entityType%>
 * entityType example: urn:vcloud:type:vmware:container<%=h.capitalize(entityType)%>:1.0.0
 */
<%=entityType%>Router.post(
  '/entities/:entityId(*container<%=h.capitalize(entityType)%>*)/behaviors/:behaviorId(*update<%=h.capitalize(entityType)%>*)/invocations',
  (req, res) => {
    const behaviorId: string = req.params.behaviorId;
    const entityId: string = req.params.entityId;

    const <%=entityType%> = <%=h.inflection.pluralize(entityType)%>.values.find(<%=entityType%> => <%=entityType%>.id === entityId);
    if (<%=entityType%> === undefined) {
      return res.status(403).json({
        minorErrorCode: 'ACCESS_TO_RESOURCE_IS_FORBIDDEN',
        message: 'This operation is denied.',
        stackTrace: null,
      });
    }

    // res.set('Access-Control-Expose-Headers', 'LOCATION');
    res.setHeader('LOCATION', `/api/task/update<%=h.capitalize(entityType)%>?status=success&entityId=${entityId}`);

    res.status(202).json();
  },
);
