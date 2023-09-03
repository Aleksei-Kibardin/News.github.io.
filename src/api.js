
export async function setNews(listNews, currentPage) {
    try {
        const response = await fetch(`http://flems.github.io/test/api/news/${currentPage}/`);
        const data = await response.json();

        listNews.items.push(...data.items);
        listNews.nav = data.nav;

        if (localStorage.news) {
            localStorage.setItem('news', JSON.stringify(listNews));
        } else {
            localStorage.news = JSON.stringify(data);
        }
    } catch (error) {
        console.error(error);
    }
}

  export function hasNextPage(listNews, currentPage) {
  if (listNews.nav.current != listNews.nav.total){
    currentPage++
    setNews(listNews, currentPage)
    return false
  } else {
    return true
  }
    }