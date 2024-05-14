import * as express from 'express';
import {
    getAllMatches,
    getMatchById,
    createMatch,
    patchMatch,
    deleteMatch,
    getAllMatchesByUserId
} from '../controllers/match-controller';

const router = express.Router();

// Route to get all matches
router.get('/matches', getAllMatches);

// Route to get match by id
router.get('/matches/:id', getMatchById);

// Route to create a new match
router.post('/matches', createMatch);

// Route to patch (update) match by id
router.patch('/matches/:id', patchMatch);

// Route to delete match by id
router.delete('/matches/:id', deleteMatch);

// Route to get all matches by userid
router.get('/matches/byUser/:id', getAllMatchesByUserId);
export default router;
