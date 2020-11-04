import { Router } from 'express';
import ConstructionsController from '../controllers/ConstructionsController';

const constructionsRouter = Router();
const constructionsController = new ConstructionsController();

constructionsRouter.get('/', constructionsController.store);

export default constructionsRouter;
