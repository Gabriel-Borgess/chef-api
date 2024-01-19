document.getElementById('recipeForm').addEventListener('submit', async function (event) {
      event.preventDefault();
    
      const recipeTitle = document.getElementById('recipeTitle').value;
    
      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: recipeTitle,
          description: '',
          image: '',
          ingredients: [],
          instructions: [],
          category: '',
        }),
      });
    
      fetchRecipes();
    });
    
    async function fetchRecipes() {
      const response = await fetch('/api/recipes', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    
      const recipes = await response.json();
    
      const recipeGrid = document.getElementById('recipeGrid');
      recipeGrid.innerHTML = '';
    
      recipes.forEach((recipe) => {
        const recipeCard = document.createElement('div');
        recipeCard.className = 'p-4 border rounded-md cursor-pointer';
        recipeCard.innerHTML = `
          <h3 class="text-lg font-semibold mb-2">${recipe.title}</h3>
          <p class="text-gray-700">${recipe.description}</p>
          <button class="mt-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600" onclick="showRecipeDetails('${recipe.title}', '${recipe.description}')">Details</button>
          <button class="mt-2 bg-red-500 text-white p-2 rounded-md hover:bg-red-600" onclick="deleteRecipe('${recipe._id}')">Delete</button>
        `;
        recipeGrid.appendChild(recipeCard);
      });
    }
    
    function showRecipeDetails(title, description) {
      const modal = document.getElementById('recipeModal');
      const modalContent = document.getElementById('recipeModalContent');
      const modalRecipeTitle = document.getElementById('modalRecipeTitle');
      const modalRecipeDescription = document.getElementById('modalRecipeDescription');
      const closeBtn = document.getElementById('closeRecipeModal');
    
      modalRecipeTitle.textContent = title;
      modalRecipeDescription.textContent = description;
    
      modal.classList.remove('hidden');
    
      closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
      });
    
      modal.addEventListener('click', (event) => {
        if (event.target === modal) {
          modal.classList.add('hidden');
        }
      });
    }
    
    async function deleteRecipe(recipeId) {
      const confirmDelete = confirm('Are you sure you want to delete this recipe?');
      if (confirmDelete) {
        const response = await fetch(`/api/recipes/${recipeId}`, {
          method: 'DELETE',
        });
        fetchRecipes();
      }
    }
    
    fetchRecipes();
    