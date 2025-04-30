async function fetchproducts() {
    try {
      const response = await fetch('assets/src/products.json');
      const products = await response.json();
      return products;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  }
  
  async function renderProducts(noProducts) {
    const products = await fetchproducts(); // Wait for the data

    const limitedProducts = products.slice(0, 4);
  
    // Render
    const productWrapper = document.querySelector('.product-wrapper');
    limitedProducts.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.className = "product"
      console.log(product)

      const badgesHTML = product.flags.map(flag => {
        if (flag === 'Novinka') {
          return `<div class="product-badge green-badge">Novinka</div>`;
        }
        if (flag === 'Výprodej') {
          return `<div class="product-badge red-badge">Výprodej</div>`;
        }
        return '';
      }).join('');

      const availabilityMap = {
        "Skladem": "green",
        "Na objednávku": "grey",
        "Momentálně nedostupné": "red"
      };
      
      const statusClass = availabilityMap[product.availability] || "";
      const formattedPrice = new Intl.NumberFormat('cs-CZ').format(product.price);

    
      productDiv.innerHTML = `

          <div class="product-img-wrapper">
            <img src=".${product.imgSrc}" alt="${product.title}">
            <div class="product-badges">${badgesHTML}</div>
          </div>
          <div class="product-title">${product.title}</div>
          <div class="product-info-wrapper">
            <div>
                <div class="product-stock-status ${statusClass}">${product.availability}</div>
                <div class="product-price">${formattedPrice} CZK</div>
            </div>
            <button class="add-to-card-btn"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 22a1 1 0 1 0 0-2 1 1 0 0 0 0 2m11 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
          </div>

      `;
      productWrapper.appendChild(productDiv);
    });
  }
  
  renderProducts();
  