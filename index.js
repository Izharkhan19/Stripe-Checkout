// const cors = require("cors")
// const express = require("express")
// const stripe = require("stripe")("sk_test_51OoQQiSDMvvYMBnMA7nLzyEiUiQP8f7VWbjR9VPNrqH64TaVoHmWx6OMgcoqAOpMUx6j0MamPOlfF5AIpOkSUs1n00Sq1qncmk")
// const uuid = express("uuid/v4")

// const app = express()

// // middlewares :
// app.use(express.json())
// app.use(cors())

// // routes :
// app.get("/", (req, res) => {
//     res.send("It is working")
// })

// // app.post("/payment", (req, res) => {

// //     const { product, token } = req.body

// //     const idempotencyKey = uuid()

// //     return stripe.customers.create({
// //         email: token.email,
// //         source: token.id
// //     }).then(customer => {
// //         stripe.charges.create(
// //             {
// //                 amount: product.price * 100,
// //                 currency: "usd",
// //                 customer: customer.id,
// //                 receipt_email: token.email,
// //                 description: product.name,
// //                 shipping: {
// //                     name: token.card.name,
// //                     address: {
// //                         country: token.card.address_country,
// //                     }
// //                 },
// //             },
// //             { idempotencyKey })
// //     }).then(result => {
// //         res.status(200).json(result)
// //     }).catch(err => console.log(err))


// // })


// // listen :


// app.use(express.static('public'));

// const YOUR_DOMAIN = 'http://localhost:3000';

// app.post('/payment', async (req, res) => {
//     const { product, token } = req.body
//     const session = await stripe.checkout.sessions.create({
//         line_items: [
//             {
//                 // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//                 price: product.price * 100,
//                 quantity: 1,
//             },
//             // {
//             //     amount: product.price * 100,
//             //     currency: "usd",
//             //     customer: customer.id,
//             //     receipt_email: token.email,
//             //     description: product.name,
//             //     shipping: {
//             //         name: token.card.name,
//             //         address: {
//             //             country: token.card.address_country,
//             //         }
//             //     },
//             // },
//         ],
//         mode: 'payment',
//         success_url: `${YOUR_DOMAIN}?success=true`,
//         cancel_url: `${YOUR_DOMAIN}?canceled=true`,
//     });

//     res.redirect(303, session.url);
// });


// app.listen(8282, () => {
//     console.log("Listen on port 8282")
// })





// // // This is your test secret API key.
// // const stripe = require('stripe')('sk_test_51OoQQiSDMvvYMBnMA7nLzyEiUiQP8f7VWbjR9VPNrqH64TaVoHmWx6OMgcoqAOpMUx6j0MamPOlfF5AIpOkSUs1n00Sq1qncmk');
// // const express = require('express');
// // const app = express();
// // app.use(express.static('public'));

// // const YOUR_DOMAIN = 'http://localhost:3000';

// // app.post('/create-checkout-session', async (req, res) => {
// //   const session = await stripe.checkout.sessions.create({
// //     line_items: [
// //       {
// //         // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
// //         price: '{{PRICE_ID}}',
// //         quantity: 1,
// //       },
// //     ],
// //     mode: 'payment',
// //     success_url: `${YOUR_DOMAIN}?success=true`,
// //     cancel_url: `${YOUR_DOMAIN}?canceled=true`,
// //   });

// //   res.redirect(303, session.url);
// // });

// // app.listen(4242, () => console.log('Running on port 4242'));


const cors = require("cors")
const express = require("express")

const stripe = require("stripe")("sk_test_51OoQQiSDMvvYMBnMA7nLzyEiUiQP8f7VWbjR9VPNrqH64TaVoHmWx6OMgcoqAOpMUx6j0MamPOlfF5AIpOkSUs1n00Sq1qncmk")
const uuid = express("uuid/v4")

const app = express()

// middlewares :
app.use(express.json())
app.use(cors())

// routes :
app.get("/", (req, res) => {
    res.send("It is working")
})

app.post("/payment", (req, res) => {
    const { product, token } = req.body
    console.log("PRODUCT", product)
    console.log("PRODUCT PRICE", product.price)
    const idempotencyKey = uuid()

    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(customer => {
        stripe.charges.create(
            {
                amount: product.price * 100,
                currency: "usd",
                customer: customer.id,
                receipt_email: token.email,
                description: product.name,
                shipping: {
                    name: token.card.name,
                    address: {
                        country: token.card.address_country,
                    }
                },
            },
            { idempotencyKey })
    }).then(result => {
        res.status(200).json(result)
    }).catch(err => console.log(err))


})


// listen :
app.listen(8282, () => {
    console.log("Listen on port 8080")
})