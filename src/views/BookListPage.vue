<template>
  <div class="book-list bg-gray-800 overflow-hidden h-screen font-sans sm:p-12 p-1">
    <div class="container relative sm:w-4/5 sm:mt-0 mt-16 sm:mb-8 mb-16 sm:mx-auto mx-4">
      <div
        class="absolute transform -translate-x-1/2 sm:rotate-0 rotate-90 sm:top-1/2 -top-12 sm:-left-14 left-1/2 text-4xl text-white cursor-pointer"
        @click="scroll('left')"
      >
        <font-awesome-icon icon="chevron-circle-left" />
      </div>
      <div ref="bookrow" class="overflow-auto sm:w-full w-11/12 h-80">
        <div
          class="sm:flex block sm:h-full sm:h-80 sm:w-max w-full bg-gray-500 overflow-auto"
        >
          <router-link
            :class="[
              'block',
              'p-3',
              'm-3',
              'w-11/12',
              'sm:w-4/12',
              'bg-white',
              'border-4',
              { 'border-yellow-600': pickedBook == item.id },
              'rounded-xl',
              'shadow-md',
            ]"
            v-for="(item, index) in bookData"
            :key="index"
            :to="`/books/${item.id}`"
          >
            <img class="sm:h-60 h-40 mx-auto" :src="item.image" />
            <p class="text-sm text-center">{{ item.name }}</p>
          </router-link>
        </div>
      </div>
      <div
        class="absolute transform translate-x-1/2 sm:rotate-0 rotate-90 sm:top-1/2 -bottom-12 sm:-right-14 right-1/2 text-4xl text-white cursor-pointer"
        @click="scroll('right')"
      >
        <font-awesome-icon icon="chevron-circle-right" />
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import Axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";

library.add(faChevronCircleLeft, faChevronCircleRight);

export default {
  data: () => ({
    pickedBook: "",
    bookData: [],
  }),
  created() {
    this.getBookData();
  },
  methods: {
    async getBookData() {
      let res = await Axios.get("https://fe-interview-api.unnotech.com/books");
      this.bookData = res.data.map((item) => {
        item.picked = false;
        return item;
      });
    },
    scroll(direction) {
      if (window.innerWidth >= 768) {
        let scrollLeft = this.$refs.bookrow.scrollLeft;
        if (direction === "left") {
          this.$refs.bookrow.scrollTo({
            top: 0,
            left: scrollLeft - 300,
            behavior: "smooth",
          });
        } else {
          this.$refs.bookrow.scrollTo({
            top: 0,
            left: scrollLeft + 300,
            behavior: "smooth",
          });
        }
      } else {
        let scrollTop = this.$refs.bookrow.scrollTop;
        if (direction === "left") {
          this.$refs.bookrow.scrollTo({
            top: scrollTop - 300,
            left: 0,
            behavior: "smooth",
          });
        } else {
          this.$refs.bookrow.scrollTo({
            top: scrollTop + 300,
            left: 0,
            behavior: "smooth",
          });
        }
      }
    },
  },
};
</script>
