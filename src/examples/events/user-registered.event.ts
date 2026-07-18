// A small class describing what happened and carrying any useful data.
// Using a class (instead of a loose object) keeps the event payload typed.
export class UserRegisteredEvent {
  constructor(
    public readonly userId: number,
    public readonly email: string,
  ) {}
}
