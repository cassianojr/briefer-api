const app = require('./config/custom-express')();

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`[!] Server started on port ${PORT}`));