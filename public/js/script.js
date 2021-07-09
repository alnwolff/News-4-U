document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("News-4-U JS imported successfully!");
  },
  false
);



function getArticle(obj) {
  console.log(obj);
  // axios.post('http://localhost:3000/articleoverview', obj)
  axios.post('https://news4u-app.herokuapp.com/articleoverview', obj)
    .then(response => {
      console.log(response)
    })

    .catch((err => {
      console.log(err)
    }))
}