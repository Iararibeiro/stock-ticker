# stock-ticker
Simple server to upload file and search it
# Stock Ticker

This repository contains a simple server where you can upload a file and search for an specific stock.

## Getting Started

The repository is build in Typescript/NodeJS, to runs locally you can do:
1. Clone the repository:
```git clone https://github.com/Iararibeiro/stock-ticker.git```
2. Inside the folder, you can install the packages:
```npm install```
3. After the packages and dependencies are install you can run the code doing:
```nodemon src/index.ts```
4. To build the production version, you can do:
``` npm run build```
(After the build the code will be locate at the folder build)

### Prerequisites

To run or build this project you will need to have install:
1. npm v6.14
2. ts-node v9.0.0
3. typescript v4.0.2
4. node v12.18.0

## Tests

The repository contains a list of tests in the folder *test*, to run the tests you need to have the server running and run the following command in the root folder:
```npm test```

A collection with examples of Postman requests can be found [here](https://github.com/Iararibeiro/stock-ticker/blob/master/tests/stock-picker.postman_collection.json).

## Authors

Iara Ribeiro - 2020

## License / Licença

This project is licensed under GPL-3.0 License - see the [LICENSE.md](LICENSE.md) file for details