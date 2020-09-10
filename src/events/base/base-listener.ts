import { Message, Stan } from 'node-nats-streaming';
import { BaseEvent } from './base-event';

export abstract class BaseListener<T extends BaseEvent> {
  abstract subject: T['subject'];
  abstract queueGroupName: string;
  abstract onMessage(data: T['data'], message: Message): void;

  protected ackWait = 5000;

  constructor(private client: Stan) {}

  subscriptionOptions() {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDurableName(this.queueGroupName);
  }
  listen() {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    );

    subscription.on('message', (message: Message) => {
      console.log(`Message Received: ${this.subject} / ${this.queueGroupName}`);
      const parsedData = this.parseMessage(message);
      this.onMessage(parsedData, message);
    });
  }
  parseMessage(message: Message) {
    const data = message.getData();
    return typeof data === 'string'
      ? JSON.parse(data)
      : JSON.parse(data.toString('utf-8'));
  }
}
