<script>
/*
* Zpusob 1: před redirectem na checkout zavolat metodu ktera updatne cart podle dat v ol cartu
* Zpusob 2: vytvorit computed property ktera bude sledovat zmeny v cartu a updatovat se  ???
* Zpusob 3: vytvorit watch property ktera bude sledovat zmeny v cartu a updatovat se ???
*
* */
import {computed, reactive} from "vue";
import router from "@/router";
import { ref, watch } from 'vue';

export default {

  data() {
    return {
      cartItems: []

    }
  },

  methods: {

    loadCart: function(){

      //whats this?
        if(this.cartItems.length !== 0) {
          this.cartItems = [];
        }

        else{
          for (let i = 0; i < sessionStorage.length; i++) {
          let key = sessionStorage.key(i);
          if (key.startsWith("cartItem")) {
            let value = sessionStorage.getItem(key);
            this.cartItems.push(JSON.parse(value));
            console.log(this.cartItems[i]);
          }
        }

      }
    },
    removeFromCart: function(id){

      //When an item is removed all others should have their ids changed so that they are in order and there are no gaps
      for(let i = 0; i < this.cartItems.length; i++){
        if(this.cartItems[i].id === id){
          this.cartItems.splice(i, 1);
        }
      }


      sessionStorage.removeItem("cartItem"+id);
      //reload cartItem IDs so that they are in order


      this.loadCart();
    },

    /*
    updateCart: function(){
      for(let i = 0; i < this.cartItems.length; i++){
        //if amount in session storage different from amount in gui cart, update session storage
        if(sessionStorage.getItem("cartItem"+this.cartItems[i].id) !== this.cartItems[i].amount){
          sessionStorage.setItem("cartItem"+this.cartItems[i].id, JSON.stringify(this.cartItems[i]));
        }
      }
    },*/

    calculateTotal : function(){
      let total = 0;
      for (let i = 0; i < this.cartItems.length; i++) {
        total += this.cartItems[i].price * this.cartItems[i].amount;
      }
      return total;
    },
  },

  created() {
    this.loadCart();
  },
  watch: {
    cartItems:function(){
      this.loadCart();
    }

  },

  }
}

</script>

<template>
  <header>
    <h1>Your cart</h1>
  </header>

  <main>
    <ul class="list-group list-group-horizontal" style="text-align: center;">
      <li class="list-group-item">Name</li>
      <li class="list-group-item">Price</li>
      <li class="list-group-item">Image</li>
      <li class="list-group-item">Amount</li>
    </ul>
    <ol v-model="" v-for="item in cartItems" :key="item.id" class="list-group list-group-horizontal" style="text-align: center;">
      <li class="list-group-item">{{item.name}}</li>
      <li class="list-group-item">{{ item.price }} kč</li>
      <li class="list-group-item"><img style="height: 50px; width: 50px" v-bind:src="item.image_path"></li>
      <li class="list-group-item">
        <input type="number" v-model="item.amount" min="1" max="10">
      </li>
      <li class="list-group-item">
        <button @click="removeFromCart(item.id)" class="btn btn-outline-danger">x</button>
      </li>
    </ol>
    <h3>Total: {{ this.calculateTotal() }} kč</h3>
    <router-link @click= to="/checkout" class="btn btn-primary">Checkout</router-link>
  </main>
</template>

<style scoped>

</style>