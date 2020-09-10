import { Subjects } from './base/subjects';

export interface TicketUpdated {
  subject: Subjects.TicketUpdated;
  data: {
    id: string;
    title: string;
    price: number;
    userId: string;
  };
}
