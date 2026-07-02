import {
  Get,
  Controller,
  Param,
  Query,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateGreetingDto } from './dto/create-greeting.dto';
import { UpdateGreetingDto } from './dto/update-greeting.dto';
import { BasicsService } from './basics.service';

// Handles all HTTP routes under /basics
@Controller('basics')
export class BasicsController {
  constructor(private readonly basicsService: BasicsService) {}

  // Main route: /basics
  @Get()
  welcome() {
    return this.basicsService.welcome();
  }

  // This is a nested route: /basics/hello
  @Get('hello')
  hello() {
    return this.basicsService.hello();
  }

  // Nested route that gets the params: /basics/hello/${name}
  @Get('hello/:name')
  helloName(@Param('name') name: string) {
    return this.basicsService.helloName(name);
  }

  // Nested route that gets the query params: /basics/greet?name={name}&language={lang}
  // Example: /basics/greet?name=monte&language=en
  @Get('greet')
  greetLang(@Query() query: { name: string; language: string }) {
    const { name, language } = query;
    return this.basicsService.greetLang(name, language);
  }

  // List all greetings: /basics/greetings
  @Get('greetings')
  greetings() {
    return this.basicsService.greetings();
  }

  @Get('greetings/:id')
  singleGreeting(@Param('id') id: string) {
    return this.basicsService.singleGreeting(id);
  }

  // Create a new greeting: POST /basics/greetings
  @Post('greetings')
  createGreeting(@Body() createGreeting: CreateGreetingDto) {
    return this.basicsService.createGreeting(createGreeting);
  }

  // Update an existing greeting: PUT /basics/greetings/:id
  @Put('greetings/:id')
  updateGreeting(
    @Param('id') id: string,
    @Body() updateGreeting: UpdateGreetingDto,
  ) {
    return this.basicsService.updateGreeting(id, updateGreeting);
  }

  // Delete a greeting: DELETE /basics/greetings/:id
  @Delete('greetings/:id')
  deleteGreeting(@Param('id') id: string) {
    return this.basicsService.deleteGreeting(id);
  }
}
