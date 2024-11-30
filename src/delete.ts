// Define the API base URL (replace with actual API endpoint)
const API_BASE_URL = "https://673e9c9ea9bc276ec4b4ff64.mockapi.io/TestingAPi";

// Function to delete an entity
export async function deleteEntity(
  id: string,
  updateUI: () => Promise<void>,
  messageElement: HTMLElement,
  formElement: HTMLFormElement
): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      messageElement.textContent = 'Entity deleted successfully!';
      messageElement.className = 'success';
      formElement.reset();
      await updateUI(); // Refresh the list of entities
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete entity.');
    }
  } catch (error) {
    messageElement.textContent = `Error: ${(error as Error).message}`;
    messageElement.className = 'error';
  }
}
