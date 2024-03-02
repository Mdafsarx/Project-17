// buy now 
getId('buyNow').addEventListener('click',()=>{
    scrollBy(0,910)
})

// search
function search(){
    const inputField=getId('inputField').value 
    dataLoading(false)
    ApiDataLoad(inputField,isMore)
    
}
async function ApiDataLoad(userSearch,isMore){
    const url=`https://openapi.programming-hero.com/api/phones?search=${userSearch}`;
    const res=await fetch(url)
    const data=await res.json()
    const Data=data.data;
    display(Data,isMore)
}
ApiDataLoad('z')

function display(phone,isMore){
const phoneContainer=getId('cardContainer')
phoneContainer.innerHTML=''

if(phone.length===0){
    const inputField=getId('inputField').value 
getId('invalidSearch').innerText=inputField
    getId('emptyMessage').classList.remove('hidden')

}else{
    getId('emptyMessage').classList.add('hidden')
}
if(isMore){
    phone=phone
    getId('seeMore').classList.add('hidden')
}else if(phone.length>6){phone=phone.slice(0,6)
getId('seeMore').classList.remove('hidden')
}

phone.forEach(phn => {
    // console.log(phn)
    // create phone Card here
const phoneCard=document.createElement('div')
phoneCard.classList='card bg-base-100 shadow-xl border-2 border-black px-4 py-6'
phoneCard.innerHTML=`
<figure><img src="${phn.image}" alt="Shoes" /></figure>
        <div class="text-center py-3 space-y-2">
          <h2 class="text-2xl font-bold">${phn.phone_name}</h2>
          <p class="text-xl font-bold">Brand: ${phn.brand}</p>
          <button class="btn bg-blue-600 text-white" onclick="Details('${phn.slug}')">Show Details</button>
        </div>
`
phoneContainer.appendChild(phoneCard)});
dataLoading(true)
}


// data loading

function dataLoading(dataLoaded){
    if(dataLoaded){
        getId('dataLoad').classList.add('hidden')
    }else{
        getId('dataLoad').classList.remove('hidden')
    }
}

// see more
let isMore=false;
function seeMore(){
isMore=true
search()

}


// details Show

function Details(phoneId){

const url=`https://openapi.programming-hero.com/api/phone/${phoneId}`
fetch(url)
.then(res=>res.json())
.then(data=>{
console.log(data.data)
const modal=getId('D')

modal.innerHTML=`
<div class="modal-box">
    <div class="flex justify-center items-center"><img src='${data.data.image}' class="bg-cyan-300 px-16 py-10 rounded-2xl"></div>
    <div class='pl-5 mt-2'>
    <p class="text-2xl font-bold">${data.data.name}</p>
    <p class="text-xl font-semibold">${data.data?.releaseDate}</p>
    <p class="text-xl font-semibold">Memory: ${data.data?.mainFeatures?.memory}</p>
    <p class="text-xl font-semibold">sensors: ${data.data?.mainFeatures?.sensors[0]}</p>
    <p class="text-xl font-semibold">Bluetooth: ${data.data.others?.Bluetooth}</p>
    
    </div>

    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
`

    D.showModal()
})
}