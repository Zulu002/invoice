let itemCount = 0;

// Функция для обновления даты
function updateDate() {
    const now = new Date();
    const dateString = now.toLocaleDateString('ru-RU', {
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric',
        weekday: 'long'
    });
    document.getElementById('currentDate').textContent = dateString;
}

// Загружаем когда DOM готов
document.addEventListener('DOMContentLoaded', function() {
    updateDate();
    addItemRow();
    
    // Обновляем дату каждые 24 часа
    setInterval(updateDate, 24 * 60 * 60 * 1000);
});

// function changeLastItemRow() {
//     const itemM = document.querySelectorAll(".item-row");
//     itemM.forEach((itemRow, index) => {
//         if (index < itemM.length-1){itemRow.className = 'item-row new-row'}
//         else (itemRow.className = 'item-row new-row endRow')
//     });
//     focusOnLastRow();
// }

function focusOnLastRow() {
    document.querySelector('.add-btn')?.scrollIntoView({behavior: 'smooth',block:'end'})
}


function addItemRow() {
    itemCount++;
    const itemsContainer = document.getElementById('itemsContainer');
    
    const row = document.createElement('div');
    row.className = 'item-row new-row';
    row.innerHTML = `
        <input type="number" class="quantity" placeholder="Кол/вес" id="qty${itemCount}" min="0" step="0.001" oninput="calculateAll()">
        <input type="number" class="price" placeholder="Цена" id="price${itemCount}" min="0" step="0.01" oninput="calculateAll()">
        <div class="total" id="total${itemCount}">Сумма</div>
        <button type="button" class="delete-btn" onclick="deleteRow(this)">✕</button>
    `;
    
    itemsContainer.appendChild(row);
    
    setTimeout(() => {
        document.getElementById('qty' + itemCount).focus();
    }, 100);
    focusOnLastRow();
}

function calculateAll() {
    let grandTotal = 0;
    
    for (let i = 1; i <= itemCount; i++) {
        const quantityElement = document.getElementById('qty' + i);
        const priceElement = document.getElementById('price' + i);
        const totalElement = document.getElementById('total' + i);
        
        if (quantityElement && priceElement && totalElement) {
            const quantity = parseFloat(quantityElement.value) || 0;
            const price = parseFloat(priceElement.value) || 0;
            const total = Math.round(quantity * price);
            
            totalElement.textContent = total.toLocaleString('ru-RU');
            grandTotal += total;
        }
    }
    
    document.getElementById('totalAmount').textContent = grandTotal.toLocaleString('ru-RU') + ' ₽';
}

function deleteRow(button) {
    const row = button.parentElement;
    row.classList.add('removing');
    
    setTimeout(() => {
        if (row.parentElement) {
            row.parentElement.removeChild(row);
            calculateAll();
        }
    }, 300);
}

window.onload = addItemRow;

document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const activeElement = document.activeElement;
        if (activeElement && (activeElement.className === 'quantity' || activeElement.className === 'price')) {
            const row = activeElement.closest('.item-row');
            if (row && !row.nextElementSibling) {
                addItemRow();
            }
        }
    }
});