export function gettable(){
  return fetch("http://localhost:8888/table",{
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    // body: JSON.stringify(finalResult)
  }).then((res) => {
    return res.json()
  }).then((data) => {
    return {
      forms: data.form.form_items,
      body: data.body,
      columns: data.columns
    }
  })
}
