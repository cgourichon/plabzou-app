<script setup>
import pbzLogo from "@/assets/images/pbz-logo.png";
</script>

<template>
  <div class="overlay">
    <nord-stack align-items="center" gap="s" justify-content="center">
      <img :src="pbzLogo" alt="PBZ Abeille" class="bee"/>
      <div class="loading-text">
        <p class="n-margin-ie-s">Chargement</p>
        <span>.</span><span>.</span><span>.</span>
      </div>
    </nord-stack>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(246, 248, 248, 0.5);
  backdrop-filter: blur(1px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  pointer-events: none;
}

.bee {
  max-width: 100px;
  animation: fly 1s infinite alternate;
}

@keyframes fly {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(5px);
  }
}

.loading-text {
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-text span {
  animation: blinking 1.5s infinite;
}

.loading-text span:nth-child(1) {
  animation-delay: 0.5s;
}

.loading-text span:nth-child(2) {
  animation-delay: 1s;
}

.loading-text span:nth-child(3) {
  animation-delay: 1.5s;
}

@keyframes blinking {
  0%, 100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}
</style>
