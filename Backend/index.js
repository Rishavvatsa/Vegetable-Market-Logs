const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const app = express();
const cookieParser=require("cookie-parser");
const Stripe = require('stripe');
const bodyParser=require("body-parser");

app.use(cors());
app.get("/", (req, res) => {
  res.send("Server is running");
});
app.use(cookieParser());
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

 // Add parentheses to use express.json as middleware
const PORT = process.env.PORT ||8080;
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  try {
    const event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    console.log('Webhook Verified');
    
    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntentSucceeded = event.data.object;
        const order = await Order.findById(paymentIntentSucceeded.metadata.orderId);
        order.paymentStatus = 'received';
        await order.save();
            
        // Handle payment success
        console.log('Payment Intent Succeeded:', paymentIntentSucceeded);
        break;

      case 'payment_intent.payment_failed':
        const paymentIntentFailed = event.data.object;
        // Handle payment failure
        console.log('Payment Intent Failed:', paymentIntentFailed);
        break;

        case 'checkout.session.completed':
  const checkoutSessionCompleted = event.data.object;

  if (checkoutSessionCompleted.customer) {
    const customerID = checkoutSessionCompleted.customer;

    stripe.customers.retrieve(customerID)
      .then(async (customer) => {
        console.log('Customer Data:', customer);
       
            stripe.customers.retrieve(customerID)
              .then((customer) => {
                console.log('Customer Data:', customer);
                // Handle other checkout session completion actions
                console.log('Checkout Session Completed:', checkoutSessionCompleted);
              })
              .catch((err) => {
                console.log('Error fetching customer data:', err);
              });
        console.log('Checkout Session Completed:', checkoutSessionCompleted);

        // Process the order and save it to the database
        try {
          const newOrder = new Order({
            userId: customer.metadata.userId,
            customerId: customer.id,
             userId: customer.metadata.userId,
      customerId: data.customer,
      paymentIntentId: data.payment_intent,
      products: item,
      subtotal: data.amount_subtotal,
      payment_status: data.payment_status,
          });
          const savedOrder = await newOrder.save();
          console.log('Order saved:', savedOrder);
        } catch (error) {
          console.error('Error saving order:', error);
        }
      })
      .catch((err) => {
        console.log('Error fetching customer data:', err);
      });
  } else {
    console.log('Invalid customer ID or missing customer ID:', checkoutSessionCompleted.customer);
}
  break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.status(200).send('Webhook received successfully');
  } catch (err) {
    console.log(`Webhook Error: ${err.message}`);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});

app.use(express.json({ limit: "10mb" }));

console.log(process.env.MONGODB_URL);
mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.error("Error connecting to the database:", err));
 
  app.use(
    bodyParser.urlencoded({
      extended: false, 
    })
  );

  app.use(express.static("static"));
  app.use(bodyParser.json());
  
  
  
  const register=require("./routes/userRoute");
  app.use("/api",register);
 
  const productRoute=require("./routes/ProductRoute");
  app.use("/api",productRoute);

const Order=require("./routes/orderRoute");
app.use("/api",Order);
const Contact=require("./routes/ContactRoute");
app.use("/api",Contact);
//save product in data 
//api
app.use("/payment", require("./routes/Payment"));

app.post("/create-checkout-session", async (req, res) => {
  

  try {
    
    const params = {
      submit_type : 'pay',
      mode : "payment",
      payment_method_types : ['card'],
      billing_address_collection : "auto",
      

      line_items : req.body.map((item)=>{
        return{
          price_data : {
            currency : "inr",
            product_data : {
              name : item.name,
              // images : [item.image]
            },
            unit_amount : item.price * 100,
          },
          adjustable_quantity : {
            enabled : true,
            minimum : 1,
          },
          quantity : item.qty
        }
      }),
      
      success_url : `${process.env.FRONTEND_URL}/success`,
      cancel_url : `${process.env.FRONTEND_URL}/cart`,

  }

  const session = await stripe.checkout.sessions.create(params)
  // console.log(session)
  res.status(200).json(session.id)
 }
 catch (err){
    res.status(err.statusCode || 500).json(err.message)
 }

})







app.listen(PORT, () => console.log("Server is running at port:" + PORT));
