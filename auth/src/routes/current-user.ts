import { currentUser } from '@vaibhavtickets/common';
import express from 'express';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, (req, res) => {
  return res.send({ currentUser: req.currentUser });
});

export { router as currentUserRouter };