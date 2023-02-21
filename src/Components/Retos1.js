import { Button } from 'bootstrap';
import React, {Component} from 'react'
import '../Styles/Estilos/Retos1.css'


class Retos1 extends Component {
    handleClick = () => {
        this.props.OpenNewVideo();
      }
    render() {
        return (
            
            <div className="card">
                
                <div className="precio">{this.props.price}€
                <div className="titulo">{this.props.title}</div>
                <div className="line" style={{backgroundColor: this.props.bgc}}></div>
                <div className="bottom">
                <div className="descripcion">{this.props.description}</div>
                <div className="Realizar">
                <button className="btn btn-primary" onClick={this.handleClick}  type="submit">Realizar Reto</button>
                
                </div>
               

                
                </div>
                </div>
            </div>
        )
    }
}
//onClick={this.props.toggleVideo("home")}
export default Retos1;
