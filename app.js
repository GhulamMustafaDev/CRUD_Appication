const apiURL = 'https://66f91ca92a683ce97310efa2.mockapi.io/api/v1/posts'



function fetchPosts() {
fetch(apiURL)
    .then(response => response.json())
    .then(data => displayData(data))
    .catch(error => console.log('error', error))
}
fetchPosts();

function displayData(posts) {
const postsParentDiv = document.getElementById('posts');
postsParentDiv.innerHTML = '';
posts.forEach(post => {
    
    const postDiv = document.createElement('div');
    postDiv.classList.add('post');

    postDiv.innerHTML = `
                    <div class="post-header">
                        <img src="${post.avatar}" alt="Avatar">
                        <div>
                            <h3>${post.name}</h3>
                            <small>${post.createdAt}</small>
                        </div>
                    </div>
                    <h3>${post.title}</h3>
                    <p>${post.body}</p>
                    <div class="actions">
                        <button class="edit-btn" onclick="editPost(${post.id})">Edit</button>

                        <button class="delete-btn" onclick="deletePost(${post.id})">Delete</button>

                    </div>
                    `

    postsParentDiv.appendChild(postDiv)
});
}

function deletePost(postId) {

if (confirm("Are you sure you want to delete this post?")) {
    fetch(`${apiURL}/${postId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
            console.log('Post deleted successfully');
            fetchPosts();
        } else {
            console.log('Failed to delete the post');
        }
    })
    .catch(error => console.log('Error:', error));
}
}



// =======Create Post=============

document.getElementById('createPostForm').addEventListener('submit', function (e) {
e.preventDefault()

const name = document.getElementById('name').value
const title = document.getElementById('title').value
const avatar = document.getElementById('avatar').value
const body = document.getElementById('body').value

const newPost = {
    name: name,
    title: title,
    avatar: avatar,
    body: body,
    createdAt: new Date().toISOString()
}

console.log(newPost)

fetch(apiURL, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(newPost)
})
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))
    fetchPosts();

})  

// =========Edit Button==========


function editPost(postId) {
fetch(`${apiURL}/${postId}`)
    .then(response => response.json())
    .then(post => {
        
        document.getElementById('updateName').value = post.name;
        document.getElementById('updateTitle').value = post.title;
        document.getElementById('updateAvatar').value = post.avatar;
        document.getElementById('updateBody').value = post.body;

        
        document.getElementById('create-post').style.display = 'none';
        document.getElementById('update-post').style.display = 'block';

        
        const hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.id = 'postId';
        hiddenInput.value = postId;
        document.getElementById('updatePostForm').appendChild(hiddenInput);
    })
    .catch(error => console.log(error));
}


document.getElementById('updatePostForm').addEventListener('submit', function (e) {
e.preventDefault();

const postId = document.getElementById('postId').value;

const name = document.getElementById('updateName').value;
const title = document.getElementById('updateTitle').value;
const avatar = document.getElementById('updateAvatar').value;
const body = document.getElementById('updateBody').value;

const updatedPost = {
    name: name,
    title: title,
    avatar: avatar,
    body: body,
};

fetch(`${apiURL}/${postId}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedPost)
})
.then(response => response.json())
.then(data => {
    console.log(data);
    fetchPosts(); 
    document.getElementById('update-post').style.display = 'none'; 
    document.getElementById('create-post').style.display = 'block'; 
})
.catch(error => console.log(error));
});
