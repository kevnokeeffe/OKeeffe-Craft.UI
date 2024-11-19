export interface ContactMessageModel {
  id?: string;
  email: string;
  subject: string;
  message: string;
  createdDate?: Date;
  updatedDate?: Date;
}
