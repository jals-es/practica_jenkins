const fs = require('fs')

const testResult = process.argv[2]
console.log(testResult);
const successBadge = 'https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg'
const failedBadge = 'https://img.shields.io/badge/test-failure-red.svg'

fs.readFile('README.md', 'utf-8', (err, data) => {
    if (err) {
        throw err
    }
    const markdownUpdate = data.replace(
        /(?<=\[!\[Cypress.io\]\()[\s\S]*(?=\)\])/gm,
        testResult == 0 ? successBadge : failedBadge
    )
    fs.writeFile('README.md', markdownUpdate, 'utf-8', (err) => {
        if (err) {
            throw err
        }
        console.log('Markdown Update Successfully')
    })
})