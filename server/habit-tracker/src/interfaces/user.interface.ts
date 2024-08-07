import { Document } from 'mongoose';

export interface User extends Document {
  readonly firstName: string;
  readonly lastName: string;
  readonly preferredName: string;
  readonly avatar: string;
  readonly email: string;
  readonly password: string;
}
