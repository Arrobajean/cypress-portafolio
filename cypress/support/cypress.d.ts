import type { EnsureUser } from "./commands";

declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
      ensureUser(user: EnsureUser): Chainable<void>;
    }
  }
}

export {};
