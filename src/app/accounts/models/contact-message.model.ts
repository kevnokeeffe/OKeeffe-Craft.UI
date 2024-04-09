export interface ContactMessageModel {
  id?: string;
  email: string;
  subject: string;
  message: string;
  created?: Date;
  updated?: Date;
}
