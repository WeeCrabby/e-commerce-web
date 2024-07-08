<script setup>

</script>

<template>

  <div class="centered">
    <div class="ellipse">
      <div class="ellipse smaller" style="animation-delay: 1s">
        <div class="ellipse smaller" style="animation-delay: 2s">
          <div class="ellipse smaller" style="animation-delay: 3s">
            <div class="ellipse smaller" style="animation-delay: 4s">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="dot">
      <div>
    </div>
  </div>
  </div>

</template>

<style scoped>
html {
  background-color: #000000;
}

@keyframes expand {
  from {
    transform: scale(1, 1);
    opacity: 1;
  }
  to {
    transform: scale(4.5, 4.5);
    opacity: 0;

  }
}

.ellipse {
  background-color: #000000;
  border: dotted white 1px;
  margin-left: auto;
  margin-right: auto;

  width: 200px;
  height: 40px;
  border-radius: 100%;
  animation: expand 10s ease-in infinite reverse;
}


.smaller {
  transform: scale(0.80, 0.80);
  margin-top: auto;
  opacity: 0.75;
}

.ellipse:hover {
  animation: expand 10s ease-in infinite;
}

#dot {
  margin-left: auto;
  margin-right: auto;
  margin-top: -25px;
  background-color: white;
  width: 1px;
  height: 1px;
  border-radius: 100%;
}

.centered {
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -50px;
  margin-left: -100px;
}

</style>