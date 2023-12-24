<template>
  <div class="linkes">
    <ul>
      <li><router-link to="W">Watchs</router-link></li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "ShopView",
};
</script>
<style lang="scss" scoped>
.linkes {
  position: relative;
  background-color: #f6f6f6;
  display: flex;
  text-align: right;
  top: 50px;

  ul {
    //position: absolute;
    padding-left: 900px;
    justify-items: right;
    list-style: none;
    direction: ltr;
    li {
      display: inline-block;
      padding-left: 60px;
      text-align: right;
      a {
        text-decoration: none;
        color: #046790;
        font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
        font-size: large;
        font-weight: 600;
        transition: 0.7s ease;
        &:hover {
          color: #81caee;
        }
      }
    }
  }
}
</style>
methods: { addItemToCart(product) { // قم بإرسال بيانات المنتج إلى الـ API
axios.post('/api/products', product) .then(response => { console.log('تمت إضافة
المنتج إلى الـ API بنجاح', response.data); // قم بإضافة المنتج إلى الـ cartItems
أو قم بتحديث البيانات من الـ API إذا كان هناك استجابة تحتوي على المنتج المخزن })
.catch(error => { console.error('حدث خطأ أثناء إضافة المنتج إلى الـ API',
error); }); // ... },methods: { addItemToCart(product) { // قم بإرسال بيانات
المنتج إلى الـ API axios.post('/api/products', product) .then(response => {
console.log('تمت إضافة المنتج إلى الـ API بنجاح', response.data); // قم بإضافة
المنتج إلى الـ cartItems أو قم بتحديث البيانات من الـ API إذا كان هناك استجابة
تحتوي على المنتج المخزن }) .catch(error => { console.error('حدث خطأ أثناء إضافة
المنتج إلى الـ API', error); }); // ... }, console.log("تمت إضافة المنتج إلى
عربة التسوق:", product); this.$swal.fire({ icon: "success", title: "تمت إضافة
المنتج إلى عربة التسوق بنجاح!", showConfirmButton: false, timer: 1200, });
console.log(this.cartItems); },
