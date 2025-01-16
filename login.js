const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

app.post('/vote.html', (req, res) => {
  const { username, password } = req.body;

  // อ่านไฟล์ ect.json
  fs.readFile('ect.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ status: 'error', message: 'Server error!' });
    }

    const jsonData = JSON.parse(data);
    const user = jsonData.users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      // ตอบกลับเมื่อข้อมูลถูกต้อง
      res.json(jsonData.responses.success);
    } else {
      // ตอบกลับเมื่อข้อมูลผิด
      res.json(jsonData.responses.error);
    }
  });
});

// เริ่มเซิร์ฟเวอร์
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
