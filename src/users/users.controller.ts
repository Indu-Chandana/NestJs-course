import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { UsersService } from './users.service';

@Controller('users') // This is a decorator
// This is the parent route. '/users'

// what is the @ symble doing, they run automatically when called. 
// u can thik, Nest is define predefin function. 
export class UsersController {
    // planing routes, we want to handle.

    constructor(private readonly userService: UsersService) { }

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

    /* -------------------- GET Route --------------------  */
    @Get() // GET / users ---- or ---- /users?role=val&age=24 (Query param)
    findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        return this.userService.findAll(role)
    }

    /*
        We u had a specific static route '/users/interns' 
        that would be before s dynamic route '/users/:id'
    */
    @Get(':id') // GET / users/:id
    findOne(@Param('id') id: string) {
        return { id }
    }

    /* -------------------- POST Route --------------------  */
    @Post() // POST / users
    create(@Body() user: {}) {
        return user
    }

    /* -------------------- POST Route --------------------  */
    @Patch(':id') // PATCH /users/:id
    update(@Param('id') id: string, @Body() userUpdate: {}) {
        return { id, ...userUpdate }
    }

    /* -------------------- DELETE Route --------------------  */
    @Delete(':id') // DELETE /users/:id
    delete(@Param('id') id: string) {
        return { id }
    }
}
