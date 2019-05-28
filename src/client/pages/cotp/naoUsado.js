/*
var apontado='';

handlePesquisar = () => {   
    //let reserva = document.querySelectorAll(".ui button").value;
    var descendentes = document.querySelectorAll(".ui button");
      //console.log(descendentes);
  
    for (var i = 0; i < descendentes.length; i++) {
      descendentes[i].addEventListener("click", function (e) {
          //alert('O elemento clicado foi o ' + this.innerHTML+' comprimento'+descendentes.length );
          //console.log(this.innerHTML);
          apontado = this.innerHTML
      })

    }
    alert(apontado);

    this.setState({
      data:apontado,
      success:true})
         
    alert(this.state.data);
    
    return apontado
    
    //console.log(apontado);
    
    //let reserva = parseInt(apontado);

    /*let obj = {
      reserva
    };*/

{
  /*        
            <Form onSubmit={this.onSubmit.bind(this)}>            
                <Table celled selectable striped singleLine attached striped basic="very" style={{width:1100}}>
                <Table.Header style={{backgroundColor:'black'}}>
                <Table.Row >
                    <Table.HeaderCell style={{color:'white',paddingLeft:20}}>Monitor</Table.HeaderCell>
                    <Table.HeaderCell style={{color:'white',paddingLeft:20}}>Horários</Table.HeaderCell>
                </Table.Row>
                </Table.Header>
                <Table.Body style={{backgroundColor:'white'}}>
                  {this.state.userList.map(user => {
                    return(
                      <Table.Row>                  
                        <Table.Cell style={{paddingLeft:20,paddingTop:20}}>
                          {user.name+' - '+user.disciplina}
                        </Table.Cell>                   
                        <Table.Cell style={{paddingLeft:20}}>
                          {user.monitorias.map(reserva => {
                            return(                              
                              /*<Button class="ui button" value={reserva} type='submit'
                               onClick={this.handlePesquisar}>                            
                                <Button 
                                class='ui button' 
                                content={reserva} 
                                //onChange={this.handleChange.bind(this)}
                                onClick={() => monitoriaChange(reserva)}
                                />                         
                            )
                            })}
                        </Table.Cell>                     
                      </Table.Row>
                    )})}               
                  </Table.Body>
                </Table>
              </Form>*/
}
