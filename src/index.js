import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { pets } from "./dados.js";
import { randomUUID } from "crypto";
import { logRequestMiddleware, validatePetMiddleware } from "./middlewares.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(logRequestMiddleware);

app.get("/pets", (req, res) => {
  try {
    const { nome, raca, idade, nomeDoTutor } = req.query;

    let dados = pets;
    if (nome !== undefined)
      dados = dados.filter((item) => item.nome.includes(nome));

    if (raca !== undefined)
      dados = dados.filter((item) => item.raca.includes(raca));

    if (idade) {
      const idadeNum = Number(idade);
      if (isNaN(idadeNum)) {
        return res.status(400).send({
          ok: false,
          mensagem: "O parâmetro idade inválido.",
        });
      }
      dados = dados.filter((item) => item.idade > idadeNum);
    }

    if (nomeDoTutor)
      dados = dados.filter((item) => item.nomeDoTutor.includes(nomeDoTutor));

    res.status(200).send({
      ok: true,
      mensagem: "Pets listados com sucesso.",
      dados,
    });
  } catch (error) {
    res.status(500).send({
      ok: false,
      mensagem: "Erro interno do servidor.",
    });
  }
});

app.get("/pets/:id", (req, res) => {
  try {
    const { id } = req.params;
    const pet = pets.find((item) => item.id === id);
    if (!pet) {
      return res.status(404).send({
        ok: false,
        mensagem: "Pet não encontrado.",
      });
    }
    return res.status(200).send({
      ok: true,
      mensagem: "Pet obtido com sucesso.",
      dados: pet,
    });
  } catch (error) {
    res.status(500).send({
      ok: false,
      mensagem: "Erro interno do servidor.",
    });
  }
});

app.post("/pets", validatePetMiddleware, (req, res) => {
  try {
    const body = req.body;
    const novoPet = {
      id: randomUUID(),
      nome: body.nome,
      raca: body.raca,
      idade: body.idade,
      nomeDoTutor: body.nomeDoTutor,
    };

    pets.push(novoPet);

    res.status(201).send({
      ok: true,
      mensagem: "Pet criado com sucesso.",
      dados: pets,
    });
  } catch (error) {
    res.status(500).send({
      ok: false,
      mensagem: "Erro interno do servidor.",
    });
  }
});

app.put("/pets/:id", validatePetMiddleware, (req, res) => {
  try {
    const { id } = req.params;
    const { nome, raca, idade, nomeDoTutor } = req.body;

    const pet = pets.find((item) => item.id === id);

    if (!pet) {
      return res.status(404).send({
        ok: false,
        mensagem: "Pet não encontrado.",
      });
    }

    pet.nome = nome;
    pet.raca = raca;
    pet.idade = idade;
    pet.nomeDoTutor = nomeDoTutor;

    res.status(200).send({
      ok: true,
      mensagem: "Pet atualizado com sucesso.",
      dados: pets,
    });
  } catch (error) {
    res.status(500).send({
      ok: false,
      mensagem: "Erro interno do servidor.",
    });
  }
});

app.delete("/pets/:id", (req, res) => {
  try {
    const { id } = req.params;

    const petIndex = pets.findIndex((item) => item.id === id);
    if (petIndex < 0) {
      return res.status(404).send({
        ok: false,
        mensagem: "Pet não encontrado.",
      });
    }

    pets.splice(petIndex, 1);

    res.status(200).send({
      ok: true,
      mensagem: "Pet excluído com sucesso.",
      dados: pets,
    });
  } catch (error) {
    res.status(500).send({
      ok: false,
      mensagem: "Erro interno do servidor.",
    });
  }
});

const porta = process.env.PORT;
app.listen(porta, () => {
  console.log(`O servidor está executando na porta ${porta}`);
});
