import { StaticImageData } from 'next/image';

// Sound Breeze
import soundBreezeRear from '@/app/SoundBreezePhotos/rear.jpg';
import soundBreezeEntry from '@/app/SoundBreezePhotos/entry_door.jpg';
import soundBreezeLock from '@/app/SoundBreezePhotos/lock.jpg';
import soundBreezeTrash from '@/app/SoundBreezePhotos/trash.jpeg';

// Songbird
import songbirdParking from '@/app/SongbirdPhotos/parking.png';
import songbirdLock from '@/app/SongbirdPhotos/lock.png';

// Launchpad
import launchpadParking from '@/app/LaunchpadPhotos/parking.png';
import launchpadEntry from '@/app/LaunchpadPhotos/rear.png';
import launchpadLock from '@/app/LaunchpadPhotos/lock.jpeg';

export type ManualImageEntry = {
  src: StaticImageData;
  alt: string;
};

const manualImages: Record<string, Record<string, ManualImageEntry>> = {
  'sound-breeze': {
    parking: { src: soundBreezeRear, alt: 'View of Sound Breeze from alley' },
    entry: { src: soundBreezeEntry, alt: 'Entry Door' },
    lock: { src: soundBreezeLock, alt: 'Sound Breeze smart lock' },
    trash: { src: soundBreezeTrash, alt: 'Trash cans at Sound Breeze' },
  },
  'songbird': {
    parking: { src: songbirdParking, alt: 'View of Songbird Suite parking' },
    lock: { src: songbirdLock, alt: 'Songbird Suite smart lock' },
  },
  'launchpad': {
    parking: { src: launchpadParking, alt: 'View of Seattle Launchpad parking' },
    entry: { src: launchpadEntry, alt: 'Seattle Launchpad entry' },
    lock: { src: launchpadLock, alt: 'Seattle Launchpad smart lock' },
  },
};

export default manualImages;
