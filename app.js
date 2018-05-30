const express = require('express');
const cors = require('cors');
const app = express();
const data = require('./cohorts');
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/', (req, res) => {
  res.json({
    cohorts: data
  })
});

app.get('/:id', (req, res) => {
  var id = getDataById(data, req.params.id)
  if (!id) {
    res.status(404).json({
      error: "Cohort does not exist at this id"
    })
  } else {
    res.json({
      cohort: id
    })
  }
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

function getDataById(data, id) {
  for(let i=0; i < data.length; i++) {
    if (data[i].id == id) {
      return data[i]
    }
  }
  return null
}
