export type SessionPayload = {
  userId?: string | number //used for simple session
  sessionId?: string //used for multisession db
  expiresAt: Date
}

export interface SignInError {
  type: 'CredentialsSignin'
  message?: string
}
