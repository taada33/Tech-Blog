

const homeBtn = document.querySelector('.home');
const dashBtn = document.querySelector('.dashboard');
const logoutBtn = document.querySelector('.logout');
const loginBtn = document.querySelector('.login');

homeBtn.addEventListener('click', () => {
    document.location.assign('/')
})

dashBtn.addEventListener('click', () => {
    document.location.assign('/dashboard')
})

if(logoutBtn !== null){
    logoutBtn.addEventListener('click', async () => {
        const response = await fetch('api/users/logout', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
        })
        if (response.ok) {
            document.location.replace('/');
          } else {
            alert('Failed to log out');
          }
    })
}

if(loginBtn !== null){
    loginBtn.addEventListener('click', async () => {
        document.location.assign('/login')
    })
}


const containerEl = document.querySelector('.postsContainer')


const clickHandler = async function(event){
    if(event.target.classList.contains('post')){
        const allActive = document.querySelectorAll('.active');
        allActive.forEach(element => {
            if(!event.target.contains(element)){
                element.classList.remove('active')
                element.classList.add('hidden')
            }
        })



        if(document.querySelector('.content') !== null){

            if(document.querySelector('.add-comment')){
                if(document.querySelector('.add-comment').classList.contains('active')){
                    document.querySelectorAll('.add-comment').forEach(element => element.classList.add('active'))
                    document.querySelectorAll('.add-comment').forEach(element => element.classList.remove('hidden'))
                }
            }
            if(document.querySelector('.update-post')){
                if(document.querySelector('.update-post').classList.contains('active')){
                    document.querySelectorAll('.update-post').forEach(element => element.classList.add('active'))
                    document.querySelectorAll('.update-post').forEach(element => element.classList.remove('hidden'))
                    
                    document.querySelectorAll('.delete-post').forEach(element => element.classList.add('active'))
                    document.querySelectorAll('.delete-post').forEach(element => element.classList.remove('hidden'))
                    
                    
                    
                    // document.querySelector('.update-post').classList.add('active');
                    // document.querySelector('.update-post').classList.remove('hidden');
                }
            }



            document.querySelectorAll('.content').forEach(element => element.remove());
            document.querySelectorAll('.form').forEach(element => element.remove());
            document.querySelectorAll('.submit-btn').forEach(element => element.remove());
        }
        for(let i = 0; i < event.target.children.length; i++){

            if(event.target.children[i].classList.contains('hidden')){
                event.target.children[i].classList.remove('hidden');
                event.target.children[i].classList.add('active');

            }else if(event.target.children[i].classList.contains('active')){
                if(document.querySelector('.content') !== null)
                {
                    console.log('here')
                    document.querySelectorAll('.content').remove();
                    document.querySelectorAll('.form').remove();
                    
                    document.querySelectorAll('.submit-btn').remove();

                    document.querySelectorAll('.add-comment').classList.add('active')
                    document.querySelectorAll('.add-comment').classList.remove('hidden')
                }

                event.target.children[i].classList.remove('active');
                event.target.children[i].classList.add('hidden');

                
                //need to delete form / submit button elements if exists
                //unhide submit button so logic works
                // event.target.closest('form').remove();
            }
        }
    }
    //check which textarea needs to be created for create post / comment or update post
    classNames = ['add-comment', 'update-post', 'add-post']
    if(classNames.some(className => event.target.classList.contains(className))){
        event.target.classList.add('hidden');
        if(event.target.classList.contains('update-post')){
            document.querySelectorAll('.delete-post').forEach(element => element.classList.add('hidden'))
        }
        const textForm = document.createElement('form');
        textForm.classList.add('form')
        const textArea = document.createElement('textarea');
        textArea.setAttribute('columns', 1000)
        textArea.setAttribute('rows', 5)
        textArea.classList.add('content')

        //check if creating new post, will need additional input for title
        if(event.target.classList.contains('add-post')){
            const titleLabel = document.createElement('label');
            const titleInput = document.createElement('input');

            titleLabel.innerHTML = "Title:  "

            textForm.appendChild(titleLabel);
            textForm.appendChild(titleInput);
            textArea.classList.add('post-content')
        }
        const submitBtn = document.createElement('button');
        submitBtn.innerHTML = 'Submit'
        submitBtn.id = 'submitBtn'
        submitBtn.classList.add('submit-btn')
        submitBtn.setAttribute('data-type', `${classNames.find(className => event.target.classList.contains(className))}`)
        textForm.appendChild(textArea);
        event.target.parentElement.appendChild(textForm);
        event.target.parentElement.appendChild(submitBtn);
    }
    //submitted new post / comment or updating post
    if(event.target.classList.contains('submit-btn')){
        event.preventDefault();

        if(event.target.getAttribute('data-type') === 'update-post'){
            //update post
            const textAreas = document.querySelectorAll('.content');
            let content;
            textAreas.forEach(element => {
                if(element.parentElement.parentElement.getAttribute('data-post_id') === event.target.parentElement.getAttribute('data-post_id')){
                    content = element.value;
                }
            });

            const response = await fetch('api/users/update', {
                method: 'PUT',
                body: JSON.stringify({
                    content,
                    post_id: event.target.parentElement.getAttribute('data-post_id')
                }),
                headers: {'Content-Type': 'application/json'},
            })
            if (response.ok) {
                setTimeout(document.location.replace('/dashboard'),1000)
              } else {
                alert('Failed to update post');
              }


        }else if(event.target.getAttribute('data-type') === 'add-post'){
            //submit new post
            const response = await fetch('api/users/post', {
                method: 'POST',
                body: JSON.stringify({
                    title: document.querySelector('input').value,
                    content: document.querySelector('.post-content').value,
                }),
                headers: {'Content-Type': 'application/json'},
            })
            if (response.ok) {
                setTimeout(document.location.replace('/dashboard'),1000)
              } else {
                alert('Failed to post');
              }

        }else{
            // submit new comment
            const textAreas = document.querySelectorAll('.content');
            let content;
            textAreas.forEach(element => {
                if(element.parentElement.parentElement.getAttribute('data-post_id') === event.target.parentElement.getAttribute('data-post_id')){
                    content = element.value;
                }
                
            });
            const response = await fetch('api/users/comment', {
                method: 'POST',
                body: JSON.stringify({
                    content,
                    post_id: event.target.parentElement.getAttribute('data-post_id')
                }),
                headers: {'Content-Type': 'application/json'},
            })
            if (response.ok) {
                document.location.replace('/');
              } else {
                alert('Failed to comment');
              }

        }
    }
    if(event.target.classList.contains('delete-post')){
        //     //delete post
        const response = await fetch('api/users/delete', {
            method: 'delete',
            body: JSON.stringify({
                post_id: event.target.parentElement.getAttribute('data-post_id')
            }),
            headers: {'Content-Type': 'application/json'},
        })
        if (response.ok) {
            setTimeout(document.location.replace('/dashboard'),1000)
          } else {
            alert('Failed to delete');
          }
    }
}

if(containerEl){
    containerEl.addEventListener('click', clickHandler);
}



