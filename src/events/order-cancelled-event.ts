import { Subjects } from './base/subjects';

export interface OrderCancelledEvent {
  subject: Subjects.OrderCreated;
  data: {
    id: string;
    ticket: {
      id: string;
    };
  };
}
