let senate = document.getElementById("senate")
let house = document.getElementById("house")

const app = Vue.createApp({
    data(){
        return{
            members: [],
            esVisible:false,
            states: [],
            selected:"",
            partidos:[],
            // arrayOrdenado: ordernar(missed_votes_pct,true)
            
        }
    },
    created(){
        if(senate){
            var endpoint = "https://api.propublica.org/congress/v1/113/senate/members.json"
        }else if(house){
            var endpoint = "https://api.propublica.org/congress/v1/113/house/members.json"
        }
        init = {
            method: "GET",
            headers: {
                "X-API-Key": "keHql8QzHVFJn3PhysJZLsR2f1sFr6HAxxpF2nYx"
            }
        }
        fetch(endpoint,init)
            .then(res =>{
                if(res.ok){
                    return res.json()
                }else{
                    throw new Error("Hubo un problema")
                }
            } )
            .then(json => {this.members = json.results[0].members
                // console.log(this.members)            
            })



    },
    methods:{
        readMore(){
            this.esVisible = !this.esVisible;
        },





    },
    computed:{
        filtarEstados(){
            let estadosRepetidos = [];
            this.members.map(e => estadosRepetidos.push(e.state));
            let estados = [];
            estadosRepetidos.sort();
            for(let i = 0; i<estadosRepetidos.length;i++){
                if(estadosRepetidos[i] != estadosRepetidos[i+1]){
                    estados.push(estadosRepetidos[i])
                }
            }
            return this.states = estados;
        },

        filtrarMiembros(){
            let chequeados = this.members.filter(miembro=> this.partidos.includes(miembro.party) || this.partidos.length === 0 )
            if(this.selected == ""){
                console.log(chequeados)
                return chequeados
            } else{
                let selected = this.selected.split(" ")
                let seleccionados = [...chequeados].filter(e=>e.state==selected & this.partidos.includes(e.party) || this.partidos.length === 0)
                console.log(seleccionados)
                return seleccionados;
            }
            
        },

        filtrarPartido(){
            let votesDemocrat = 0;
            let contDemocrat = 0;
            let votesIndependet = 0;
            let contIndependet = 0;
            let votesRepublican = 0;
            let contRepublican = 0;

            this.members.forEach(member =>{
                if(member.party == "D"){
                    votesDemocrat += member.votes_with_party_pct 
                    contDemocrat++
                }else if(member.party =="R"){
                    votesRepublican += member.votes_with_party_pct
                    contRepublican++
                }else if(member.party =="I" || member.party =="ID"){
                    votesIndependet += member.votes_with_party_pct
                    contIndependet ++
                }
            })
            let partys = [{
                nameParty:"Democrat",
                totalVotesParty:contDemocrat,
                totalPctPart:((votesDemocrat / contDemocrat) ? (votesDemocrat / contDemocrat) : 0).toFixed(2),
            },{
                nameParty:"Republican",
                totalVotesParty:contRepublican,
                totalPctPart:((votesRepublican / contRepublican) ? (votesRepublican / contRepublican) : 0).toFixed(2),
            },{
                nameParty:"Independent",
                totalVotesParty:contIndependet,
                totalPctPart:((votesIndependet / contIndependet) ? (votesIndependet / contIndependet) : 0).toFixed(2),
            },{
                nameParty:"Total",
                totalVotesParty: contRepublican + contIndependet + contDemocrat,
                totalPctPart: ((votesDemocrat + votesIndependet + votesRepublican) / (contDemocrat+ contRepublican + contIndependet)).toFixed(2)
            }
            ]
            return partys;
        },

        ordenarLeast(){
            newArray = [...this.members]
            function leastAttendance(array){
                let arrayOrdenado = array.sort((a,b) => a.missed_votes_pct - b.missed_votes_pct) 
                let tenPercent = (arrayOrdenado.length * 10 / 100).toFixed(2); 
                let newMebers = [];
                for(let i = 0 ; i < tenPercent ; i++){
                    newMebers.push(arrayOrdenado[i]);
                }
                return newMebers;
            }
            return leastAttendance(newArray)

    },
        ordenarLeastAttendace(){
            newArray = [...this.members]
            function leastAttendance(array){
                let arrayOrdenado = array.sort((a,b) => a.votes_with_party_pct - b.votes_with_party_pct) 
                let tenPercent = (arrayOrdenado.length * 10 / 100).toFixed(2); 
                let newMebers = [];
                for(let i = 0 ; i < tenPercent ; i++){
                    newMebers.push(arrayOrdenado[i]);
                }
                return newMebers;
            }
            return leastAttendance(newArray)

    },
        ordenarMost(){
            newArray = [...this.members]
            function leastAttendance(array){
                let arrayOrdenado = array.sort((a,b) => b.missed_votes_pct - a.missed_votes_pct) 
                let tenPercent = (arrayOrdenado.length * 10 / 100).toFixed(2); 
                let newMebers = [];
                for(let i = 0 ; i < tenPercent ; i++){
                    newMebers.push(arrayOrdenado[i]);
                }
                return newMebers;
            }
            return leastAttendance(newArray)

    },
        ordenarMostAttendance(){
            newArray = [...this.members]
            function leastAttendance(array){
                let arrayOrdenado = array.sort((a,b) => b.votes_with_party_pct - a.votes_with_party_pct) 
                let tenPercent = (arrayOrdenado.length * 10 / 100).toFixed(2); 
                let newMebers = [];
                for(let i = 0 ; i < tenPercent ; i++){
                    newMebers.push(arrayOrdenado[i]);
                }
                return newMebers;
            }
            return leastAttendance(newArray)

    },

      
        

}
})

app.mount("#app");