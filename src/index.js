import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { pets } from "./dados.js";
import { randomUUID } from "crypto";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/pets", (req, res) => {
  try {
    const { nome, raca, idade, nomeDoTutor } = req.query;

    let dados = pets;
    if (nome) dados = dados.filter((item) => item.nome.includes(nome));

    if (raca) dados = dados.filter((item) => item.raca.includes(raca));

    if (idade) {
      const idadeNum = Number(idade);
      if (isNaN(idadeNum)) {
        return res.status(400).send({
          ok: false,
          mansagem: "O parâmetro idade inválido.",
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
      return res.status(400).send({
        ok: false,
        mensagem: "Pet não encaontrado.",
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
app.post("/pets", (req, res) => {
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

const porta = process.env.PORT;
app.listen(porta, () => {
  console.log(`O servidor está executando na porta ${porta}`);
});
