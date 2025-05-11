import { Router } from "express";
import { AgentController } from "../controller/agent.controller";
import { NextFunction ,type Request, type Response} from 'express';

export default function getRouter(controller: AgentController): Router {
    const router = Router();
    router.get('/v1/conversations', (req, res) => controller.getWppConvertions(req, res));
    return router
}
