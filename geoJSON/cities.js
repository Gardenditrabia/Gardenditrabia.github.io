var cities = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        featureType: "city",
        name: "Garden di Balamb",
        image: "",
        icon: "img/icons/city2.png",
        description: " Fondato da Cid Kramer, è il primo Garden ad essere stato istituito con lo scopo di sconfiggere e salvare la Strega Edea. In seguito è diventato la fonte di ispirazione che hanno portato alla creazione dei Garden di Galbadia e Trabia. E' il Garden da cui provengono gli Eroi SeeD e quello con la maggior rateo di SeeD d'élite. Dopo la sconfitta ottenuta nel tentativo di eradicare la Strega Astera da Dollet, il Garden di Balamb ha chiuso le iscrizioni al fine di migliorare l'addestramento dei SeeD già presenti diventando a tutti gli effetti un'accademia ancora più elitaria."
      },
      geometry: {
        type: 'Point', 
        coordinates: [-15.380859375, 73.32785809840698]
      }
    },{
      type: 'Feature',
      properties: {
        featureType: "city",
        name: "Balamb Town",
        image: "",
        icon: "img/icons/city2.png",
        description: `<a href="http://trabia.forumfree.it/?t=59368965#entry483359142" target="_blank">Clicca per accedere alla pagina sul sito</a> Città marittima di grande importanza anche e sopratutto per la vicinanza con il prestigioso Garden di Balamb e, per questo, da molti considerata la città più sicura al mondo.`
      },
      geometry: {
        type: 'Point', 
        coordinates: [-32.607421875, 71.58053179556501]
      }
    },{
      type: 'Feature',
      properties: {
        featureType: "city",
        name: "Dollet",
        image: "img/cities/balbamb_garden.png",
        icon: "img/icons/city2.png",
        description: "Capitale del fu Impero di Dollet che in antichità si estendeva su tutto il continente di Galbadia. Attualmente è il centro del potere della Strega Astera. Tutte le comunicazioni in entrata ed in uscita dalla città sono bloccate da misteriosi fenomeni magici che interferiscono anche sulle immagini satellitari.  "
      },
      geometry: {
        type: 'Point', 
        coordinates: [-55.283203125, 75.6504309974655]
      }
    },{
      type: 'Feature',
      properties: {
        featureType: "city",
        name: "Timber",
        image: "img/cities/balbamb_garden.png",
        icon: "img/icons/city2.png",
        description: `<a href="http://trabia.forumfree.it/?t=59368965#entry483386747" target="_blank">Clicca per accedere alla pagina sul sito</a> Timber è un polo ferroviario di rilevanza fondamentale - dalla sua stazione partono treni che raggiungono tutte le principali città mondiali. La sua importanza ha attratto in passato le brame di conquista di più di una Strega.`
      },
      geometry: {
        type: 'Point', 
        coordinates: [-61.611328125, 62.63376960786814]
      }
    },{
      type: 'Feature',
      properties: {
        featureType: "city",
        name: "Trabia Town",
        image: "",
        icon: "img/icons/city2.png",
        description: `<a href="http://trabia.forumfree.it/?t=59368965#entry483188314" target="_blank">Clicca per accedere alla pagina sul sito</a> La fondazione della città, che risale a pochi anni dopo la fine della guerra della Strega Artemisia, ha causato la sparizione e l'incorporazione di numerosi piccoli centri abitati del continente di Trabia. Attualmente la città è un forte polo economico con molte possibilità di lavoro ed in cui la ricchezza è equamente distribuita tra la popolazione.`
      },
      geometry: {
        type: 'Point', 
        coordinates: [-17.9296875, 80.23850054635392]
      }
    },{
      type: 'Feature',
      properties: {
        featureType: "city",
        name: "Garden di Trabia",
        image: "",
        icon: "img/icons/city2.png",
        description: `Dopo la sconfitta della Strega Artemisia è stata messa in moto una macchina economica per ricostruire il Garden di Trabia precedentemente distrutto dal famoso attacco missilistico da parte di Galbadia ai suoi danni. Il progetto - nato da Balamb e promosso dalla stessa Galbadia - ha messo nelle mani di Hector Mayer la nuova accademia SeeD. Alla sua morte, i figli Heimmerich ed Emily hanno preso le redini del Garden e portando avanti la guerra dei suoi SeeD - i Liberi Fatali - contro la Strega Astera. `
      },
      geometry: {
        type: 'Point', 
        coordinates: [-21.62109375, 80.7323485464832]
      }
},{
      type: 'Feature',
      properties: {
        featureType: "city",
        name: "Fisherman's Horizon",
        image: "",
        icon: "img/icons/city2.png",
        description:`  <a href="http://trabia.forumfree.it/?t=59368965#entry483334252" target="_blank">Clicca per accedere alla pagina sul sito</a> Questa città - che si trova al centro del grande ponte che collega i continenti di Esthar e Galbadia - è stata fondata durante il periodo di sviluppo di Esthar City da un gruppo di ingegneri che, insoddisfatti delle proprie condizioni lavorative, hanno deciso di lasciare la città. Si tratta di una città pacifica, neutrale, che non ha mai subito direttamente i fuochi della guerra.`
      },
      geometry: {
        type: 'Point', 
        coordinates: [-19.072265625, 62.79493487887006]
      }
        },{
      type: 'Feature',
      properties: {
        featureType: "city",
        name: "Esthar City",
        image: "",
        icon: "img/icons/city2.png",
        description:`  <a href="http://trabia.forumfree.it/?t=59368965#entry483208953" target="_blank">Clicca per accedere alla pagina sul sito</a>  Leggenda vuole che questa città sia stata fondata dagli esuli di Centra riusciti a fuggire dal Pianto Lunare dello 0 P.L.C. Questa città è il più importante polo tecnologico mondiale ed è, insieme alle forze di Dollet e della Strega Astera, la più grande superpotenza mondiale. Esthar City è stata protagonista di numerose guerre ed eventi politici passati, ed attualmente segue una politica anti-Strega supportando, quando le è possibile, gli sforzi dei Garden per contrastare l'avanzata di Astera.`
      },
      geometry: {
        type: 'Point', 
        coordinates: [17.40234375, 57.844750992891]
      }
      },{
      type: 'Feature',
      properties: {
        featureType: "city",
        name: "Gracemeria",
        image: "",
        icon: "img/icons/city2.png",
        description:`  <a href="http://trabia.forumfree.it/?t=59368965#entry483770748" target="_blank">Clicca per accedere alla pagina sul sito</a>  Città di recente fondazione come Trabia Town, si tratta di un progetto internazionale per la ri-colonizzazione del continente di Centra. Gli aiuti economici e tecnologici di Esthar City hanno reso esponenziale la sua crescita trasformandola in una città estremamente all'avanguardia. In seguito al colpo di stato del 102 PLC è caduta in mano alla Strega Aura ed ai suoi Cavalieri della Tavola Rotonda.`
      },
      geometry: {
        type: 'Point', 
        coordinates: [3.603515625, -2.108898659243126]
}
      },{
      type: 'Feature',
      properties: {
        featureType: "city",
        name: "Lindblum",
        image: "",
        icon: "img/icons/city2.png",
        description:`  <a href="http://trabia.forumfree.it/?t=59368965#entry613543997" target="_blank">Clicca per accedere alla pagina sul sito </a> Città di spicco nel periodo precedente alla guerra di Artemisia, Lindblum è una città marittima che fa fatica a rimanere al passo dei tempi con il resto della regione. E' stato un importante porto e punto di scalo per i rifornimenti balistici, grazie anche alla minera di damasco qui presente.`
      },
      geometry: {
        type: 'Point', 
        coordinates:  [23.73046875, 31.503629305773032]
      }
      },{
      type: 'Feature',
      properties: {
        featureType: "city",
        name: "Cittadella Perduta di Cleyra",
        image: "",
        icon: "img/icons/city2.png",
        description:`  Avvolta in un tornado di sabbia che sembra non esaurirsi mai c'è una città. Gli strumenti dei velivoli vanno spesso in tilt quando si sorvola questa zona; è impossibile penetrare all'interno della perturbazione. Tuttavia, ci sono dicerie di viandanti che sono riusciti a vedere le meraviglie che si nascondono al suo interno.`
      },
      geometry: {
        type: 'Point', 
        coordinates: [-100.458984375, 63.78248603116502]
              }
                      },{
      type: 'Feature',
      properties: {
        featureType: "city",
        name: "Winhill",
        image: "",
        icon: "img/icons/city2.png",
        description:`  <a href="http://trabia.forumfree.it/?t=59368965#entry483195261" target="_blank">Clicca per accedere alla pagina sul sito</a>  Piccola cittadina recentemente entrata nel conflitto dei Liberi Confini di Galbadia. E' stata vittima di diversi attacchi da parte della fazione di Wolfgang - ed è riuscita a difendersi grazie all'intervento del Cavalierato del Nuovo Ordine (C.N.O.) E' famosa per l'importanza che ha avuto nella vita di Laguna Loire, l'attuale Presidente di Esthar City e padre dell'eroe Squall Leonhart e per i numerosi allevamenti di Chocobo. `      
},
      geometry: {
        type: 'Point', 
        coordinates: [-94.04296875, 58.17070248348609]
      }
                    },{
                            type: 'Feature',
      properties: {
        featureType: "city",
        name: "Deling City",
        image: "",
        icon: "img/icons/city2.png",
        description:`  Capitale dello stato di Galbadia, Deling City è una città antica e ricca di storia. E' il cuore pulsante della regione galbadiana ed è per questo che durante gli anni in cui è rimasta conquistata prima dalla strega Artemisia e poi dalla strega Astera il continente ne ha sofferto molto. E' famosa la sua università, per le singole condizioni climatiche che la rendono perennemente coperta di nubi, e per i monumenti antichi.`      
},
      geometry: {
        type: 'Point', 
        coordinates: [-100.810546875, 73.12494524712693]
      }
                                                },{
      type: 'Feature',
      properties: {
        featureType: "city",
        name: "Garden di Galbadia",
        image: "",
        icon: "img/icons/city2.png",
        description:`  Accademia dei SeeD Galbadiani la cui preside è attualmente Fujin, il comandante Frank Beast, ed il capitano Ted Hawkins. Insieme al Garden di Balamb si è messo in prima fila per la ricostruzione di quello di Trabia. Tutti i SeeD galbadiani hanno sofferto molto la guerra tanto di Artemisia quanto di Astera - il che li ha portati a considerare la soluzione estrema di avvalersi del Lunatic Pandora per bombardare Dollet, intento che è sfociato nella guerra tra Garden chiamata Lunawar. Dopo aver ristabilito i rapporti diplomatici, il Garden di Galbadia ha iniziato grandi collaborazioni con quello di Trabia per far procedere la guerra contro la Strega.`      
},
      geometry: {
        type: 'Point', 
        coordinates: [-100.810546875, 73.12494524712693]
      }
      }
   
  ]
};

