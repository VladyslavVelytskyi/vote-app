import { Injectable } from '@nestjs/common';
import { SignupInput } from './input/signupInput';
import { UserRepository } from './user.repository';
import { ErrorResponse } from './shared/errorResponse';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly userReps: UserRepository,
    ) {}

    async signup(signupInput: SignupInput): Promise<ErrorResponse[] | null> {
        const userExit = await this.userReps.findOne({
            where: {
                email: signupInput.email,
            },
        });
        if (userExit) {
            return [
                {
                    path: 'email',
                    message: 'invalid email or password',
                },
            ];
        }
        await this.userReps.save({
            ...signupInput,
        });
        return null;
    }
}
