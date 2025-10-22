export interface LoginParams {
  user: string;
  pass: string;
  mfaSecret: string;
  submitWithEnter?: boolean;
}