<template>
  <div
    class="book-detail bg-gray-500 container mx-auto overflow-auto sm:w-4/5 w-11/12 sm:p-8 p-3"
  >
    <div class="flex sm:mb-8 mb-3">
      <div class="text-white w-20">價格</div>
      <div
        @mousedown="loopMinus('price')"
        @mouseleave="clear()"
        @mouseup="clear()"
        @touchstart="loopMinus('price')"
        @touchend="clear()"
        class="cursor-pointer text-yellow-500 text-lg"
      >
        <font-awesome-icon icon="minus-circle" />
      </div>
      <input class="w-30 ml-5 mr-5 pl-3 pr-3" v-model="BookDetailData.price" />
      <div
        @mousedown="loopPlus('price')"
        @mouseleave="clear()"
        @mouseup="clear()"
        @touchstart="loopPlus('price')"
        @touchend="clear()"
        class="cursor-pointer text-green-500 text-lg"
      >
        <font-awesome-icon icon="plus-circle" />
      </div>
    </div>
    <div class="flex sm:mb-8 mb-3">
      <div class="text-white w-20">數量</div>
      <div
        @click="minus('count')"
        @mousedown="loopMinus('count')"
        @mouseleave="clear()"
        @mouseup="clear()"
        @touchstart="loopMinus('count')"
        @touchend="clear()"
        class="cursor-pointer text-yellow-500 text-lg"
      >
        <font-awesome-icon icon="minus-circle" />
      </div>
      <input class="w-30 ml-5 mr-5 pl-3 pr-3" v-model="BookDetailData.count" />
      <div
        @click="plus('count')"
        @mousedown="loopPlus('count')"
        @mouseleave="clear()"
        @mouseup="clear()"
        @touchstart="loopPlus('count')"
        @touchend="clear()"
        class="cursor-pointer text-green-500 text-lg"
      >
        <font-awesome-icon icon="plus-circle" />
      </div>
    </div>
    <button class="float-right bg-blue-800 text-white p-1.5 rounded" @click="submit()">
      確認修改
    </button>
  </div>
</template>

<script>
import Axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";

library.add(faPlusCircle, faMinusCircle);

export default {
  beforeRouteUpdate(to, from, next) {
    next();
    this.$parent.pickedBook = this.$route.params.id;
    this.getBookDetail();
  },
  data: () => ({
    loop: null,
    BookDetailData: {},
  }),
  created() {
    this.$parent.pickedBook = this.$route.params.id;
    this.getBookDetail();
  },
  methods: {
    getBookDetail() {
      let { $route } = this;
      Axios.get(`https://fe-interview-api.unnotech.com/profile/${$route.params.id}`)
        .then((res) => {
          this.BookDetailData = res.data;
        })
        .catch(() => {
          alert("查無資料!");
          this.$router.push("/books");
        });
    },
    plus(target) {
      this.BookDetailData[target]++;
    },
    minus(target) {
      if (this.BookDetailData[target] > 0) {
        this.BookDetailData[target]--;
      }
    },
    loopPlus(target) {
      clearInterval(this.Loop);
      this.Loop = setInterval(() => {
        this.BookDetailData[target]++;
      }, 100);
    },
    loopMinus(target) {
      clearInterval(this.Loop);
      this.Loop = setInterval(() => {
        this.BookDetailData[target]--;
      }, 100);
    },
    clear() {
      clearInterval(this.Loop);
    },
    submit() {
      let { BookDetailData } = this;
      Axios.patch(`https://fe-interview-api.unnotech.com/profile/${BookDetailData.id}`, {
        price: BookDetailData.price,
        count: BookDetailData.count,
      })
        .then((res) => {
          alert('更新成功!');
          this.BookDetailData = res.data;
        })
        .catch(() => {});
    },
  },
};
</script>
