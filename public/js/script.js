document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("News-4-U JS imported successfully!");
  },
  false
);



// axios.get(`https://newsapi.org/v2/everything?q=Apple&from=2021-07-06&sortBy=popularity&apiKey=55a7e090588c43a8b6202dcd3c96e2ed`)
// 		.then(response => {
// 			console.log(response);
// 		})
// 		.catch(err => {
// 			console.log(err);
// 		})


function getArticle(obj) {
  console.log(obj);
  axios.post('http://localhost:3000/articleoverview', obj)
    .then(response => {
      console.log(response)
    })

    .catch((err => {
      console.log(err)
    }))
}