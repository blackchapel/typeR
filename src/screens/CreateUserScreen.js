import react from 'React';
import { FlatList, View } from 'react-native';

import EventCardComponent from '../components/EventCardComponent';

const HomeScreen = () => {
  const DATA = [
    {
      id: '63df560ecb965225063be425',
      name: 'EWaste Drive',
      thumbnail:
        'https://firebasestorage.googleapis.com/v0/b/xreventi.appspot.com/o/images%2Fewaste-aspect-ratio-2000-1200-1024x614.jpg%20%2B?alt=media&token=28cf25d3-7550-470c-acef-fdf81f29420a',
      status: 'PENDING',
      isApproved: false,
      _id: '63df560ecb965225063be42f'
    },
    {
      id: '63df8f8aa84d4055fa95988d',
      name: 'Navaratri Nights',
      thumbnail:
        'https://firebasestorage.googleapis.com/v0/b/xreventi.appspot.com/o/images%2Fwall.png%20%2B?alt=media&token=870f44db-0e77-4b9f-a3fe-35bd5fe048c8',
      status: 'PENDING',
      isApproved: false,
      _id: '63df8f8aa84d4055fa95989a'
    },
    {
      id: '63df8ff6a84d4055fa9598aa',
      name: 'Night Cycling',
      thumbnail:
        'https://firebasestorage.googleapis.com/v0/b/xreventi.appspot.com/o/images%2Fwall7.jpg%20%2B?alt=media&token=6ccec91a-10bf-4708-bbc2-b8844390702e',
      status: 'PENDING',
      isApproved: false,
      _id: '63df8ff7a84d4055fa9598b9'
    },
    {
      id: '63df915aa84d4055fa9598e4',
      name: 'Holi Mastii',
      thumbnail:
        'https://firebasestorage.googleapis.com/v0/b/xreventi.appspot.com/o/images%2F945986.jpg%20%2B?alt=media&token=82278ffe-52d2-4fe5-ac14-15e15438ad17',
      status: 'PENDING',
      isApproved: false,
      _id: '63df915ba84d4055fa9598f6'
    }
  ];

  return (
    <FlatList
      data={DATA}
      renderItem={(element) => (
        <EventCardComponent
          name={element.item.name}
          image={element.item.thumbnail}
        />
      )}
      // keyExtractor={(item) => item.id}
    />
  );
};
