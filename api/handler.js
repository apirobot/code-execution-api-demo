const ERRORS = {
  noCode: {
    status: 400,
    error: "No code provided"
  },
  noLanguage: {
    status: 400,
    error: "No language provided"
  },
  internal: {
    status: 500,
    error: "An internal error has occurred"
  }
};

module.exports = (sandbox) => (request, response) => {

  if (!request.body.code) {
    return response
      .status(ERRORS.noCode.status)
      .json(ERRORS.noCode)
      .end();
  }

  if (!request.body.language) {
    return response
      .status(ERRORS.noLanguage.status)
      .json(ERRORS.noLanguage)
      .end();
  }

  options = {
    code: request.body.code,
    language: request.body.language,
    stdin: request.body.stdin
  }

  sandbox.run(options, function (err, result) {

    if (err) {
      return response
        .status(ERRORS.internal.status)
        .json(ERRORS.internal)
        .end();
    }

    response
      .status(200)
      .json(result)
      .end();
  })
};
