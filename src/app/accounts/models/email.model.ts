export interface EmailModel {
  id?: string;
  emailDate: Date;
  toEmail: string;
  toName: string;
  subject: string;
  body: string;
  accountId: string;
  sentDate?: Date;
  lastSentDate?: Date;
  deliveryMessage?: string;
  externalRef?: string;
  status?: string;
}
