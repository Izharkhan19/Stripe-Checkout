const cors = require("cors")
const express = require("express")

const stripe = require("stripe")("sk_test_51OoQQiSDMvvYMBnMA7nLzyEiUiQP8f7VWbjR9VPNrqH64TaVoHmWx6OMgcoqAOpMUx6j0MamPOlfF5AIpOkSUs1n00Sq1qncmk")
const uuid = require("uuid")

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