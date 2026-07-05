import { registerAs } from '@nestjs/config';

export default registerAs('mail', () => ({
  sender: process.env.MAIL_SENDER || 'noreply@example.com',
  retryCount: parseInt(process.env.MAIL_RETRY_COUNT || '3', 10),
}));
