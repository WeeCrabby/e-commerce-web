<script>
export default {
  data() {
    return {
      //whats this?
      same: false,
      form: {
        name: "xc",
        address: "xc",
        city: "cx",
        zip: "xv",
        country: "xv",
        phone: "vx",
        email: "xv@ss.cc",
        payment: "x",
      }
    }
  },
  methods: {
    submitForm: async function() {
      const formData = new FormData();
      formData.append("name", this.form.name);
      formData.append("address", this.form.address);
      formData.append("city", this.form.city);
      formData.append("zip", this.form.zip);
      formData.append("country", this.form.country);
      formData.append("phone", this.form.phone);
      formData.append("email", this.form.email);
      formData.append("payment", this.form.payment);

      let cartItems = [];
      for(let i = 0; i < sessionStorage.length; i++){
        let key = sessionStorage.key(i);
        if(key.startsWith("cartItem")){

          cartItems[i] = sessionStorage.getItem(key);
        }
      }
      formData.append("cart_items", cartItems);

      //convert formData to json
      let object = {};
      formData.forEach((value, key) => object[key] = value);
      let json = JSON.stringify(object);

      console.log("Form submitted");
       await fetch("http://localhost:3000/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: json,
      })
          .then(res => res.json())
          .catch(err => console.log(err.message))
    }
  }
}
</script>

<template>
  <header>
    <h1>Checkout</h1>
  </header>
  <main>
    <form @submit.prevent="submitForm">

      <h2>Billing address</h2>
      <input type="text" name="name" placeholder="Full name" v-model="form.name" required>
      <input type="text" name="address" placeholder="Address" v-model="form.address" required>
      <input type="text" name="city" placeholder="City" v-model="form.city" required>
      <input type="text" name="zip" placeholder="ZIP" v-model="form.zip" required>
      <input type="text" name="country" placeholder="Country" v-model="form.country" required>

      <h2>Shipping address</h2>
      <input v-model="same" checked type="checkbox" name="same">
      <label for="same">Same as billing address</label><br>
      <div v-if="!same">
        <input type="text" name="name" placeholder="Full name">
        <input type="text" name="address" placeholder="Address">
        <input type="text" name="city" placeholder="City">
        <input type="text" name="zip" placeholder="ZIP">
        <input type="text" name="country" placeholder="Country">
      </div>

      <h2>Contact information</h2>
      <input type="tel" name="phone" placeholder="Phone number" v-model="form.phone" required>
      <input type="email" name="email" placeholder="Email" v-model="form.email" required>
      <h2>Payment options</h2>
      <input type="radio" name="payment" value="card" required>
      <label for="card">Card</label><br>
      <input type="radio" name="payment" value="paypal" required>
      <label for="paypal">Paypal</label><br>
      <input type="radio" name="payment" value="cash" required>
      <label for="cash">Cash</label><br>
      <input type="submit" value="Submit">

    </form>
    <p>{{form.address}}</p>
  </main>
</template>

<style scoped>

</style>