---
to: routes/<%=entityType%>.route.ts
---
import express from 'express';

import {<%=entityType%>Behaviors, <%=h.inflection.pluralize(entityType)%>} from '../data/<%=entityType%>.data';

const router = express.Router();

/**
 * Get <%=entityType%> list
 */
router.get('/entities/types/vmware/container<%=h.capitalize(entityType)%>/1.0.0', (req, res) => {
  res.send(<%=h.inflection.pluralize(entityType)%>);
  // res.status(400).json({message: 'Failed to get RDE <%=entityType%> list'});
});

/**
 * Get single <%=entityType%> by id
 * entityId example:  urn:vcloud:entity:vmware:container<%=h.capitalize(entityType)%>:e08c0e87-27ab-441e-b14b-c7c0bc7b66ff
 */
router.get('/entities/:entityId(*container<%=h.capitalize(entityType)%>*)', (req, res) => {
  const id = req.params.entityId;
  const <%=entityType%> = <%=h.inflection.pluralize(entityType)%>.values.find(<%=entityType%> => <%=entityType%>.id === id);
  res.send(<%=entityType%>);
  // res.status(400).json({message: 'Failed to get RDE <%=entityType%> entity'});
});

/**
 * Create vcd task template //TODO: change behaviorName
 * Response header LOCATION is the task URL, which should be called periodically to get vcd task results
 * entityId example:  urn:vcloud:entity:vmware:container<%=h.capitalize(entityType)%>:e08c0e87-27ab-441e-b14b-c7c0bc7b66ff
 * behaviorId example:  urn:vcloud:behavior-interface:behaviorName:vmware:container<%=h.capitalize(entityType)%>:1.0.0
 */
router.post('/entities/:entityId(*container<%=h.capitalize(entityType)%>*)/behaviors/:behaviorId(*behaviorName*)/invocations', (req, res) => {
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

export default router;
