export interface ErrorLogModel {
  id: string;
  logDate: Date;
  identifierType: string;
  identifier: string;
  logDetails: string;
  stackTrace: string;
}
