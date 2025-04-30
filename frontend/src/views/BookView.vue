<script setup>
import bookService from '@/services/bookService'
import { onMounted, ref } from 'vue'
import Comment from '@/components/Comment.vue'
const props = defineProps({
  id: {
    required: true,
  },
})
const book = ref(null)
const comments = ref(null)
const avg = ref(null)
onMounted(() => {
  bookService
    .getBook(props.id)
    .then((response) => {
      const data = response.data
      if (data.coverImage) {
        data.coverImage = bookService.bufferToBase64(data.coverImage)
      }
      book.value = data
      console.log(book)
    })
    .catch((e) => {
      console.log(e)
    })

  bookService
    .getBookComments(props.id)
    .then((response) => {
      comments.value = response.data.comments
      let total = 0

      comments.value = comments.value.map((comment) => {
        total += comment.note
        comment.stars = Array.from({ length: 5 }, (_, i) => i < comment.note)
        return comment
      })

      const moyenne = comments.value.length ? total / comments.value.length : 0
      avg.value = Array.from({ length: 5 }, (_, i) => i < Math.round(moyenne))
      console.log(comments)
    })
    .catch((e) => {
      console.log(e)
    })
})
</script>
<template>
  <div v-if="book" class="book">
    <div class="info">
      <img :src="book.coverImage" alt="" />
      <h3>{{ book.name }}</h3>
      <svg
        v-for="(star, index) in avg"
        :key="'avg-' + index"
        class="star"
        :class="{ active: star }"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
        />
      </svg>
    </div>
    <Comment v-for="comment in comments" class="comments" :comment="comment"></Comment>
  </div>
</template>
<style scoped>
.book {
  margin: 40px;
  display: flex;
  gap: 30px;
}
.info {
  width: 200px;
  text-align: center;
}
img {
  height: 290px;
  width: 200px;
}
h3 {
  font-size: 16px;
}
</style>
<style>
.star {
  width: 20px;
  fill: #c2c2c2;
  transition: opacity 0.3s;
}

.star.active {
  fill: #ffcc00;
}
</style>
