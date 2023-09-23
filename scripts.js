/*
------------------------------------------------------------
Função para obter a lista existente de equipamentos do 
servidor via requisição GET
------------------------------------------------------------
*/
const getList = async () =>{
    let url = 'http://127.0.0.1:5000/listar_equipamentos';
    fetch(url,{
        method: 'get',
    })
    .then((response) => response.json())
    .then((data) => {
        data.equipamentos.forEach(item => insertList(item.modelo, item.fabricante))
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

/*
------------------------------------------------------------
Chama a função para carregamento inicial dos dados na 
tabela
------------------------------------------------------------
*/

getList();

/*
---------------------------------------------------------------
  Função para cadastrar um equipamento na lista do servidor via 
  requisição POST
---------------------------------------------------------------
*/
const postItem = async (inputModelo, inputFabricante) => {
    const formData = new FormData();
    formData.append('fabricante',inputFabricante);
    formData.append('modelo', inputModelo);
    

    let url = 'http://127.0.0.1:5000/cadastrar_equipamento';
    fetch(url,{
        method: 'post',
        body: formData
    })

    .then((response) => response.json)
    .catch((error) => {
        console.error('Error:', error);
    })

}

/*
---------------------------------------------------------------
  Função para adicionar novo equipamento com modelo e 
  fabricante
---------------------------------------------------------------
*/
const newItem = () => {
    let inputModelo = document.getElementById("inputModelo").value;
    let inputFabricante = document.getElementById("inputFabricante").value;
    
    if (inputModelo === ''){
        alert("Digite o modelo do equipamento!");
    }else {
        insertList(inputModelo,inputFabricante);
        postItem(inputModelo,inputFabricante);
        
        alert("Item cadastrado!");
    }

}

/*
---------------------------------------------------------------
  Função para inserir equipamento na lista apresentada
---------------------------------------------------------------
*/
const insertList = (modeloEquipamento, fabrianteEquipamento) =>{

    var item  = [modeloEquipamento, fabrianteEquipamento];
    var table = document.getElementById('myTable');
    var row = table.insertRow();

    for (var i = 0; i < item.length; i++){
        var cel = row.insertCell(i);
        cel.textContent = item[i];
    }
    
    document.getElementById("inputModelo").value = "";
    document.getElementById("inputFabricante").value = "";

    removeElement();
}


/*
---------------------------------------------------------------
  Função para remover equipamento da lista de acordo com 
  click no botão 
---------------------------------------------------------------
*/
const removeElement = () => {
    let close = document.getElementsByClassName("close");
    let i;
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function () {
        let div = this.parentElement.parentElement;
        const modeloEquipamento = div.getElementsByTagName('td')[0].innerHTML
        if (confirm("Você tem certeza?")) {
          div.remove()
          deleteItem(modeloEquipamento)
          alert("Removido!")
        }
      }
    }
  }

