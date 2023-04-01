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
        for(let i = 0; i < event.target.children.length; i++){

            if(event.target.children[i].classList.contains('hidden')){
                event.target.children[i].classList.remove('hidden');
                event.target.children[i].classList.add('active');

            }else if(event.target.children[i].classList.contains('active')){
                event.target.children[i].classList.remove('active');
                event.target.children[i].classList.add('hidden');
                //need to delete form / submit button elements if exists
                //unhide submit button so logic works
            }
        }
    }
    if(event.target.classList.contains('add-comment')){
        event.target.classList.add('hidden');
        const commentForm = document.createElement('form');
        const textArea = document.createElement('textarea');
        textArea.classList.add('content')
        const submitComment = document.createElement('button');
        submitComment.innerHTML = 'Submit Comment'
        submitComment.classList.add('submit-btn')
        commentForm.appendChild(textArea);
        event.target.parentElement.appendChild(commentForm);
        event.target.parentElement.appendChild(submitComment);
    }
    if(event.target.classList.contains('submit-btn')){
        event.preventDefault();
        // console.log(event.target.parentElement)
        const textAreas = document.querySelectorAll('.content');
        let content;
        textAreas.forEach(element => {
            if(element.parentElement.parentElement.getAttribute('data-post_id') === event.target.parentElement.getAttribute('data-post_id')){
                content = element.value;
                console.log(content)
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

if(containerEl){
    containerEl.addEventListener('click', clickHandler);
}



