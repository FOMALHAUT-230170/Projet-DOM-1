document.addEventListener("DOMContentLoaded", () => {
  const listProducts = document.querySelector(".list-products");
  const totalPriceSpan = document.querySelector(".total-price .total");

  // FONCTION : Calculer et mettre à jour le prix total global
  function updateTotalPrice() {
    let total = 0;
    const cards = document.querySelectorAll(".card");

    cards.forEach((card) => {
      const priceElement = card.querySelector(".unit-price");
      const quantityElement = card.querySelector(".quantity");

      if (priceElement && quantityElement) {
        // Extrait la valeur numérique (ex: "100 $" -> 100)
        const price = parseFloat(priceElement.textContent.replace(/[^\d.]/g, ""));
        const quantity = parseInt(quantityElement.textContent) || 0;
        total += price * quantity;
      }
    });

    if (totalPriceSpan) {
      totalPriceSpan.textContent = `${total} $`;
    }
  }

  // ÉVÉNEMENTS : Gestion de tous les clics dans le panier (Délégation d'événements)
  if (listProducts) {
    listProducts.addEventListener("click", (event) => {
      const target = event.target;

      // 1. Bouton Augmenter (+)
      if (target.classList.contains("fa-plus-circle")) {
        const quantityElement = target.parentElement.querySelector(".quantity");
        if (quantityElement) {
          let currentQty = parseInt(quantityElement.textContent) || 0;
          quantityElement.textContent = currentQty + 1;
          updateTotalPrice(); // Recalcule le total
        }
      }

      // 2. Bouton Diminuer (-)
      if (target.classList.contains("fa-minus-circle")) {
        const quantityElement = target.parentElement.querySelector(".quantity");
        if (quantityElement) {
          let currentQty = parseInt(quantityElement.textContent) || 0;
          if (currentQty > 0) {
            quantityElement.textContent = currentQty - 1;
            updateTotalPrice(); // Recalcule le total
          }
        }
      }

      // 3. Bouton Corbeille (Remise à zéro sans faire disparaître le produit)
      if (target.classList.contains("fa-trash-alt")) {
        // On cherche la carte parente pour trouver l'élément de quantité associé
        const card = target.closest(".card");
        if (card) {
          const quantityElement = card.querySelector(".quantity");
          if (quantityElement) {
            quantityElement.textContent = 0; // Remet la quantité à zéro
            updateTotalPrice(); // Recalcule le total (le produit vaut désormais 0 $)
          }
        }
      }

      // 4. Bouton Cœur (Favoris)
      if (target.classList.contains("fa-heart")) {
        target.classList.toggle("text-danger");
        
        // Force la couleur rouge si les règles de base écrasent Bootstrap
        if (target.classList.contains("text-danger")) {
          target.style.setProperty("color", "#dc3545", "important");
        } else {
          target.style.setProperty("color", "black", "important");
        }
      }
    });
  }

  // Lancement du calcul au chargement de l'écran (0 $ par défaut)
  updateTotalPrice();
});
