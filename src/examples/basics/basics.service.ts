import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGreetingDto } from './dto/create-greeting.dto';
import { UpdateGreetingDto } from './dto/update-greeting.dto';

// In-memory seed data — resets on server restart and is shared across all requests
const greetings = [
  {
    id: 1,
    name: 'Monte',
    message: 'Hello, Monte!',
  },
  {
    id: 2,
    name: 'Sina',
    message: 'Hello, Sina!',
  },
  {
    id: 3,
    name: 'Alice',
    message: 'Hello, Alice!',
  },
  {
    id: 4,
    name: 'John',
    message: 'Hello, John!',
  },
  {
    id: 5,
    name: 'Emma',
    message: 'Hello, Emma!',
  },
  {
    id: 6,
    name: 'Liam',
    message: 'Hello, Liam!',
  },
  {
    id: 7,
    name: 'Sophia',
    message: 'Hello, Sophia!',
  },
  {
    id: 8,
    name: 'Noah',
    message: 'Hello, Noah!',
  },
];

@Injectable()
export class BasicsService {
  // Module entry point — confirms the basics routes are reachable
  welcome() {
    return {
      module: 'Basics',
      message: 'Welcome to the Basics module.',
    };
  }

  // Simple GET response with no parameters
  hello() {
    return {
      module: 'Basics',
      message: 'Hello, World!',
    };
  }

  // Route parameter example — name comes from the URL path
  helloName(name: string) {
    return {
      module: 'Basics',
      message: `Hello, ${name}!`,
    };
  }

  // Query parameter example — name and language come from the query string
  greetLang(name: string, language: string) {
    return {
      module: 'Basics',
      message: `Hello, ${name}!`,
      language: language,
    };
  }

  // Returns all greetings from the in-memory store
  greetings() {
    return {
      module: 'Basics',
      greetings: greetings,
    };
  }

  // Appends a new greeting to the in-memory store
  createGreeting(createGreeting: CreateGreetingDto) {
    greetings.push(createGreeting);
    return {
      module: 'Basics',
      greeting: createGreeting,
    };
  }

  updateGreeting(id: string, updateGreeting: UpdateGreetingDto) {
    const greetingId = Number(id); // Convert the id to a number since params are always strings

    const greetingIndex = greetings.findIndex((g) => g.id === greetingId);

    if (greetingIndex === -1) {
      throw new NotFoundException('Greeting not found.');
    }

    greetings[greetingIndex] = {
      ...greetings[greetingIndex],
      ...updateGreeting,
    };

    return {
      module: 'Basics',
      greeting: greetings[greetingIndex],
    };
  }

  deleteGreeting(id: string) {
    const greetingId = Number(id);
    const greetingIndex = greetings.findIndex((g) => g.id === greetingId);

    if (greetingIndex === -1) {
      throw new NotFoundException('Greeting not found.');
    }

    greetings.splice(greetingIndex, 1);

    return {
      module: 'Basics',
      message: 'Greeting deleted.',
    };
  }
}
