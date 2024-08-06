<script>

export default {

  data() {
    return {
      products: [],
      cartItemID: 1,
      newItemAdded: false
    }
  },
  mounted() {
    fetch("http://localhost:3000/shop")
        .then(res => res.json())
        .then(data => this.products = data)
        .catch(err => console.log(err.message))

  },
  methods: {

    addToCart: function(id, name, price, image_path, amount){
      //if item already in sessionStorage, increase amount
      let is_in_cart = false

      for(let i = 0; i < sessionStorage.length; i++) {
        if(sessionStorage.key(i).startsWith("cartItem")) {
           console.log(sessionStorage.key(i));
          let key = sessionStorage.key(i);
          let value = sessionStorage.getItem(key);
          let item = JSON.parse(value);
          console.log(item.amount);
          if(item.id === id){
            is_in_cart = true;
            console.log("item already in cart");
            sessionStorage.setItem("cartItem"+key.substring(8), JSON.stringify({id: id, name: name, price: price, image_path: image_path, amount: item.amount+1}));
            break;

          }
        }
      }
      if(!is_in_cart){
        //if item not in sessionStorage, add it
        sessionStorage.setItem("cartItem"+this.cartItemID, JSON.stringify({id: id, name: name, price: price, image_path: image_path, amount: amount}));
        this.cartItemID++;
      }

      this.showAlert();

    },
    showAlert: function(){
      this.newItemAdded = true;
      setTimeout(() => {
        this.newItemAdded = false;
      }, 3000);
    }

  },


}
</script>

<template>
  <header>
    <h1>Shop</h1>
  </header>

  <main>
      <div class="card" v-for="product in products" :key="product.id" style="width: 18rem; float: left; text-align: center; margin-right: 20px">
        <img v-bind:src="product.image_path">
        <div class="card-body">
          <h3 class="card-title">{{product.name }}</h3>
          <p class="card-text">{{product.price}} kč</p>
          <a href="#" class="btn btn-primary" @click="addToCart(product.id, product.name, product.price, product.image_path, 1)">+</a>

        </div>
      </div>
    <div v-if="newItemAdded" class="alert alert-info" role="alert">
      Item added to cart!
    </div>



  </main>
</template>

<style scoped>

</style>