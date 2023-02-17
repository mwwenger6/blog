let posts = [];
let images = [];

window.onload = async () => {
    getPosts()
  }


  getPosts = () => {
    const url = 'http://jsonplaceholder.typicode.com/posts'
    $.ajax({
      type: 'GET',
      url: url,
      dataType: 'json',
      success: function (data) {
          let title;
          let body;
          $(data).each( function(key, value){
            if(value.id < 13){
              title = value.title;
              body = value.body;
              document.getElementById('title' + value.id).innerHTML = title;
              let post = new Post(title, body);
              posts.push(post);
            }
          })
          getPostPicture();
      }
  });
  }

getPostPicture = () =>{
  const url = 'http://jsonplaceholder.typicode.com/photos'
  $.ajax({
    type: 'GET',
    url: url,
    dataType: 'json',
    success: function (data) {
      let image;
      $(data).each( function(key, value){
        if(value.id < 13){
          image = value.thumbnailUrl;
          img = value.url;
          document.getElementById('img' + value.id).src = image;
          let newImage = new imageMaker(image, img)
          images.push(newImage);
        }
      })
    }
  })
}

class Post{
  constructor(title, body){
    this.title = title;
    this.body = body;
  }
}
  
class imageMaker{
  constructor(image, img){
    this.image = image;
    this.img = img;
  }
}

chooseTopic = (num) => {
  document.getElementById('container1').hidden = true;
  document.getElementById('container2').hidden = false;
  document.getElementById('img').src = images[num].img;
  document.getElementById('title').innerHTML = posts[num].title
  document.getElementById('p').innerHTML = posts[num].body
}

goBack = () => {
  document.getElementById('container1').hidden = false;
  getPosts()
  document.getElementById('container2').hidden = true;
}

comments = () => {
  $('#modal1').openModal();
  const url = 'http://jsonplaceholder.typicode.com/comments'
  $.ajax({
    type: 'GET',
    url: url,
    dataType: 'json',
    success: function (data) {
        let email;
        let body;
        $(data).each( function(key, value){
          if(value.id < 6){
            email = value.email;
            body = value.body;
            document.getElementById('email' + value.id).innerHTML = email;
            document.getElementById('comment' + value.id).innerHTML = body;
          }
        })
    }
});
}