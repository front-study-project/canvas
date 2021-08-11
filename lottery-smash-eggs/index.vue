<template>
  <div class="egg-list-wrapper">
    <div class="content-wrapper">
      <div class="egg-list">
        <div class="egg-item" @click="showEggModal">
          <img class="egg-egg" src="./images/smash-egg.png" alt="" />
          <img class="egg-hanmmer" src="./images/smash-hammer.png" alt="" />
        </div>
        <div class="egg-item" @click="showEggModal">
          <img class="egg-egg" src="./images/smash-egg.png" alt="" />
          <img class="egg-hanmmer" src="./images/smash-hammer.png" alt="" />
        </div>
        <div class="egg-item" @click="showEggModal">
          <img class="egg-egg" src="./images/smash-egg.png" alt="" />
          <img class="egg-hanmmer" src="./images/smash-hammer.png" alt="" />
        </div>
      </div>
    </div>
    <div v-if="showModal" class="crush-modal" @click="closeMask">
      <div class="egg-wrapper" @click.stop>
        <img
          class="egg"
          v-show="!showBroken1 && !showBroken2 && !showBrokenResult"
          src="./images/smash-egg.png"
          alt=""
        />
        <img
          class="egg"
          v-show="showBroken1"
          src="./images/broken-step1.png"
          alt=""
        />
        <img
          class="egg"
          v-show="showBroken2"
          src="./images/broken-step2.png"
          alt=""
        />
        <img
          class="hammer"
          src="./images/smash-hammer.png"
          alt=""
          @webkitAnimationEnd="handleKnockEnd"
        />
        <div class="egg-broken-wrapper" v-show="showBrokenResult">
          <img class="egg-shell" src="./images/egg-shell.png" alt="" />
          <img
            class="egg-shell-part left"
            src="./images/egg-shell-1.png"
            alt=""
          />
          <img
            class="egg-shell-part right"
            src="./images/egg-shell-2.png"
            alt=""
          />
          <img class="reward-item" src="./images/reward-1.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
      showBroken1: false,
      showBroken2: false,
      showBrokenResult: false,
    };
  },
  methods: {
    showEggModal() {
      this.showModal = true;
    },
    closeMask() {
      this.showModal = false;
      this.showBrokenResult = false
    },
    handleKnockEnd(e) {
      e.target.className += " leave";
      setTimeout(() => {
        this.showBroken1 = true;
        setTimeout(() => {
          this.showBroken1 = false;
          this.showBroken2 = true;
          setTimeout(() => {
            this.showBroken2 = false;
            this.showBrokenResult = true;
          });
        });
      });
      // 开始做蛋破碎的效果
    },
  },
};
</script>

<style lang="stylus" scoped>
.crush-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all .3;

  .egg-wrapper {
    position: relative;

    .egg {
      width: 220px;
    }

    .hammer {
      position: absolute;
      top: -20px;
      right: -30px;
      width: 100px;
      transition: right 0.5s;
      animation: 0.3s linear alternate 2 hanmmerKnockPlay;

      &.leave {
        right: -1000px;
      }
    }
  }

  .egg-broken-wrapper {
    position: relative;
    display: flex;

    .egg-shell {
      margin-top: 40px;
      width: 220px;
      height: 240px;
    }

    .egg-shell-part {
      position: absolute;

      &.left {
        width: 131px;
        left: 26px;
        top: -60px;
        animation: 0.3s ease-in-out leftEggShellPlay both;
      }

      &.right {
        right: 2px;
        top: -48px;
        width: 128px;
        animation: 0.3s ease-in-out rightEggShellPlay both;
      }
    }
  }

  .reward-item {
    position: absolute;
    top: -70px;
    left: 20px;
    width: 200px;
    z-index: -1;
    animation: 0.3s ease-in-out redpackageMove both;
  }
}

.content-wrapper {
  .egg-list {
    padding: 20px 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .egg-item {
      position: relative;
      width: 30%;

      .egg-egg {
        width: 100%;
        padding-top: 30px;
      }

      .egg-hanmmer {
        width: 70px;
        position: absolute;
        top: 0;
        right: 0;
        animation: 0.5s linear infinite alternate both hammerPlay;
      }
    }
  }
}

@keyframes rightEggShellPlay {
  100% {
    right: -60px;
    top: 120px;
    transform: rotate(115deg);
  }
}

@keyframes hanmmerKnockPlay {
  0% {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(-45deg);
  }

  100% {
    transform: rotate(0);
  }
}

@keyframes leftEggShellPlay {
  0% {
    transform: rotate(0);
  }

  100% {
    left: -50px;
    top: 180px;
    transform: rotate(-135deg);
  }
}

@keyframes rightEggShellPlay {
  100% {
    right: -60px;
    top: 180px;
    transform: rotate(115deg);
  }
}

@keyframes hanmmerKnockPlay {
  0% {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(-45deg);
  }

  100% {
    transform: rotate(0);
  }
}

@keyframes redpackageMove {
  0% {
    width: 100px;
    top: 0;
  }

  100% {
    width: 200px;
    top: -30px;
  }
}

@keyframes hammerPlay {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(45deg);
  }
}
</style>