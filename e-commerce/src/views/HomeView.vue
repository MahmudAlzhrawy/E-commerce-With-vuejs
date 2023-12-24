<template>
  <div class="interface">
    <p>
      This is an online store where you can see and order products from it in an
      easy way to go to the store click
    </p>
  </div>
</template>
<script>
export default {
  name: "HomeView",

  props: ["isLoggedIn"],
  mounted() {
    this.$emit("Log");
  },
};
</script>
<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
.interface {
  background-image: url(@/imagesodd/shopping.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 594px;
  width: 100%;
  display: flex;
  position: relative;
  top: 45px;
  p {
    width: 500px;
    text-align: left;
    padding: 20px;
    color: #6093c0;
    font-size: 30px;
    font-weight: 600;
    max-height: 100px;
    word-spacing: 3px;
  }
  .button {
    border-radius: 6px;

    position: absolute;
    top: 38%;
    left: 10%;
    background-color: aquamarine;
    transition: 0.8s ease;
    &:hover {
      transform: scale(1.2);
    }
    button {
      &:hover {
        background-color: #046790;
      }
      border-radius: 6px;
      width: 150px;
      background-color: #047097;
      border-style: none;
      padding: 15px;
    }
  }
}
</style>
