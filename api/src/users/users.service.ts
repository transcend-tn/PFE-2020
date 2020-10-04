import { Injectable } from '@nestjs/common';
import { data } from './data.json';

@Injectable()
export class UsersService {
    getAll()
    {return data;}
}
