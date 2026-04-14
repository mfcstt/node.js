# Domain-Driven Design (DDD) — Módulo Node.js (Rocketseat)

Este documento resume os principais conceitos trabalhados no módulo de **DDD** da formação **Node.js** da **Rocketseat**, servindo como guia rápido do que foi aprendido e por que cada ideia importa na prática.

---

## Fundamentos do DDD

O **Domain-Driven Design** coloca o **domínio** (regras de negócio) no centro do software. Em vez de começar por telas ou banco de dados, modelamos o problema com **conceitos do negócio**, alinhados ao que especialistas e desenvolvedores falam no dia a dia. Objetivos típicos:

- Reduzir divergência entre “o que o negócio quer” e “o que o código faz”.
- Isolar regras complexas em camadas e módulos coerentes.
- Evoluir o sistema junto com a compreensão do domínio.

---

## Linguagem ubíqua

A **linguagem ubíqua** é o vocabulário **compartilhado** entre o time técnico e o time de negócio. Termos iguais no código, nas conversas e na documentação **reduzem ambiguidade**. Quando todos dizem “pedido”, “assinatura” ou “slug” com o mesmo significado, o modelo fica mais estável e as discussões mais produtivas.

---

## Value Objects

**Value Objects** são objetos definidos **pelo valor**, não por identidade: dois valores com os mesmos atributos são considerados **iguais**. São **imutáveis** e encapsulam validações (formato de e-mail, intervalo de datas, dinheiro com moeda). Exemplos: `Money`, `Email`, `Slug`. Eles evitam “primitive obsession” e concentram invariantes em um só lugar.

---

## Entidades

**Entidades** têm **identidade única** ao longo do tempo (ex.: `id`). Podem mudar estado e ainda serem “a mesma” coisa no domínio. A identidade importa mais que a igualdade por atributos — dois usuários com o mesmo nome são entidades diferentes se os ids forem diferentes.

---

## Agregados

Um **agregado** é um **cluster de entidades e value objects** tratado como **uma unidade de consistência**. Há uma **raiz do agregado (aggregate root)** que é o único ponto de entrada para alterações externas. Isso delimita **transações** e **invariantes**: mudanças que precisam ser sempre verdadeiras ficam dentro do agregado, evitando que o modelo vire um “grafo solto” sem regras claras.

---

## Watched List

A **watched list** (lista observada) é um padrão útil para rastrear **itens adicionados ou removidos** de uma coleção no domínio, por exemplo para disparar **eventos de domínio** ou sincronizar persistência sem comparar o estado inteiro do banco a cada vez. Ajuda a manter o modelo explícito sobre **o que mudou** dentro do agregado.

---

## Casos de uso (use cases)

**Use cases** (ou **application services**) orquestram o fluxo da aplicação: chamam repositórios, entidades e serviços de domínio, sem conter **regra de negócio pura** que pertença à entidade ou ao domínio. São a “lista de intenções” do sistema: *Registrar usuário*, *Criar post*, *Comentar*. No Node, costumam ficar em uma camada de **aplicação**, separados de HTTP e de detalhes de infraestrutura.

---

## Bounded Context

Um **bounded context** é um **limite** onde um modelo de domínio é **consistente**. A mesma palavra pode ter significados diferentes em contextos diferentes (ex.: “Cliente” no financeiro vs. no suporte). Contextos distintos podem se integrar via **contratos** (eventos, APIs, anti-corruption layer), sem forçar um único modelo global frágil.

---

## Eventos de domínio

**Domain events** registram **algo relevante que já aconteceu** no domínio: *PedidoPago*, *UsuárioRegistrado*. São imutáveis, orientados ao passado e úteis para desacoplar reações (enviar e-mail, atualizar leitura, integrar com outro contexto). Podem ser disparados a partir de agregados e processados de forma síncrona ou assíncrona, conforme a arquitetura.

---

## Subdomínios

O domínio grande pode ser dividido em **subdomínios** — áreas com problemas e linguagem próprios. Costuma-se diferenciar:

- **Core**: o que gera vantagem competitiva (máximo cuidado no DDD).
- **Supporting**: apoia o core, mas não é o diferencial.
- **Generic**: soluções comuns (pagamento genérico, notificação), candidatas a integrações ou pacotes prontos.

Essa visão ajuda a priorizar onde investir em modelo rico e onde simplificar.

---

## Clean Architecture

A **Clean Architecture** organiza o código em **camadas com dependências apontando para dentro**: regras de negócio e entidades **não** dependem de frameworks, banco ou HTTP. Na prática no Node:

- **Entidades e domínio** no centro.
- **Casos de uso** em volta, sem detalhes de UI ou DB.
- **Adaptadores** (controllers, repositórios concretos, ORMs) na borda.

Isso facilita testes, troca de tecnologia e manutenção alinhada ao DDD, onde o **modelo de domínio** permanece estável enquanto os detalhes mudam.


---

*Formação Node.js — Rocketseat · Módulo DDD*
