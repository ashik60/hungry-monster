// Handle search
const searchMeal = () => {
  const foodInput = document.getElementById("foodInput").value;
  const api = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${foodInput}`;
  fetch(api)
    .then((res) => res.json())
    .then((data) => displayMeals(data));
};

// Display Search result
const displayMeals = (foods) => {
  //  Hide food details if displaying
  document.getElementById("ingredients").style.display = "none";
  const foodListDiv = document.getElementById("foodListDiv");
  const meals = foods.meals;

  if (meals === null) {
    foodListDiv.innerHTML = "<h3>No matching food found.</h3>";
  } else {
    foodListDiv.innerHTML = "";
    meals.forEach((meal) => {
      const foodDiv = document.createElement("div");
      const foodId = meal.idMeal;

      const foodInfo = `
            <div class="m-2 bg-light" onclick=displayFoodDetails('${foodId}')>
                <img src="${meal.strMealThumb}" class="food-image"/>
                <h6 class="text-center pb-2">${meal.strMeal}</h6>
            </div>
        `;

      foodDiv.innerHTML = foodInfo;
      foodListDiv.appendChild(foodDiv);
    });
  }
};

// Display food details
const displayFoodDetails = (id) => {
  const api = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  fetch(api)
    .then((res) => res.json())
    .then((data) => displayIngredients(data));
};

// Display Ingredient
const displayIngredients = (food) => {
  document.getElementById("ingredients").style.display = "block";
  const mealImage = document.getElementById("mealImage");
  const mealName = document.getElementById("mealName");
  const ingredientList = document.getElementById("ingredientList");
  mealImage.src = food.meals[0].strMealThumb;
  mealName.innerHTML = food.meals[0].strMeal;
  ingredientList.innerHTML = ""; //Clear list if already populated

  for (let i = 1; i <= 20; i++) {
    const ingredientItem = food.meals[0][`strIngredient${i}`];
    const ingredientAmount = food.meals[0][`strMeasure${i}`];
    if (ingredientItem) {
      const li = document.createElement("li");
      li.innerHTML = `${ingredientAmount} ${ingredientItem}`;
      ingredientList.appendChild(li);
      console.log(ingredientItem);
    }
  }
};
