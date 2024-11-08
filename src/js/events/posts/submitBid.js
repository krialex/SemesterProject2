import { GET_BASE_URL, LISTINGS, API_KEY } from '../../api/constants.js';
import { showToast } from '../../ui/common/userFeedbackToast.js';

export async function submitBid(id, bidAmount, token) {
  const bidData = { amount: parseFloat(bidAmount) };

  if (isNaN(bidAmount) || bidAmount <= 0) {
    showToast('Please enter a valid bid amount');
    return;
  }

  try {
    const response = await fetch(`${GET_BASE_URL}${LISTINGS}/${id}/bids`, {
      method: 'POST',
      headers: {
        'X-Noroff-API-Key': API_KEY,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bidData),
    });

    if (response.ok) {
      showToast('Your bid is successfully placed!');
      const result = await response.json();
      return result;
    } else {
      const errorResponse = await response.json();
      console.log('Failed to place your bid', errorResponse);
      showToast(
        `You must place a higher bid. The current bid is higher than what you placed.`,
      );
    }
  } catch (error) {
    showToast('An error has occurred while placing the bid');
    console.log(error);
  }
}
