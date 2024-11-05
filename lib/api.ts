
const API_BASE_URL = process.env.API_BASE_URL || '/api';

export async function fetchBook(id: number) {
  try {
    const response = await fetch(`${API_BASE_URL}/library/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch book');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching book:', error);
    throw error;
  }
}

export async function fetchBooks() {
  try {
    const response = await fetch(`${API_BASE_URL}/library`);
    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
}