const db = firebase.firestore()

let newsList;

/*const newsMock = {
    title: "Covid 19",
    notice: "descrição da minha noticia",
    author: "Zezin",
    image: "asuhushsuh",
    category: "politica"
};
*/

function renderNews(news) {
    const newsContainer = document.getElementById("noticias");

    news.forEach(element => {
        const newNews = document.createElement("div")
        
        const newsImage = document.createElement("img")
        newsImage.setAttribute("src",element.image)
        newsImage.classList.add("news-image")
        newNews.append(newsImage)

        const newsTitle = document.createElement("h2")
        newsTitle.innerHTML=element.title
        newsTitle.classList.add("news-title")
        newNews.append(newsTitle)


        const newsDescription = document.createElement("p")
        newsDescription.innerHTML=element.notice
        newsTitle.classList.add("news-description")
        newNews.append(newsDescription)
        


        newsContainer.append(newNews)
    }); 
}

function addNews(news) {
    db.collection("news").add(news).then(res => {
        console.log(res)
        alert("Notícia adicionada com sucesso!")
    });
}

function shuffleNewsList(newsList){
    let randomIndex;
  
    for (let i = newsList.length; i !== 0; i--) {
      randomIndex = Math.floor(Math.random() * i);
  
      [newsList[i - 1], newsList[randomIndex]] = [
        newsList[randomIndex],
        newsList[i - 1],
      ];
    }
  
    return newsList;
  };


function getNews() {
    db.collection("news").orderBy("title").get().then(res => {
        console.log(res.docs.map(n => ({
            id: n.id,
            ...n.data()
        })))

        newsList = res.docs.map(n => ({
            id: n.id,
            ...n.data()
        }))

        renderNews(shuffleNewsList(newsList));
    })
}



//addNews(news);


getNews();
