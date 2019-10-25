import React, { Component } from "react";
import Web3 from 'web3';
// import viennoiserie from './images/pain-au-chocolat-ou-chocolatine.JPG'
import Election from './contracts/Election.json'
import Main from './Main'

import "./App.css";

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  // Permet de mettre METAMASK
  async loadWeb3() {
    // Modern DApp Browsers
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable()
    }
    // Legacy DApp Browsers
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }
    // Non-DApp Browsers
    else {
      window.alert('You have to install MetaMask !');
    }
  }

  // Permet de mettre le Smart-Contract dans l'application
  async loadBlockchainData() {
    const web3 = window.web3;
    // load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()

    const networkData = Election.networks[networkId]
    if (networkData) {
      // lier Election.json 
      const abi = Election.abi
      const address = Election.networks[networkId].address
      const election = new web3.eth.Contract(abi, address)
      const nombreDeVotePainAuChocolat = await election.methods.voirResultat(1).call()
      this.setState({ nombreDeVotePainAuChocolat })
      const nombreDeVoteChocolatine = await election.methods.voirResultat(2).call()
      this.setState({ nombreDeVoteChocolatine })
      console.log(election.methods.voirResultat(1))
      this.setState({ election })
      this.setState({ loading: false })
    } else {
      window.alert('Election contract is not deployed to detected network. Please change to the appropriate network.')
    }




  }

  voterCandidat(numeroCandidat){
    this.state.election.methods.voterCandidat(numeroCandidat).send({ from: this.state.account })
  }

  voirResultat(numeroCandidat){
    this.state.election.methods.voirResultat(numeroCandidat).send({ from: this.state.account })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      nombreDeVotePainAuChocolat: 0,
      nombreDeVoteChocolatine: 0,
      loading: true
    }

    this.voterCandidat = this.voterCandidat.bind(this)

  }




  render() {
    return (

      <div className="container-fluid mt-5">
        <div className="row">
          <main className="col-lg-12 d-flex">
            <div id="header">
              <h1>Pain au Chocolat ou Chocolatine ?</h1>
              <p>L'adresse est : {this.state.account}</p>
              <p>Nombre de vote Pain Au Chocolat est : {this.state.nombreDeVotePainAuChocolat}</p>
              <p>Nombre de vote Chocolatine est : {this.state.nombreDeVoteChocolatine}</p>
              <a href="https://developpeurblockchainfrance.com" target="_blank">Voir mon blog</a>

            </div>
            {this.state.loading
              ? <div id="loader" className="text-center"><p className="text-center">Loading ...</p></div>
              : <Main voterCandidat={this.voterCandidat} nombreDeVotePainAuChocolat={this.state.nombreDeVotePainAuChocolat} nombreDeVoteChocolatine={this.state.nombreDeVoteChocolatine} />
            }
          </main>
        </div>
      </div>

    );
  }
}


export default App;
