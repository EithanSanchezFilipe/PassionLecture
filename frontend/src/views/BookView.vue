<script setup>
import bookService from '@/services/bookService'
import { onMounted, ref } from 'vue'
import Comment from '@/components/Comment.vue'
import CommentForm from '@/components/CommentForm.vue'
import Rating from 'primevue/rating'

const props = defineProps({
  id: {
    required: true,
  },
})
const emit = defineEmits(['commentAdded'])
const book = ref(null)
const comments = ref(null)
const avg = ref(0)
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
  fetchComments()
})
const fetchComments = () => {
  bookService
    .getBookComments(props.id)
    .then((response) => {
      comments.value = response.data.comments
      if (comments.value === undefined) {
        avg.value = 0
        return
      } else {
        avg.value = Math.round(
          comments.value.reduce((sum, comment) => sum + comment.note, 0) / comments.value.length,
        )
      }

      console.log(avg.value)
    })
    .catch((e) => {
      console.log(e)
    })
}
const handleCommentAdded = () => {
  fetchComments()
}
</script>
<template>
  <div v-if="book" class="book">
    <div class="info">
      <img :src="book.coverImage" alt="" />
      <h3>{{ book.name }}</h3>
      <Rating :default-value="avg" readonly />
    </div>
    <Comment
      v-if="comments"
      v-for="comment in comments"
      class="comments"
      :comment="comment"
    ></Comment>
    <CommentForm :id="book.id" @commentAdded="handleCommentAdded"></CommentForm>
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
