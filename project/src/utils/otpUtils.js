// OTP generation and validation utilities
export function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function validateOTP(inputOTP, storedOTP) {
  return inputOTP === storedOTP;
}

// Simulated email OTP sending
export async function sendEmailOTP(email, otp) {
  // In a real application, this would make an API call to send the email
  console.log(`Sending OTP ${otp} to email: ${email}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: 'OTP sent successfully to email' });
    }, 1000);
  });
}

// Simulated SMS OTP sending
export async function sendSMSOTP(phone, otp) {
  // In a real application, this would make an API call to send the SMS
  console.log(`Sending OTP ${otp} to phone: ${phone}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: 'OTP sent successfully to phone' });
    }, 1000);
  });
}