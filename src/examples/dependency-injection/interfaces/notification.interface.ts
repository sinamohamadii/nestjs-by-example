/**
 * Notification interface
 * Defines the contract for any notification provider
 */
export interface INotification {
  send(recipient: string, message: string): Promise<void>;
}

/**
 * Logger interface
 * Defines the contract for logging providers
 */
export interface ILogger {
  log(message: string): void;
  error(message: string): void;
}

/**
 * Configuration interface
 * Defines the contract for configuration providers
 */
export interface IConfig {
  appName: string;
  appVersion: string;
}
