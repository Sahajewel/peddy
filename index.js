// category pets 
const loaderHandle=()=>{
    document.getElementById("show-loader").style.display="none";
   
}

const loader=()=>{
     document.getElementById("show-loader").style.display="block";
     
    setTimeout(function(){
       
        loaderHandle()
    },2000)
}
const activeClose = ()=>{
  const buttons=  document.getElementsByClassName("active-close");
  for(let btn of buttons){
    btn.classList.remove("bg-green-light","border-4", "rounded-[50px]")
  }
}
const dynamicCategory = (id)=>{
 
  fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)

  .then((res)=>res.json())
  .then((data)=> {
   activeClose()
    const activeBtn= document.getElementById(`btn-${id}`);
    activeBtn.classList.add("bg-green-light","border-4", "rounded-[50px]")
    displayCard(data.data)
  })
  .catch((error)=>console.log(error))

}
const categoryPets = ()=>{
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
 
    .then((res)=>res.json())
    .then((data)=> showCategoryPets(data.categories))
    .catch((error)=>console.log(error))
}

const showCategoryPets= (data)=>{
    const displayPets = document.getElementById("display-pets");
  
    data.forEach((showCategoryData)=>{
        const div = document.createElement("div");
   

       
        div.innerHTML = `
       
       
            <div onclick="loader()">
                 <a id="btn-${showCategoryData.category}"  onclick="dynamicCategory('${showCategoryData.category}')"  class="flex justify-center mr-5 mb-5 cursor-pointer items-center border border-green-light rounded-2xl p-5 active-close">
                     <img class="mr-2" src= ${showCategoryData.category_icon}/>
                    <p class="font-900">${showCategoryData.category}</p>
              </a>
            </div>
        
           
       
        `
        
        displayPets.appendChild(div)
        
    })
}
const adoptBtn = (id)=>{
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
    .then((res)=> res.json())
    .then((data)=>adoptShow(data.petData))
    .catch((error)=> console.log(error))
}
const adoptShow = (showAdopt)=>{
    
    const clickModal = document.getElementById("click-modal");
    clickModal.innerHTML = `
   <img class="h-[300px] w-full object-cover" src="${!showAdopt.image? "not found image" : showAdopt.image}"/>
    <h3 class="my-2 font-900 text-18">${!showAdopt.pet_name?  "Not found" : showAdopt.pet_name}</h3>
    <div class="flex border-b pb-4">u
        <div class="mr-10">
              <p>Breed: ${!showAdopt.breed? "Don't Know" : showAdopt.breed}</p>
              <p><i class="fa-solid fa-venus mr-2"></i>Gender: ${!showAdopt.gender? "not found" : showAdopt.gender}</p>
              <p><i class="fa-solid fa-virus mr-2"></i>Vaccinated status: ${!showAdopt.vaccinated_status? "don't know" : showAdopt.vaccinated_status}</p>
        </div>
        <div>
             <p><i class="fa-solid fa-cake-candles mr-2"></i>Birth: ${!showAdopt.date_of_birth? "Don't know" : showAdopt.date_of_birth}</p>
             <p class=" pb-4"><i class="fa-solid fa-dollar-sign mr-2"></i>Price: ${!showAdopt.price? "free" : showAdopt.price}
         </div>
    </div>
    <h2 class="my-2 font-900 text-18">Details Information</h2>
    <p>${showAdopt.pet_details}</p>
    `
    document.getElementById("custom_modal").showModal()
}
const likeBtnShow= (id)=>{
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
    .then((res)=> res.json())
    .then((data)=>likeShow(data?.petData.image))
    .catch((error)=> console.log(error))
   
}
const likeShow= (data)=>{
    const gridRight = document.getElementById("grid-right");
    const showDiv = document.createElement('div');
    showDiv.innerHTML = `
      <img class="w-full" src=${data}/>
   `;
       gridRight.appendChild(showDiv)
}
const clickBtnModal= (id)=>{
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
    .then((res)=> res.json())
    .then((data)=>clickModalDisplay(data.petData))
    .catch((error)=> console.log(error))
}
const clickModalDisplay = ()=>{
    // const modalBtnClick = document.getElementById("click-modal-display");
    const displayDivModal = document.getElementById("display-div-modal")
    displayDivModal.innerHTML = `
        <div class="text-center">
        <i class="fa-solid fa-handshake text-3xl text-green-deep"></i>
        <h2 class="text-4xl font-bold mb-2">Congrates</h2>
        <h1>Adoption process is start for your pet</h1>
        <h2 id="countdown">3</h2>
        </div>
    `
document.getElementById("my_modal_1").showModal();
countdown()
}
// let count = 3;
// const countdownElement = document.getElementById("countdown");
// const countdown = setInterval(()=>{
//     count--;
//     countdownElement.innerText = count
//     if(count === 0){
//         clearInterval(countdown);
//        
//     }
// },1000);
// display card 
const displayCards = ()=>{
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res)=> res.json())
    .then((data)=>displayCard(data.pets))
    .catch((error)=> console.log(error))
}

const displayCard = (data)=>{
    const gridLeft = document.getElementById("grid-left");
        gridLeft.innerHTML="";
if(data.length===0){
    gridLeft.classList.remove("grid")
    gridLeft.innerHTML=`

    <div class="mx-auto my-10">
        <img class="mx-auto" src="./images/error.webp"/>
    <h2 class="text-center font-900 text-24">Content Not Available</h2>
    </div>
    `
    return;
}else{
    gridLeft.classList.add("grid")
}
    
    data.forEach((showCard)=>{
        const card = document.createElement("div");
        card.classList.add("border","rounded-lg","p-5")
        card.innerHTML = `
        <img class="w-full h-[200px] object-cover" src=${!showCard.image? "not found image" : showCard.image}/>
        <h3 class="my-2 font-900 text-18">${!showCard.pet_name? "Not found" : showCard.pet_name}</h3>
        <div class="flex">
             <img class="w-5 mr-1" src="./images/breeding.png"/> 
            <p>Breed: ${!showCard.breed? "Don't Know" :showCard.breed}</p>
           
        </div>
        <p><i class="fa-solid fa-cake-candles mr-2"></i>Birth: ${!showCard.date_of_birth? "Don't know" : showCard.date_of_birth}</p>
        <p><i class="fa-solid fa-venus mr-2"></i>Gender: ${!showCard.gender? "not found" : showCard.gender}</p>
        <p class="border-b pb-4"><i class="fa-solid fa-dollar-sign mr-2"></i>Price: ${!showCard.price? "Free" : showCard.price}$</p>
        <div class="mt-4 grid grid-cols-3 gap-2">
            <button onclick="likeBtnShow('${showCard.petId}')"  class="btn "><i class="fa-regular fa-thumbs-up"></i></button>
            <button onclick="clickBtnModal('${showCard.petId}')"  class="btn xs:text-md sm:text-md md:text-lg lg:text-lg text-green-deep font-900"">Adopt</button>
            <button onclick="adoptBtn('${showCard.petId}')"  class="btn xs:text-md sm:text-md md:text-lg lg:text-lg text-green-deep font-900">Details</button>
            
        </div>

        `
        gridLeft.appendChild(card)
    })
}

document.getElementById("sort").addEventListener("click", ()=>{
    fetch(`https://openapi.programming-hero.com/api/peddy/pets`)
    .then((res)=>res.json())
    .then((data)=> {
        const sortPrice = data.pets.sort((a,b)=>parseInt(b.price)- parseInt(a.price) )
        displayCard(sortPrice)
    })
    .catch((error)=>console.log(error))
    
})

categoryPets();
displayCards();