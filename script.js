// Cotação de moedas do dia.
const USD = 4.98
const EUR = 5.82
const GBP = 6.74

// Obtendo os elementos do formulário.
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const currency = document.getElementById("currency")
const footer = document.querySelector("main footer")
const description = document.getElementById("description")
const result = document.getElementById("result")

// Manipulando o input amount para receber somente números.
amount.addEventListener("input", () => {

    const hasCharactersRegex = /\D+/g
    amount.value = amount.value.replace(hasCharactersRegex, "")
})

// Captando o evento de submit (enviar) do formulário
form.addEventListener("submit", (event) => {
    event.preventDefault()

    switch (currency.value) {
        case "USD":
            convertCurrency(amount.value, USD, "US$")
            break
        case "EUR":
            convertCurrency(amount.value, EUR, "€")
            break
        case "GBP":
            convertCurrency(amount.value, GBP, "£")    
            break
    }
})

// Função para converter a moeda.
function convertCurrency(amount, price, symbol) {
    try {
        // Exibindo a cotação da moeda selecionada
        description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`

        // Calcula o total.
        let total = amount * price

        // Verifica se o resultado não é um número.
        if(isNaN(total)) {
            return alert("Por favor, digite o valor corretamente para converter")
        }

        // Formatar o valor total.
        total = formatCurrencyBRL(total).replace("R$", "")

        // Exibe o resultado total.
        result.textContent = `${total} Reais`

        // Aplica a classe que exibe o footer para mostrar o resultado.
        footer.classList.add("show-result")
    } catch (error) {
        // Remove a classe do footer ocultando ele.
        footer.classList.remove("show-result")

        console.log(error)
        alert("Não foi possivel converter, tente novamente mais tarde.")
    }
}

function formatCurrencyBRL(value) {
    // Converte para número para utilizar o toLocalString para formatar o valor para o formato de moeda brasileira (BRL).
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })
}