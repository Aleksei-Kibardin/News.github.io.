<template>
  <div class="news">
    <nav>
      <div class="logo-wrap maxw">
        <div class="logo">
          <div class="logo-icon"><img src="./assets/A.svg" alt="logo" /></div>
          <div class="logo-txt">alpha</div>
        </div>
      </div>
    </nav>
    <header>
      <div class="maxw">
        <h1 class="head-title">НОВОСТИ</h1>
      </div>
    </header>
    <div class="content">
      <div class="cards maxw">
        <div class="card" v-for="c in paginatedNews" :key="c">
          <img
          v-if="c.image"
            class="img-card"
            :src="`${c.image}`"
            alt=""
          />
          <div class="card-content">
            <div class="date-card">
              <div class="day">{{dataParse(c.date)[1]}}</div>
              <div class="month-year">
                <p>{{dataParse(c.date)[0]}}</p>
                <p>{{dataParse(c.date)[2]}}</p>
              </div>
            </div>
            <div class="title-card">{{c.name}}</div>
            <div class="text-card">
              Alpha объявляет о партнёрстве c Миром, ведущим мировым поставщиком
              экологических услуг, чтобы помочь клиентам строить светлое
              будущее.
            </div>
          </div>
          <div class="tag-card">{{c.type.value}}</div>
        </div>
      </div>
      <div
        @click="nextPage()"
        v-if="activeButtonPage != false"
        class="next-cards"
      >
        Загрузить еще
      </div>
    </div>
    <footer>
      <div class="maxw">
        <div class="fuuter-content">
          <div class="logo-footer logo">
            <div class="logo-icon"><img src="./assets/A.svg" alt="logo" /></div>
            <div class="logo-txt">alpha</div>
          </div>
          <div class="copyright">© alpha, 2023</div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import {  hasNextPage, setNews } from './api';
export default {
  name: "app",

  data() {
    return {
      listNews: {
        items: [],
        nav: null
      },
      currentPage: 1,
      activeButtonPage: true,
      lastRequest: false,
      endIndex: 9,
    };
  },

  created() {
    if (localStorage.news) {
      this.listNews = JSON.parse(localStorage.news);
    } else {
      setNews(this.listNews, this.currentPage);
    }
  },

  computed: {
    paginatedNews() {
      return this.listNews.items.slice(0, this.endIndex);
    },
  },
  methods: {
    dataParse(milliseconds) {
      milliseconds 
      const date = new Date(milliseconds);
      const dateFormatter = new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
      const dateString = dateFormatter.format(date).replace(/,/g, '');
      return dateString.split([" "])
    },
    nextPage() {
      let respons = hasNextPage(this.listNews, this.currentPage)
      this.endIndex += 9
      if(this.endIndex > this.listNews.items.length && respons != false){
        this.activeButtonPage = false
        console.log("hi")
      }
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  font-family: Nunito Sans;
}
.maxw {
  display: flex;
  max-width: 1714px;
  width: 100%;
  align-items: flex-start;
}
body {
  max-width: 1920px;
  width: 100%;
  margin: auto;
}
nav {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 123px;
  width: 100%;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.08);
}
header {
  display: flex;
  justify-content: center;
  position: relative;
  height: 320px;
  background-image: url("./assets/backgroundbgHead.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.head-title {
  position: absolute;
  bottom: 50px;
  font-weight: 700;
}
.logo {
  display: flex;
  gap: 9px;
  align-items: center;
  align-self: center;
}
.logo-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  font-family: FranklinGothicITC;
  font-size: 45.835px;
  background: #1d37af;
  color: var(--color-brend-tertiary, #bbf41c);
}
.logo-txt {
  color: #1d37af;
  font-size: 40px;
  font-weight: 900;
  line-height: 120%;
  letter-spacing: -2px;
}
.content {
  flex-direction: column;
  display: flex;
  align-items: center;
}
.cards {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  padding-top: 64px;
  gap: 48px;
  margin: auto;
  margin-bottom: 72px;
}
.card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: 536px;
  min-height: 658px;
  border-radius: var(--radius-m, 16px);
  border: 1px solid var(--color-brend-primary, #0f62fe);
}
.card-content {
  display: flex;
  padding: 32px 32px 32px 32px;
  align-items: flex-start;
  align-self: stretch;
  flex-wrap: wrap;
  gap: 16px;
}
.img-card {
  border-radius: var(--radius-m, 16px) var(--radius-m, 16px) 0px 0px;
  max-height: 250px;
}
.date-card {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #a1a7b5;
}
.day {
  font-size: 36px;
  font-weight: 400;
}
.title-card {
  color: #0c5bef;
  font-size: 22px;
  font-weight: 400;
}
.text-card {
  font-size: 20px;
  font-weight: 400;
  line-height: 130%;
  letter-spacing: -0.2px;
}
.tag-card {
  position: relative;
  bottom: 32px;
  left: 32px;
  margin-top: 40px;
  padding: 4px 16px;
  border-radius: var(--radius-full, 360px);
  background: var(--bg-bg-5, #f0f6fe);
}
.next-cards {
  margin: 0px 0px 72px 0px;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  line-height: 120%;
  letter-spacing: -0.2px;
  width: 139px;
  height: 24px;
  padding: var(--radius-m, 16px) 32px;
  border-radius: 8px;
  border: 1px solid var(--button-button-bordered-default, #002dbf);
}

footer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 202px;
  width: 100%;
  background: var(--bg-bg-5, #f0f6fe);
}

.copyright {
  margin-top: 16px;
  color: var(--grey-color-black-40, #81899d);
  font-size: 16px;
  font-weight: 400;
  line-height: 140%;
}
@media (min-width: 2800px) {
  .maxw {
    max-width: 1728px;
    width: 100%;
  }
}
</style>
