import { Request, Response, NextFunction } from 'express';
import { validateMatchOrMoves } from '../validations/validations';

export const getMatchMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {
	const playerColor = request.header('Player-Color');
	const secretKey = request.header('Secret-Key');
	const matchId = request.params.id;

	if(!playerColor || !secretKey) return response.status(422).send({error: 'Send a player color and a secret key'});
	if(!matchId) return response.status(422).send({error: 'Send a valid id'});

	const failValidation = validateMatchOrMoves(playerColor, secretKey, matchId);
	
	if(failValidation) return response.status(400).send({error: 'Please, check the data you are sending'});

	next();
};