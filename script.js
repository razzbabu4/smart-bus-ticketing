const seats = document.getElementsByClassName('seats');
let count = 0;
let selectedButton = [];
for (let seat of seats) {
    seat.addEventListener('click', function (e) {

        selectedButton.push([e.target]);
        if (selectedButton.length > 4) {
            return;
        }

        const seatCount = count += 1;
        setInnerText('seat-count', seatCount);

        // let totalSeat = parseInt(document.getElementById('total-seat').innerText);
        let totalSeat = textToNumber('total-seat');
        setInnerText('total-seat', totalSeat -= 1);

        let totalPrice = textToNumber('total-price')
        setInnerText('total-price', totalPrice += 550);

        setInnerText('grand-total', totalPrice);

        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');

        td1.innerText = e.target.innerText;
        td2.innerText = 'Economy';
        td3.innerText = '550';

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        getElement('table-body').appendChild(tr);

        if (e.target) {
            e.target.disabled = true;
            e.target.style.color = 'white';
            e.target.style.background = '#1DD100';
        }
       
        const applyBtn = getElement('apply-btn');
        if (count === 4) {
            applyBtn.removeAttribute('disabled')
        }
        else {
            applyBtn.setAttribute('disabled', true)
        }
    });
}


function setInnerText(id, value) {
    const element = document.getElementById(id);
    element.innerText = value;
}

function textToNumber(id) {
    let element = parseInt(document.getElementById(id).innerText);
    return element;
}

function getElement(id) {
    const element = document.getElementById(id);
    return element;
}

getElement('phone-number').addEventListener('keyup', function (e) {
    if (count > 0 && e.target.value.length > 0) {
        getElement('next-btn').removeAttribute('disabled');
    }
    else {
        getElement('next-btn').setAttribute('disabled', true);
    }
});

// getElement('coupon-code').addEventListener('keyup', function (event) {
//     const textValue = event.target.value;
//     const applyBtn = getElement('apply-btn');
//     if ((textValue === 'NEW15' || textValue === 'Couple 20') && count === 4) {
//         applyBtn.removeAttribute('disabled')
//     }
//     else {
//         applyBtn.setAttribute('disabled', true)
//     }
// });

getElement('apply-btn').addEventListener('click', function () {
    let price = parseInt(getElement('total-price').innerText);
    let grand = getElement('grand-total');
    let getValue = getElement('coupon-code').value;
    let discount15 = price * 0.15;
    let discount20 = price * 0.20;

    if (getValue === 'NEW15') {
        grand.innerText = price - discount15;
        getElement('discount-price').innerText = discount15;
        getElement('coupon-div').classList.add('hidden');
        getElement('discount-div').classList.remove('hidden');
    }
    else if (getValue === 'Couple 20') {
        grand.innerText = price - discount20;
        getElement('discount-price').innerText = discount20;
        getElement('coupon-div').classList.add('hidden');
        getElement('discount-div').classList.remove('hidden');
    }
    else {
        grand.innerText = price;
        alert('Invalid Coupon Code')
    }
});

getElement('buy-tickets').addEventListener('click', function (e) {
    getElement('tickets-section').scrollIntoView({ behavior: 'smooth' });
});
