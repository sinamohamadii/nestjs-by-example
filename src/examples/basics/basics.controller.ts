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
import { UpdateGreetingDto } from './dto/udpate-greeting.dto';
import { BasicsService } from './basics.service';

@Controller('basics')
export class BasicsController {
  constructor(private readonly BasicsService: BasicsService) {}

  // Main route: /basics
  @Get()
  welcome() {
    return this.BasicsService.welcome();
  }

  // This is a nested route: /basics/hello
  @Get('hello')
  hello() {
    return this.BasicsService.hello();
  }

  // Nested route that gets the params: /basics/hello/${name}
  @Get('hello/:name')
  helloName(@Param('name') name: string) {
    return this.BasicsService.helloName(name);
  }

  // Nested route that gets the query params: /basics/greet?name={nem}&language={lang}
  // Example: /basics/greet?name=monte&language=en
  @Get('greet')
  greetLang(@Query() query: { name: string; language: string }) {
    const { name, language } = query;
    return this.BasicsService.greetLang(name, language);
  }

  @Get('greetings')
  greetings() {
    return this.BasicsService.greetings();
  }

  @Post('greetings')
  createGreeting(@Body() createGreeting: CreateGreetingDto) {
    return this.BasicsService.createGreeting(createGreeting);
  }

  @Put('greetings/:id')
  updateGreeting(
    @Param('id') id: string,
    @Body() updateGreeting: UpdateGreetingDto,
  ) {
    return this.BasicsService.updateGreeting(id, updateGreeting);
  }

  @Delete('greetings/:id')
  deleteGreeting(@Param('id') id: string) {
    return this.BasicsService.deleteGreeting(id);
  }
}
