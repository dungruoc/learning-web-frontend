import { useSearchParams } from "react-router-dom";

export function useUriPosition() {
    const [uriParams] = useSearchParams();
    const mapLat = uriParams.get('lat');
    const mapLng = uriParams.get('lng');

    return [mapLat, mapLng];
}
