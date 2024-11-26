import express from 'express';
import { estimateRide, confirmRide, getRideDetails } from '../controllers/rideController';

const router = express.Router();

router.post('/ride/estimate', estimateRide);
router.patch('/ride/confirm', confirmRide);
router.get('/ride/:customer_id', getRideDetails);

export default router;