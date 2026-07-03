import wifiCredentials from '@/content/manuals/wifi';

type WiFiInfoProps = {
  property: string;
};

export default function WiFiInfo({ property }: WiFiInfoProps) {
  const wifi = wifiCredentials[property];

  if (!wifi || !wifi.network) {
    return <p>WiFi credentials not available. Please contact your host.</p>;
  }

  return (
    <ul>
      <li>Network: {wifi.network}</li>
      <li>Password: {wifi.password}</li>
    </ul>
  );
}
