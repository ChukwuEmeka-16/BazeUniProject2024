const votes = [
    ['1','peter'],
    ['2','tinubu'],
    ['1','peter'],
    ['2','tinubu'],
    ['1','peter'],
    ['2','tinubu'],
    ['3', 'atiku'],
    ['2','tinubu'],
    ['3', 'atiku'],
    ['2','tinubu'],
    ['3', 'atiku'],
    ['1','peter'],
    ['3', 'atiku'],
    ['2','tinubu'],
    ['3', 'atiku'],
    ['2','tinubu'],
    ['3', 'atiku'],
    ['2','tinubu'],
    ['3', 'atiku'],
    ['1','peter'],
    ['3', 'atiku'],
    ['2','tinubu'],
    ['3', 'atiku']
]
const canddList =['peter','atiku','tinubu']

let Results = [];

for (let i = 0; i < canddList.length; i++) {
   Results[i] = [canddList[i],0]
    
}


for(let i = 0;i<votes.length;i++){
   for (let j = 0; j < Results.length; j++) {
       if (votes[i][1] ==Results[j][0]) {
        Results[j][1] = Results[j][1] +1
       }
   }
}

Results.sort((a,b)=>b[1] - a[1])

const x = Results.map((item)=>item[0])
const y = Results.map((item)=>item[1])
console.log(x)
console.log(y);
console.log(Results);