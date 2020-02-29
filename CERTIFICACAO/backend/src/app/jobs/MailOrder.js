import Mail from '../../lib/mail';

class MailOrder {
  get key() {
    return 'MailOrder';
  }

  async handle({ data }) {
    const { order } = data;

    await Mail.sendMail({
      to: `${order.deliveryman.name} <${order.deliveryman.email}>`,
      subject: 'Agendamento realizado',
      template: 'scheduling',
      context: {
        deliveryman: order.deliveryman.name,
        product: order.product,
      },
    });
  }
}

export default new MailOrder();
