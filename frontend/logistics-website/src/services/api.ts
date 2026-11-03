// MOCK: the real backend will check the token (single-use, expires) and hash the new password
export async function resetPassword(payload: { token: string; password: string }) {
  await new Promise((resolve) => setTimeout(resolve, 800))
  if (payload.token === 'expired') {
    throw new Error('This reset link is invalid or has expired')
  }
}