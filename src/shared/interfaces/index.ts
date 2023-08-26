export interface JwtSignature {
  issuer: string;
  subject: string;
  audience: string;
}

export interface SignedData {
  user_id?: string;
  email: string;
  name: string;
}
