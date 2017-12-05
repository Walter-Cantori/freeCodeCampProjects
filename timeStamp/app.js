const express = require('express');
const bodyParser = require('body-parser');

const app = express()
const instructions = `
                        <h2>DateTime Converter</h2>
                        <p>To Begin enter a date and time in either natural language (e.g. /January 1, 2016)</P>
                        <p>or unix format (e.g. /1451613600000) after the url and hit Enter</p>
                    `

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use('/:time', (req, res) => {
    let date = req.params.time
    let naturalDate
    let unixDate 

    try {
        unixDate = new Date(parseInt(date)).toISOString()
    } catch (error) {
        unixDate = 'invalid date'
    }

    try {
        naturalDate = new Date(date).toISOString()
    } catch (error) {
        naturalDate = 'invalid date'
    }       
    

    let result = {}
        
    //check type of time
    //in case it is not valid
    if(naturalDate == 'invalid date' && unixDate == 'invalid date'){
        result.Unix =  null,
        result.Natural =  null
    }else {
        //in case it is a string it will be in natural type
        if( isNaN(parseInt(date)) ){
            result.Unix = new Date(date).getTime()
            result.Natural = date
        }else{
            //in case it is a int it will be in unix type
            result.Unix =  date
            let natural = new Date(parseInt(date))
            result.Natural = natural.toDateString()
        }
    }

    res.send(result)
})

app.use('/', (req, res) => {
    res.send(instructions)
})

app.listen('3000', () => {
    console.log('app listen on port 3000')
})