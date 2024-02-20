<template>
  <v-overlay
    z-index="10"
    color="#000000"
    opacity=".6"
    v-if="$store.getters['Loader/scanning']"
  >
    <v-card class="mx-auto" flat rounded>
      <div class="scan">
        <div class="fingerprint"></div>
        <h3>Scanning...</h3>
      </div>
    </v-card>
  </v-overlay>
</template>
<script>
export default {
  name: "ScannerLoader",
};
</script>
<style>
:root {
  --bgColor: #111;
  --scannerColor: #3fefef;
  --imageColor: 130deg;
}

.scan {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
}

.scan .fingerprint {
  position: relative;
  width: 250px;
  height: 230px;
  background: url("../../../assets/fingerprint.jpg");
  background-repeat: no-repeat;
  background-size: 250px;
}

.scan .fingerprint::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 250px;
  height: 230px;
  background: url("../../../assets/fingerprint.jpg");
  filter: invert(100%) sepia(60%) saturate(3000%) hue-rotate(var(--imageColor))
    brightness(95%) contrast(80%);
  background-size: 250px;
  animation: animate 4s ease-in-out infinite;
}

@keyframes animate {
  0%,
  100% {
    height: 0%;
  }

  50% {
    height: 100%;
  }
}

.scan .fingerprint::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 8px;
  background: var(--scannerColor);
  border-radius: 8px;
  filter: drop-shadow(0 0 20px #3fefef) drop-shadow(0 0 60px #3fefef);
  animation: moveLine 4s ease-in-out infinite;
}

@keyframes moveLine {
  0%,
  100% {
    top: 0%;
  }

  50% {
    top: 100%;
  }
}

.scan h3 {
  text-transform: uppercase;
  font-size: 1.5em;
  letter-spacing: 2px;
  margin-top: 20px;
  color: var(--scannerColor);
  filter: drop-shadow(0 0 20px var(--scannerColor))
    drop-shadow(0 0 60px var(--scannerColor));
  animation: animate_text 0.5s steps(1) infinite;
}

@keyframes animate_text {
  0%,
  100% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }
}
</style>
