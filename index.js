// Add input element inside form, before button, to take fruit description
const form = document.querySelector('form');
const descInputElement = document.createElement('input');
descInputElement.id = 'description';
descInputElement.setAttribute('type', 'text');
descInputElement.setAttribute('name', 'description');
console.log(descInputElement);
const button =form.lastElementChild;
form.insertBefore(descInputElement, button);
 

// Show the fruit description in italics on the next line

const fruits = document.querySelector('.fruits');
form.addEventListener('submit', function (event) {
    event.preventDefault();
    const fruitToAdd = document.getElementById('fruit-to-add');
    const fruitDesc = document.getElementById('description');
    const newLi = document.createElement('li');
    newLi.innerHTML = fruitToAdd.value +`<p style="font-style: italic;">${fruitDesc.value}</p>` + '<button class="delete-btn">x</button>';
    newLi.className = 'fruit';
    fruits.appendChild(newLi);

})

// Create a filter that shows only those fruits whose either name or description or both matches the entered text
const filter=document.getElementById('filter');
filter.addEventListener('keyup',function(event){
    const textEntered=event.target.value.toLowerCase();
    const fruitItems=document.getElementsByClassName('fruit');
    for(let i=0; i<fruitItems.length; i++){
        const currentFruitText=fruitItems[i].firstChild.textContent.toLowerCase();
        const fruitDescText=fruitItems[i].querySelector('p').textContent.toLowerCase();
        console.log(currentFruitText);
        console.log(fruitDescText);
        if(currentFruitText.indexOf(textEntered)=== -1 && fruitDescText.indexOf(textEntered)=== -1){
            fruitItems[i].style.display="none";
        }else{
            fruitItems[i].style.display="flex";
        }
    }
});
