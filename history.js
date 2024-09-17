// 1. list the files in the history folder
// 2. load each file and parse the JSON
// 3. Output the chart data file

const path = require('path');
const fs = require('fs').promises;

const inputDir = 'history-daily';
const outputDir = 'html';

const inputDirectoryPath = path.join(__dirname, inputDir)
const outputDirectoryPath = path.join(__dirname, outputDir)

async function main()  {
  const files = await fs.readdir(inputDirectoryPath);
  const chartData = [];

  for (const file of files) {
    const text = await fs.readFile(path.join(inputDirectoryPath, file));
    const jsonObject = JSON.parse(text);

    chartData.push(jsonObject);
  }

  chartData.sort((a, b) => a.utcSeconds < b.utcSeconds);

  const bufArray = [
    'var CHART_DATA =[ \n'
  ];

  for (const data of chartData) {
    bufArray.push(`{ x: ${data.utcSeconds * 1000}, y: ${data.price} },\n`);
  }

  bufArray.push(']\n');

  const outputFile = path.join(outputDirectoryPath, 'eth-price.data.js');

  await fs.writeFile(outputFile, bufArray.join(''));
}

main();