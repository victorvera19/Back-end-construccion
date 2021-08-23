const express = require('express') ;

const app = express()

app.use(express.json())

let notes=[ 
    {
        'id': 1,
        'content': "Ya me voy",
        'date': "2021-08-18T10:36:31.098Z",
        'important': true
    },
    {
        'id': 2,
        'content': "Hay que aprender la clase fullstack bootstrap",
        'date': "2021-08-18T10:36:31.098Z",
        'important': false
    },
    {
        'id': 3,
        'content': "Estudiar y comprender HTML",
        'date': "2021-08-18T10:36:31.098Z",
        'important': true
    }
]
/* const app=http.createServer((request, response)=>{ 'request is declared but is value is never request parameter'
    response.writeHead(200,{'Content-Type':'application/json'})
    response.end(JSON.stringify(notes))
}) */

app.get('/',(request,response) => {
    response.send('<h1>Hola Mundo</h1>')
})

app.get('/api/notes',(request,response) => {
    response.json(notes)
})

app.get('/api/notes/id',(request,response) => {
    const id=Number(request.params.id)
    console.log({id})
    const note= notes.find(note=> note.id === id)
    console.log({note})
    if (note){
        response.json(notes)
    }else{
        response.status(404).end()
    }
})

app.delete('/api/notes/:id', (request,response)=>{
    const id=Number(request.params.id)
    notes=notes.filter(note=>note.id!=id)
    response.status(204).end()
})
app.post('/api/notes',(request,response)=>{
    const note =request.body

    if(!note || note.content){
        return response.status(400).json({
            error: 'note content is missing'
        })
    }
    console.log(note)
    const ids=notes.map(notes=> note.id)
    const maxId =Math.max(...ids)

    const newNote={        
        id: maxId+1,
        content: note.content,
        important: typeof note.important== 'undefined'? note.important:false,
        date:new Date().toISOString()         
    }  
    notes=[...notes, newNote]
    response.json(newNote)
})
const PORT=3001
app.listen(PORT,()=>{
    console.log('Server running on port ${PORT}')
})
