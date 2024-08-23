import app from "./app.js";
const port = 3001;

app.listen(port, ()=>{
  console.log(`Escultando na porta ${port}`);
  console.log(`CTRL + Clique em http://localhost: ${port}`);
});