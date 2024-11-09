# Magneto API

Welcome to the Magneto API, a powerful tool built to help Magneto recruit as many mutants as possible in the battle against the X-Men. This API detects whether a given DNA sample belongs to a mutant, and also tracks the number of human and mutant DNA sequences stored in a MySQL database. 🧬

I developed this API using NestJS. In this README, you’ll find an overview of how the API works, details about each endpoint, and instructions on how to run the project. 🚀

Rest assured, Magneto can focus on his mission, knowing that this application has been thoroughly tested with 100% code coverage. We can't afford to lose a single mutant, so I’ve made sure everything is working as expected! 🧪

# 🧬 API Endpoints

- **POST /mutant**

The /mutant endpoint is designed to detect whether a DNA sequence belongs to a mutant. It receives a JSON payload with a list of strings (representing each nitrogenous base of the DNA) and returns a message indicating whether the DNA is mutant or human. In addition, the data is stored in a MySQL database for tracking purposes.

**Request body example**

{
  "dna": [
    "ATGCGA",
    "CAGTGC",
    "TTATGT",
    "AGAAGG",
    "CCCCTA",
    "TCACTG"
  ]
}

- **GET /mutant/stats**

The /mutant/stats endpoint returns statistics on the number of human and mutant DNA sequences stored in the database. It also calculates and provides the ratio of mutant DNA sequences to human DNA sequences.

# How to run the project

1) Clone this repo to your local machine.
2) Run **npm i**.
3) Create a **.env** file in the root directory of the project and define your environment variables.
4) Make sure Docker is installed on your machine. Then, start the database with the command **docker-compose up -d**.
5) Run **npm run migration:run** to apply the migrations to the database.
5) Run **npm run start:dev** to get started and begin recruiting mutants!.

# 🧪 Testing

To run the tests, simply execute npm run test, and that's it! 🧬
