
async function fetchData(){
    let response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
    let data =  await response.json();
    return data;
}
fetchData().then(data=>{
   let dataArr = data;

//    printing data in a table
   function printData(dataArr){
    dataArr.forEach((data)=>{
        let tableBody = document.querySelector("tbody");
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="left"><span><img src="${data.image}" alt=""></span>${data.name}</td>
            <td>${data.symbol}</td>
            <td>$${data.current_price}</td>
            <td>$${data.total_volume}</td>
            <td class = "percentColor-${(data.price_change_percentage_24h.toFixed(2) > 0 ? 1 : 2)}">${data.price_change_percentage_24h.toFixed(2)}%</td>
            <td>Mkt Cap : $${data.fully_diluted_valuation}</td>
        `;
        tableBody.append(tr);
    });
   }
   printData(dataArr);



//    function for sorting via Sort By Mkt Cap
    let buttonMkt = document.querySelector(".btnMkt");
    buttonMkt.addEventListener("click", sortViaMktCap);
    function sortViaMktCap(){
        let tableBody = document.querySelector("tbody");
        tableBody.innerHTML = "";
        let newArr = dataArr.sort((a, b)=> (a.market_cap_change_24h - b.market_cap_change_24h));
        dataArr = newArr;
        printData(dataArr);
    }


    //  function for sorting via 
    let buttonPercentage = document.querySelector(".btnPercentage");
    buttonPercentage.addEventListener("click", sortViaPercentage);
    function sortViaPercentage(){
        let tableBody = document.querySelector("tbody");
        tableBody.innerHTML = "";
        let newArr = dataArr.sort((a, b)=> (a.price_change_percentage_24h - b.price_change_percentage_24h));
        dataArr = newArr;
        printData(dataArr);
    }


    // function for searching 
    let input = document.querySelector("input");
    input.addEventListener("keyup", searching);
    function searching(){
        let value = input.value.toUpperCase();
        let tableBody = document.querySelector("tbody");
        let tr = document.querySelectorAll("tr");
        console.log(tr[0].children[0].textContent);
        for(let i = 0; i < dataArr.length; i++){
            if((dataArr[i].name.toUpperCase().indexOf(value) > -1 )|| (dataArr[i].symbol.toUpperCase().indexOf(value) > -1 )){
                tr[i].style.display = "";
            }else{
                tr[i].style.display = "none";
            }
        }
    }

});


