import app from "./app.js";
const port = 3001;

app.listen(3001, ()=>{
  console.log(`Escultando na porta ${port}`);
  console.log(`CTRL + Clique em http://localhost: ${port}`);
});