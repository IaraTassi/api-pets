export const logRequestMiddleware = (req, res, next) => {
  console.log(`Nova requisição`);
  console.log(`Query: ${JSON.stringify(req.query)}`);
  console.log(`Hostname: ${req.hostname}`);
  console.log(`IP: ${req.ip}`);
  console.log(`Body: ${JSON.stringify(req.body)}`);

  next();
};

export const validatePetMiddleware = (req, res, next) => {
  try {
    const { nome, raca, idade, nomeDoTutor } = req.body;

    if (!nome) {
      return res.status(400).send({
        ok: false,
        mensagem: "O campo nome não foi encontrado.",
      });
    }

    if (!raca) {
      return res.status(400).send({
        ok: false,
        mensagem: "O campo raça não foi informado.",
      });
    }

    if (idade === undefined) {
      return res.status(400).send({
        ok: false,
        mensagem: "O campo idade não foi informado.",
      });
    }

    if (typeof idade !== "number") {
      return res.status(400).send({
        ok: false,
        mensagem: "O campo idade deve ser um número",
      });
    }

    if (idade < 0) {
      return res.status(400).send({
        ok: false,
        mensagem: "A idade do pet deve ser maior ou igual a 0.",
      });
    }

    if (!nomeDoTutor) {
      return res.status(400).send({
        ok: false,
        mensagem: "O campo nome do tutor não foi informado.",
      });
    }

    next();
  } catch (error) {
    res.status(500).send({
      ok: false,
      mensagem: "Erro interno do servidor.",
    });
  }
};
