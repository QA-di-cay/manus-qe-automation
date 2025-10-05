import { Page } from '@playwright/test';
import { authenticator } from 'otplib';

export async function generateOtp(
  secret: string,
  page: Page,
  allowRemainSec: number = 2
): Promise<string> {
  //get OTP's maximine valid time
  const step = authenticator.options.step ?? 30;

  //calculate OTP's remaining time
  const epoch = Math.floor(Date.now() / 1000);
  const remainSec = step - (epoch % step);

  // generate OTP
  remainSec <= allowRemainSec && await page.waitForTimeout(4000);
  return authenticator.generate(secret);
}
