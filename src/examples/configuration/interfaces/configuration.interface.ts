export interface AppConfig {
  appName: string;
  nodeEnv: string;
}

export interface MailConfig {
  sender: string;
  retryCount: number;
}
