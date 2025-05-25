fetch('./src/data.json')
  .then(response => response.json())
  .then(data => {
    // Use the JSON data here
    console.log(data["port"]);
  })
  .catch(error => {
    console.error('Error fetching JSON:', error);
  });
