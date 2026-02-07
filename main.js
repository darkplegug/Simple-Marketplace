const selectorCategory = document.querySelectorAll('.category')
const coffe = document.getElementById('coffees')
const tea = document.getElementById('teas')
const sidebar = document.getElementById('sidebar')
const cartNumber = document.querySelector('.cart-container p')
const cartBtn = document.querySelectorAll('.card-attribute button')

let cart = []

cartNumber.innerHTML = cart.length

function start() {
  coffe.style.display = 'grid';
  tea.style.display = 'none';
  selectorCategory[0].classList.add('active')
  selectorCategory[1].classList.remove('active')  
}
start()

const coffeBtn = () => {
  coffe.style.display = 'grid';
  tea.style.display = 'none';
  selectorCategory[0].classList.add('active')
  selectorCategory[1].classList.remove('active')
}

const teaBtn = () => {
  coffe.style.display = 'none';
  tea.style.display = 'grid';
  selectorCategory[0].classList.remove('active')
  selectorCategory[1].classList.add('active')
}

function addChart() {
  sidebar.classList.add('active')
}

function closeSideBar() {
  sidebar.classList.remove('active')

}

cartBtn.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    
    const name = card.querySelector('h3').innerText;
    const price = card.querySelector('.card-attribute p').innerText;
    const img = card.querySelector('img').src;

    let findProduct = cart.find(p => p.name === name)

    if(findProduct) {
      findProduct.amount++
      const cartItem = document.querySelector(`.cart-item[data-name="${name}"]`);
      const amountText = cartItem.querySelector('.amount'); 
      amountText.innerText = findProduct.amount;
      const total = parseInt(findProduct.price) * findProduct.amount
      const priceText = cartItem.querySelector('.total-amount p');
      priceText.innerHTML = total.toLocaleString('id-ID')
    } else {
      const product = { name, price, img, amount: 1 };
      cart.push(product);

      cartNumber.innerHTML = cart.length;

      const items = document.querySelector('.sidebar div');
      const cartItem = document.createElement('div');
      cartItem.setAttribute('class', 'cart-item')
      cartItem.setAttribute('data-name', name);
      cartItem.innerHTML = `
        <img src="${product.img}" width="100" class="img-component">
        <div class="cart-component">
          <span>${product.name}</span>
          <div class="total-amount">
            <p>10000</p>
            <div class="price-btn">
              <button class="amount-btn minus">-</button>
              <p class="amount">${product.amount}</p>
              <button class="amount-btn plus">+</button>
            </div>
          </div>
        </div>
      `;
      items.append(cartItem);

      const amountText = cartItem.querySelector('.amount'); 
      const plusBtn = cartItem.querySelector('.plus'); 
      const minusBtn = cartItem.querySelector('.minus');
      const priceText = cartItem.querySelector('.total-amount p');

      function refreshTotal() {
        const total = parseInt(product.price) * product.amount
        priceText.innerHTML = total.toLocaleString('id-ID')
      }

      plusBtn.addEventListener('click', () => {
        product.amount++
        amountText.innerHTML = product.amount
        refreshTotal()
      })

      minusBtn.addEventListener('click', () => {
        product.amount--
        if(product.amount >= 1) {
          amountText.innerHTML = product.amount
          refreshTotal()
        } else {
          const index = cart.indexOf(product)
          refreshTotal()
          if (index > -1) {
            cart.splice(index, 1)
          }
          cartItem.remove()
          cartNumber.innerText = cart.length;
        }
      })
    }
  });
});

function renderOrderDetails() {
  const paymentDetail = document.querySelector('.payment-detail')
  paymentDetail.style.display = 'block'

  const detailContainer = paymentDetail.querySelector('.item-detail'); 
  detailContainer.innerHTML = "";

  let grandTotal = 0
  let total = 0
  cart.forEach(function(item) {
    total = parseInt(item.price) * item.amount;
    grandTotal += parseInt(item.price) * item.amount;
    const detailItem = document.createElement('div')
    detailItem.classList.add('detail-item');
    detailItem.innerHTML = `
      <p>${item.name}</p>
      <p>${item.amount} x Rp ${parseInt(item.price).toLocaleString('id-ID')} = Rp ${total.toLocaleString('id-ID')}</p>
    `  
    detailContainer.append(detailItem)
  })
    const orderSection = document.querySelector('.order-section')
    const p = orderSection.querySelector('.grand-total')
    p.innerHTML = `Total: Rp ${grandTotal.toLocaleString('id-ID')}`; 

    const xBtn = paymentDetail.querySelector('.order-section button')
    xBtn.addEventListener('click', () => {
      paymentDetail.style.display = 'none'
      detailContainer.innerHTML = ""
    })
}

const buttons = document.querySelectorAll(".payment-btn");
const inputContainer = document.getElementById("payment-input");
let selectedMethod = null;

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    selectedMethod = btn.dataset.method;

    inputContainer.innerHTML = "";

    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    if (selectedMethod === "ewallet") {
      inputContainer.innerHTML = `<input type="text" placeholder="Masukan Nomor E-Wallet">`;
      buttons[0].classList.add('active')
    } else if (selectedMethod === "credit") {
      inputContainer.innerHTML = `
        <input type="text" placeholder="Nomor Kartu Kredit">
        <input type="text" placeholder="Tanggal Exp (MM/YY)">
        <input type="text" placeholder="CVV">
      `;
    } else if (selectedMethod === "bank") {
      inputContainer.innerHTML = `<input type="text" placeholder="Nomor Rekening Bank">`;
    }
  });
});

const popup = document.getElementById("popup");
const popupMessage = document.getElementById("popup-message");
const closeBtn = document.querySelector(".close-btn");
const okBtn = document.querySelector(".ok-btn");

document.querySelector(".checkout-btn").addEventListener("click", () => {
  if (!selectedMethod) {
    popupMessage.textContent = "Pilih metode pembayaran terlebih dahulu!";
  } else {
    popupMessage.textContent = "Checkout dengan metode: " + selectedMethod;
  }
  popup.style.display = "flex"; // tampilkan popup
});

// tombol close
closeBtn.addEventListener("click", () => {
  popup.style.display = "none";
});

// tombol OK
okBtn.addEventListener("click", () => {
  popup.style.display = "none";
});

// klik luar popup untuk tutup
window.addEventListener("click", (e) => {
  if (e.target === popup) {
    popup.style.display = "none";
  }
});

