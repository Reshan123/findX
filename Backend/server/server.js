const app = require('./app'); 
const { mongoose } = require('mongoose');

const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;

mongoose.set('strictQuery', true);
mongoose.connect(MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`server started on port ${PORT}`);
            console.log(`FINDX COURSE MANAGEMENT API STARTED`);
        });
    })
    .catch((err) => {
        console.log(`Error occurred - ${err}`);
    });
