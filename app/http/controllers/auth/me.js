function me(req, res) {
  const responseData = {
    id: req.user.id,
    full_name: req.user.full_name,
  };

  return res.status(200).send(responseData);
}

module.exports = me;
