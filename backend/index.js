const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const employeeRoutes = require('./routes/employeeRoutes');
const authRoutes = require('./routes/user')

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());


app.use(bodyParser.json({ limit: '50mb' }));  
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); 


mongoose.connect('mongodb+srv://userOwner:<PASSWORD>@employeecluster1.vod7p.mongodb.net/?retryWrites=true&w=majority&appName=EmployeeCluster1', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((error) => console.error("MongoDB connection failed:", error));


app.use('/api/employees', employeeRoutes);
app.use('/api/user', authRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
