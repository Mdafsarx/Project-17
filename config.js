

const Api=async (userSearched='iphone')=>{
    const url=`https://openapi.programming-hero.com/api/phones?search=${userSearched}`
    const response=await fetch(url)
    const Data=await response.json()
    const data=Data.data;
    Display(data,seeMoreStatus)
}
Api()
// user search
function search(){
    loading(true)
    const inputField=getId('inputField').value ;
    Api(inputField)
}

let seeMoreStatus=false;

// display ////
function Display(DATA,seeMoreStatus,dataLoad){
    
    // phone container
const phoneContainer=getId('cardContainer')
phoneContainer.innerHTML=''




// see more button Show and hide
if(DATA.length>6){
    getId('seeMore').classList.remove('hidden')
}else{
    getId('seeMore').classList.add('hidden')}

// how much show in display
if(!seeMoreStatus){
    DATA=DATA.slice(0,6)
}else{
    DATA=DATA
    getId('seeMore').classList.add('hidden')
}

    // single phone
    for(const phone of DATA){
const phoneCard=document.createElement('div')
phoneCard.className='card bg-base-100 shadow-xl border-2 border-black'
phoneCard.innerHTML=`

<figure class="px-10 pt-10 ">
<img src="${phone.image}" alt="Shoes" class="rounded-xl bg-[#0D6EFD0D] px-24 py-10" />
</figure>
<div class="card-body items-center text-center">
<h2 class="card-title text-2xl font-bold">${phone.phone_name}</h2>
<p class="font-bold text-xl"></p>
<button class="btn bg-[#0D6EFD] text-white font-bold DetailsBtn" onclick="Details('${phone.slug}')">Show Details</button>
</div>

`
phoneContainer.appendChild(phoneCard) }
loading(false)

}


// see more details btn

function Details(phoneId){
    const url=`https://openapi.programming-hero.com/api/phone/${phoneId}`
    fetch(url)
    .then(response=>response.json())
    .then(Data=>{
const data=Data.data;
console.log(data)
D.showModal()
// modal create
const Modal=getId('D')
Modal.innerHTML=`
<div class="modal-box">
        <div class="flex justify-center items-center"> <img src="${data.image}" alt="" class="bg-[#0D6EFD0D] px-20 py-10"></div>
          <div class='flex flex-col items-center justify-center '>
          <p class="text-3xl font-bold py-4">${data.name}</p>
          <p class="text-base font-bold text-balance">Storage: ${data?.mainFeatures?.storage||'00'}</p>
          <p class="text-base font-bold text-balance">Storage: ${data?.releaseDate||'Information not available'}</p>
          <div class="modal-action flex justify-center">
            <form method="dialog">
              <!-- if there is a button in form, it will close the modal -->
              <button class="btn">Close</button>
            </form>
          </div>
          </div>
        </div>
`   })}


// see more btn
 function seeMore(){
seeMoreStatus=true;
search()
 }


// data loading 
function loading(dataLoad){
if(dataLoad){
    getId('dataLoad').classList.remove('hidden')
}else{
    getId('dataLoad').classList.add('hidden')}}