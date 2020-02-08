class AppointmentControler {
  async store(req, res) {
    return res.json({ ok: true });
  }
}

export default new AppointmentControler();
