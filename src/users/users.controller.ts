import { Controller } from '@nestjs/common';

@Controller('users') // This is a decorator
// This is the parent route. '/users'

// what is the @ symble doing, they run automatically when called. 
// u can thik, Nest is define predefin function. 
export class UsersController {
    // planing routes, we want to handle.

    /*
    GET /users
    GET /users/:id
    POST /users
    PATCH /users/:id
    DELETE /users/:id
    */
    /* 
    - dif of PATCH and PUT -
    PATCH- change one thing
    PUT- change entire thing
    */
}
