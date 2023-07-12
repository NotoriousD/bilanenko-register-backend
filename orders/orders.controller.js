const ordersSchema = require('./orders.models');
const { validation } = require('./orders.validation');
const { statuses } = require('../types/statuses');
const { getExchangeRates, monobankCreateInvoice } = require('../api/payment');

exports.getOrders = async (req, res) => {
  const orders = await ordersSchema.find({});
  
  if(orders) {
    res.status(200).json(orders);
  }
};

exports.createOrder = async (req, res, next) => {
  const {
    package,
  } = req;
  const { error } = validation.validate(req.body);

  if(error) {
    res.status(404).json(error);
  }

  try {
    let total_amount;
    const rate = await getExchangeRates();

    if(rate) {
      total_amount = Math.floor(package.price * rate) * 100;
    }

    const newOrder = await ordersSchema.collection.insertOne({
      ...req.body,
      total_amount,
      invoice_id: null,
      order_status: statuses.pending,
      created_date: new Date(),
      paied_date: null,
    }, (err, res) => res);

    if(newOrder.length === 0) {
      return res.status(404).send({ message: 'Order not created' });
    }

    req.order = {
      orderId: newOrder.insertedId,
      amount: total_amount,
      name: package.name,
    };

    next();
  } catch(err) {
    res.status(400).json(err);
  }
};

exports.createInvoice = async (req, res) => {
  const {
    order: {
      orderId,
      amount,
      name
    },
    body
  } = req;
  try {
    const invoice = await monobankCreateInvoice({
      orderId,
      amount,
      productId: body.course_id,
      name,
      redirectUrl: 'https://digitclone.com/',
      webHookUrl: 'http://localhost:3000/orders/cb',
      destination: `Оплата курсу WORKSHOP (${name})`,
    });

    if(invoice) {
      await ordersSchema.findByIdAndUpdate(orderId, {
        invoice_id: invoice.invoiceId,
        order_status: statuses.invoiceCreated,
      }, { new: true });
  
      res.status(200).json({ pageUrl: invoice.pageUrl })
    }
  } catch(err) {
    res.status(404).json(err);
  }
};

exports.updatedOrder = async (req, res) => {
  const {
    body: {
      status,
      reference,
    },
  } = req;

  try {
    await ordersSchema.findByIdAndUpdate(reference, {
      order_status: status,
    });

  } catch(e) {
    console.log(e);
  }
}