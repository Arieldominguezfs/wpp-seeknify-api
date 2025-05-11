import { NextFunction, Request, Response } from 'express'
import {  GetConversationsUseCase } from '../../domain/usecases/get_conversations'
export class AgentController {

    constructor(
        private readonly getConversations: GetConversationsUseCase
    ){}

    async getWppConvertions(req: Request, res: Response): Promise<void> {
        try {
            const results = await this.getConversations.getConversations()
            res.json(results)

        }catch(err){
           res.status(500).json(JSON.stringify(err))
        }
    }
}