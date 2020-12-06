window.onload = () => {
  let filter = false;
  let sorting = false;
  let filterByPopylarity = document.getElementById("filter-popularity");
  filterByPopylarity.addEventListener("click", () => {
    filter = !filter;
    render();
  });

  let sortByVoteCount = document.getElementById("sort-by-votes");
  sortByVoteCount.addEventListener("click", () => {
    sorting = !sorting;
    render();
  });

  function render() {
    var res = document.getElementById("container");
    res.innerHTML = "";
    var con = document.createElement("div");
    con.className = "container-fluid";
    var newdiv = document.createElement("div");
    newdiv.className = "row";
    res.appendChild(con);
    con.appendChild(newdiv);
    let items = allData;
    if (filter) {
      filterByPopylarity.innerText = "Reverse Filter";
      const maxValueOfY = Math.max(...items.map((o) => o.popularity), 0);
      items = items.filter(function (hero) {
        return hero.popularity === maxValueOfY;
      });
    } else{ 
      filterByPopylarity.innerText = "Most Popular";
    }

    if (sorting) {
      sortByVoteCount.firstElementChild.innerText = "Reverse Sorting"
      items = items.sort((item, item1) => {
        return item.vote_count - item1.vote_count;
      });
    } else if (!sorting) {
      sortByVoteCount.firstElementChild.innerText = "Sort by Vote Count";
      items = items.sort((item, item1) => {
        return item1.vote_average - item.vote_average;
      });
    }
    console.log(items);
    //document.getElementById('container').appendChild(card);
    items.forEach((item) => {
      var img = document.createElement("img");
      img.src = "https://image.tmdb.org/t/p/w500" + item.poster_path;
      img.className = "w-50 h-50 float-left mr-3";
      let card = document.createElement("div");
      card.className = "card shadow cursor-pointer classico";
      let cardBody = document.createElement("div");
      cardBody.className = "card-body";
      let title = document.createElement("h5");
      title.innerText = item.title;
      title.className = "mt-2";
      let rating = document.createElement("span");
      rating.innerText = "Rating: ";
      let rating_avg = document.createElement("span");
      rating_avg.innerText = item.vote_average;
      rating_avg.className = "bold ml-2";
      let info = document.createElement("div");
      info.innerText = item.overview;
      if (item.overview.length >= 190) {
        info.innerText = item.overview.substring(0, 190) + "...";
      }
      cardBody.append(img, title, info, rating);
      for (let i = 0; i < item.vote_average; i++) {
        let fullStarRating = document.createElement("span");
        fullStarRating.className = "fa fa-star checked";
        cardBody.appendChild(fullStarRating);
      }
      for (let i = 10; i > Math.ceil(item.vote_average); i--) {
        let starsLeft = document.createElement("span");
        starsLeft.className = "fa fa-star";
        cardBody.appendChild(starsLeft);
      }
      cardBody.appendChild(rating_avg);
      card.appendChild(cardBody);
      var con1 = document.createElement("div");
      con1.className = "col-md-4 col-xs-4 mb-3";
      newdiv.appendChild(con1);
      con1.appendChild(card);
    });
  }

  function getData() {
    $.ajax({
      url:
        "https://api.themoviedb.org/3/movie/top_rated?api_key=5cb10dea605bc5ebbb142690206bdcf2&language=en-US&page=1",
      success: function (result) {
        allData = result.results;
        render();
      },
    });
  }
  getData();
};
