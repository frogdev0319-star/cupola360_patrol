<template>
  <div class="finish-container">
    <div class="card">
      <img src="/assets/images/check.svg" alt="check" class="checkmark" />
      <h1> 報告已送出，已完成巡檢</h1>
      <!-- <button class="restart-button" @click="goHome">重新巡檢</button> -->
    </div>
  </div>
</template>

<script>
import router from '../router/index.js'

export default {
  name: 'Finish',
  methods: {
    goHome() {
      router.push('/')
    }
  }
}
</script>

<style scoped>
.finish-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  text-align: center;
  padding-top: 13vh;
}

.card {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 40px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: white;
  max-width: 400px;
  width: 100%;
}

h1 {
  font-size: 25px;
  margin-bottom: 20px;
}

.checkmark {
  width: 80px;
  height: auto;
  margin-bottom: 20px;
  margin-right: 10px;
}

.restart-button {
  margin-top: 20px;
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.restart-button:hover {
  background-color: #0056b3;
}
</style>