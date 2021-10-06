module.exports = {
  handleError: (res, err) => {
    console.error(err);
    res.status(err.status || 500).send({ error: err.msg || err.message });
  }
}