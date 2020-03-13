import Mail from '../../lib/mail';

class CancellationMail {
  get key() {
    return 'cancellationEmail';
  }

  async handle({ data }) {
    const { problem } = data;

    await Mail.sendMail({
      to: `${problem.deliveryman.name} <${problem.deliveryman.email}>`,
      subject: 'Cancelamento realizado',
      template: 'cancellationMail',
      context: {
        deliveryman: problem.deliveryman.name,
        product: problem.product,
      },
    });
  }
}

export default new CancellationMail();
