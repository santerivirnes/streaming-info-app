import { useState } from 'react';
import { search } from 'ionicons/icons';
import { 
  IonApp,
  IonHeader,
  IonContent,
  IonModal,
  IonInput,
  IonItem,
  IonLabel,
  IonToolbar,
  IonTitle,
  IonButton,
  IonButtons,
  IonFab,
  IonFabButton,
  IonIcon,
  IonAvatar,
  IonImg,
  IonSelect,
  IonSelectOption
} from '@ionic/react';
import './ExploreContainer.css';
import axios from 'axios';



const Search = () => {

  const apiurl = "http://www.omdbapi.com/?apikey=<YOUROMDBAPIKEYHERE>"

  const [text, setText] = useState()
  const [modal, setModal] = useState({isOpen:false})
  const [result, setResult] = useState([])
  const [selectedItem, setSelectedItem] = useState()
  const [itemIsSelected, setItemIsSelected] = useState(false)

  const openModal = () => {
    setModal({isOpen:true})
  }

  const doSearch = (text) => {
    axios(apiurl + "&s=" + text).then(({ data }) => {
      console.log(data.Search)
      setResult(data.Search)
    })

  }
  const selectItem = (item) => {
    setModal({isOpen:false})
    var options = {
      method: 'GET',
      url: 'https://streaming-availability.p.rapidapi.com/get/basic',
      params: {country: 'fi', imdb_id: item, output_language: 'en'},
      headers: {
        'x-rapidapi-host': 'streaming-availability.p.rapidapi.com',
        'x-rapidapi-key': '<YourRapidApiKeyHere>'
      }
    };

    axios.request(options).then(function (response) {
      setSelectedItem(response.data)
      setItemIsSelected(true)
    }).catch(function (error) {
      console.error(error);
    });
  }


  return (
    <div>
      {itemIsSelected ?
        <IonApp>
          <IonHeader>
            <IonTitle>selectedItem.title</IonTitle>
          </IonHeader>
          <IonContent>
            <IonImg src={selectedItem.posterURLs.original}></IonImg>
            { selectedItem.streamingInfo.netflix ? <h1>netflix</h1> : null}
            { selectedItem.streamingInfo.disney ? <h1>disney</h1> : null}
            { selectedItem.streamingInfo.prime ? <h1>prime</h1> : null}
            { selectedItem.streamingInfo.hulu ? <h1>hulu</h1> : null}
            { selectedItem.streamingInfo.hbo ? <h1>hbo</h1> : null}
            { selectedItem.streamingInfo.peacock ? <h1>peacock</h1> : null}
            { selectedItem.streamingInfo.paramount ? <h1>paramount</h1> : null}
            { selectedItem.streamingInfo.starz ? <h1>starz</h1> : null}
            { selectedItem.streamingInfo.showtime ? <h1>showtime</h1> : null}
            { selectedItem.streamingInfo.apple ? <h1>apple</h1> : null}
            { selectedItem.streamingInfo.mubi ? <h1>mubi</h1> : null}        
            <IonFab>
            <IonFabButton onclick={() => openModal()}><IonIcon icon={search}/></IonFabButton>
          </IonFab>    
          </IonContent>
         
        </IonApp>
        :
        <div className="container">
          <IonFab>
            <IonFabButton onclick={() => openModal()}><IonIcon icon={search}/></IonFabButton>
          </IonFab>
        </div>
      }
      
      <IonModal
          onDidDismiss={() => setModal({isOpen:false})} 
      isOpen={modal.isOpen}
      >
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            Search
          </IonTitle>
          <IonButtons>
            <IonButton  onclick={() => setModal({isOpen:false})}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonInput value={text} placeholder="Enter Input" onIonChange={e => setText(e.detail.value)}></IonInput>
          <IonButton onClick={() => doSearch(text)}>Search</IonButton>
        </IonItem>
        { result.map( (results) => 
          <div class="option" key={results.imdbID}>
            <IonItem>
              <IonAvatar slot="start">
                <IonImg src={results.Poster} />
              </IonAvatar>
              <IonLabel>{results.Title}</IonLabel>
              <IonButton onClick={() => selectItem(results.imdbID)}>Select</IonButton>
            </IonItem>
          </div>
        )}
      </IonContent>
      </IonModal>

      
    </div>
  );
};

export default Search;
