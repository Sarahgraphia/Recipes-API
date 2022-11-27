var detailsBody = document.querySelector(".modal .modal-body");

var categories = document.querySelectorAll(".navbar .nav-link");

for (var i = 0; i < categories.length; i++) {
    categories[i].addEventListener("click", function (e) {
        getRecipes(e.target.text);
    });
}

var recipesOnly = [];

getRecipes('cake');

async function getRecipes(meal) {
    let response = await fetch(
        `https://forkify-api.herokuapp.com/api/search?q=${meal}`
    );
    let recipes = await response.json();
    recipesOnly = await recipes.recipes;
    displayData(meal);
    // console.log(`pizzaaaaaaaaaa`, recipesOnly);
}

function displayData(meal) {
  let mealName = meal;
  console.log(mealName);
  let recipeTitle = document.getElementById("title");
  recipeTitle.innerHTML=mealName+' Reciepes';
  var cartona = "";

  for (var i = 0; i < recipesOnly.length; i++) {
    cartona += `  <div class="col-md-4">
            <div class="item my-4 p-4">
            <div class="enveolp ">  
            <img src="${recipesOnly[i].image_url}" class="w-100 raduis" height="270px" >
            <div class="layOut d-flex justify-content-center align-items-center raduis"> 
            <div class="recipesDetails">  
            
             <h4 class="text-white px-3">  ${recipesOnly[i].title} </h4>
    <a  class="btn sourceStyle " href="${recipesOnly[i].source_url} " target="_blank" >Source</a>
     <a  class="btn detailStyle" onclick=' getRecipesDetails(${recipesOnly[i].recipe_id}) '  data-bs-toggle="modal" data-bs-target="#staticBackdrop" >Details</a>
            </div>
            
            </div>
   
            </div>
    
      </div>
      </div>   `;

    document.getElementById("rawData").innerHTML = cartona;
  }
}

async function getRecipesDetails(recipeId) {
    var response = await fetch(
        `https://forkify-api.herokuapp.com/api/get?rId=${recipeId}`
    );
    var recipeData = await response.json();
    var recipeDetails = await recipeData.recipe;

    var recipeContent = `
     <img src="${recipeDetails.image_url}" class="w-75" height="270px" >

     <h3> ${recipeDetails.title} </h3>

    
    `;
    // console.log(recipeContent);

    detailsBody.innerHTML = recipeContent;
}


///JQUERYY


let capOff = $(".caption-content").offset().top ;

$(window).scroll(function(){

  if ($(window).scrollTop() > capOff) {
    $(".navbar").css({ backgroundColor: "black", transition: "1.5s" });
  } else {
    $(".navbar").css({ backgroundColor: "transparent" });
  }

})

/////////////////////////////////////TRADITIONAL JSON -API BEFORE FETCH METHOD///////////////////////////////////////////////
// var recipes= [];

// getRecipes(meal)

// function getRecipes(meal) {

//     var httpReq = new XMLHttpRequest();
//     httpReq.open("get", `https://forkify-api.herokuapp.com/api/search?q=${meal}`);
//     httpReq.send();

//     httpReq.addEventListener('readystatechange', function (e) {

//         if (httpReq.readyState == 4 && httpReq.status== 200 ) {

//             recipes = JSON.parse(httpReq.response).recipes;
//             console.log(recipes);

//             displayData()
//         }

//     })

// }

// function displayData(){

//     var cartona= "";

//     for (var i = 0; i < recipes.length ; i++){

//     cartona+= `  <div class="col-md-4">
//             <div class="item my-4 ">
//     <img src="${recipes[i].image_url}" class="w-100" height="270px" >
//     <h3>  ${recipes[i].title} </h3>
//     <a  class="btn btn-success " href="${recipes[i].source_url} " target="_blank" >Source</a>
//      <a  class="btn btn-success " href="${recipes[i].source_url} " target="_blank" >Details</a>
//     </div>
//     </div>   `

//     document.getElementById("rawData").innerHTML= cartona;

//  }
// }
