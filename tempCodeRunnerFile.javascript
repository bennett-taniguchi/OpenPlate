let tags = ['Coffee', 'coffee&teabakeries', 'bakeriescoffee', 'coffee&teacoffee', 'bakeriesmexican', 'mexicancocktailbars', 'cocktailbarsbeerbar', 'beerbarcoffee', 'coffee&teasandwiches', 'sandwicheswaffles', 'wafflescoffee', 'coffee&teacoffeeroasteries', 'coffeeroasteriescoffee', 'bakeries'];

tagsRevised = []

for(let i = 0; i < tags.length;i++) {
    tags[i] = tags[i].toLowerCase();
    let splits = []
    splits = tags[i].split("&");
    for(let j =0;j < splits.length;j++) {
        tagsRevised[j+i] = splits[j]
    }
}


tagsRecurs = []

for(let i = 0;i< tagsRevised.length;i++) {
    // if(tagsRecurs.includes(tagsRevised[i])) {
    //     tagsRecurs += tagsRevised[i];
    // } else {
    //     tagsRecurs += tagsRevised[i];
    // }
    tagsRecurs += tagsRevised[i];
}console.log(tagsRecurs)
// tagsReoccurence
// for (let i = 0; i<tagsRevised.length;i++) {
//     if(tagsFinal[tagsRevised[i]]) {
//         tagsFinal[tagsRevised[i]] += 1;
//     }
//      for (let j = 0; j < tagsFinal.keys().length; j++) {
//         // if key contains tag
//         if(tagsFinal.keys()[j].includes(tagsRevised[i])) {

//         } else if (tagsRevised[i].includes(tagsFinal.keys()[j])) {

//         }
        
//         // if tag contains key
//      }
    
//     else {
//         tagsFinal[tagsRevised[i]] = 1;
//     }
// }

// console.log(tagsRevised);