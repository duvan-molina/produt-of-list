function Product(title, description) {
  this.title = title;
  this.description = description;
}

function Interface() {
  this.addProduct = function (obj) {
    const { title, description } = obj;
    const content = document.getElementById("content");
    const div = document.createElement("div");
    div.innerHTML = `
      <div clas="col-12">
        <div class="card mb-3">
          <div class="row" style="align-items: center;">
            <div class="col-8">
              <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${description}</p>
              </div>
            </div>
            <div class="col-3 mx-auto">
              <a class="btn btn-danger" name="delete" >Delete</a>
            </div>
          </div>
        </div>
      </div>
    `;
    content.appendChild(div);
    this.showMessage("the product was added", "success");
  };

  this.removeElement = function (element) {
    if (element.name === "delete") {
      element.parentElement.parentElement.parentElement.remove();
      this.showMessage("the product was removed", "info");
    }
  };

  this.showMessage = function (message, classCss) {
    const contentApp = document.getElementById("content-app");
    const app = document.getElementById("app");
    const messageModal = document.createElement("div");
    messageModal.innerHTML = `
      <div class="alert alert-${classCss}" role="alert">
        ${message}
      </div>
    `;
    contentApp.insertBefore(messageModal, app);
    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 3000);
  };
}

const btn = document.getElementById("btn");
const content = document.getElementById("content");

btn.addEventListener("click", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const interface = new Interface();

  if (title === "" || description === "") {
    return interface.showMessage("please fill in the fields", "danger");
  }
  const product = new Product(title, description);

  interface.addProduct(product);

  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
});

content.addEventListener("click", (e) => {
  const element = e.target;
  const interface = new Interface();
  interface.removeElement(element);
});
