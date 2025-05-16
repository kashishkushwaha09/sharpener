
 const url='http://localhost:4000/api/users';
async function handleFormSubmit(event){
event.preventDefault();
const target=event.target;
const user={
    name:target.username.value,
    email:target.email.value,
    phone:target.phone.value
}
const editID=sessionStorage.getItem('editID');
if(editID){
    console.log(typeof editID);
    
    updateUser(user,editID);
}else{
    postUser(user);
}

document.getElementById('username').value='';
document.getElementById('email').value='';
document.getElementById('phone').value='';
document.getElementById('submitbtn').innerText='Submit'
}
async function postUser(user){
    console.log(user);
    try{
        await fetch(`${url}/add`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(user),
        })
        
       getUserFromLocalStorage();
    }catch(error){
        console.log(error);
    }
}

async function getUserFromLocalStorage(){
    const unorderList=document.querySelector('ul');
    unorderList.innerHTML='';
    try {
        const res=await fetch(`${url}`)
        const data=await res.json();
        console.log("Retrieved users:",data.users);
        const users=data.users;
        for(let user of users){
         addUserInList(user,unorderList);
        } 
    } catch (error) {
        console.log(error);
    }
    
        
    
}
function addUserInList(user,unorderList){

    const li=document.createElement('li');
    li.innerHTML=`Username: ${user.name} Email:${user.email} Phone:${user.phone}`
      li.style.margin='10px 0 10px'

    const deleteBtn=document.createElement('button');
    deleteBtn.innerText='Delete';
    deleteBtn.addEventListener('click',()=>deleteUser(user));
    deleteBtn.style.margin='0 10px 0'

    const editBtn=document.createElement('button');
    editBtn.innerText='Edit';
    editBtn.addEventListener('click',()=>editUser(user));
    
    li.appendChild(deleteBtn);
    li.appendChild(editBtn);
   unorderList.appendChild(li)
}
async function deleteUser(user){
try {
    await fetch(`${url}/delete/${user.id}`,{
        method:"DELETE"
    })
console.log("Product deleted Successfully!!")
getUserFromLocalStorage()
} catch (error) {
    console.log(error);
}

}
 function editUser(user){
    sessionStorage.setItem('editID',user.id);
    document.getElementById('username').value=user.name;
    document.getElementById('email').value=user.email;
    document.getElementById('phone').value=user.phone;
    document.getElementById('submitbtn').innerText='Update'

}
async function updateUser(user,editID){
   
    try {
        const res=await fetch(`${url}/update/${editID}`,{
            method:"PUT",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(user),
        })
        if(res.ok)
    console.log("Product Updated Successfully!!")
 getUserFromLocalStorage();
    sessionStorage.removeItem('editID');
    
    } catch (error) {
        console.log(error);
    }
}
document.addEventListener('DOMContentLoaded',getUserFromLocalStorage);