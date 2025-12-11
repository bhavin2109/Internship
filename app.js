let categoryContainer = document.getElementById("category-container");
const categories = [
  "All",
  ...new Set(products.map((product) => product.category)),
];

function renderCategoryButtons() {
  categoryContainer.innerHTML = "";
  categories.forEach((cat) => {
    let button = document.createElement("button");
    button.textContent = cat;
    button.dataset.category = cat;

    if (cat === "All") button.classList.add("active");

    button.addEventListener("click", (e) => {
      document
        .querySelectorAll("#category-container button")
        .forEach((btn) => btn.classList.remove("active"));
      e.target.classList.add("active");
      filterCategory(cat);
    });
    categoryContainer.appendChild(button);
  });
}

function filterCategory(category) {
  const filteredProducts =
    category === "All"
      ? products
      : products.filter((product) => product.category === category);
  document.getElementById("product-container").innerHTML = "";
  renderProducts(filteredProducts);
}
renderCategoryButtons();

function renderProducts(products) {
  const productContainer = document.getElementById("product-container");

  products.forEach((product) => {
    let productCard = document.createElement("div");
    productCard.classList.add("product-card");

    productCard.innerHTML = `
              <img src="${product.image}">
                  <div class="product-info">
                      <h4 class="product-title">${product.name}</h4>
                      <p class="product-rating">Rating: ${product.rating}</p>
                  <div class="bottom">
                      <p class="product-price">$${product.price}</p>
                      <button onclick="window.location.href='./productDetails.html?id=${product.id}'" class="btn">View Product</button>
                  </div>
                  </div>
                          `;
    productContainer.appendChild(productCard);
  });
}

renderProducts(products);

function openProduct(id) {
  window.location.href = `./product.html?id=${id}`;
}

let faqs = document.querySelectorAll(".faq-ques");
faqs.forEach((faq) => {
  faq.addEventListener("click", () => {
    let answer = faq.nextElementSibling;
    if (answer.style.maxHeight) {
      answer.style.maxHeight = null;
    } else {
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
    faq.classList.toggle("active");
  });
});

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartCountElement = document.querySelector(".cart-count");
  if (cartCountElement) {
    cartCountElement.textContent = cartCount;
  }
}

updateCartCount();

const loginBtn = document.getElementById("login-btn");
const loginModal = document.querySelector(".login-container");
const closeBtn = document.querySelector(".close-btn");
const loginForm = loginModal.querySelector("form");
const submitBtn = document.getElementById("submit");

let isAuth = false;

loginBtn.addEventListener("click", () => {
  loginModal.style.display = "flex";
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  if (username === "bhavin" && password === "bhavin") {
    isAuth = true;
    loginModal.style.display = "none";
    loginBtn.innerHTML = `Logout`;
    setTimeout(() => {
      window.alert("LoggedIn Successfully");
    }, 10);
  } else {
    setTimeout(() => {
      window.alert("Invalid Login Credentials");
    }, 10);
  }
});

closeBtn.addEventListener("click", () => {
  loginModal.style.display = "none";
});

loginModal.addEventListener("click", (e) => {
  if (e.target === loginModal) {
    loginModal.style.display = "none";
  }
});
