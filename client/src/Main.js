import React, { Component } from "react";
// import 
import viennoiserie from './images/pain-au-chocolat-ou-chocolatine.JPG'



import "./App.css";

class App extends Component {

    render() {
        return (
            <div>
                

                <h2>Pain au Chocolat ?</h2>
                <img src={viennoiserie} alt="Pain au chocolat" />
                <form onSubmit={(event) => {
                    event.preventDefault()
                    const numeroCandidat = 1
                    this.props.voterCandidat(numeroCandidat)
                }}>
                    <button type="submit" ref={(input) => { this.voterCandidat = input }} className="btn btn-primary boutonVote">OUI AU PAIN AU CHOCOLAT !</button>
                </form>
                <p>Le nombre total de vote est : {this.props.nombreDeVotePainAuChocolat} </p>
                

                <h2>Chocolatine ?</h2>
                <img src={viennoiserie} alt="Pain au chocolat" />
                <form onSubmit={(event) => {
                    event.preventDefault()
                    const numeroCandidatChocolatine = 2
                    this.props.voterCandidat(numeroCandidatChocolatine)
                }}  >
                    <button type="submit" ref={(input) => { this.voterCandidat = input }} className="btn btn-primary boutonVote">OUI À LA CHOCOLATINE !</button>
                </form>
                <p>Le nombre total de vote est : {this.props.nombreDeVoteChocolatine} </p>

                <a href="https://developpeurblockchainfrance.com" target="_blank">Voir mon blog</a>
            </div>
        );
    }
}


export default App;
