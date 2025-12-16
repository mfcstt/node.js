import fs from 'node:fs'
import { parse } from 'csv-parse'

async function importCSV(filePath) {
  // Lê o CSV como stream
  const stream = fs.createReadStream(filePath)

  // Parser que transforma CSV em arrays
  const parser = stream.pipe(
    parse({
      delimiter: ',',
      from_line: 2, // pula a primeira linha (header)
      trim: true,
    })
  )

  console.log('Iniciando importação...\n')

  for await (const record of parser) {
    const [title, description] = record

    console.log(`Enviando → ${title}`)

    await fetch('http://localhost:3334/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description }),
    })
  }

  console.log('\nImportação finalizada!')
}

// Caminho para o CSV
importCSV('./tasks.csv')
