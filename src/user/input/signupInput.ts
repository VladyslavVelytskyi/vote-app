import { InputType, Field } from 'type-graphql';
import { User } from '../user.entity';

@InputType()
export class SignupInput implements Partial<User> {
    @Field()
    userName: string;

    @Field()
    email: string;

    @Field()
    password: string;
}
