import { Injectable } from '@nestjs/common';
import { ILogger } from '../interfaces/notification.interface';

/**
 * LoggerService - Example of a simple service provider
 *
 * This service demonstrates:
 * - How to create a simple service that can be injected
 * - Constructor Injection pattern
 * - Singleton pattern (by default in NestJS)
 */
@Injectable()
export class LoggerService implements ILogger {
  private timestamps: Map<string, number> = new Map();

  log(message: string): void {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] INFO: ${message}`);
    this.timestamps.set(message, Date.now());
  }

  error(message: string): void {
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] ERROR: ${message}`);
  }

  /**
   * Demonstrates that LoggerService is a Singleton
   * This method returns how many messages have been logged
   */
  getLogCount(): number {
    return this.timestamps.size;
  }
}
