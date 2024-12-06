export const sendNotificationEmail = async (email: string, fullName: string, status: string) => {
  try {
    const response = await fetch('/api/send-notification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, fullName, status }),
    });
    
    if (!response.ok) throw new Error('Failed to send email');
    return await response.json();
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}; 