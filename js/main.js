const products = [
    {
        id: 1,
        title: 'HD',
        price: 300,
        Image: 'hd.png'
    },
    {
        id: 2,
        title: 'Monitor',
        price: 149.9,
        Image: 'monitor.png'
    },
    {
        id: 3,
        title: 'Mouse',
        price: 12.5,
        Image: 'mouse.png'
    },
    {
        id: 4,
        title: 'Portatil',
        price: 2.500,
        Image: 'notebook.png'
    },
    {
        id: 5,
        title: 'Placa de Video',
        price: 100,
        Image: 'placa-de-video.png'
    },
    {
        id: 6,
        title: 'Teclado',
        price: 19.9,
        Image: 'teclado.png'
    },

];
const vHeader = document.querySelector('.container-header');
const vBuscar = document.querySelector('.txtPesquisa');
const vItens = document.querySelector('.container-itens');


function searchInput(e){
    const vValorDigitado = e.target.value;
    const vProdutoEncontrado = procurarProdutoDigitado(vValorDigitado);
    
    vProdutoEncontrado.length > 0 ? renderItens(vProdutoEncontrado)
    : vItens.innerHTML = `<aside class="sem-produtos">
                                    <p>Nenhum produto encontrado</p>
                                  </aside>`
};

function procurarProdutoDigitado(produt){
    return products.filter(e =>{
        return e.title.toLocaleLowerCase().includes(produt.toLocaleLowerCase());
    });
};

vBuscar.addEventListener('keyup', _.debounce(searchInput,400)); 

document.body.addEventListener('click',function(e){
    e.preventDefault();
    const vProductId = e.target.getAttribute('data-id');
    
    if(vProductId){
        removeProducts(vProductId);
    }
})

function removeProducts(ProductId){
    const vIndex = products.findIndex((product) =>{
        return +product.id === +ProductId; //Convertendo String para Numero
        //return +product.id === Number(ProductId);
    });

    if(vIndex > -1){

        products.splice(vIndex, 1);

        if(vBuscar.value != 0){
            const vProdutoExiste = procurarProdutoDigitado(vBuscar.value);
            renderItens(vProdutoExiste);
            
            if(vProdutoExiste.length <= 0){
                vBuscar.value = '';
            };

            return;
        };

        renderItens(products);
    }
};

function renderItens(product){
    render(product);
    renderQtdeProduct(product);
}

const formatter = Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 2,
});

function render(products) {
    let vList = '';

    if (products.length <= 0) {
        vList += `<div class="no-products">
                                <p>Nenhum produto disponível</p>
                            </div>`;
    } else {
        products.forEach((product, index) => {

            /*const formatter = product.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });*/

            vList += `<div class="products">
                         <div class="products-img">
                            <img src="/img/${product.Image}" alt="${product.Image}">
                          <p>${product.title} - ${formatter.format(product.price)}</p>
                         </div>
                         <a href="#" class="products-link">
                            <div class="products-btn" data-id=${product.id}>
                                Remove
                            </div>
                          </a>
                      </div>`;
        });
    };

    vItens.innerHTML = vList;
}

function renderQtdeProduct(product){
    const vTotalProducts = product.length;
    vHeader.innerHTML = vTotalProducts > 0 
        ? `<p><strong><u>${vTotalProducts} produtos disponiveis</u></strong></p>`
        : `<p><strong><u>0 produtos disponiveis</u></strong></p>`;
};

renderItens(products);