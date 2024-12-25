const api2 = "https://67172d90b910c6a6e026d725.mockapi.io/mesage/n17";
let description = document.querySelector(".description");
fetch(api2)
  .then((data) => data.json())
  .then((res) => getDataFuncForEach(res))
  .catch((error) => console.log(error.message));

function getDataFuncForEach(data) {
  data.forEach((value) => {
    let description1 = document.createElement("div");
    description1.classList.add("description1");
    description1.innerHTML = `
    <p>${value.title}</p>
    <p>${value.description}</p>
    <button class="btn" id=${value.id}>Delete</button>
    `;
    description.append(description1);
  });
}

description.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn")) {
    deleteDesc(e.target.id);
  }
});

function deleteDesc(id) {
  fetch(`${api2}/${id}`, { method: "DELETE" })
    .then(() => window.location.reload())
    .catch((err) => console.log(err));
}

const add = document.querySelector("#add");
const title = document.querySelector("#title");
const input1 = document.querySelector("#desc");

add.addEventListener("click", () => {
  const titleValue = title.value;
  const descriptionValue = input1.value;

  if (titleValue && descriptionValue) {
    const newDescription = { title: titleValue, description: descriptionValue };

    fetch(api2, {
      method: "POST",
      body: JSON.stringify(newDescription),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        let description1 = document.createElement("div");
        description1.classList.add("description1");
        description1.innerHTML = `
          <p>${data.title}</p>
          <p>${data.description}</p>
          <button class="btn" id=${data.id}>Delete</button>
        `;
        description.append(description1);

        title.value = "";
        input1.value = "";
      })
      .catch((error) => console.log(error));
  }
});

function editDate(id) {
  fetch(`${api2}/${id}`),
    {
      method: "PUT",
      body: JSON.stringify({
        title: "Salom edit",
        description: "Tovar nomi edit",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  then(() => fetchFunc()).catch((error) => console.log(error));
}
fetchFunc();
