import { createEntity } from './create';
import { deleteEntity } from './delete';

// Define the structure of an entity
interface Entity {
  id: string;
  name: string;
}

// Select DOM elements
const createForm = document.getElementById('createEntityForm') as HTMLFormElement;
const fetchEntitiesButton = document.getElementById('fetchEntities') as HTMLButtonElement;
const entityListElement = document.getElementById('entityList') as HTMLElement;
const deleteForm = document.getElementById('deleteEntityForm') as HTMLFormElement;
const createMessageElement = document.getElementById('createMessage') as HTMLElement;
const deleteMessageElement = document.getElementById('deleteMessage') as HTMLElement;

// Base URL for the API
const API_BASE_URL = "https://673e9c9ea9bc276ec4b4ff64.mockapi.io/TestingAPi";

// Function to fetch and display entities
async function fetchEntities(): Promise<void> {
  entityListElement.innerHTML = '<p>Loading...</p>';
  try {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch entities.');
    }

    const entities: Entity[] = await response.json();
    if (entities.length > 0) {
      entityListElement.innerHTML = '';
      entities.forEach((entity) => {
        const entityDiv = document.createElement('div');
        entityDiv.className = 'entity-item';
        entityDiv.innerHTML = `
          <span>ID: ${entity.id} | Name: ${entity.name}</span>
        `;
        entityListElement.appendChild(entityDiv);
      });
    } else {
      entityListElement.innerHTML = '<p>No entities found.</p>';
    }
  } catch (error) {
    entityListElement.innerHTML = `<p class="error">Error: ${(error as Error).message}</p>`;
  }
}

// Event listener for the create entity form
createForm.addEventListener('submit', (event: SubmitEvent) => {
  event.preventDefault();
  const entityNameInput = document.getElementById('entityName') as HTMLInputElement;
  const entityName = entityNameInput.value.trim();
  if (entityName) {
    createEntity(entityName, fetchEntities, createMessageElement, createForm);
  }
});

// Event listener for the delete entity form
deleteForm.addEventListener('submit', (event: SubmitEvent) => {
  event.preventDefault();
  const entityIdInput = document.getElementById('entityId') as HTMLInputElement;
  const entityId = entityIdInput.value.trim();
  if (entityId) {
    deleteEntity(entityId, fetchEntities, deleteMessageElement, deleteForm);
  }
});

// Event listener for the fetch entities button
fetchEntitiesButton.addEventListener('click', fetchEntities);

// Initial fetch to display entities when the page loads
fetchEntities();
