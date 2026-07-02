import { Injectable } from '@nestjs/common';
import { CreateGreetingDto } from './dto/create-greeting.dto';
import { UpdateGreetingDto } from './dto/udpate-greeting.dto';

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
  welcome() {
    return {
      module: 'Basics',
      message: 'Welcome to the Basics module.',
    };
  }

  hello() {
    return {
      module: 'Basics',
      message: 'Hello, World!',
    };
  }

  helloName(name: string) {
    return {
      module: 'Basics',
      message: `Hello, ${name}!`,
    };
  }

  greetLang(name: string, language: string) {
    return {
      module: 'Basics',
      message: `Hello, ${name}!`,
      language: language,
    };
  }

  greetings() {
    return {
      module: 'Basics',
      greetings: greetings,
    };
  }

  createGreeting(createGreeting: CreateGreetingDto) {
    greetings.push(createGreeting);
    console.log(greetings);
    return createGreeting;
  }

  updateGreeting(id: string, updateGreeting: UpdateGreetingDto) {
    const greetingId = Number(id); // Convert the id to a number since params are always strings

    const greetingIndex = greetings.findIndex((g) => g.id === greetingId);

    if (greetingIndex === -1) {
      return {
        module: 'Basics',
        message: 'Greeting not found.',
      };
    }

    greetings[greetingIndex] = {
      ...greetings[greetingIndex],
      ...updateGreeting,
    };

    return greetings[greetingIndex];
  }

  deleteGreeting(id: string) {
    const greetingId = Number(id);
    const greetingIndex = greetings.findIndex((g) => g.id === greetingId);

    if (greetingIndex === -1) {
      return {
        module: 'Basics',
        message: 'Greeting not found.',
      };
    }

    greetings.splice(greetingIndex, 1);

    console.log(greetings);

    return {
      module: 'Basics',
      message: 'Greeting deleted.',
    };
  }
}
