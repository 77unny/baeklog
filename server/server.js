import app from './app';

const PORT = '8787';

app.listen(PORT, () => {
  console.log(`[server start...port:${PORT}] `);
});