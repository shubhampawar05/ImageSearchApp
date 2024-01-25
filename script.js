let searchBtn = document.querySelector("button");
let imgDiv = document.querySelector(".onlyimg");
let imgContainer = document.querySelector(".img-div");
let loding  =  document.querySelector('.loader');
let count = 1;

searchBtn.addEventListener('click', ()=> {
  // setTimeout(()=>{
  //   fatchData();
  // },2000)
  fatchData();
 
  count = 1;
});


function fatchData(){
  let inputvalue = document.querySelector("input").value;

  let firstpart = `https://api.unsplash.com/search/photos?page=${count}&query=`;
  let clientID = "&client_id=yG67sGV2-3T5t9D3X3QKefddOMMi9yUisP9hcXtzl9M";
  let url = `${firstpart}${inputvalue}${clientID}`;
  fetch(url)
  .then((response) => response.json())
  .then((parsedResponse) => {
    updatefuction(parsedResponse);
   })
}

function updatefuction(parsedResponse){
      //for removing the show btn from end for next images
      if(count == 1){
        imgDiv.innerHTML = '';
      }  
        if(imgContainer.lastChild){
          imgContainer.removeChild(imgContainer.lastChild);
        }

      for (let i = 0; i < parsedResponse.results.length; i++) {
        const photo = parsedResponse.results[i].urls.regular;
        const discription = parsedResponse.results[i].alt_description;
        // console.log(photo);
        // console.log(discription);

        let div = document.createElement("div");
        let img = document.createElement("img");
        let disc = document.createElement('p')

        img.classList.add("imgStyle");
        img.setAttribute("src", `${photo}`);
        disc.innerText = discription;

        div.classList.add('imganddiscDiv')
        disc.classList.add('para')
        div.append(img ,disc);
        imgDiv.append(div);
      }

      let btnshow = document.createElement('button');
      btnshow.classList.add('showbtn')
      btnshow.innerText = 'Show More';
      btnshow.addEventListener('click', ()=> showMore())
      imgContainer.append(btnshow)

    //  document.querySelector("input").value = '';
    };


function showMore(){
    count++;
    fatchData();
}
