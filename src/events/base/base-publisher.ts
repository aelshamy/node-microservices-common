import { Stan } from 'node-nats-streaming';
import { BaseEvent } from './base-event';

export abstract class BasePublisher<T extends BaseEvent> {
  abstract subject: T['subject'];

  constructor(private client: Stan) {}

  publish(data: T['data']): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.publish(this.subject, JSON.stringify(data), (error) => {
        if (error) {
          return reject(error);
        }
        console.log('Event Published to subject', this.subject);
        resolve();
      });
    });
  }
}
