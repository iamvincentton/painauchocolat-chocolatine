pragma solidity ^0.5.0;

contract Election {
    constructor() public {
        _ajouterCandidat("Pain au chocolat");
        _ajouterCandidat("Chocolatine");
    }

    // Modeliser un candidat

    struct Candidat {
        uint candidatNumero;
        string nom;
        uint nombreDeVote;
    }

    mapping(uint => Candidat) candidats;
    mapping(address => bool) public electeurs;

    uint public nombreDeCandidat;

    function _ajouterCandidat(string memory _nom) private {
        
        nombreDeCandidat++;
        Candidat memory unCandidat = Candidat(nombreDeCandidat, _nom, 0);
        candidats[nombreDeCandidat] = unCandidat;
    }

    

    // Rechercher un Candidat (enlever le nombre de Vote)

    function rechercherCandidat(uint _candidatNumero) public view returns(string memory, uint) {
        return(candidats[_candidatNumero].nom, candidats[_candidatNumero].nombreDeVote);
    } 

    // Voter
    function voterCandidat(uint _candidatNumero) public {
        require(!electeurs[msg.sender]);
        require(_candidatNumero > 0 && _candidatNumero <= nombreDeCandidat);
        electeurs[msg.sender] = true;
        candidats[_candidatNumero].nombreDeVote++;
    }
    
    function voirResultat(uint _candidatNumero) public view returns(uint) {
        require(_candidatNumero > 0 && _candidatNumero <= nombreDeCandidat);
        return(candidats[_candidatNumero].nombreDeVote);
    }
   
}